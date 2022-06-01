<template>
	<view>
		<view>
			<!-- 插入模式 -->
			<uni-calendar class="uni-calendar--hook" :selected="info.selected" :showMonth="false" @change="change"
				@monthSwitch="monthSwitch" />
			<button class="wid90 borderR30 mgt15" :disabled="btndisabled" @tap="btndisabled?'':signIn()"
				type="primary">签到</button>
		</view>
	</view>
</template>

<script>
	function getDate(date, AddDayCount = 0) {
		if (!date) {
			date = new Date()
		}
		if (typeof date !== 'object') {
			date = date.replace(/-/g, '/')
		}
		const dd = new Date(date)

		dd.setDate(dd.getDate() + AddDayCount) // 获取AddDayCount天后的日期

		const y = dd.getFullYear()
		const m = dd.getMonth() + 1 < 10 ? '0' + (dd.getMonth() + 1) : dd.getMonth() + 1 // 获取当前月份的日期，不足10补0
		const d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate() // 获取当前几号，不足10补0
		return {
			fullDate: y + '-' + m + '-' + d,
			year: y,
			month: m,
			date: d,
			day: dd.getDay()
		}
	}
	import {
		mapGetters
	} from 'vuex'
	import uniCalendar from '@/components/uni-calendar/uni-calendar'
	export default {
		data() {
			return {
				showCalendar: false,
				info: {
					lunar: true,
					range: true,
					insert: false,
					selected: []
				},
				chooseDate: getDate(new Date()).fullDate,
				btndisabled: false
			}
		},
		components: {
			uniCalendar
		},
		computed: {
			...mapGetters(['userInfo']),
		},
		onReady() {
			this.$nextTick(() => {
				this.showCalendar = true
			})
			// TODO 模拟请求异步同步数据
			setTimeout(() => {
				this.info.date = getDate(new Date(), -30).fullDate
				this.info.startDate = getDate(new Date(), -60).fullDate
				this.info.endDate = getDate(new Date(), 30).fullDate
				this.info.selected = [{
						date: getDate(new Date(), -3).fullDate,
						info: '打卡'
					},
					{
						date: getDate(new Date(), -2).fullDate,
						info: '签到',
						data: {
							custom: '自定义信息',
							name: '自定义消息头'
						}
					},
					{
						date: getDate(new Date(), -1).fullDate,
						info: '已打卡'
					}
				]
			}, 2000)
		},
		methods: {
			// 获取签到数据
			init() {

			},
			// 签到
			signIn() {
				let param = {
					phone: this.userInfo.phone,
					time: new Date().getTime()
				}
				this.$api.user.userSign(param).then(res => {
					console.log(res)
				})
			},
			open() {
				this.$refs.calendar.open()
			},
			close() {
				console.log('弹窗关闭');
			},
			change(e) {
				console.log('change 返回:', e)
				// 模拟动态打卡
				this.chooseDate = e.fulldate
				if (getDate(new Date()).fullDate != e.fulldate) {
					this.btndisabled = true
					return
					uni.showToast({
						icon: "none",
						title: '只能当天打卡'
					})

				} else {
					this.btndisabled = false
				}
				// if (this.info.selected.length > 5) return
				// this.info.selected.push({
				// 	date: e.fulldate,
				// 	info: '打卡'
				// })
				console.log(this.info.selected)
			},
			confirm(e) {
				console.log('confirm 返回:', e)
			},
			monthSwitch(e) {
				console.log('monthSwitchs 返回:', e)
			}
		}
	}
</script>

<style>

</style>
