<!-- 去下单 -->
<template>
    <div class="shopping-cart">
        <div class="cart">购物车</div>
        <mt-field label="姓名:" placeholder="请输入用户名" v-model="shoppingCartInfo.userName" @input="checkUserName" :state="userNameState"></mt-field>
        <mt-field label="电话:" placeholder="请输入电话" v-model="shoppingCartInfo.phone" @input="checkPhone" :state="phoneState"></mt-field>
        <mt-field label="地址:" placeholder="请输入地址" v-model="shoppingCartInfo.address" @input="checkAddress" :state="addressState"></mt-field>
        <mt-field label="备注:" placeholder="请输入备注" v-model="remark"></mt-field>
        <div class="sendTime">送达时间：{{shoppingCartInfo.sendTime}}</div>
        <ul>
            <li v-for="item in test" :key="item.code">
                <img :src="item.url" @click="toDetail(item.code)">
                <div class="info" @click="toDetail(item.code)">
                    <p>{{item.name}}</p>
                    <p>剩余{{item.stock}}件</p>
                    <p>{{item.price}}元</p>
                </div>
                <x-number v-model="item.number" :min="0" :max="item.stock" width="30px" button-style="round" @on-change="changeNumber"></x-number>
            </li>
        </ul>
        <selector 
            class="send-type" 
            title="送货方式:" 
            :options="typeList" 
            v-model="typeValue"
            placeholder="请选择送货方式">    
        </selector>

        <div class="market-address" v-if="typeValue == 1">自提地址：{{shoppingCartInfo.marketAddress}}</div>
        <div class="sendPrice" v-if="typeValue == 2">运费：<span>{{sendPrice}}元</span></div>
        <div class="sendPrice" v-if="typeValue == 1">运费：<span>{{sendPrice}}元</span></div>

        <div class="bottom">
            <span>￥{{totalPrice}}元</span>
            <span @click="palceOrder">去下单</span>
        </div>
    </div>
</template>

