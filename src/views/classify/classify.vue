<template>
    <flexbox class="classify">
        <flexbox-item :span="3" class="filter">
            <div v-for="item in firstClassify" 
                @click="handleFirstClassify(item.code)"
                :class="isActive(item.code)"
                :key="item.code" class="firstClassify">{{item.name}}</div>
        </flexbox-item>
        <flexbox-item class="classifyLeft">
            <div class="recommendClassify">推荐分类</div>
            <div v-for="item in secondClassify" :key="item.code" 
                @click="handleSecondClassify(item.code)"
                class="secondClassify">
                <img :src="item.url">
                <div>{{item.name}}</div>
            </div>
        </flexbox-item>
    </flexbox>
</template>
<!-- 选中状态 -->
<script>
import { Flexbox, FlexboxItem } from 'vux';
import { getClassifyList, getCommodityList } from '../../api/api.js';

export default {
    components: {
        Flexbox,
        FlexboxItem
    },
    data() {
        return {
            firstClassify: [],
            secondClassify: [],
            selectCode: ''
        }
    },
    computed: {
    },
    created() {
        //分类
        getClassifyList()
        .then(res => {
            if (res.resultcode == 0) {
                this.firstClassify = res.resultdata;
                this.secondClassify = res.resultdata[0].detail;
                this.selectCode = res.resultdata[0].code;
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
    methods: {
        isActive(code) {
            console.log(code)
            if (code == this.selectCode) {
                return {
                    active: true
                }
            }
        },
        handleFirstClassify(code) {
            let childArr = [];
            childArr = this.firstClassify.filter((item) => {
                return item.code == code;
            });
            this.selectCode = code;
            this.secondClassify = childArr[0].detail;
        },
        handleSecondClassify(code) {
            this.$router.push({path: '/classifyCommodityList', query: {code: code}});
        }
    }
}
</script>

<style lang="less">
    .classify {
        background-color: #fff;
        .filter {
            text-align: center;
            background-color: #fff;
            border-right: 1px solid #fbf9fe;/*no*/
            height: 100vh;
            .firstClassify{
                height: 35px;
                line-height: 35px;
                border-bottom: 1px solid #f0f0f0;/*no*/
                font-size: 14px;
            }
            .active{
                border-bottom: 1px solid #08bb07;
            }
        }
        .secondClassify{
            display: inline-block;
            text-align: center;
            margin: 10px 15px;
            img{
                width: 100px;
            }
        }
        .classifyLeft{
            .recommendClassify{
                font-size: 15px;
                width: 100%;
                text-align: center;
            }
        }
    }
</style>


















