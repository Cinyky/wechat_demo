var app = getApp();
Page({
    data: {
        slide: [{
            logo: "http://opocfatra.bkt.clouddn.com/images/0/2017/10/tdJ70qw1fEfjfVJfFDD09570eqF28d.jpg"
        }, {
            logo: "http://opocfatra.bkt.clouddn.com/images/0/2017/10/k5JQwpBfpb0u8sNNy5l5bhlnrhl33W.jpg"
        }, {
            logo: "http://opocfatra.bkt.clouddn.com/images/0/2017/10/zUeEednDedmUkIUumN9XI6IXU91eko.jpg"
        }],
        release: [{
            name: "人找车",
            id: 0
        }, {
            name: "车找人",
            id: 1
        }, {
            name: "车找货",
            id: 2
        }, {
            name: "货找车",
            id: 3
        }],
        shunfabu: ["人找车", "车找人", "车找货", "货找车"],
        index: 0,
        foot: !1,
        pc: [],
        refresh_top: !1
    },
    notice: function(t) {
        console.log(t);
        var a = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../notice/notice?id=" + a,
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        })
    },
    shunfabu: function(t) {
        console.log(t);
        var a = t.currentTarget.id;
        this.setData({
            foot: !1
        }), wx.navigateTo({
            url: "shunfabu/shunfabu?id=" + a
        })
    },
    call_phone: function(t) {
        console.log(t), wx.makePhoneCall({
            phoneNumber: t.currentTarget.dataset.tel
        })
    },
    footbtn: function(t) {
        0 == this.data.foot ? this.setData({
            foot: !0
        }) : this.setData({
            foot: !1
        })
    },
    jumps: function(t) {
        var a = this,
            e = (t.currentTarget.dataset.name, t.currentTarget.dataset.appid),
            o = t.currentTarget.dataset.src,
            n = t.currentTarget.dataset.wb_src,
            s = t.currentTarget.dataset.type;
        if (1 == s) {
            var c = o.replace(/[^0-9]/gi, "");
            o = o = o.replace(/(\d+|\s+)/g, ""), console.log(o), console.log(c), console.log(), wx.navigateTo({
                url: o + Number(c),
                success: function(t) {
                    a.setData({
                        averdr: !0
                    })
                },
                fail: function(t) {},
                complete: function(t) {}
            })
        } else 2 == s ? wx.navigateTo({
            url: "../car/car?vr=" + n,
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        }) : 3 == s && wx.navigateToMiniProgram({
            appId: e,
            path: "",
            extraData: {
                foo: "bar"
            },
            envVersion: "develop",
            success: function(t) {
                a.setData({
                    averdr: !0
                })
            }
        })
    },
    carinfo: function(t) {
        console.log(t);
        var a = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "shuninfo2/shuninfo2?id=" + a,
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        })
    },
    onLoad: function(t) {
        wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: wx.getStorageSync("color"),
            animation: {
                duration: 0,
                timingFunc: "easeIn"
            }
        });
        var a = wx.getStorageSync("url"),
            e = wx.getStorageSync("System");
        this.setData({
            url: a,
            system: e
        }), this.refresh()
    },
    refresh: function(t) {
        var a = this;
        var e, o, n, s = (e = new Date, o = e.getMonth() + 1, n = e.getDate(), o >= 1 && o <= 9 && (o = "0" + o), n >= 0 && n <= 9 && (n = "0" + n), e.getFullYear() + "-" + o + "-" + n + " " + e.getHours() + ":" + e.getMinutes() + ":" + e.getSeconds());
        console.log(s);
        var c = wx.getStorageSync("city");
        console.log(c);
        var r = a.data.page,
            i = a.data.pc;
        null == r && (r = 1), null == i && (i = []), app.util.request({
            url: "entry/wxapp/CarList",
            cachetime: "0",
            data: {
                cityname: c,
                page: r
            },
            success: function(t) {
                for (var e in console.log(t), 0 == t.data.length ? a.setData({
                    refresh_top: !0
                }) : (a.setData({
                    page: r + 1,
                    refresh_top: !1
                }), i = i.concat(t.data)), t.data) t.data[e].tz.time = app.ormatDate(t.data[e].tz.time).slice(5, 16), t.data[e].tz.start_time1 = t.data[e].tz.start_time.slice(5, 10), t.data[e].tz.start_time2 = t.data[e].tz.start_time.slice(10, 17), 2 == t.data[e].tz.is_open ? (t.data[e].tz.class2 = "car3", t.data[e].tz.class3 = "car4", t.data[e].tz.class4 = "car5") : (t.data[e].tz.class2 = "", t.data[e].tz.class3 = "", t.data[e].tz.class4 = ""), "人找车" == t.data[e].tz.typename ? (t.data[e].tz.class = "color1", t.data[e].tz.class1 = "car1") : "车找人" == t.data[e].tz.typename ? (t.data[e].tz.class = "color2", t.data[e].tz.class1 = "car2") : "货找车" == t.data[e].tz.typename ? (t.data[e].tz.class = "color1", t.data[e].tz.class1 = "car1") : "车找货" == t.data[e].tz.typename && (t.data[e].tz.class = "color2", t.data[e].tz.class1 = "car2");
                a.setData({
                    pc: i
                })
            }
        }), app.util.request({
            url: "entry/wxapp/news",
            cachetime: "0",
            data: {
                cityname: c
            },
            success: function(t) {
                console.log(t);
                var e = [];
                for (var o in t.data) 3 == t.data[o].type && e.push(t.data[o]);
                a.setData({
                    msgList: e
                })
            }
        }), app.util.request({
            url: "entry/wxapp/Ad",
            cachetime: "0",
            data: {
                cityname: c
            },
            success: function(t) {
                console.log(t);
                var e = [];
                for (var o in t.data) 4 == t.data[o].type && e.push(t.data[o]);
                console.log(e);
                0 != e.length ? a.setData({
                    top: 600
                }) : a.setData({
                    top: 300
                }), console.log(0), a.setData({
                    slide: e
                })
            }
        })
    },
    carlist: function(t) {
        var a = this;
        console.log(t);
        var e = t.currentTarget.dataset.typename;
        app.util.request({
            url: "entry/wxapp/TypeCarList",
            cachetime: "0",
            data: {
                typename: e
            },
            success: function(t) {
                for (var e in console.log(t), t.data) t.data[e].tz.time = app.ormatDate(t.data[e].tz.time).slice(5, 16), t.data[e].tz.start_time1 = t.data[e].tz.start_time.slice(5, 10), t.data[e].tz.start_time2 = t.data[e].tz.start_time.slice(10, 16), "人找车" == t.data[e].tz.typename ? (t.data[e].tz.class = "color1", t.data[e].tz.class1 = "car1") : "车找人" == t.data[e].tz.typename ? (t.data[e].tz.class = "color2", t.data[e].tz.class1 = "car2") : "货找车" == t.data[e].tz.typename ? (t.data[e].tz.class = "color1", t.data[e].tz.class1 = "car1") : "车找货" == t.data[e].tz.typename && (t.data[e].tz.class = "color2", t.data[e].tz.class1 = "car2");
                a.setData({
                    pc: t.data
                })
            }
        })
    },
    shouye: function(t) {
        wx.switchTab({
            url: "../index/index",
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        })
    },
    mine_yellow: function(t) {
        wx.reLaunch({
            url: "../logs/mine_car"
        })
    },
    whole: function(t) {
        this.refresh()
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.refresh(), wx.stopPullDownRefresh()
    },
    onReachBottom: function() {
        0 == this.data.refresh_top && this.refresh()
    },
    onShareAppMessage: function() {}
});