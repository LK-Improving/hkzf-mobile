import React, {useEffect, useState, Fragment} from 'react'
import {SwiperItems} from '../../componets/SwiperItems'
import {apiGetSwiper} from '../../utils/request/api';
import {Nav} from "./Nav";
import {Groups} from "./Groups";
import {News} from "./News";
import {Search} from "./Search";


export const Home = () => {

    /**state  state部分**/
    const [swipers, setSwipers] = useState<object[]>([])

    /**effect  effect部分**/
    useEffect(() => {
        getSwipers()
    }, [])

    /**methods 方法部分**/
    // 获取轮播图
    async function getSwipers() {
        await apiGetSwiper().then(res => {
            const {body: data}: any = res
            let swipeList: string[] = []
            data.forEach((item: any) => {
                const swipe: string = item['imgSrc']
                swipeList = [swipe, ...swipeList]
            })
            setSwipers(swipeList as never)
        })
    }

    /**styles 样式部分**/

    /**render**/
    return (
        // <Fragment>：不会渲染（用于代替根标签）
        <Fragment>
            {/*搜索栏*/}
            <Search/>
            {/*banner轮播图*/}
            <SwiperItems data={swipers} config={{autoplay: true, loop: true}}/>
            {/*Nav导航*/}
            <Nav/>
            {/*租房小组*/}
            <Groups/>
            {/*news最新资讯*/}
            <News/>
        </Fragment>
    );
};