import axios from 'axios';

let base = 'http://www.earthcenter.com.cn/test';

//小区list
export const getCommunityList = params => { return axios.post(`${base}/community/query`, { params: params }).then(res => res.data); };

//选择小区
export const selectCommunity = params => { return axios.post(`${base}/community/choose`, { params: params }).then(res => res.data); };

//分类
export const getClassifyList = params => { return axios.post(`${base}/reservetype/query`, { params: params }).then(res => res.data); };

//商品list
export const getCommodityList = params => { return axios.post(`${base}/product/queryList`, { params: params }).then(res => res.data); };

//商品detail
export const getCommodityDetail = params => { return axios.post(`${base}/product/queryDetail`, { params: params }).then(res => res.data); };

//加入购物车
export const addShoppingCart = params => { return axios.post(`${base}/shopping/add`, { params: params }).then(res => res.data); };

//获取购物车信息
export const getShoppingCart = params => { return axios.post(`${base}/shopping/query`, { params: params }).then(res => res.data); };

//去下单
export const placeOrder = params => { return axios.post(`${base}/order/add`, { params: params }).then(res => res.data); };

//支付
export const pay = params => { return axios.post(`${base}/pay/payOrder`, { params: params }).then(res => res.data); };

//我的订单
export const getMyOrder = params => { return axios.post(`${base}/order/query`, { params: params }).then(res => res.data); };

//订单操作
export const handlerOrder = params => { return axios.post(`${base}/order/manage`, { params: params }).then(res => res.data); };


















