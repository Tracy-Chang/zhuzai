<template>
	<ul class="commodity-list"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="updateLoadMore"
        infinite-scroll-distance="50">
        <li v-for="item in commodityList" @click="toDetail(item.code)">
            <img :src="item.url">
            <div class="info">
                <p>{{item.name}}</p>
                <p>{{item.marketPrice}}元</p>
                <p>{{item.price}}元</p>
            </div>
        </li>
        <mt-spinner type="triple-bounce" v-if="!updateLoadMore">加载中</mt-spinner>
        <div class="no-more" v-else>没有更多商品了~</div>
    </ul>
</template>

<script>
    import { getCommodityList } from '../api/api';

    export default {
        name: 'commodity-list',
        props: ['classifyCode', 'keyword'],
        data() {
            return {
                commodityList: [],
                page: 1,
                loading: false,
                updateLoadMore: false
            }
        },
        created() {

        },
        methods: {
            loadList() {
                if (this.loading) {
                    return
                }
                let para = {
                    code: this.classifyCode,
                    keyword: this.keyword,
                    page: this.page
                };
                
                this.loading = true;
                getCommodityList(para)
                .then(res => {
                    if (res.resultcode == 0) {
                        this.commodityList = res.resultdata.list;
                        this.page = res.resultdata.pageNumber;
                        if (res.resultdata.lastPage) {
                            this.updateLoadMore = true;
                        }
                        this.loading = false;
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
                        this.loading = false;
                    }
                })
                .catch(err => {
                    console.log(err);
                    this.loading = false;
                });
            },
            loadMore() {
                if (this.loading) {
                    return
                }
                let para = {
                    code: this.classifyCode,
                    page: ++this.page,
                    keyword: this.keyword
                };

                this.loading = true;
                getCommodityList(para)
                .then(res => {
                    if (res.resultcode == 0) {
                        this.commodityList = this.commodityList.concat(res.resultdata.list);
                        this.page = res.resultdata.pageNumber;
                        if (res.resultdata.lastPage) {
                            this.updateLoadMore = true;
                        }
                        this.loading = false;
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
                        this.loading = false;
                    }
                })
                .catch(err => {
                    console.log(err);
                    this.loading = false;
                });
            },
            toDetail(code) {
                this.$router.push({path:'/detail/' + code, query: {code: code}});
            },
        },
        watch: {
        	classifyCode: function(a, b) {
                this.page = 1;
                this.updateLoadMore = false;
                this.loadList();
        	},
        	keyword: function(a, b) {
                this.page = 1;
                this.updateLoadMore = false;
        		this.loadList();
        	}
        },
        computed:{
        },
        mounted: function () {
            this.$nextTick(function () {
                this.loadList();
                
            })
        }
    }
</script>

<style lang="less">
	.commodity-list{
        margin-bottom: 53px;
        .mint-spinner-triple-bounce{
            height: 50px;
            line-height: 50px;
        }
        li{
            display: flex;
            align-items: center;
            min-height: 80px;
            padding: 12px 6px;
            border-bottom: 1px solid #e0e0e0;/*no*/
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
                    font-size: 13px;
                    color: #aaa;
                    margin: 8px 0 5px;
                    text-decoration: line-through;
                } 
                p:nth-child(3){
                    color: #0bad0b;
                    margin-top: 5px;
                    font-size: 14px;
                }
            }

        }
        .no-more{
            text-align: center;
            height: 40px;
            line-height: 40px;
        }
    }
</style>










