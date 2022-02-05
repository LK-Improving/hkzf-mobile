import {get, post} from './http'

// 首页轮播图
export const apiGetSwiper = () => get('/home/swiper')

// 租房小组
export const apiGetGroups = (area) => get('/home/groups', area)

// 资讯
export const apiGetNews = (area) => get('/home/news', area)

// 根据城市名称查询该城市信息
export const apiAreaInfo = (cityName) => get('/area/info', cityName)
