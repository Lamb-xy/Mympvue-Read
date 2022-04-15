// 从后台获取数据的api
import { get ,post} from '../utils/request'
const API_URL = 'http://127.0.0.1:4000'
const APP_ID = 'wx1cafdbfcb6602d6a'
const APP_SECRET = '9580398e4b20643fb7ef6b3fd00bcd9d'

export function getHomeData (params) {
    return get(`${API_URL}/book/home/v2`, params)
}
export function recommend () {
    return get(`${API_URL}/book/home/recommend/v2`)
}
export function freeRead () {
    return get(`${API_URL}/book/home/freeRead/v2`)
}
export function hotBook () {
    return get(`${API_URL}/book/home/hotBook/v2`)
}
// 需要传入三个参数：
// appId：	微信小程序的appId
// code：微信登录wx.login后获得的code
// secret：小程序的secret key
export function getOpenId (code) {
    return get(`${API_URL}/openId/get`, {
        appId: APP_ID,
        code: code,
        secret: APP_SECRET
    })
}
export function search (params) {
    return get(`${API_URL}/book/search`, params)
}
export function hotSearch () {
    return get(`${API_URL}/book/hot-search`)
}
export function bookDetail (params) {
    return get(`${API_URL}/book/detail`, params)
}
export function bookRankSave (params) {
    return get(`${API_URL}/book/rank/save`, params)
}
export function bookContents (params) {
    return get(`${API_URL}/book/contents`, params)
}
export function bookIsInShelf (params) {
    return get(`${API_URL}/book/shelf/get`, params)
}
export function bookShelfSave (params) {
    return get(`${API_URL}/book/shelf/save`, {
        shelf: JSON.stringify(params)
    })
}

export function bookShelfRemove (params) {
    return get(`${API_URL}/book/shelf/remove`, {
        shelf: JSON.stringify(params)
    })
}
export function searchList (params) {
    return get(`${API_URL}/book/search-list`, params
    )
}
export function categoryList () {
    return get(`${API_URL}/book/category/list/v2`)
}
export function readDay (params) {
    return get(`${API_URL}/user/day`,params)
}
export function register(openId, user) {
  return post(`${API_URL}/user/register`, { openId, ...user, platform: mpvuePlatform })
}

export function hasSignToday(openId) {
  return get(`${API_URL}/user/hasSignToday`, { openId })
}

export function sign(openId) {
  return get(`${API_URL}/user/sign`, { openId })
}