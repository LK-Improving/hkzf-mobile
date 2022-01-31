import {get, post} from './http'

// 获取商品分裂
export const apiGetSwiper = () => post('/tbmodule/goods/list')

// 切换商品分类
export const apiChangeOption = (goodsName) => post('/tbmodule/goods/listlike', goodsName)

