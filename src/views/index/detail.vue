<template>
    <div class="detail">
        <mt-swipe :auto="4000" :show-indicators="false">
            <mt-swipe-item v-for="(item, index) in communityDetail.img" :key="index">
                <img :src="item">
            </mt-swipe-item>
        </mt-swipe>
        <div class="name">{{communityDetail.name}}</div>
        <div class="description">
            <div>价格：<span class="unitPrice">￥{{communityDetail.unitPrice}}</span></div>
            <div>品牌：<span>{{communityDetail.brand}}</span></div>
            <div>规格：<span>{{communityDetail.size}}</span></div>
            <div>分类：<span>{{communityDetail.classify}}</span></div>
            <div>保质期：<span>{{communityDetail.expirationDate}}</span></div>
        </div>
        <div class="addShoppingCart" @click="popupVisible = true">加入购物车</div>
        <mt-popup v-model="popupVisible" position="bottom" class="mint-popup" :modal="false">
            <div class="popup-community-type">
                <mt-radio
                    title="品种"
                    v-model="communityCode"
                    :options="options" />
                </mt-radio>
                <x-number title="数量" v-model="communityNumber" :min="0" width="60px" button-style="round"></x-number>
                <div class="repertory">库存：<span>{{repertory}}件</span></div>
                <div class="totalPrice">价格：<span>{{totalPrice}}元</span></div>
                <mt-button @click="addShoppingCart" size="large">确定</mt-button>
            </div>
        </mt-popup>
    </div>
</template>

<script>
    import { getCommodityDetail, addShoppingCart } from '../../api/api';
    import { XNumber } from 'vux';
    import { mapState, mapMutations } from 'vuex';

    export default {
        components: {
            XNumber
        },
        data() {
            return {
                communityDetail: [],
                popupVisible: false,
                communityCode: '',
                options: [],
                communityNumber: 1,
                addShoppingCartLoading: false
            }
        },
        computed: {
            ...mapState([
                'shoppingCartInfo',
                'cartNumber'
            ]),
            repertory() {
                let repertory = 0;
                this.options.forEach(item => {
                    if (item.code == this.communityCode) {
                        repertory = item.number;
                    }
                });
                return repertory
            },
            totalPrice() {
                let price = 0;
                this.options.forEach(item => {
                    if (item.code == this.communityCode) {
                        price = item.price;
                    }
                });
                let totalPrice = Math.round((price * this.communityNumber) * 100) / 100;
                return totalPrice;
            }
        },
        created() {
        	let para = {
        		code: this.$route.query.code
        	};
            getCommodityDetail(para)
            .then(res => {
                if (res.resultcode == 0) {
                    this.communityDetail = res.resultdata;
                    this.communityDetail.sizeList.forEach((item) => {
                        item.value = item.code;
                        item.label = item.name;
                    });
                    this.options = this.communityDetail.sizeList;
                } else {
                    this.$vux.alert.show({
                        content: res.resultmsg,
                        onShow () {
                            console.log('Plugin: I\'m showing')
                        },
                        onHide () {
                            console.log('Plugin: I\'m hiding')
                        }
                    });
                }
            })
            .catch(err => {
                console.log(err);
            });
        },
        methods: {
            ...mapMutations([
                'changeCartNumber',
                'addShoppingCartStore',
            ]),
            addShoppingCart() {
                if (this.addShoppingCartLoading) {
                    return
                }
                let para = {
                    code: this.communityCode,
                    number: this.communityNumber
                };
                if (!this.communityCode) {
                    this.$vux.alert.show({
                        maskZIndex: 3000,
                        content: '请选择商品',
                        onShow () {
                            console.log('Plugin: I\'m showing')
                        },
                        onHide () {
                            console.log('Plugin: I\'m hiding')
                        }
                    });
                    return
                }
                if (this.communityNumber <= 0) {
                    this.$vux.alert.show({
                        maskZIndex: 3000,
                        content: '数量需要大于0',
                        onShow () {
                            console.log('Plugin: I\'m showing')
                        },
                        onHide () {
                            console.log('Plugin: I\'m hiding')
                        }
                    });
                    return
                }
                this.addShoppingCartLoading = true;
                addShoppingCart(para)
                .then(res => {
                    if (res.resultcode == 0) {
                        if (this.shoppingCartInfo.shoppingCartList.every(item => item.code !== para.code)) {
                            this.changeCartNumber(1);
                        }
                        this.addShoppingCartStore(res.resultdata);
                        this.$vux.alert.show({
                            maskZIndex: 3000,
                            content: '添加成功',
                        });
                        setTimeout(() => {
                            this.$vux.alert.hide()
                        }, 1000)
                        this.popupVisible = false;
                        this.addShoppingCartLoading = false;
                    } else {
                        this.$vux.alert.show({
                            maskZIndex: 3000,
                            content: '添加失败，请重试',
                            onShow () {
                                console.log('Plugin: I\'m showing')
                            },
                            onHide () {
                                console.log('Plugin: I\'m hiding')
                            }
                        });
                        setTimeout(() => {
                            this.$vux.alert.hide()
                        }, 1000)
                        this.addShoppingCartLoading = false;
                    }
                })
                .catch(err => {
                    console.log(err);
                    this.$vux.alert.show({
                        maskZIndex: 3000, 
                        content: '添加错误，请重试',
                        onShow () {
                            console.log('Plugin: I\'m showing')
                        },
                        onHide () {
                            console.log('Plugin: I\'m hiding')
                        }
                    });
                    setTimeout(() => {
                        this.$vux.alert.hide()
                    }, 1000)
                    this.addShoppingCartLoading = false;
                    this.popupVisible = false;
                })
            }
        }
    }
