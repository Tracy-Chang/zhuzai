<!-- search功能 -->
<template>
    <div class="search-list">
        <!-- 商品列表 -->
        <commodity-list :classifyCode="classifyCode" :keyword="keyword"></commodity-list>
    </div>
</template>

<script>
    import commodityList from '../../components/commodityList.vue';
     
    export default {
        components: {
            'commodity-list': commodityList
        },
        data() {
            return {
                keyword: '',
                classifyCode: '',                
            }
        },
        computed: {

        },
        created() {
            this.classifyCode = this.$route.query.code;
            this.keyword = this.$route.query.keyword;
        },
        methods: {
            
        }
    }
</script>

<style lang="less">
    .search-list {
        background-color: #fff;
        .title{
            border-bottom: 1px solid #ddd;/*no*/
            text-align: center;
            height: 40px;
            line-height: 40px;
            font-size: 15px;
            span{
                color: red
            }
        }
    }
</style>












