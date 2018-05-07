var app = getApp();
Page({
    data: {
        luntext: ["最新收录", "热门推荐", "附近发现"],
        activeIndex: 0,
        sliderOffset: 0,
        sliderLeft: 35,
        currentTab: 0,
        swiperCurrent: 0,
        indicatorDots: !1,
        autoplay: !0,
        interval: 5e3,
        duration: 1e3
    },
    swiperChange: function(t) {
        this.setData({
            swiperCurrent: t.detail.current
        })
    },
    onLoad: function(t) {
        var e = wx.getStorageSync("url");
        this.setData({
            url: e
        }), this.refresh()
    },
    refresh: function(t) {
        var e = this,
            n = wx.getStorageSync("users").id;
        app.util.request({
            url: "entry/wxapp/MyYellowPage",
            cachetime: "0",
            data: {
                user_id: n
            },
            success: function(t) {
                for (var n in console.log(t), t.data) {
                    var a = t.data[n].coordinates.split(",");
                    t.data[n].lat2 = Number(wx.getStorageSync("Location").latitude), t.data[n].lng2 = Number(wx.getStorageSync("Location").longitude);
                    var o = Number(wx.getStorageSync("Location").latitude),
                        i = Number(wx.getStorageSync("Location").longitude),
                        r = a[0],
                        u = a[1],
                        s = o * Math.PI / 180,
                        c = r * Math.PI / 180,
                        l = s - c,
                        d = i * Math.PI / 180 - u * Math.PI / 180,
                        f = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(l / 2), 2) + Math.cos(s) * Math.cos(c) * Math.pow(Math.sin(d / 2), 2)));
                    f *= 6378.137;
                    f = (f = Math.round(1e4 * f) / 1e4).toFixed(2);
                    t.data[n].distance = f
                }
                e.setData({
                    yellow_list: t.data
                })
            }
        })
    },
    yellow_info: function(t) {
        var e = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "yellowinfo?id=" + e,
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        })
    },
    store_type_id: function(t) {
        var e = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../store/business?id=" + e,
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        })
    },
    shouye: function(t) {
        wx.switchTab({
            url: "../index/index"
        })
    },
    yellow: function(t) {
        wx.reLaunch({
            url: "yellow"
        })
    },
    settled: function(t) {
        wx.navigateTo({
            url: "settled"
        })
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.reload(), wx.stopPullDownRefresh()
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});