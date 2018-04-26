var app = getApp()
Page({
  onLoad: function () {
    this.setData({
      hasLogin: app.globalData.hasLogin
    })
  },
  data: {},
  login: function () {
    var that = this
    wx.login({
      success: function (res) {
				console.log("res--openid", app.globalData.openid)
        app.globalData.hasLogin = true
        that.setData({
          hasLogin: true
        })
        that.update()
      }
    })
  }
})
