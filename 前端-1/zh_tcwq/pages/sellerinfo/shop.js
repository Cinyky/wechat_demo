var app = getApp();
Page({
    data: {
        array: ["全部", "新品上架", "热门商品"],
        activeindex: 0,
        index: 0
    },
    onLoad: function(t) {
        console.log(t);
        var o = t.store_id;
        this.setData({
            store_id: o
        }), this.refresh()
    },
    refresh: function(t) {
        var o = this,
            e = wx.getStorageSync("url"),
            n = (o.data.activeindex, o.data.store_id);
        app.util.request({
            url: "entry/wxapp/StoreGoodList",
            cachetime: "0",
            data: {
                store_id: n
            },
            success: function(t) {
                console.log(t);
                var n = t.data;
                for (var i in n) n[i].lb_imgs = n[i].lb_imgs.split(",")[0];
                o.setData({
                    store_shop: n,
                    shop: n,
                    url: e
                })
            }
        })
    },
    select: function(t) {
        console.log(t);
        var o = t.currentTarget.dataset.index,
            e = this.data.shop;
        if (this.setData({
            activeindex: o,
            index: o
        }), 2 == o) {
            e = e.sort(function(t, o) {
                return (t = Number(t.sales)) > (o = Number(o.sales)) ? -1 : t < o ? 1 : 0
            });
            this.setData({
                store_shop: e
            })
        }
        1 == o && this.refresh(), 0 == o && this.refresh()
    },
    modify: function(t) {
        console.log(t);
        var o = t.currentTarget.dataset.id,
            e = this.data.store_id;
        wx.navigateTo({
            url: "modify?id=" + o + "&store_id=" + e,
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        })
    },
    goods_info: function(t) {
        console.log(t);
        var o = this.data.store_id,
            e = t.currentTarget.id;
        wx.navigateTo({
            url: "good_info?id=" + e + "&store_id=" + o,
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