</script>

<style lang="less">
    .detail {
        background-color: #fff;
        .mint-swipe {
            height: 200px;
            color: #fff;
            font-size: 30px;
            text-align: center;
            margin-bottom: 20px;
        }
        .mint-swipe-item {
            line-height: 200px;
        }
        .name{
            margin: 10px 20px;
            text-align: center;
            font-size: 17px;
            line-height: 30px;
            min-height: 30px;
            font-weight: 500;
        }
        .description{
            margin: 10px 20px;
            div{
                font-size: 15px;
                width: 150px;
                min-height: 30px;
                line-height: 30px;
                .unitPrice{
                    font-size: 20px;
                    color: red;
                }
            }
        }
        .addShoppingCart{
            position: fixed;
            bottom: 52px;
            background-color: #09BB07;
            width: 100%;
            height: 50px;
            text-align: center;
            font-size: 18px;
            line-height: 50px;
            color: #fff;
        }
        .mint-popup {
            width: 100%;
            height: 100%;
            border-top: 1px solid #f0f0f0;/*no*/
            background-color: #fff;
            background-color: rgba(0, 0, 0, 0.4);
            .popup-community-type{
                position: absolute;
                bottom: 0;
                width: 100%;
                background-color: #fff;
            }
            .type{
                margin: 10px 20px;
                .type-title{
                    margin: 20px 0;
                }
                .type-item{
                    border: 1px solid #eee;/*no*/
                    margin: 20px 0;
                    min-width: 200px;
                }
            }
        }
        .mint-popup-bottom{
            bottom: 52px;
        }
        .mint-button{
            background-color: #09BB07;
            color: #fff;
        }
        .repertory,.totalPrice{
            height: 40px;
            padding: 0 20px;
            font-size: 15px;
            line-height: 40px;
            overflow: hidden;
            border-top: 1px solid #f0f0f0;/*no*/
            span{
                float: right;
                color: red;
            }
        }
        .mint-swipe-items-wrap{
            img{
                height: 180px;
                margin: 10px 0;
            }
        }
    }
</style>












