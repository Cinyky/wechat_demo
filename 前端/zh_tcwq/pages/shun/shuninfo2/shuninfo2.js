var app = getApp();
Page({
    data: {},
    onLoad: function(t) {
        var e = this;
        wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: wx.getStorageSync("color"),
            animation: {
                duration: 0,
                timingFunc: "easeIn"
            }
        }), wx.login({
            success: function(t) {
                var e = t.code;
                wx.setStorageSync("code", e), wx.getUserInfo({
                    success: function(t) {
                        wx.setStorageSync("user_info", t.userInfo);
                        var n = t.userInfo.nickName,
                            a = t.userInfo.avatarUrl;
                        app.util.request({
                            url: "entry/wxapp/openid",
                            cachetime: "0",
                            data: {
                                code: e
                            },
                            success: function(t) {
                                wx.setStorageSync("key", t.data.session_key), wx.setStorageSync("openid", t.data.openid);
                                var e = t.data.openid;
                                app.util.request({
                                    url: "entry/wxapp/Login",
                                    cachetime: "0",
                                    data: {
                                        openid: e,
                                        img: a,
                                        name: n
                                    },
                                    success: function(t) {
                                        wx.setStorageSync("users", t.data), wx.setStorageSync("uniacid", t.data.uniacid)
                                    }
                                })
                            }
                        })
                    },
                    fail: function(t) {
                        wx.getSetting({
                            success: function(t) {
                                0 == t.authSetting["scope.userInfo"] && wx.openSetting({
                                    success: function(t) {}
                                })
                            }
                        })
                    }
                })
            }
        }), console.log(t);
        var n, a, o;
        n = new Date, a = n.getMonth() + 1, o = n.getDate(), a >= 1 && a <= 9 && (a = "0" + a), o >= 0 && o <= 9 && (o = "0" + o), n.getFullYear(), n.getHours(), n.getMinutes(), n.getSeconds();
        app.util.request({
            url: "entry/wxapp/CarInfo",
            cachetime: "0",
            data: {
                id: t.id
            },
            success: function(t) {
                console.log(t);
                var n = t.data.pc,
                    a = t.data.tag;
                n.time = app.ormatDate(n.time).slice(5, 16), n.start_time1 = n.start_time.slice(5, 10), n.start_time2 = n.start_time.slice(10, 17), e.setData({
                    pc: n,
                    tag: a
                })
            }
        })
    },
    call_phone: function(t) {
        console.log(t), wx.makePhoneCall({
            phoneNumber: t.currentTarget.dataset.tel
        })
    },
    dizhi1: function(t) {
        var e = Number(this.data.pc.star_lat),
            n = Number(this.data.pc.star_lng);
        console.log(e), console.log(n), wx.openLocation({
            latitude: e,
            longitude: n,
            name: this.data.pc.link_name,
            address: this.data.pc.start_place
        })
    },
    dizhi2: function(t) {
        var e = Number(this.data.pc.end_lat),
            n = Number(this.data.pc.end_lng);
        console.log(e), console.log(n), wx.openLocation({
            latitude: e,
            longitude: n,
            name: this.data.pc.link_name,
            address: this.data.pc.end_place
        })
    },
    shouye: function(t) {
        console.log(t), wx.reLaunch({
            url: "../../index/index",
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        })
    },
    fabu: function(t) {
        wx.reLaunch({
            url: "../shun",
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        })
    },
    phone: function(t) {
        var e = t.currentTarget.dataset.tel;
        wx.makePhoneCall({
            phoneNumber: e
        })
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        console.log(this.data);
        wx.getStorageSync("users").id;
        return {
            title: this.data.yellow_info.company_name,
            path: "/zh_tcwq/pages/shun/shuninfo2/shuninfo2?id=" + this.data.pc.id,
            success: function(t) {},
            fail: function(t) {}
        }
    }
});