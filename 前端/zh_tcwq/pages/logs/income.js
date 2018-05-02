var app = getApp();
Page({
    data: {},
    onLoad: function(n) {
        this.Refresh()
    },
    refresh1: function() {
        this.Refresh()
    },
    Refresh: function(n) {
        var o = this;
        wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: wx.getStorageSync("color"),
            animation: {
                duration: 0,
                timingFunc: "easeIn"
            }
        }), wx.login({
            success: function(n) {
                console.log("这是登录所需要的code"), console.log(n.code);
                var e = n.code;
                wx.setStorageSync("code", e), wx.getUserInfo({
                    success: function(n) {
                        var t = n.userInfo.nickName,
                            a = n.userInfo.avatarUrl;
                        app.util.request({
                            url: "entry/wxapp/openid",
                            cachetime: "0",
                            data: {
                                code: e
                            },
                            success: function(n) {
                                var e = a,
                                    c = t,
                                    i = n.data.openid;
                                app.util.request({
                                    url: "entry/wxapp/Login",
                                    cachetime: "0",
                                    data: {
                                        openid: i,
                                        img: e,
                                        name: c
                                    },
                                    success: function(n) {
                                        console.log(n);
                                        var e = n.data;
                                        app.util.request({
                                            url: "entry/wxapp/MyTiXian",
                                            cachetime: "0",
                                            data: {
                                                user_id: n.data.id
                                            },
                                            success: function(n) {
                                                console.log(n);
                                                var t = 0;
                                                for (var a in n.data) t += Number(n.data[a].tx_cost);
                                                console.log(t);
                                                var c = Number(e.money);
                                                c = c.toFixed(2), console.log(c), o.setData({
                                                    money: c
                                                })
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
    },
    detailed2: function(n) {
        wx.navigateTo({
            url: "detailed?state=2",
            success: function(n) {},
            fail: function(n) {},
            complete: function(n) {}
        })
    },
    detailed3: function(n) {
        wx.navigateTo({
            url: "detailed?state=1",
            success: function(n) {},
            fail: function(n) {},
            complete: function(n) {}
        })
    },
    cash: function(n) {
        wx.navigateTo({
            url: "cash?state=1",
            success: function(n) {},
            fail: function(n) {},
            complete: function(n) {}
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