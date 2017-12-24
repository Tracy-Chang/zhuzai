<!-- 首页 -->
<template>
    <div class="magager-history-order">
        <div class="title">历史订单</div>
        <!-- 商品列表 -->
        <ul class="commodity-list">
            <li v-for="item in commodityList" @click="$router.push({path:'/managerOrderDetail/' + item.orderCode, query: {code: item.orderCode}})">
                <img :src="item.url">
                <div class="info">
                    <p>订单号：{{item.orderCode}}</p>
                    <p>描述：{{item.desc}}</p>
                    <p>价格：{{item.totalPrice}}元</p>
                    <p>时间：{{item.time}}</p>
                </div>
                <p>
                    <mt-button size="small" type="default" v-if="item.orderStatus==4">已送达</mt-button>
                    <mt-button size="small" type="default" v-if="item.orderStatus==5">已完成</mt-button>
                    <mt-button size="small" type="default" v-if="item.orderStatus==6">已评价</mt-button>
                </p>
            </li>
            <div class="no-more">没有更多订单了~</div>
        </ul>

    </div>
</template>
<!-- search功能 -->
<script>
    import { queryHistoryOrder } from '../../api/api.js';
     
    export default {
        components: {
            
        },
        data() {
            return {
                form: {
                    code: '',
                    status: '',
                    number: '',
                    price: ''
                },
                commodityList: [],
                loading: false,
            }
        },
        computed: {
        },
        created() {
            this.loadList();
        },
        methods: {
            loadList() {
                if (this.loading) {
                    return
                }
                
                this.loading = true;
                queryHistoryOrder()
                .then(res => {
                    if (res.resultcode == 0) {
                        this.commodityList = res.resultdata;
                        this.loading = false;
                    } else {
                        this.$vux.alert.show({
                            content: res.resultmsg,
                        });
                        this.loading = false;
                    }
                })
                .catch(err => {
                    console.log(err);
                    this.loading = false;
                });
            },
        }
    }
</script>

<style lang="less">
    .magager-history-order{
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
        .commodity-list{
            margin-bottom: 10px;
            .info{
                p:nth-child(n){
                    color: #333;
                    text-decoration: blink;
                    font-size: 14px;
                }
            }
        }
        .mint-button--small{
            display: block;
            margin: 10px 0;
            min-width: 66px;
        }
        .no-more{
            font-size: 15px;
            height: 40px;
            text-align: center;
            line-height: 40px;
            background-color: #fff;
            color: #333;
        }
    }
</style>












