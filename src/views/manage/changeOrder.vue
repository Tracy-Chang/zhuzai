<!-- 首页 -->
<template>
    <div class="change-order">
        <!-- 搜索 -->
        <search
            v-model="searchkeyword"
            position="static"
            @on-submit="loadList"
            @on-cancel="cancelSearch"
            ref="search"></search>
        <mt-popup
	        v-model="popupShow">
	        <div class="modify-product">
	        	<div class="title">商品修改</div>
	        	<mt-cell :title="'上/下架状态:'">
						<label v-text="statusText" class="status-text"></label>
					<mt-switch @change="changeStatus">
					</mt-switch>
	        	</mt-cell>
		        <mt-field label="价格:" placeholder="请输入价格" v-model="form.price"></mt-field>
		        <mt-field label="库存:" placeholder="请输入库存" v-model="form.number"></mt-field>
		        <mt-button size="small" class="modify-button" @click="modifyProduct">确定</mt-button>
	        </div>
	    </mt-popup>

        <!-- 商品列表 -->
        <ul class="commodity-list"
	        v-infinite-scroll="loadMore"
	        infinite-scroll-disabled="updateLoadMore"
	        infinite-scroll-distance="50">
	        <li v-for="item in commodityList">
	            <img :src="item.url">
	            <div class="info">
	                <p>名称：{{item.name}}</p>
	                <p>进价：{{item.inPrice}}元</p>
	                <p>售价：{{item.price}}元</p>
	                <p>来源：{{item.source}}</p>
	                <p>种类：{{item.type}}</p>
	                <p>条形码：{{item.barcode}}</p>
	                <p>库存：{{item.number}}</p>
	                <p>状态：{{item.status}}</p>
	            </div>
	            <p>
	            	<mt-button size="small" type="danger" @click="showModify(item.code, item.status)">修改</mt-button>
	            </p>
	        </li>
	        <mt-spinner type="triple-bounce" v-if="!updateLoadMore">加载中</mt-spinner>
	        <div class="no-more" v-else>没有更多商品了~</div>
	    </ul>

    </div>
</template>
<!-- search功能 -->
<script>
    import { Search } from 'vux';
    import { getProductList, editProduct } from '../../api/api.js';
     
    export default {
        components: {
            Search,
        },
        data() {
            return {
            	form: {
            		code: '',
            		status: '',
            		number: '',
            		price: ''
            	},
                searchkeyword: '',
	            commodityList: [],
	            page: 1,
	            loading: false,
	            updateLoadMore: false,
	            popupShow: false
            }
        },
        computed: {
            statusText() {
            	if (this.form.status) {
            		return '上架';
            	} else {
            		return '下架';
            	}
            }
        },
        created() {
        	this.loadList();
        },
        methods: {
        	cancelSearch() {
        		this.searchkeyword = '';
        		this.loadList();
        	},
        	loadList() {
                if (this.loading) {
                    return
                }
                let para = {
                    keyword: this.searchkeyword,
                    page: this.page
                };
                
                this.loading = true;
                getProductList(para)
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
                if (this.loading || this.loading) {
                    return
                }
                let para = {
                    page: ++this.page,
                    keyword: this.searchkeyword
                };
                this.loading = true;
                getProductList(para)
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
                        });
                        this.loading = false;
                    }
                })
                .catch(err => {
                    console.log(err);
                    this.loading = false;
                });
            },
            modifyProduct() {
            	if (this.loading) {
                    return
                }
                let para = {
                    code: this.form.code,
                    status: this.form.status,
                    number: this.form.number,
                    price: this.form.price,
                };
                
                this.loading = true;
                editProduct(para)
                .then(res => {
                    if (res.resultcode == 0) {

		            	this.popupShow = false;
                        this.loading = false;
		            	this.form.code = '';
		            	this.form.status = '';
		            	this.form.number = '';
		            	this.form.price = '';
                    	this.loadList();
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
            showModify(code, status) {
            	if (status == "上架") {
            		this.form.status = 1;
            	} else {
            		this.form.status = 0;
            	}
            	this.form.code = code;
            	this.popupShow = true;
            },
            changeStatus(status) {
            	if (this.form.status) {
            		this.form.status = 0;
            	} else {
            		this.form.status = 1;
            	}
            }
        }
    }
</script>

<style lang="less">
    .change-order {
    	.commodity-list{
    		.info{
    			p:nth-child(n){
    				color: #333;
    				text-decoration: blink;
                    font-size: 14px;
    			}
    		}
    	}
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
				
            }

        }
        .mint-spinner-triple-bounce{
            text-align: center;
        }
        .vux-search-fixed,.vux-search-box{
        	position: static !important;
        }
        .mint-button--small{
        	display: block;
        	margin: 0 10px 0 0;
        }
        .mint-popup{

        	width: 80%;
        }
        .modify-product{
        	padding: 20px;
        	.mint-cell-title{
        		width: 50px;
        	}
        	.status-text{
        		margin-right: 10px;
        	}
        }
        .modify-button{
        	margin: 20px auto 0;
        }
        .title{
        	font-size: 18px;
        	text-align: center;
        }
    }
</style>












