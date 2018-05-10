var app = getApp();

Page({
    data: {},
    onLoad: function(n) {
        this.Refresh();
    },
    refresh1: function() {
        this.Refresh();
    },
    Refresh: function(n) {
        var i = this;
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
                var o = n.code;
                wx.setStorageSync("code", o), wx.getUserInfo({
                    success: function(n) {
                        var a = n.userInfo.nickName, c = n.userInfo.avatarUrl;
                        app.util.request({
                            url: "entry/wxapp/openid",
                            cachetime: "0",
                            data: {
                                code: o
                            },
                            success: function(n) {
                                var o = c, e = a, t = n.data.openid;
                                app.util.request({
                                    url: "entry/wxapp/Login",
                                    cachetime: "0",
                                    data: {
                                        openid: t,
                                        img: o,
                                        name: e
                                    },
                                    success: function(n) {
                                        console.log(n);
                                        var a = n.data;
                                        app.util.request({
                                            url: "entry/wxapp/MyTiXian",
                                            cachetime: "0",
                                            data: {
                                                user_id: n.data.id
                                            },
                                            success: function(n) {
                                                console.log(n);
                                                var o = 0;
                                                for (var e in n.data) o += Number(n.data[e].tx_cost);
                                                console.log(o);
                                                var t = Number(a.money);
                                                t = t.toFixed(2), console.log(t), i.setData({
                                                    money: t
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    },
    detailed2: function(n) {
        wx.navigateTo({
            url: "detailed?state=2",
            success: function(n) {},
            fail: function(n) {},
            complete: function(n) {}
        });
    },
    detailed3: function(n) {
        wx.navigateTo({
            url: "detailed?state=1",
            success: function(n) {},
            fail: function(n) {},
            complete: function(n) {}
        });
    },
    cash: function(n) {
        wx.navigateTo({
            url: "cash?state=1",
            success: function(n) {},
            fail: function(n) {},
            complete: function(n) {}
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});