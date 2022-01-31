import {Swiper, Image} from 'antd-mobile';
import React, {useEffect, useState, Fragment} from 'react'
import styles from './index.module.less'

export const SwiperItems = (props: any) => {

    /**state  state部分**/
    const data: [] = props.data || []
    const {config} = props || {}
    /**effect  effect部分**/

    /**methods 方法部分**/

    /**styles 样式部分**/

    /**render**/

    return data.length === 0 ? null : (
        <Swiper {...config}>
            {
                data.map((item, index) => (
                    <Swiper.Item key={index}>
                        <div
                            className={styles.content}
                            onClick={() => {
                                alert(`你点击了卡片 ${index + 1}`)
                            }}
                        >
                            <Image lazy src={item['goodsImgurl']}/>
                        </div>
                    </Swiper.Item>
                ))
            }
        </Swiper>
    );
};