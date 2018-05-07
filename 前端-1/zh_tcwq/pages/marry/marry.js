var app = getApp();
Page({
    data: {
        sliderOffset: 0,
        activeIndex1: 1,
        sliderLeft: 35,
        refresh_top: !1,
        refresh1_top: !1,
        page: 1,
        page1: 1,
        tie: [],
        tie1: []
    },
    hdsy: function(t) {
        wx.switchTab({
            url: "../index/index",
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        })
    },
    hdft: function(t) {
        wx.switchTab({
            url: "../fabu/fabu/fabu",
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        })
    },
    tabClick: function(t) {
        var a = t.currentTarget.id,
            e = this.data.classification,
            n = e[a].id,
            i = e[a].name;
        this.setData({
            activeIndex: a,
            activeIndex1: 0,
            page1: 1,
            type2_id: n,
            type2_name: i,
            tie1: []
        }), this.refresh1()
    },
    onLoad: function(t) {
        console.log(t);
        var a = this;
        wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: wx.getStorageSync("color"),
            animation: {
                duration: 0,
                timingFunc: "easeIn"
            }
        }), wx.getSystemInfo({
            success: function(t) {
                a.setData({
                    windowHeight: t.windowHeight
                })
            }
        }), wx.setNavigationBarTitle({
            title: t.name
        });
        var e = t.id,
            n = wx.getStorageSync("url");
        a.setData({
            id: e,
            url: n,
            tname: t.name
        }), a.reload(), a.refresh()
    },
    wole: function(t) {
        this.setData({
            activeIndex: -1,
            activeIndex1: 1,
            classification_info: this.data.tie
        })
    },
    reload: function(t) {
        var a = this,
            e = a.data.id;
        console.log(e), app.util.request({
            url: "entry/wxapp/type2",
            cachetime: "0",
            data: {
                id: e
            },
            success: function(t) {
                if (console.log(t), t.data.length > 0) {
                    t.data[0].id, t.data[0].name;
                    a.setData({
                        classification: t.data
                    })
                }
            }
        })
    },
    refresh: function(t) {
        var a = this,
            e = a.data.id,
            n = wx.getStorageSync("city");
        console.log(n), console.log(a.data.page), app.util.request({
            url: "entry/wxapp/list",
            cachetime: "0",
            data: {
                type_id: e,
                page: a.data.page,
                cityname: n
            },
            success: function(t) {
                if (console.log(t), 0 == t.data.length) a.setData({
                    refresh_top: !0
                });
                else {
                    a.setData({
                        page: a.data.page + 1
                    });
                    var e = a.data.tie;
                    for (var n in e = e.concat(t.data), t.data) {
                        var i = function() {
                            var t = "rgb(" + Math.floor(255 * Math.random()) + "," + Math.floor(255 * Math.random()) + "," + Math.floor(255 * Math.random()) + ")";
                            return t
                        };
                        for (var o in t.data[n].tz.img = t.data[n].tz.img.split(","), t.data[n].tz.details = t.data[n].tz.details.replace("?", " "), t.data[n].tz.time = a.ormatDate(t.data[n].tz.time), t.data[n].tz.img.length > 4 && (t.data[n].tz.img_length = Number(t.data[n].tz.img.length) - 4), t.data[n].tz.img.length >= 4 ? t.data[n].tz.img = t.data[n].tz.img.slice(0, 4) : t.data[n].tz.img = t.data[n].tz.img, t.data[n].label) t.data[n].label[o].number = i()
                    }
                    a.setData({
                        classification_info: e,
                        tie: e
                    })
                }
            }
        })
    },
    refresh1: function(t) {
        var a = this,
            e = wx.getStorageSync("city");
        console.log(a.data.type2_id), console.log(a.data.type2_name), app.util.request({
            url: "entry/wxapp/PostList",
            cachetime: "0",
            data: {
                type2_id: a.data.type2_id,
                page: a.data.page1,
                cityname: e
            },
            success: function(t) {
                console.log(t), 0 == t.data ? (wx.showToast({
                    title: "没有更多了",
                    icon: "",
                    image: "",
                    duration: 1e3,
                    mask: !0,
                    success: function(t) {},
                    fail: function(t) {},
                    complete: function(t) {}
                }), a.setData({
                    refresh1_top: !0
                })) : a.setData({
                    page1: a.data.page1 + 1
                });
                var e = a.data.tie1;
                for (var n in console.log(e), e = e.concat(t.data), t.data) {
                    var i = function() {
                        var t = "rgb(" + Math.floor(255 * Math.random()) + "," + Math.floor(255 * Math.random()) + "," + Math.floor(255 * Math.random()) + ")";
                        return t
                    };
                    t.data[n].tz.type2_name = a.data.type2_name;
                    var o = a.ormatDate(t.data[n].tz.time);
                    for (var r in t.data[n].tz.time = o.slice(0, 16), t.data[n].tz.img = t.data[n].tz.img.split(",").slice(0, 4), t.data[n].label) t.data[n].label[r].number = i()
                }
                a.setData({
                    classification_info: e,
                    tie1: e
                })
            }
        })
    },
    EventHandle: function(t) {
        1 == this.data.activeIndex1 ? 0 == this.data.refresh_top && this.refresh() : 0 == this.data.refresh1_top && this.refresh1()
    },
    thumbs_up: function(t) {
        var a = this,
            e = t.currentTarget.dataset.id,
            n = wx.getStorageSync("users").id,
            i = Number(t.currentTarget.dataset.num);
        app.util.request({
            url: "entry/wxapp/Like",
            cachetime: "0",
            data: {
                information_id: e,
                user_id: n
            },
            success: function(t) {
                1 != t.data ? wx.showModal({
                    title: "提示",
                    content: "不能重复点赞",
                    showCancel: !0,
                    cancelText: "取消",
                    cancelColor: "",
                    confirmText: "确认",
                    confirmColor: "",
                    success: function(t) {},
                    fail: function(t) {},
                    complete: function(t) {}
                }) : (a.reload(), a.setData({
                    thumbs_ups: !0,
                    thumbs_up: i + 1
                }))
            }
        })
    },
    ormatDate: function(t) {
        var a = new Date(1e3 * t);
        return a.getFullYear() + "-" + e(a.getMonth() + 1, 2) + "-" + e(a.getDate(), 2) + " " + e(a.getHours(), 2) + ":" + e(a.getMinutes(), 2) + ":" + e(a.getSeconds(), 2);

        function e(t, a) {
            for (var e = "" + t, n = e.length, i = "", o = a; o-- > n;) i += "0";
            return i + e
        }
    },
    see: function(t) {
        var a = this.data.classification_info,
            e = t.currentTarget.dataset.id;
        for (var n in a) if (a[n].tz.id == e) var i = a[n].tz;
        wx.navigateTo({
            url: "../infodetial/infodetial?id=" + i.id,
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        })
    },
    phone: function(t) {
        var a = t.currentTarget.dataset.id;
        wx.makePhoneCall({
            phoneNumber: a
        })
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        var t = this.data.id,
            a = this.data.tname;
        return console.log(t, a), {
            path: "/zh_tcwq/pages/marry/marry?id=" + t + "&name=" + a,
            success: function(t) {},
            fail: function(t) {}
        }
    }
});