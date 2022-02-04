import React from 'react'
import {Redirect, Route} from "react-router-dom";
import {layoutRouter} from "../../../router";

export const LayoutMain = () => {

    /**state  state部分**/
    const childrenRouter = (layoutRouter[0] as any).children

    /**effect  effect部分**/

    /**methods 方法部分**/

    /**styles 样式部分**/

    /**render**/

    return(
        <div style={{marginBottom:'50px'}}>
            {
                childrenRouter.map((item:any) => {
                    return <Route key={item['name']} path={item['path']}>
                        {item['component']}
                    </Route>
                })
            }
        </div>
    );
};