var app = getApp();
Page({
    data: {},
    onLoad: function(o) {
        wx.hideShareMenu({}), wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: wx.getStorageSync("color"),
            animation: {
                duration: 0,
                timingFunc: "easeIn"
            }
        });
        var n = this,
            t = wx.getStorageSync("users").id;
        console.log(t), app.util.request({
            url: "entry/wxapp/Jfmx",
            cachetime: "0",
            data: {
                user_id: t
            },
            success: function(o) {
                console.log(o);
                var t = o.data;
                n.setData({
                    score: t
                })
            }
        }), app.util.request({
            url: "entry/wxapp/UserInfo",
            cachetime: "0",
            data: {
                user_id: t
            },
            success: function(o) {
                console.log(o), n.setData({
                    integral: o.data.total_score
                })
            }
        })
    },
    tzjfsc: function() {
        wx.redirectTo({
            url: "integral"
        })
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});