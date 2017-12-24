//tracy
import Home from '@/views/Home';

//首页
import index from '@/views/index/index';
import community from '@/views/index/community';
import detail from '@/views/index/detail';
import searchList from '@/views/index/searchList';

//分类
import classify from '@/views/classify/classify';
import classifyCommodityList from '@/views/classify/classifyCommodityList';

//购物车
import shoppingCart from '@/views/shoppingCart/shoppingCart';
import order from '@/views/shoppingCart/order';

//我的
import my from '@/views/my/my';
import myOrder from '@/views/my/myOrder';

//管理
import managerMain from '@/views/manage/my';
import changeOrder from '@/views/manage/changeOrder';
import managerHistoryOrder from '@/views/manage/historyOrder';
import managerMyOrder from '@/views/manage/myOrder';
import managerOrderDetail from '@/views/manage/orderDetail';


const routes = [
	{
		path: '/community',
		name: '选择小区',
		component: community,
		hidden: true
	},
	{
		path: '/',
		name: '首页',
		component: Home,
		class: 'fa fa-home fa-fw',
		children: [
			{ path: '/index', component: index, name: '首页', meta: { selected: '首页' } },
			{ path: '/detail/:id', component: detail, name: '详情', meta: { selected: '首页' } },
			{ path: '/searchList', component: searchList, name: '搜索商品', meta: { selected: '首页' } },
		]
	},
	{
		path: '/',
		name: '分类',
		component: Home,
		class: 'fa fa-list fa-fw',
		children: [
			{ path: '/classify', component: classify, name: '分类', meta: { selected: '分类' } },
			{ path: '/classifyCommodityList', component: classifyCommodityList, name: '分类商品列表', meta: { selected: '分类' } }
		]
	},
	{
		path: '/',
		name: '购物车',
		component: Home,
		class: 'fa fa-shopping-cart fa-fw',
		children: [
			{ path: '/shoppingCart', component: shoppingCart, name: '购物车', meta: { selected: '购物车' } },
			{ path: '/order', component: order, name: '订单', meta: { selected: '购物车' } },
		]
	},
	{
		path: '/',
		name: '我的',
		component: Home,
		class: 'fa fa-user-o fa-fw',
		children: [
			{ path: '/my', component: my, name: '我的', meta: { selected: '我的' } },
			{ path: '/myOrder', component: myOrder, name: '我的订单', meta: { selected: '我的' } },
		]
	},
	{
		path: '/changeProduct',
		name: '商品管理',
		component: changeOrder,
		hidden: true
	},
	{
		path: '/managerMain',
		name: '商家主页',
		component: managerMain,
		hidden: true
	},
	{
		path: '/managerHistoryOrder',
		name: '历史订单',
		component: managerHistoryOrder,
		hidden: true
	},
	{
		path: '/managerMyOrder',
		name: '我的订单',
		component: managerMyOrder,
		hidden: true
	},
	{
		path: '/managerOrderDetail/:id',
		name: '订单详情',
		component: managerOrderDetail,
		hidden: true
	},
]
export default routes












