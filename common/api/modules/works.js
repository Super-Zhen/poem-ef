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

/**
 * 获取作者作品列表
 * @param {Object} data
 */
function getWorksByAuthor(data){
	return http.request({
		url:'call/getWorksByAuthor',
		data
	})
}

/**
 * 获取作品详情
 * @param {Object} data
 */
function getWorkById(data){
	return http.request({
		url:'/call/getWorkById',
		data
	})
}

const works = {
	getWorksByCollection,
	getCollectionKinds,
	getAllCollections,
	getHotAuthorsIncludeCountByLikers,
	getAuthorById2,
	getWorksByAuthor,
	getWorkById
}
export default works