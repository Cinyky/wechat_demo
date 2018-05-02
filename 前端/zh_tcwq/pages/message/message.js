var app = getApp();
Page({
    data: {
        index: 0,
        types: 1
    },
    onLoad: function(e) {
        var t = this;
        app.util.request({
            url: "entry/wxapp/System",
            cachetime: "0",
            success: function(e) {
                console.log(e), wx.setNavigationBarColor({
                    frontColor: "#ffffff",
                    backgroundColor: e.data.color,
                    animation: {
                        duration: 0,
                        timingFunc: "easeIn"
                    }
                }), t.setData({
                    system: e.data
                })
            }
        }), app.util.request({
            url: "entry/wxapp/Url",
            cachetime: "0",
            success: function(e) {
                wx.setStorageSync("url", e.data), t.setData({
                    url: e.data
                })
            }
        }), t.refresh()
    },
    refresh: function(e) {
        var t = this;
        app.util.request({
            url: "entry/wxapp/ZxType",
            cachetime: "0",
            success: function(e) {
                console.log(e), t.setData({
                    zx: e.data
                })
            }
        });
        o = wx.getStorageSync("city");
        console.log("轮播图的城市为" + o), app.util.request({
            url: "entry/wxapp/Ad",
            cachetime: "0",
            data: {
                cityname: o
            },
            success: function(e) {
                console.log(e);
                var a = [];
                for (var o in e.data) 3 == e.data[o].type && a.push(e.data[o]);
                console.log(a);
                0 != a.length ? t.setData({
                    top: 600
                }) : t.setData({
                    top: 300
                }), console.log(0), t.setData({
                    slide: a
                })
            }
        });
        var a = function() {
            var e = new Date,
                t = e.getMonth() + 1,
                a = e.getDate();
            return t >= 1 && t <= 9 && (t = "0" + t), a >= 0 && a <= 9 && (a = "0" + a), e.getFullYear() + "/" + t + "/" + a + " " + e.getHours() + ":" + e.getMinutes() + ":" + e.getSeconds()
        }(),
            o = wx.getStorageSync("city");
        console.log("城市为" + o);
        var n = t.data.page,
            c = t.data.info;
        null == n && (n = 1), null == c && (c = []), app.util.request({
            url: "entry/wxapp/ZxList",
            cachetime: "0",
            data: {
                page: t.data.page,
                cityname: o
            },
            success: function(e) {
                if (console.log(e), 0 == e.data.length) t.setData({
                    refresh_top: !0
                });
                else {
                    t.setData({
                        refresh_top: !1,
                        page: n + 1
                    }), c = c.concat(e.data);
                    for (var o in e.data) {
                        e.data[o].time = e.data[o].time.slice(0, 16), null == e.data[o].img ? e.data[o].type = 1 : e.data[o].type = 2;
                        var s = a,
                            i = e.data[o].time.replace(/-/g, "/"),
                            r = /(\d{4})-(\d{1,2})-(\d{1,2})( \d{1,2}:\d{1,2})/g,
                            l = Math.abs(Date.parse(s.replace(r, "$2-$3-$1$4")) - Date.parse(i.replace(r, "$2-$3-$1$4"))) / 1e3,
                            u = Math.floor(l / 3600),
                            f = Math.floor(l % 3600 / 60);
                        e.data[o].m = u, e.data[o].h = f, console.log(u + " 小时 " + f + " 分钟"), e.data[o].imgs = e.data[o].imgs.split(",").slice(0, 3)
                    }
                }
                console.log(c), t.setData({
                    info: c,
                    info1: c
                })
            }
        })
    },
    jumps: function(e) {
        var t = this,
            a = e.currentTarget.dataset.name,
            o = e.currentTarget.dataset.appid,
            n = e.currentTarget.dataset.src;
        if ("" == n) console.log("没有商家地址"), "" != o ? wx.showModal({
            title: "提示",
            content: "是否跳转到" + a,
            showCancel: !0,
            cancelText: "取消",
            cancelColor: "",
            confirmText: "确定",
            confirmColor: "",
            success: function(e) {
                1 == e.confirm && wx.navigateToMiniProgram({
                    appId: o,
                    path: "",
                    extraData: {
                        foo: "bar"
                    },
                    envVersion: "develop",
                    success: function(e) {
                        t.setData({
                            averdr: !0
                        })
                    }
                })
            },
            fail: function(e) {},
            complete: function(e) {}
        }) : t.setData({
            averdr: !0
        });
        else if ("" == o) {
            console.log("没有小程序地址");
            var c = n.replace(/[^0-9]/gi, "");
            n = n = n.replace(/(\d+|\s+)/g, ""), console.log(n), wx.navigateTo({
                url: n + Number(c),
                success: function(e) {
                    t.setData({
                        averdr: !0
                    })
                },
                fail: function(e) {},
                complete: function(e) {}
            })
        } else console.log("两个都有"), wx.showModal({
            title: "提示",
            content: "是否跳转到" + a,
            showCancel: !0,
            cancelText: "取消",
            cancelColor: "",
            confirmText: "确定",
            confirmColor: "",
            success: function(e) {
                1 == e.confirm && wx.navigateToMiniProgram({
                    appId: o,
                    path: "",
                    extraData: {
                        foo: "bar"
                    },
                    envVersion: "develop",
                    success: function(e) {
                        t.setData({
                            averdr: !0
                        })
                    }
                })
            },
            fail: function(e) {},
            complete: function(e) {}
        })
    },
    click: function(e) {
        console.log(e);
        var t = this,
            a = t.data.zx,
            o = (t.data.info1, t.data.info, e.currentTarget.dataset.index),
            n = o;
        console.log(a);
        var c = function() {
            var e = new Date,
                t = e.getMonth() + 1,
                a = e.getDate();
            return t >= 1 && t <= 9 && (t = "0" + t), a >= 0 && a <= 9 && (a = "0" + a), e.getFullYear() + "/" + t + "/" + a + " " + e.getHours() + ":" + e.getMinutes() + ":" + e.getSeconds()
        }(),
            s = wx.getStorageSync("city");
        app.util.request({
            url: "entry/wxapp/ZxList",
            cachetime: "0",
            data: {
                type_id: a[o].id,
                cityname: s
            },
            success: function(e) {
                console.log(e);
                var a = e.data;
                for (var o in a) {
                    a[o].time = a[o].time.slice(0, 16), null == a[o].img ? a[o].type = 1 : a[o].type = 2;
                    var n = c,
                        s = a[o].time.replace(/-/g, "/"),
                        i = /(\d{4})-(\d{1,2})-(\d{1,2})( \d{1,2}:\d{1,2})/g,
                        r = Math.abs(Date.parse(n.replace(i, "$2-$3-$1$4")) - Date.parse(s.replace(i, "$2-$3-$1$4"))) / 1e3,
                        l = Math.floor(r / 3600),
                        u = Math.floor(r % 3600 / 60);
                    a[o].m = l, a[o].h = u, console.log(l + " 小时 " + u + " 分钟"), a[o].imgs = a[o].imgs.split(",").slice(0, 3)
                }
                console.log(a), t.setData({
                    info: a
                })
            }
        }), t.setData({
            zx: a,
            types: 2,
            active_index: n,
            index: o
        })
    },
    click1: function(e) {
        var t = this,
            a = t.data.zx,
            o = t.data.info1;
        t.setData({
            types: 1,
            zx: a,
            index: -1,
            info: o,
            active_index: -1
        })
    },
    message: function(e) {
        console.log(e);
        var t = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: "message_info?id=" + t,
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        })
    },
    release: function(e) {
        wx.navigateTo({
            url: "release",
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        })
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.setData({
            page: 1,
            index: 0,
            types: 1,
            info: [],
            active_index: -1
        }), this.refresh(), wx.stopPullDownRefresh()
    },
    onReachBottom: function() {
        0 == this.data.refresh_top && this.refresh()
    },
    onShareAppMessage: function() {}
});