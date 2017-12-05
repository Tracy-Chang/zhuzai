<!-- 去支付 -->
<template>
    <div class="order">
        <div class="place-order">支付</div>
    	<h3>个人信息</h3>
        <div class="base-info">姓名：{{orderData.userName}}</div>
        <div class="base-info">电话：{{orderData.phone}}</div>
        <div class="base-info">地址：{{orderData.sendAddress}}</div>
        <div class="base-info">总价：<span>{{orderData.totlePrice}}元</span></div>
        <div class="base-info">备注：{{orderData.remark}}</div>
        <div class="base-info">时间：{{orderData.time}}</div>
        <div class="base-info">送货方式：{{orderData.type}}</div>
        <div class="last-base-info base-info" v-if="orderData.marketAddress">取货地址：{{orderData.marketAddress}}</div>
        <h3>订单详情</h3>
        <ul>
            <li v-for="item in orderData.list" :key="item.code">
                <img :src="item.url" @click="toDetail(item.code)">
                <div class="info" @click="toDetail(item.code)">
                    <p>{{item.name}}</p>
                    <p>{{item.price}}元</p>
                </div>
            </li>
        </ul>
        <div class="bottom" @click="toPay">去支付</div>
    </div>
</template>

<script>
    import { pay } from '../../api/api';
    import { mapState, mapMutations } from 'vuex';
    //import wx from '../../util/jweixin-1.1.0'
    
    export default {
        data() {
            return {
                wxObj: {}
            }
        },
        computed: {
            ...mapState([
                'orderData'
            ]),
        },
        created() {

        },
        methods: {
            toPay() {
            	let para = {
            		code: this.orderData.orderCode
            	};
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
            	.catch(err => {
            		console.log(err);
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
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                
            })
        }
    }
</script>

<style lang="less">
    .order{
        .place-order{
        	height: 50px;
            line-height: 50px;
            text-align: center;
            font-size: 17px;
            background-color: #fff;
        }
        .base-info{
        	min-height: 30px;
        	margin: 0 20px;
        	line-height: 30px;
        	font-size: 13px;
			border-bottom: 1px solid #f0f0f0;/*no*/
			span{
				color: red;
			}
        }
        .last-base-info{
        	border: none;
        }
        h3{
        	padding: 10px 20px;
        	border-bottom: 1px solid #f0f0f0;/*no*/
        	border-top: 1px solid #f0f0f0;/*no*/
        }
        ul{
			margin-bottom: 110px;
	        li{
	            display: flex;
	            align-items: center;
	            min-height: 80px;
	            padding: 12px 6px;
	            border-bottom: 1px solid #e0e0e0;/*no*/
	            background-color: #fff;
	            img{
	                flex-grow: 0;
	                height: 90px;
	                margin: 0 10px 0 8px;
	                //border: 1px solid #d02;
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
        .bottom{
        	position: fixed;
        	width: 100%;
            bottom: 52px;
            height: 50px;
            line-height: 50px;
            text-align: center;
            background-color: #09BB07;
            color: #fff;
            font-size: 15px;
            padding: 0;
        }
    }
</style>



















