<template>
    <div class="home">
        <div class="community-name" @click="$router.push('/community')">{{currentCommunity}}</div>
        <div>
            <router-view></router-view>
        </div>
        <!-- 底部导航栏 -->
        <tabbar>
            <tabbar-item 
                v-for="item in $router.options.routes" 
                :link="item.children[0].path" 
                :selected="item.name==$router.currentRoute.meta.selected"
                v-if = "!item.hidden"
                :key="item.children[0].path">
                <div slot="icon" :class="item.class">
                    <mt-badge size="small" v-if="item.name=='购物车' && cartNumber!=0" type="error">{{cartNumber}}</mt-badge>
                </div>
                <span slot="label">{{item.name}}</span>
            </tabbar-item>
        </tabbar>
    </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vux';
import { mapState, mapMutations, mapActions } from 'vuex';
import util from './../util/util';

export default {
    components: {
        Tabbar,
        TabbarItem
    },
    data() {
        return {
            msg: 'Hello World!',
        }
    },
    computed: {
        ...mapState([
            'cartNumber'
        ]),
        currentCommunity() {
            return decodeURIComponent(util.getCookie('zhuzaiCommunityName'));
        }
    },
    created() {
        this.getShoppingCartInfo();
    },
    methods: {
        ...mapActions([
            'getShoppingCartInfo',
        ]),
    },
    mounted: function () {
        this.$nextTick(function () {

        })
    }
}
</script>

<style lang="less">
    @import '../style/vars';
    .home {
        .community-name{
            height: 40px;
            line-height: 40px;
            text-align: center;
            font-size: 14px;
            background-color: @globalColor;
            color: #fff
        }
        .logo{
            width: 200px;
        }
        .fa{
            font-size: 20px;
        }
        .weui-tabbar{
            position: fixed;
            height: 52px;
            z-index: 1000;
        }
        .mint-badge{
            position: absolute;
            top: -3px;
            left: 15px;
        }
    }
</style>
