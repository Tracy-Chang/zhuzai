<!-- search功能 -->
<template>
    <div class="classify-commondity-list">
        <div class="title">关键字"<span>{{classifyCode}}</span>"搜索结果</div>
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
        },
        methods: {
            
        }
    }
</script>

<style lang="less">
    .classify-commondity-list {
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












