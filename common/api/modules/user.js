import {Http} from '@/util/request.js'

const http = new Http()

function login(data){
	return http.request({
		url:'/call/getWorksByCollection',
		data
	})
}