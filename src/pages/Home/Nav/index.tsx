import React, { useEffect, useState } from 'react'
import styles from "./index.module.less";
import {Image} from "antd-mobile";

export const Nav = () => {

    /**state  state部分**/
    const navList:object[] = [{
        title: '整租',
        img: require('../../../assets/images/nav/1.png')
    }, {
        title: '合租',
        img: require('../../../assets/images/nav/2.png')
    }, {
        title: '地图找房',
        img: require('../../../assets/images/nav/3.png')
    }, {
        title: '去出租',
        img: require('../../../assets/images/nav/4.png')
    }]
    /**effect  effect部分**/

    /**methods 方法部分**/

    /**styles 样式部分**/

    /**render**/

    return(
        <div className={styles.nav}>
            {
                navList.map((item:any, index:number) => {
                    return <div key={index}>
                        <Image src={item['img']}/>
                        <p>{item['title']}</p>
                    </div>
                })
            }
        </div>
    );
};