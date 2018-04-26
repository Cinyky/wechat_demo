Page({
  data: {
    systemInfo: {}
  },
  getSystemInfo: function () {
    var that = this
    wx.getSystemInfo({
      success: function (res) {
				console.log(res)
        that.setData({
          systemInfo: res
        })
        // that.update()
      }
    })
  }
})
