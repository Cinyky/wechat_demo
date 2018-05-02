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
        var a = wx.getStorageSync("city");
        console.log("轮播图的城市为" + a), app.util.request({
            url: "entry/wxapp/Ad",
            cachetime: "0",
            data: {
                cityname: a
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
        var o, n, s, c = (o = new Date, n = o.getMonth() + 1, s = o.getDate(), n >= 1 && n <= 9 && (n = "0" + n), s >= 0 && s <= 9 && (s = "0" + s), o.getFullYear() + "/" + n + "/" + s + " " + o.getHours() + ":" + o.getMinutes() + ":" + o.getSeconds());
        a = wx.getStorageSync("city");
        console.log("城市为" + a);
        var i = t.data.page,
            r = t.data.info;
        null == i && (i = 1), null == r && (r = []), app.util.request({
            url: "entry/wxapp/ZxList",
            cachetime: "0",
            data: {
                page: t.data.page,
                cityname: a
            },
            success: function(e) {
                if (console.log(e), 0 == e.data.length) t.setData({
                    refresh_top: !0
                });
                else for (var a in t.setData({
                    refresh_top: !1,
                    page: i + 1
                }), r = r.concat(e.data), e.data) {
                    e.data[a].time = e.data[a].time.slice(0, 16), null == e.data[a].img ? e.data[a].type = 1 : e.data[a].type = 2;
                    var o = c,
                        n = e.data[a].time.replace(/-/g, "/"),
                        s = /(\d{4})-(\d{1,2})-(\d{1,2})( \d{1,2}:\d{1,2})/g,
                        l = Math.abs(Date.parse(o.replace(s, "$2-$3-$1$4")) - Date.parse(n.replace(s, "$2-$3-$1$4"))) / 1e3,
                        u = Math.floor(l / 3600),
                        f = Math.floor(l % 3600 / 60);
                    e.data[a].m = u, e.data[a].h = f, console.log(u + " 小时 " + f + " 分钟"), e.data[a].imgs = e.data[a].imgs.split(",").slice(0, 3)
                }
                console.log(r), t.setData({
                    info: r,
                    info1: r
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
            var s = n.replace(/[^0-9]/gi, "");
            n = n = n.replace(/(\d+|\s+)/g, ""), console.log(n), wx.navigateTo({
                url: n + Number(s),
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
        var s, c, i, r = (s = new Date, c = s.getMonth() + 1, i = s.getDate(), c >= 1 && c <= 9 && (c = "0" + c), i >= 0 && i <= 9 && (i = "0" + i), s.getFullYear() + "/" + c + "/" + i + " " + s.getHours() + ":" + s.getMinutes() + ":" + s.getSeconds()),
            l = wx.getStorageSync("city");
        app.util.request({
            url: "entry/wxapp/ZxList",
            cachetime: "0",
            data: {
                type_id: a[o].id,
                cityname: l
            },
            success: function(e) {
                console.log(e);
                var a = e.data;
                for (var o in a) {
                    a[o].time = a[o].time.slice(0, 16), null == a[o].img ? a[o].type = 1 : a[o].type = 2;
                    var n = r,
                        s = a[o].time.replace(/-/g, "/"),
                        c = /(\d{4})-(\d{1,2})-(\d{1,2})( \d{1,2}:\d{1,2})/g,
                        i = Math.abs(Date.parse(n.replace(c, "$2-$3-$1$4")) - Date.parse(s.replace(c, "$2-$3-$1$4"))) / 1e3,
                        l = Math.floor(i / 3600),
                        u = Math.floor(i % 3600 / 60);
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
        var t = this.data.zx,
            a = this.data.info1;
        this.setData({
            types: 1,
            zx: t,
            index: -1,
            info: a,
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