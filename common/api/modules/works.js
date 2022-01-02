import {Http} from '@/util/request.js'

const http = new Http()

function getWorksByCollection(data){
	return http.request({
		url:'/call/getWorksByCollection',
		data
	})
}

function getCollectionKinds(data){
	return http.request({
		url:'/call/getCollectionKinds',
		data
	})
}

function getAllCollections(data){
	return http.request({
		url:'/call/getAllCollections',
		data
	})
}

const works = {
	getWorksByCollection,
	getCollectionKinds,
	getAllCollections
}
export default works