import React, { useEffect, useState } from 'react'
import {NavBar} from "antd-mobile";
import {useHistory} from "react-router-dom";
import PropTypes from 'prop-types'

export const LayoutTop = ({children}:any) => {

    /**state  state部分**/
    const history = useHistory()
    // 使用PropTypes限制props类型（也可使用TS）
    // @ts-ignore
    LayoutTop.propTypes = {
        children: PropTypes.string.isRequired
    }
    /**effect  effect部分**/

    /**methods 方法部分**/
    const back = () => {
        // 返回上一个路由
        history.goBack()
    }
    /**styles 样式部分**/

    /**render**/

    return(
        <NavBar back={'返回'} onBack={back}>{children}</NavBar>
    );
};