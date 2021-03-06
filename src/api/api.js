import axios from 'axios';
import qs from 'qs';
import util from '../util/util';
axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

var base = '';

if (util.getQueryByName('type') == 1) {
	base += '/zhuzai';
} else if (util.getQueryByName('type') == 2) {
	base += '/zhuzai2';
}

//var base = 'http://www.earthcenter.com.cn/test';
//var base = '';

//小区list
export const getCommunityList = params => { return axios.post(`${base}/community/query`, qs.stringify(params)).then(res => res.data); };

//选择小区
export const selectCommunity = params => { return axios.post(`${base}/community/choose`, qs.stringify(params)).then(res => res.data); };

//分类
export const getClassifyList = params => { return axios.post(`${base}/reservetype/query`, qs.stringify(params)).then(res => res.data); };

//商品list
export const getCommodityList = params => { return axios.post(`${base}/product/queryList`, qs.stringify(params)).then(res => res.data); };

//商品detail
export const getCommodityDetail = params => { return axios.post(`${base}/product/queryDetail`, qs.stringify(params)).then(res => res.data); };

//加入购物车
export const addShoppingCart = params => { return axios.post(`${base}/shopping/add`, qs.stringify(params)).then(res => res.data); };

//获取购物车信息
export const getShoppingCart = params => { return axios.post(`${base}/shopping/query`, qs.stringify(params)).then(res => res.data); };

//去下单
export const placeOrder = params => { return axios.post(`${base}/order/add`, qs.stringify(params)).then(res => res.data); };

//支付
export const pay = params => { return axios.post(`${base}/pay/payOrder`, qs.stringify(params)).then(res => res.data); };

//我的订单
export const getMyOrder = params => { return axios.post(`${base}/order/query`, qs.stringify(params)).then(res => res.data); };

//订单操作
export const handlerOrder = params => { return axios.post(`${base}/order/manage`, qs.stringify(params)).then(res => res.data); };


//管理
//商品列表
export const getProductList = params => { return axios.post(`${base}/agent/queryProduct`, qs.stringify(params)).then(res => res.data); };
//修改商品
export const editProduct = params => { return axios.post(`${base}/agent/editProduct`, qs.stringify(params)).then(res => res.data); };
//订单列表
export const queryOrder = params => { return axios.post(`${base}/agent/queryOrder`, qs.stringify(params)).then(res => res.data); };
//操作订单列表
export const manageOrder = params => { return axios.post(`${base}/agent/manageOrder`, qs.stringify(params)).then(res => res.data); };
//历史订单列表
export const queryHistoryOrder = params => { return axios.post(`${base}/agent/queryHisOrder`, qs.stringify(params)).then(res => res.data); };
//订单详情
export const queryOrderDetail = params => { return axios.post(`${base}/agent/queryOrderDetail`, qs.stringify(params)).then(res => res.data); };


















