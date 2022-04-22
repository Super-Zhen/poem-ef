'use strict';

const db = uniCloud.database()

exports.main = async (event, context) => {
	const res = await uniCloud.getPhoneNumber({
		appid: '__UNI__0F0BD4D', // 替换成uniapp的__UNI__的id
		provider: 'univerify',
		apiKey: '5c663f625ad8724b9e68cf89c9163786', // 服务空间的key
		apiSecret: 'b387f63e289faed4758b6f9afb174aa4', // 服务空间的apiSecret
		access_token: event.access_token,
		openid: event.openid
	});

	console.log(res); // res里的数据格式	{ code: 0, success: true, phoneNumber: '手机号' }
	// return await db.collection('regUser').add({		
	// 	openid: event.openid, 
	// 	PhoneNumber:res.phoneNumber,
	// 	createTime: Date.now()		
	// })
	return res
};
