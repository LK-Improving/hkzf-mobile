import React, {useEffect, useState} from 'react'
import {Button, Image} from "antd-mobile";
import {SwiperItems} from '../../componets/SwiperItems'
import {apiGetSwiper} from '../../utils/request/api';
import styles from './index.module.less'
import {log} from "util";

// import styles from './index.module.less'

export const Home = () => {

    /**state  state部分**/
    const [swipers, setSwipers] = useState([])
    const navList = [{
        title: '整租',
        img: require('../../assets/images/1.png')
    }, {
        title: '合租',
        img: require('../../assets/images/2.png')
    }, {
        title: '地图找房',
        img: require('../../assets/images/3.png')
    }, {
        title: '去出租',
        img: require('../../assets/images/4.png')
    }]
    /**effect  effect部分**/
    useEffect(() => {
        getSwipers()
    }, [])

    /**methods 方法部分**/
    async function getSwipers() {
        await apiGetSwiper().then(res => {
            const {page: {list: data}} = res
            setSwipers(data)
        })
    }

    /**styles 样式部分**/

    /**render**/
    return (
        <div>
            {/*轮播图*/}
            <SwiperItems data={swipers} config={{autoplay: true, loop: true}}/>
            {/*Nav导航*/}
            <div className={styles.nav}>
                {
                navList.map((item, index) => {
                    return <div key={index}>
                        <Image src={item.img}/>
                        <p>{item.title}</p>
                    </div>
                })
            }
            </div>
        </div>
    );
};