<script>
    import { getCommodityDetail, placeOrder } from '../../api/api';
    import { XNumber, Selector } from 'vux';
    import { mapState, mapMutations } from 'vuex';

    export default {
        components: {
            XNumber,
            Selector
        },
        data() {
            return {
                userNameState: 'warning',
                phoneState: 'warning',
                addressState: 'warning',
                typeValue: '',
                remark: '',
                loading: false
            }
        },
        computed: {
            ...mapState([
                'shoppingCartInfo'
            ]),
            sendPrice() {
                if (this.typeValue == 2) {
                    return this.shoppingCartInfo.sendPrice;
                } else {
                    return 0;
                }
            },
            totalPrice() {
                let price = 0;
                if (this.shoppingCartInfo.shoppingCartList && this.shoppingCartInfo.shoppingCartList.length > 0) {
                    this.shoppingCartInfo.shoppingCartList.forEach(item => {
                        price = Math.round((price + item.price * item.number)*100)/100;
                    });
                    price = Math.round((price + this.sendPrice)*100)/100;
                }
                return price;
            },
            typeList() {
                if (!this.shoppingCartInfo.type) {
                    return []
                }
                if (this.shoppingCartInfo.type.length > 1) {
                    return [
                        {
                            key: '1',
                            value: '自提'
                        },{
                            key: '2',
                            value: '送货上门'
                        },
                    ]
                } else if (this.shoppingCartInfo.type[0] == '1') {
                    return [
                        {
                            key: '1',
                            value: '自提'
                        }
                    ]
                } else {
                    return [
                        {
                            key: '2',
                            value: '送货上门'
                        }
                    ]
                }
            },
            test() {
                return this.shoppingCartInfo.shoppingCartList
            }
        },
        created() {

        },
        methods: {
            ...mapMutations([
                'palceOrderData',
                'clearCart'
            ]),
            toDetail(code) {
                this.$router.push({path:'/detail/' + code, query: {code: code}});
            },
            checkUserName() {
                if (this.shoppingCartInfo.userName == '') {
                    this.userNameState = 'warning';
                } else {
                    this.userNameState = 'success';
                }
            },
            checkPhone() {
                if (this.shoppingCartInfo.phone == '') {
                    this.phoneState = 'warning';
                } else {
                    this.phoneState = 'success';
                }
            },
            checkAddress() {
                if (this.shoppingCartInfo.address == '') {
                    this.addressState = 'warning';
                } else {
                    this.addressState = 'success';
                }
            },
            palceOrder() {
                if (this.loading) {
                    return
                }
                //送货方式校验
                if (this.typeValue == '') {
                    this.$vux.alert.show({
                        content: '请选择送货方式',
                    });
                    return
                }
                //地址校验
                if (this.shoppingCartInfo.address == '') {
                    this.$vux.alert.show({
                        content: '请填写送货地址',
                    });
                    return
                }
                //姓名校验
                if (this.shoppingCartInfo.userName == '') {
                    this.$vux.alert.show({
                        content: '请填写收货人姓名',
                    });
                    return
                }
                //电话校验
                if (this.shoppingCartInfo.phone == '' || !/^1[1-9]\d{9}$/.test(this.shoppingCartInfo.phone)) {
                    this.$vux.alert.show({
                        content: '请填写正确的电话号码',
                    });
                    return
                }
                //商品校验
                if (this.shoppingCartInfo.shoppingCartList.every(item => item.number == 0)) {
                    this.$vux.alert.show({
                        content: '请选择要购买的商品',
                    });
                    return
                }

                let para = {
                    type: this.typeValue,
                    remark: this.remark,
                    address: this.shoppingCartInfo.address,
                    phone: this.shoppingCartInfo.phone,
                    userName: this.shoppingCartInfo.userName,
                };
                para.communityList = JSON.stringify(this.shoppingCartInfo.shoppingCartList);
                
                this.loading = true;
                placeOrder(para)
                .then(res => {
                    if (res.resultcode == 0) {
                        this.palceOrderData(res.resultdata);
                        this.clearCart();
                        this.$router.push({path: '/order'});
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
            changeNumber(code, v) {
                console.log(this)
                this
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                
            })
        }
    }
</script>

<style lang="less">
    .shopping-cart{
        padding-bottom: 110px;
        background-color: #f0f0f0;
        font-size: 14px;
        box-sizing: border-box;
        min-height: 100vh;
        .cart{
            height: 50px;
            line-height: 50px;
            text-align: center;
            font-size: 17px;
            margin-bottom: 10px;
            background-color: #fff;
            border-bottom: 1px solid #f0f0f0; /* no */
        }
        .mint-cell-title{
            width: 60px !important;
            text-align: center !important;
        }
        .mint-cell-wrapper{
            font-size: 14px;
        }
        .sendTime{
            background-color: #e49839;
            margin: 0 0 10px;
            padding: 5px 20px;
        }
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
                p:nth-child(3){
                    color: #0bad0b;
                    margin-top: 5px;
                    font-size: 14px;
                }
            }
        }
        .send-type,.sendPrice,.market-address{
            height: 50px;
            line-height: 50px;
            background-color: #fff;
            padding: 0 20px;
            border-bottom: 1px solid #f0f0f0;/*no*/
            span{
                float: right;
                color: red;
            }
        }
        .vux-selector.weui-cell_select-after{
            margin: 10px 0 0;
            padding: 0 20px;
            .weui-label{
                width: 70px;
            }
        }
        .bottom{
            position: fixed;
            bottom: 52px;
            width: 100%;
            height: 50px;
            font-size: 0;
            span{
                line-height: 50px;
                width: 50%;
                display: inline-block;
                color: red;
                font-size: 17px;
                background-color: #fff;
                padding-left: 20px;
                box-sizing: border-box;
                border-top: 1px solid #f0f0f0;/*no*/
            }
            span:nth-child(2){
                text-align: center;
                background-color: #09BB07;
                color: #fff;
                font-size: 15px;
                padding: 0;
            }
        }
        .weui-cell{
            padding: 0 0 0 5px;
        }
        .weui-cell:before{
            border: none !important; 
        }
    }
</style>



















