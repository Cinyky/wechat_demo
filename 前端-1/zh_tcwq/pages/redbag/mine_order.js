var app = getApp();
Page({
    data: {
        array: ["待付款", "待发货", "待收货", "已完成", "售后/退款"],
        activeIndex: 0,
        index: 0
    },
    onLoad: function(t) {
        var a = wx.getStorageSync("url");
        null != t.activeIndex && this.setData({
            activeIndex: t.activeIndex,
            store_id: t.store_id
        }), this.setData({
            url: a
        }), this.refresh()
    },
    refresh: function() {
        var t = this,
            a = t.data.activeIndex,
            e = t.data.store_id;
        app.util.request({
            url: "entry/wxapp/StoreOrder",
            cachetime: "0",
            data: {
                store_id: e
            },
            success: function(e) {
                console.log(e);
                var o = [],
                    r = [],
                    s = [],
                    n = [],
                    d = [];
                for (var i in e.data) e.data[i].time = app.ormatDate(e.data[i].time), 1 == e.data[i].state ? o.push(e.data[i]) : 2 == e.data[i].state ? r.push(e.data[i]) : 3 == e.data[i].state ? s.push(e.data[i]) : 4 == e.data[i].state ? n.push(e.data[i]) : 5 != e.data[i].state && 6 != e.data[i].state && 7 != e.data[i].state || d.push(e.data[i]);
                console.log(o), 0 == a ? t.setData({
                    order: o
                }) : 1 == a ? t.setData({
                    order: r
                }) : 2 == a ? t.setData({
                    order: s
                }) : 3 == a ? t.setData({
                    order: n
                }) : 4 == a && t.setData({
                    order: d
                }), console.log(o)
            }
        })
    },
    select: function(t) {
        console.log(t);
        var a = this,
            e = a.data.store_id,
            o = t.currentTarget.dataset.index;
        app.util.request({
            url: "entry/wxapp/StoreOrder",
            cachetime: "0",
            data: {
                store_id: e
            },
            success: function(t) {
                console.log(t);
                var e = [],
                    r = [],
                    s = [],
                    n = [],
                    d = [];
                for (var i in t.data) t.data[i].time = app.ormatDate(t.data[i].time), 1 == t.data[i].state ? e.push(t.data[i]) : 2 == t.data[i].state ? r.push(t.data[i]) : 3 == t.data[i].state ? s.push(t.data[i]) : 4 == t.data[i].state ? n.push(t.data[i]) : 5 != t.data[i].state && 6 != t.data[i].state && 7 != t.data[i].state || d.push(t.data[i]);
                console.log(e), 0 == o ? a.setData({
                    order: e
                }) : 1 == o ? a.setData({
                    order: r
                }) : 2 == o ? a.setData({
                    order: s
                }) : 3 == o ? a.setData({
                    order: n
                }) : 4 == o && a.setData({
                    order: d
                })
            }
        }), a.setData({
            activeIndex: o,
            index: o
        })
    },
    order_info: function(t) {
        console.log(t);
        var a = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "mine_order_info?id=" + a,
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
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