// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
//vuex
import Vuex from 'vuex';
import store from './vuex/store';
//router
import VueRouter from 'vue-router';
import routes from './router/routes';
//库
import 'font-awesome/css/font-awesome.min.css';
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';
import flexible from 'lib-flexible';
import FastClick from 'fastclick';
import util from './util/util';
//入口文件
import App from './App';
//mock-data
//import Mock from './api/mock/index.js';
//util.setCookie('zhuzaiCommunityName', 'xxx', 10000);


import  { AlertPlugin } from 'vux';
Vue.use(AlertPlugin);


Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(Mint);
Vue.use(flexible);

const router = new VueRouter({
  	routes
});

router.beforeEach((to, from, next) => {
	//util.setCookie('zhuzaiCommunityName', 'xxx', 10000);
	let community = util.getCookie('zhuzaiCommunityName');
	if (to.path == '/') {
		next({
			path: '/index'
		})
    } else {
    	if (!community && to.path !== '/community') {
			next({
				path: '/community'
			})
		} else {
    		next()
		}
    }
});

FastClick.attach(document.body);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app-box');














