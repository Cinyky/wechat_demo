var app = getApp();
Page({
    data: {},
    redinfo: function(o) {
        console.log(o);
        var e = o.currentTarget.dataset.id,
            n = o.currentTarget.dataset.logo;
        wx.navigateTo({
            url: "redinfo/redinfo?store_id=" + e + "&logo=" + n
        })
    },
    onLoad: function(o) {
        wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: wx.getStorageSync("color"),
            animation: {
                duration: 0,
                timingFunc: "easeIn"
            }
        });
        var e = wx.getStorageSync("url");
        this.setData({
            url: e
        }), this.reload()
    },
    reload: function(o) {
        var e = this;
        app.util.request({
            url: "entry/wxapp/RedPaperList",
            cachetime: "0",
            success: function(o) {
                console.log(o);
                var n = o.data,
                    t = 0,
                    a = 0,
                    i = 0,
                    r = function(o) {
                        a += Number(n[o].views), i += Number(n[o].hbfx_num), console.log(n[o].details), n[o].img = n[o].img.split(","), n[o].img.length >= 4 ? n[o].img = n[o].img.splice(0, 4) : n[o].img = n[o].img, 1 == n[o].hb_random ? n[o].hb_money = Number(n[o].hb_money) : n[o].hb_money = (Number(n[o].hb_money) * Number(n[o].hb_num)).toFixed(2), t += Number(n[o].hb_money), app.util.request({
                            url: "entry/wxapp/HongList",
                            cachetime: "0",
                            data: {
                                id: n[o].id
                            },
                            success: function(r) {
                                console.log(r), Number(n[o].hb_num) <= r.data.length ? n[o].rob = !1 : n[o].rob = !0, console.log(n), e.setData({
                                    store: n,
                                    Congratulations: r.data,
                                    price: t.toFixed(2),
                                    views: a,
                                    givelike: i
                                })
                            }
                        })
                    };
                for (var u in n) r(u)
            }
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