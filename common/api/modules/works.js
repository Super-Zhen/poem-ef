import {Http} from '@/util/request.js'

const http = new Http()

function getWorksByCollection(data){
	return http.request({
		url:'/call/getWorksByCollection',
		data
	})
}

/**
 * 获取分类列表
 * @param {Object} data
 */
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

/**
 * 获取作者列表
 * @param {Object} data
 */
function getHotAuthorsIncludeCountByLikers(data){
	return http.request({
		url:'call/getHotAuthorsIncludeCountByLikers',
		data
	})
}

/**
 * 获取作者简介
 * @param {Object} data
 */
function getAuthorById2 (data){
	return http.request({
		url:'call/getAuthorById2',
		data
	})
}

const works = {
	getWorksByCollection,
	getCollectionKinds,
	getAllCollections,
	getHotAuthorsIncludeCountByLikers,
	getAuthorById2
}
export default works