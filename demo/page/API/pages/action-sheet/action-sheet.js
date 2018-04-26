var itemList = ['1', '2', '3', '4']
Page({
	data: {
		playing: false,
		playTime: 0,
		formatedPlayTime: '00:00:00'
	},
  actionSheetTap: function () {
		var that = this;
    wx.showActionSheet({
			itemList: itemList,
      success: function (e) {
				console.log(e.tapIndex, itemList[e.tapIndex], that.data['formatedPlayTime'])
      }
    })
  }
})
