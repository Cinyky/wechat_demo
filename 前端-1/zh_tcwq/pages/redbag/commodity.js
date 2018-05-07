var app = getApp();
Page({
    data: {
        array: ["全部", "新品上架", "热门商品"],
        activeindex: 0,
        index: 0
    },
    onLoad: function(t) {
        wx.hideShareMenu({});
        var e = t.store_id;
        this.setData({
            store_id: e
        }), this.refresh()
    },
    refresh: function(t) {
        var e = this,
            o = wx.getStorageSync("url"),
            n = e.data.activeindex,
            i = e.data.store_id;
        app.util.request({
            url: "entry/wxapp/StoreGoodList",
            cachetime: "0",
            data: {
                store_id: i
            },
            success: function(t) {
                console.log(t);
                var i = t.data;
                for (var a in i) i[a].lb_imgs = i[a].lb_imgs.split(",")[0];
                var s = t.data;
                s.sort(function(t, e) {
                    return Date.parse(e.time) - Date.parse(t.time)
                }), console.log(s), 0 == n ? e.setData({
                    store_shop: i,
                    url: o
                }) : 1 == n && e.setData({
                    store_shop: s,
                    url: o
                })
            }
        })
    },
    select: function(t) {
        console.log(t);
        var e = t.currentTarget.dataset.index;
        this.setData({
            activeindex: e,
            index: e
        }), this.refresh()
    },
    modify: function(t) {
        console.log(t);
        var e = t.currentTarget.dataset.id,
            o = this.data.store_id;
        wx.navigateTo({
            url: "modify?id=" + e + "&store_id=" + o,
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        })
    },
    shelves: function(t) {
        var e = this,
            o = t.currentTarget.dataset.id;
        console.log(o), app.util.request({
            url: "entry/wxapp/UpGood",
            cachetime: "0",
            data: {
                good_id: o
            },
            success: function(t) {
                console.log(t), 1 == t.data && (wx.showToast({
                    title: "上架成功",
                    icon: "",
                    image: "",
                    duration: 2e3,
                    mask: !0,
                    success: function(t) {},
                    fail: function(t) {},
                    complete: function(t) {}
                }), setTimeout(function() {
                    e.refresh()
                }, 2e3)), 2 == t.data && wx.showToast({
                    title: "商品已经上架",
                    icon: "",
                    image: "",
                    duration: 2e3,
                    mask: !0,
                    success: function(t) {},
                    fail: function(t) {},
                    complete: function(t) {}
                })
            }
        })
    },
    shelf: function(t) {
        var e = this,
            o = t.currentTarget.dataset.id;
        app.util.request({
            url: "entry/wxapp/DownGood",
            cachetime: "0",
            data: {
                good_id: o
            },
            success: function(t) {
                console.log(t), 1 == t.data && (wx.showToast({
                    title: "下架成功",
                    icon: "",
                    image: "",
                    duration: 2e3,
                    mask: !0,
                    success: function(t) {},
                    fail: function(t) {},
                    complete: function(t) {}
                }), setTimeout(function() {
                    e.refresh()
                }, 2e3)), 2 == t.data && wx.showToast({
                    title: "商品已经下架",
                    icon: "",
                    image: "",
                    duration: 2e3,
                    mask: !0,
                    success: function(t) {},
                    fail: function(t) {},
                    complete: function(t) {}
                })
            }
        })
    },
    delgood: function(t) {
        var e = this,
            o = t.currentTarget.dataset.id;
        wx.showModal({
            title: "提示",
            content: "确定删除吗？",
            success: function(t) {
                t.confirm ? (console.log("用户点击确定"), app.util.request({
                    url: "entry/wxapp/DelGood",
                    cachetime: "0",
                    data: {
                        good_id: o
                    },
                    success: function(t) {
                        console.log(t), wx.showToast({
                            title: "删除成功",
                            icon: "",
                            image: "",
                            duration: 2e3,
                            mask: !0,
                            success: function(t) {},
                            fail: function(t) {},
                            complete: function(t) {}
                        }), setTimeout(function() {
                            e.refresh()
                        }, 2e3)
                    }
                })) : t.cancel && console.log("用户点击取消")
            }
        })
    },
    onReady: function() {},
    onShow: function() {
        wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: wx.getStorageSync("color"),
            animation: {
                duration: 0,
                timingFunc: "easeIn"
            }
        }), this.refresh()
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.refresh(), wx.stopPullDownRefresh()
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});