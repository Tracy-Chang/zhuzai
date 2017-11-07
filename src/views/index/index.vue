<!-- 首页 -->
<template>
    <div class="index">
        <!-- 搜索 -->
        <!-- <mt-search
            :value="keyword"
            @submit="search"
            
            cancel-text="取消"
            placeholder="搜索">
        </mt-search> -->
        <search
            v-model="searchkeyword"
            position="absolute"
            @on-blur="onSubmit"
            @on-submit="onSubmit"
            ref="search"></search>
        <!-- 分类 -->
        <div class="tab">
            <tab>
                <tab-item 
                    v-for="(item, index) in classifyList" :key="item.value"
                    :selected="classifySelected(index)"
                    @on-item-click="onItemClick(item.code)">{{item.name}}</tab-item>
            </tab>
        </div>
        <!-- 商品列表 -->
        <commodity-list :classifyCode="classifyCode" :keyword="keyword"></commodity-list>
    </div>
</template>
<!-- search功能 -->
<script>
    import { Tab, TabItem, Search } from 'vux';
    import commodityList from '../../components/commodityList.vue'; 
    import { getClassifyList } from '../../api/api.js';
     
    export default {
        components: {
            Tab,
            TabItem,
            Search,
            'commodity-list': commodityList
        },
        data() {
            return {
                keyword: '',
                classifyList: [],
                classifyCode: '',  
                searchkeyword: ''        
            }
        },
        computed: {
            
        },
        created() {
            //分类
            getClassifyList()
            .then(res => {
                if (res.resultcode == 0) {
                    this.classifyList = res.resultdata;
                    this.classifyCode = res.resultdata[0].code;
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
            classifySelected(index) {
                if (index == 0) {
                    return true
                }
                return false
            },
            onItemClick (code) {
                this.classifyCode = code;
            },
            onSubmit(a) {
                alert(a)
            }
        }
    }
</script>

<style lang="less">
    .index {
        .mint-search{
            height: 50px;
            .mint-searchbar{
                padding: 5px 7px;
                background-color: #f0f0f0;
            }
            .mint-cell{
                z-index: 2;
            }
        }
        .tab {
            overflow-x: auto;
            background-color: #fff;
            .vux-tab{
                min-width: 750px;
            }
            .vux-tab-item{
                // flex-shrink: 0;
                // flex-basis: 100px;
            }
        }
        .tab::-webkit-scrollbar {
            display: none;
        }
        .filter {
            text-align: center;
            background-color: #fff;
            border-right: 1px solid #fbf9fe;/*no*/
        }
        .weui-check__label{
            padding: 5px 0;
            border-bottom: 1px solid #f0f0f0;/*no*/
        }
        .weui-cell:before{
            border-top: none;
        }
        .loadmore{
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

        }
        .mint-spinner-triple-bounce{
            text-align: center;
        }
    }
</style>












