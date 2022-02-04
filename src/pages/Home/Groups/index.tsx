import React, { useEffect, useState } from 'react'
import styles from "./index.module.less";
import {Grid, Image} from "antd-mobile";
import {baseUrl} from "../../../utils/request/http";
import {apiGetGroups} from "../../../utils/request/api";

export const Groups = () => {

    /**state  state部分**/
    const [groups, setGroups] = useState<object[]>([])
    /**effect  effect部分**/
    useEffect(() => {
        getGroups()
    }, [])
    /**methods 方法部分**/
// 获取租户小组
    async function getGroups() {
        await apiGetGroups({area: 'AREA|88cff55c-aaa4-e2e0'}).then(res => {
            const {body:data} = res
            setGroups(data)
        })
    }
    /**styles 样式部分**/

    /**render**/

    return(
        <div className={styles.group}>
            <div className={styles.groupTop}>
                <h3>租房小组</h3>
                <p>更多</p>
            </div>
            <Grid columns={2} gap={8}>
                {
                    groups.map((item:any,index:number)=>{
                        return <Grid.Item key={item['id']}>
                            <div className={styles.groupGrid}>
                                <div>
                                    <h3>{item['title']}</h3>
                                    <p>{item['desc']}</p>
                                </div>
                                <Image src={baseUrl + item['imgSrc']}/>
                            </div>
                        </Grid.Item>
                    })
                }
            </Grid>
        </div>
    );
};