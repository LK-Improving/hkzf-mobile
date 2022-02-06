import React, { useEffect, useState } from 'react'
import styles from "./index.module.less";
import {Image} from "antd-mobile";
import {baseUrl} from "../../../utils/request/http";
import {apiGetNews} from "../../../utils/request/api";

export const News = () => {

    /**state  state部分**/
    const [newsList, setNews] = useState<object[]>([])
    /**effect  effect部分**/
    useEffect(() => {
        getNews()
    }, [])
    /**methods 方法部分**/
    // 获取资讯
    async function getNews() {
        await apiGetNews({area: 'AREA|88cff55c-aaa4-e2e0'}).then((res:any) => {
            const {body:data} = res
            setNews(data)
        })
    }
    /**styles 样式部分**/

    /**render**/

    return(
        <div className={styles.news}>
            <h3>最新资讯</h3>
            {
                newsList.map((item:any,index:number)=>{
                    return <div key={item['id']} className={styles.newsItem}>
                        <Image src={baseUrl + item['imgSrc']}/>
                        <div className={styles.newsItemRight}>
                            <h3>{item['title']}</h3>
                            <div className={styles.rightBottom}>
                                <p>{item['from']}</p>
                                <p>{item['date']}</p>
                            </div>
                        </div>
                    </div>
                })
            }
        </div>
    );
};