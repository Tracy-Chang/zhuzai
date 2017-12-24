<!-- 首页 -->
<template>
    <div class="magager-order-detail">
        <div class="title">订单详情</div>
        <div class="form-detail">
        	<dl>
				<dt>订单内容</dt>
					<dd v-for="item in dataDetail.list">
						<img :src="item.url">
						<div>
							<p>名称：{{item.name}}</p>
							<p class="price">价格：{{item.price}}元</p>
							<p>种类：{{item.type}}</p>
							<p>商品来源：{{item.source}}</p>
						</div>
						<div>x{{item.number}}</div>
					</dd>
				<dd>
					<p>价格：{{dataDetail.totalPrice}}元</p>
					<p>姓名：{{dataDetail.name}}</p>
					<p>电话：{{dataDetail.phone}}</p>
					<p>地址：{{dataDetail.address}}</p>
					<p>取货方式：{{dataDetail.type}}</p>
					<p>备注：{{dataDetail.remark}}</p>
					<p>时间：{{dataDetail.time}}</p>
				</dd>
			</dl>
        </div>
    </div>
</template>
<!-- search功能 -->
<script>
    import { queryOrderDetail } from '../../api/api.js';
     
    export default {
        components: {
            
        },
        data() {
            return {
            	dataDetail: {},
            }
        },
        computed: {
        },
        created() {
        	//this.loadDetail();
        },
        methods: {
        	loadDetail() {
                let para = {
                    code: this.$route.query.code,
                };
                queryOrderDetail(para)
                .then(res => {
                    if (res.resultcode == 0) {
                        this.dataDetail = res.resultdata;
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
        },
        mounted: function() {
        	this.loadDetail();
        }
    }
</script>

<style lang="less">
    .magager-order-detail{
        .title{
            font-size: 15px;
            height: 40px;
            text-align: center;
            vertical-align: middle;
            line-height: 40px;
            background-color: #ef4f4f;
            margin-bottom: 10px;
            color: #fff;
            position: relative;
        }
        .form-detail{
			width: 100%;
			background-color: #f0f0f0;
			font-size: 15px;
			.title{
				width: 100%;
				background-color: #fff;
				height: 40px;
				margin-bottom: 10px;
				text-align: center;
				line-height: 40px;
				overflow: hidden;
				position: fixed;
				top: 0;
				i{
					width: 10px;
					height: 10px;
					border-top: 1px solid #333;
					border-left: 1px solid #333;
					display: inline-block;
					transform: rotateZ(-45deg);
					float: left;
					margin: 15px 15px;
				}
			}
			dl{
				background-color: #fff;
				overflow: hidden;
				dt{
					margin: 10px 20px;
				}
				dd{
					display: flex;
					align-items: center;
					border: 1px solid #ccc;
					margin: 5px 20px;
					img:nth-child(1){
						width: 100px;
						height: 100px;
						margin: 5px 10px;
						flex-grow: 0;
						flex-shrink: 0;
					}
					div:nth-child(2){
						flex-grow: 1;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						p{
							margin: 5px 0;
							white-space: normal;
						}
					}
					div:nth-child(3){
						font-size: 25px;
						width: 50px;
						text-align: center;
						color: #db2234;
						flex-grow: 0;
						flex-shrink: 0;
					}
				}
				dd:last-child{
					border: none;
					margin: 10px 20px;
					display: block;
					p{
						margin: 5px 0;
						font-size: 15px;
					}
				}
			}
		}
    	
    }
</style>












