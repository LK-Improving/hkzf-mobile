import React, {useEffect, useState, Fragment, MouseEventHandler} from 'react'
import { Grid, Image } from "antd-mobile";
import {SwiperItems} from '../../componets/SwiperItems'
import {apiGetGroups, apiGetNews, apiGetSwiper} from '../../utils/request/api';
import styles from './index.module.less'
import {baseUrl} from "../../utils/request/http";
import { useHistory } from 'react-router-dom';


export const Home = () => {

    /**state  state部分**/
    const [swipers, setSwipers] = useState<object[]>([])
    const [groups, setGroups] = useState<object[]>([])
    const [newsList, setNews] = useState<object[]>([])
    const history = useHistory()
    const navList:object[] = [{
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
    /**effect  effect部分**/
    useEffect(() => {
        getSwipers()
        getGroups()
        getNews()
    }, [])

    /**methods 方法部分**/
    // 获取轮播图
    async function getSwipers() {
        await apiGetSwiper().then(res => {
            const {body:data} = res
            let swipeList: string[] = []
            data.map((item: any) => {
                const swipe: string = item['imgSrc']
                swipeList = [swipe, ...swipeList]
            })
            setSwipers(swipeList as never)
        })
    }
    // 获取租户小组
    async function getGroups() {
        await apiGetGroups({area: 'AREA|88cff55c-aaa4-e2e0'}).then(res => {
            const {body:data} = res
            setGroups(data)
        })
    }
    // 获取资讯
    async function getNews() {
        await apiGetNews({area: 'AREA|88cff55c-aaa4-e2e0'}).then(res => {
            const {body:data} = res
            setNews(data)
        })
    }
    // 路由跳转
    function go(path:string) {
        history.push(path)
    }

    /**styles 样式部分**/

    /**render**/
    return (
        // <Fragment>：不会渲染（用于代替根标签）
        <Fragment>
            {/*搜索栏*/}
            <div className={styles.search}>
                <div className={styles.searchLeft} onClick={()=>go('/city-list')}>
                    <div className={styles.location}>
                        <span>上海<i className='iconfont icon-xiala'/></span>
                    </div>
                    <div className={styles.form}>
                        <span><i className='iconfont icon-sousuo'/>请输入小区或地址</span>
                    </div>
                </div>
                <div className={styles.searchRight} onClick={()=>go('/map')}>
                    <i className={'iconfont icon-ditu ' + styles.icon}/>
                </div>
            </div>
            {/*banner轮播图*/}
            <SwiperItems data={swipers} config={{autoplay: true, loop: true}}/>
            {/*Nav导航*/}
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
            {/*租房小组*/}
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
            {/*news最新资讯*/}
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
        </Fragment>
    );
};