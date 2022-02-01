import React, {useEffect, useState} from 'react'
import {Button, Grid, Image} from "antd-mobile";
import {SwiperItems} from '../../componets/SwiperItems'
import {apiGetSwiper} from '../../utils/request/api';
import styles from './index.module.less'

// import styles from './index.module.less'

export const Home = () => {

    /**state  state部分**/
    const [swipers, setSwipers] = useState([])
    const navList = [{
        title: '整租',
        img: require('../../assets/images/nav/1.png')
    }, {
        title: '合租',
        img: require('../../assets/images/nav/2.png')
    }, {
        title: '地图找房',
        img: require('../../assets/images/nav/3.png')
    }, {
        title: '去出租',
        img: require('../../assets/images/nav/4.png')
    }]
    const groups = [{
        title: '家住回龙观',
        desc:'归属的感觉',
        img: require('../../assets/images/group/1.png')
    }, {
        title: '宜居四五环',
        desc:'大都市的生活',
        img: require('../../assets/images/group/2.png')
    }, {
        title: '喧嚣三里屯',
        desc:'繁华的背后',
        img: require('../../assets/images/group/3.png')
    }, {
        title: '比邻十号线',
        desc:'地铁心连心',
        img: require('../../assets/images/group/4.png')
    }]
    const newsList = [{
        title: '置业选择 | 安贞西里 三室一厅 河间的古雅别院',
        source:'新华网',
        date:'两天前',
        img: require('../../assets/images/news/1.png')
    },{
        title: '置业佳选 | 大理王宫 苍山洱海间的古雅别院',
        source:'新华网',
        date:'一周前',
        img: require('../../assets/images/news/2.png')
    },{
        title: '置业选择 | 安居小屋 花园洋房 清新别野',
        source:'新华网',
        date:'两周前',
        img: require('../../assets/images/news/3.png')
    }]
    /**effect  effect部分**/
    useEffect(() => {
        getSwipers()
    }, [])

    /**methods 方法部分**/
    // 获取轮播图
    async function getSwipers() {
        await apiGetSwiper().then(res => {
            const {page: {list: data}} = res
            let swipeList: string[] = []
            data.map((item: any) => {
                const swipe: string = item['goodsImgurl']
                swipeList = [swipe, ...swipeList]
            })
            setSwipers(swipeList as never)
        })
    }

    /**styles 样式部分**/

    /**render**/
    return (
        <div>
            {/*banner轮播图*/}
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
            {/*租房小组*/}
            <div className={styles.group}>
                <div className={styles.groupTop}>
                    <h3>租房小组</h3>
                    <p>更多</p>
                </div>
                <Grid columns={2} gap={8}>
                    {
                        groups.map((item,index)=>{
                            return <Grid.Item key={index}>
                                <div className={styles.groupGrid}>
                                    <div>
                                        <h3>{item.title}</h3>
                                        <p>{item.desc}</p>
                                    </div>
                                    <Image src={item.img}/>
                                </div>
                            </Grid.Item>
                        })
                    }
                </Grid>
            </div>
            {/*news最新资讯*/}
            <div className={styles.news}>
                <h3>最新资讯</h3>
                {
                    newsList.map((item,index)=>{
                        return <div key={index} className={styles.newsItem}>
                            <Image src={item.img}/>
                            <div className={styles.newsItemRight}>
                                <h3>{item.title}</h3>
                                <div className={styles.rightBottom}>
                                    <p>{item.source}</p>
                                    <p>{item.date}</p>
                                </div>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    );
};