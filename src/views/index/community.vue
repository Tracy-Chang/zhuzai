<!-- 选择小区 -->
<template>
    <flexbox class="community" wrap="wrap">
        <flexbox-item v-for="item in communityList" :key="item.code" :span="1/3">
            <mt-button type="default" @click="submit(item.code)">{{item.name}}</mt-button>
        </flexbox-item>
    </flexbox>
</template>

<script>
    import { Flexbox, FlexboxItem } from 'vux';
    import Vue from 'vue';
    import { getCommunityList, selectCommunity } from '../../api/api';
    import util from '../../util/util';

    export default {
        components: {
            Flexbox,
            FlexboxItem,
        },
        data() {
            return {
                communityList: []
            }
        },
        created() {
            getCommunityList()
            .then(res => {
                if (res.resultcode == 0) {
                    //util.setCookie('communityName', 'xxx', 10000);
                    this.communityList = res.resultdata;
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
            submit(code) {
                let param = {
                    code: code
                };
                selectCommunity(param)
                .then(res => {
                    if (res.resultcode == 0) {
                        //util.setCookie('communityName', 'xxx', 10000);
                        this.$router.push({path: '/index'});
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
            }
        }
    }
</script>

<style lang="less">
    .community {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        .vux-flexbox-item{
            margin: 10px 0 !important;
            text-align: center;
        }
        .vux-flexbox-item:first-child{
            margin: 0 !important;
        }
        .mint-button{
            width: 100px;
            font-size: 15px;
            min-height: 40px;
        }
    }
</style>












