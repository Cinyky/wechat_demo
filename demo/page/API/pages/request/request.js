const requestUrl = require('../../../../config').requestUrl
const duration = 1000000

Page({
  makeRequest: function() {
    var self = this

    self.setData({
      loading: true
    })
		
    wx.request({
      url: "wwww.wwwwww",
      data: {
        noncestr: Date.now()
      },
      success: function(result) {
				wx.showToast({
					title: '请求成功',
					icon: 'success',
					mask: true,
					duration: duration
				})
				console.log('close', new Date())
				setTimeout(function () {
					wx.hideToast()
					console.log('close', new Date())
					self.setData({
          loading: false
        	})
				}, 2000)
        
				console.log('request success', result)
				
      },

      fail: function({errMsg}) {
				wx.showToast({
					title: '请求失败',
					icon: 'fail',
					mask: true,
					duration: duration
				})
        console.log('request fail', errMsg)
				console.log('request fail close', new Date())
				setTimeout(function () {
					wx.hideToast()
					console.log('close', new Date())
					self.setData({
						loading: false
					})
				}, 2000)

        
      }
    })
  }
})
