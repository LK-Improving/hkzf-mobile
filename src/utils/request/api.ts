import {get, post} from './http'

// 首页轮播图
export const apiGetSwiper = () => get('/home/swiper',{})

// 租房小组
export const apiGetGroups = (data:unknown) => get('/home/groups', data)

// 资讯
export const apiGetNews = (data:unknown) => get('/home/news', data)

// 根据城市名称查询该城市信息
export const apiAreaInfo = (data:unknown) => get('/area/info', data)

// 获取城市列表数据
export const apiAreaCity = (data:unknown) => get('/area/city', data)

// 获取热门城市
export const apiAreaHot = () => get('/area/hot', {})

// 获取房源信息
export const apiAreaMap = (data:unknown) => get('/area/map', data)

// 根据条件查询房屋
export const apiGetHouses = (data:unknown) => get('/houses', data)