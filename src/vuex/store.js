import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import * as api from '../api/api';
import  { AlertPlugin } from 'vux';

Vue.use(Vuex);
Vue.use(AlertPlugin);


// 应用初始状态
const init_state = {
    cartNumber: 0,
    shoppingCartInfo: {
        shoppingCartList: []
    },
    orderData: {}
};
const state = JSON.parse(JSON.stringify(init_state));

const getters = {};

const mutations = {
	changeCartNumber(state, n) {
		if (state.cartNumber + n > 99) {
			state.cartNumber = '99+';
		} else {
      		state.cartNumber += n;
		}
    },
    clearCart(state) {
    	state.cartNumber = 0;
    	state.shoppingCartInfo.shoppingCartList = [];
    },
    addShoppingCartStore(state, obj) {
        if (state.shoppingCartInfo.shoppingCartList.every(item => item.code !== obj.code)) {
            state.shoppingCartInfo.shoppingCartList.push(obj);
        } else {
            state.shoppingCartInfo.shoppingCartList.forEach(item => {
                if (item.code == obj.code) { 
                    item.number = parseInt(item.number) + parseInt(obj.number);
                }
            });
        }
    },
    palceOrderData(state, obj) {
    	state.orderData = obj;
    }
};

const actions = {
	getShoppingCartInfo({ commit, state }) {
		api.getShoppingCart()
		.then(res => {
			if (res.resultcode == 0) {
				commit('changeCartNumber', res.resultdata.shoppingCartList.length);
				state.shoppingCartInfo = res.resultdata;
			} else {
				this.$vux.alert.show({
                    content: res.resultmsg,
                });
			}
		})
		.catch(err => {
			console.log(err)
		})
	},
};


const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
});

export default store;












