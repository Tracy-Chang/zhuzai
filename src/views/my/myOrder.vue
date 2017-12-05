<template>
    <div class="my-order">
    	<div class="title">我的订单</div>
    	<div v-for="item in resultData" :key="item.orderCode">
    		<div class="base-info">时间：{{item.time}}</div>
    		<div class="base-info">总价：<span>{{item.totlePrice}}元</span></div>
    		<div class="base-info">备注：{{item.remark}}</div>
    		<div class="base-info">配送方式：{{item.type}}</div>
    		<div class="base-info" v-if="!!item.sendAddress">送货地址：{{item.sendAddress}}</div>
    		<div class="base-info" v-if="!!item.marketAddress">取货地址：{{item.marketAddress}}</div>
	        <ul>
				<li v-for="(list, index) in item.list" :key="index">
					<img :src="list.url">
	                <div class="info">
	                    <p>名称：{{list.name}}</p>
	                    <p>价格：{{list.price}}元</p>
	                    <p>数量：{{list.number}}</p>
	                </div>
				</li>
	        </ul>
	        <div class="handler">
	        	<button v-if="item.payStatus==1" @click="payOrder(item.orderCode)">去支付</button>
	        	<button v-else-if="item.payStatus==2" class="cantDo">已支付</button>
	        	<button v-else-if="item.payStatus==3" class="cantDo">已到货</button>
	        	<button v-else-if="item.payStatus==4" @click="affirmOrder(item.orderCode)">确认送达</button>
	        	<button v-else-if="item.payStatus==5" class="cantDo">完成</button>
	        	<button v-if="item.payStatus==1" @click="deleteOrder(item.orderCode)">删除</button>
	        </div>
    	</div>
    </div>
</template>

<script>
    import { getMyOrder, handlerOrder, pay } from '../../api/api';
	import { Cell } from 'vux';

	export default {
	    components: {
	        Cell
	    },
	    data() {
	        return {
	            resultData: [],
	            wxObj: {}
	        }
	    },
	    created() {
	        let para = {
	        	type: 1
	        }
	        getMyOrder(para)
	        .then(res => {
	        	if (res.resultcode == 0) {
                    this.resultData = res.resultdata;
                } else {
                    this.$vux.alert.show({
                        content: res.resultmsg,
                    });
                }
	        })
	        .catch(err => {
	        	console.log(err);
	        });
	    },
	    methods: {
	    	deleteOrder(code) {
	    		let para = {
	    			code: code,
	    			type: "3"
	    		}
	    		handlerOrder(para)
	    		.then(res => {
            		if (res.resultcode == 0) {
            			this.resultData = this.resultData.filter(item => {
            				return item.orderCode !== code;
            			});
            			this.$vux.alert.show({
                            content: '删除成功',
                        });
                    } else {
                        this.$vux.alert.show({
                            content: res.resultmsg,
                        });
                    }
            	})
            	.catch(err => {
            		console.log(err);
            	})
	    	},
	    	payOrder(code) {
	    		let para = {
	    			code: code
	    		}
	    		pay(para)
            	.then(res => {
            		if (res.resultcode == 0) {
                        this.wxObj = res.resultdata;
						if (typeof WeixinJSBridge == "undefined"){
						    if( document.addEventListener ){
						        document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady, false);
						    } else if (document.attachEvent){
						        document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady); 
						        document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady);
						    }
						}else{
						    this.onBridgeReady(this.wxObj);
						}

                    } else {
                        this.$vux.alert.show({
                            content: res.resultmsg,
                        });
                    }
            	})
	    	},
            onBridgeReady() {
            	WeixinJSBridge.invoke(
			        'getBrandWCPayRequest', this.wxObj,
			       	function(res){     
						if(res.err_msg == "get_brand_wcpay_request:ok" ) {
							this.$vux.alert.show({
	                            content: '支付成功',
	                        });
							this.$router.push({path: '/my'});
						} else if(res.err_msg == "get_brand_wcpay_request:cancel" ) {
							this.$vux.alert.show({
	                            content: '取消',
	                        });
						} else if(res.err_msg == "get_brand_wcpay_request:fail" ) {
							this.$vux.alert.show({
	                            content: '支付失败，请去我的订单重试',
	                        });
						}   
			       	}
			   	); 
            },
	    	affirmOrder(code) {
	    		let para = {
	    			code: code,
	    			type: "2"
	    		}
	    		handlerOrder(para)
	    		.then(res => {
            		if (res.resultcode == 0) {
		    			this.resultData.forEach(item => {
		    				if (item.orderCode == code) {
		    					item.payStatus = 5;
		    				}
	        			});
            			this.$vux.alert.show({
                            content: '确认收货',
                        });
                    } else {
                        this.$vux.alert.show({
                            content: res.resultmsg,
                        });
                    }
            	})
            	.catch(err => {
            		console.log(err);
            	})
	    	}
	    }
	}
</script>

<style lang="less">
    .my-order{
		margin-bottom: 60px;
		background-color: #f0f0f0;
        .title{
			height: 50px;
            line-height: 50px;
            text-align: center;
            font-size: 17px;
            background-color: #fff;
            border-bottom: 1px solid #f0f0f0;/*no*/
			background-color: #fff;
        }
        .base-info{
        	min-height: 30px;
        	padding: 0 20px;
        	line-height: 30px;
        	font-size: 13px;
			border-bottom: 1px solid #f0f0f0;/*no*/
			background-color: #fff;
			span{
				color: red;
			}
        }
        .base-info:first-child{
        	margin-top: 10px;
        }
        .handler{
        	min-height: 45px;
			background-color: #fff;
        	padding: 0 20px;
        	line-height: 45px;
        	font-size: 13px;
			border-bottom: 1px solid #f0f0f0;/*no*/
			overflow-x: hidden;
			vertical-align: middle;
			button{
				float: right;
				padding: 5px 10px;
				display: inline-block;
				background-color: green;
				border: none;
				margin: 10px 0 10px 20px;
				color: #fff;
			}
			.cantDo{
				background-color: #ccc;
			}
        }
        ul{
			background-color: #fff;
	        li{
	            display: flex;
	            align-items: center;
	            min-height: 80px;
	            margin: 0 20px;
	            padding: 12px 0;
	            border-bottom: 1px solid #e0e0e0;/*no*/
	            background-color: #fff;
	            img{
	                flex-grow: 0;
	                height: 90px;
	                margin: 0 10px 0 8px;
	            }
	            .info{
	                flex: 1;
	                font-size: 15px;
	                p:nth-child(2){
	                    color: #0bad0b;
	                    margin-top: 5px;
	                    font-size: 14px;
	                }
	            }
	        }
        }
    }
</style>




















