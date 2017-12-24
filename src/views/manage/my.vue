<template>
    <div class="zhuzai-manager-my">
        <div class="user">
            <img :src="userImg"/>
            <p>{{userName}}</p>
        </div>
        <div class="user-info">
            <mt-cell title="我的产品" to="/changeProduct" is-link>
                <span slot="icon" class="fa fa-product-hunt"></span>
            </mt-cell>
            <mt-cell title="我的订单" to="/managerMyOrder" is-link>
                <span slot="icon" class="fa fa-reorder"></span>
            </mt-cell>
            <mt-cell title="历史订单" to="/managerHistoryOrder" is-link>
                <span slot="icon" class="fa fa-reorder"></span>
            </mt-cell>
            <!-- <mt-cell title="我的优惠券" to="/index" is-link>
                <span slot="icon" class="fa fa-ticket"></span>
            </mt-cell> -->
            <!-- <mt-cell title="联系客服" to="/index" is-link>
                <span slot="icon" class="fa fa-phone"></span>
            </mt-cell>
            <mt-cell title="问题反馈" to="/index" is-link>
                <span slot="icon" class="fa fa-question-circle-o"></span>
            </mt-cell>
            <mt-cell title="关于我们" to="/index" is-link>
                <span slot="icon" class="fa fa-handshake-o"></span>
            </mt-cell> -->
        </div>
    </div>
</template>

<script>
    import util from '../../util/util';

    export default {
        data() {
            return {
                // userImg: '../../assets/logo.png',
                // userName: 'Tracy'
            }
        },
        computed: {
            userName() {
                return decodeURIComponent(util.getCookie('userName'));
            },
            userImg() {
                return util.getCookie('headImg');
            }
        },
        created() {
        }
}
</script>

<style lang="less">
    .zhuzai-manager-my{
        .user{
            font-size: 15px;
            height: 215px;
            text-align: center;
            background-color: #fff;
            line-height: normal;
            img{
                width: 100px;
                height: 100px;
                display: inline-block;
                margin-top: 30px;
                border-radius: 50%;
            }
            p{
                height: 20px;
                font-size: 15px;
                color: #444;
            }
        }
        .user-info{
            margin-top: 20px;
            .fa{
                font-size: 15px;
                width: 20px;
                text-align: center;
                vertical-align: middle;
                color: #444;
            }
            .mint-cell-text{
                font-size: 15px;
                color: #444;
            }
        }
    }
</style>
