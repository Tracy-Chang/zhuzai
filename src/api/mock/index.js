import Mock from 'mockjs';

let img = "https://gss3.bdstatic.com/84oSdTum2Q5BphGlnYG/timg?wapp&quality=80&size=b150_150&subsize=20480&cut_x=0&cut_w=0&cut_y=0&cut_h=0&sec=1369815402&srctrace&di=cc8719c3654993f2c9ed30491d06cb7f&wh_rate=null&src=http%3A%2F%2Fimgsrc.baidu.com%2Fforum%2Fpic%2Fitem%2F023b5bb5c9ea15ceeb50a509bd003af33a87b270.jpg";

Mock.mock(/\/community\/query/,
	{
		"resultcode":0, //1成功 0失败
		"resultdata|5-9": [
			{
				"code|+1": 1, //string
				"name|4-7": "智"  //string
			},
		],
		"resultmsg":"获取成功"
	}
);
//选择小区
Mock.mock(/\/community\/choose/,
	{
		"resultcode":0, //1成功 0失败
		"resultdata|5-9": [],
		"resultmsg":"选择成功"
	}
);
//类别列表
Mock.mock(/\/reservetype\/query/,
	{
		"resultcode":0, //1成功 0失败
		"resultdata|10-12": [
			{
				"code|+1": 1, //string
				"name|1-4": "类",  //string
				"children|6": [
					{
						"code|+1": 15, //string
						"name|1-2": "饮料",  //string
						"url": img, //string
					},
					//...
				]
			},
		],
		"resultmsg":"选择成功"
	}
);
//商品列表
Mock.mock(/\/product\/queryList/,
	{
		"resultcode":0, //1成功 0失败
		"resultdata": {
			"list|15": [
				{
					"code|+1": 1, //string
					"url": img, //string
					"name|1-3": "商品", //string
					"marketPrice|+1": 3, //string 市场价
					"price|+1": 2, //string
				}
			],
			"page": 1
		},
		"resultmsg":"选择成功"
	}
);
//商品详情
Mock.mock(/\/product\/queryDetail/,
	{
		"resultcode": 0, //1成功 0失败
		"resultdata": {
			"code": "detail",
			"img|1-3": [
				img
			],
			"name|7-15": "尖叫", //string
			"classify": "功能饮料", //string
			"brand": "达能", //品牌 string
			"expirationDate": "100天", //保质期
			"size": "600x15瓶", //规格
			"unitPrice": "10",
			"sizeList|3-6": [
				{
					"code|1-100": "1",
					"name|1-3": "尖叫",
					"price|+2": 10,  //number
					"number|+2": 10, //库存
				}
			]
		},
		"resultmsg":"选择成功"
	}
);
//加入购物车
Mock.mock(/\/shopping\/add/,
	{
		"resultcode": 0, //1成功 0失败
		"resultdata": 
		{
			"code|+1": 100,
			"url": img,
			"name|1-10": "饮料",
			"price": 3.12, //number
			"number|+1": 1,
		},
		"resultmsg":"选择成功"
	}
);
//购物车信息
Mock.mock(/\/shopping\/query/,
	{
		"resultcode": 0, //1成功 0失败
		"resultdata": {
			"shoppingCartList|0-10": [
				{
					"code|+1": 100,
					"url": img,
					"name|1-10": "饮料",
					"price": 2.12, //number
					"number|+1": 1,
				},
			],
			"userName|1-2": "用户名",
			"phone": "18511877777",
			"address|7-10": "地址",
			"sendTime": "送达时间",   //送达时间
			"sendPrice": 2,  //number
			"type": [2],  //1-自提，2-送货上门，
			"marketAddress|0-1": "取货地址",
		},
		"resultmsg":"选择成功"
	}
);
//去下单
Mock.mock(/\/order\/add/,
	{
		"resultcode": 0, //1成功 0失败
		"resultdata": {
			"list|2-5": [
				{
					"url": img, //string
					"name": "饮料", //string
					"price": "100.12", //string
					"number": 2
				}
			],
			"time": "2017-11-11 12:12:11",
			"totlePrice": "100.21",
			"orderCode": "1",
			"remark": "xxx",
		    //"payStatus": "",  //1-待支付；2-已支付：3-已接单；4-已送达；5-已完成；6-已评价（5，6）
			"code": "2",
			"type": "送货上门",
			"sendAddress|5-15": "地址",
			"userName": "妲己",
			"phone": "12311122221",
			"marketAddress|5-20": "超市地址"
		},
		"resultmsg":"选择成功"
	}
);
//pay
Mock.mock(/\/pay\/payOrder/,
	{
		"resultcode": 0, //1成功 0失败
		"resultdata": {
			
		},
		"resultmsg":"选择成功"
	}
);
//我的订单
Mock.mock(/\/order\/query/,
	{
		"resultcode": 0, //1成功 0失败
		"resultdata|1-5": [
			{
				"list|1-4": [
					{
						"url": img, //string
						"name|6-13": "饮料", //string
						"price": "2.4", //string
						"number": "2" 
					}
				],
				"time": "2017-11-11",
				"totlePrice|+1": 20.01,
				"orderCode|+1": 10,
				"remark": "备注",
				"payStatus|1-6": 1,  //1-待支付；2-已支付：3-已接单；4-已送达；5-已完成；6-已评价（5，6）
				"type": "送货上门",
				"sendAddress": "超市地址地址",
			}
			//...
		],
		"resultmsg":"选择成功"
	}
);
//订单操作
Mock.mock(/\/order\/manage/,
	{
		"resultcode": 0, //1成功 0失败
		"resultdata": {},
		"resultmsg":"选择成功"
	}
);

export default Mock;














