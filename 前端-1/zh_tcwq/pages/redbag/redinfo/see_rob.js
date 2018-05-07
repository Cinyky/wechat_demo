var app = getApp();
Page({
    data: {},
    onLoad: function(t) {
        var o = wx.getStorageSync("users");
        console.log(o), wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: "#d95940",
            animation: {
                duration: 0,
                timingFunc: "easeIn"
            }
        });
        var a = wx.getStorageSync("url");
        this.setData({
            id: t.id,
            user_info: o,
            url: a
        }), this.refresh()
    },
    onReady: function() {},
    refresh: function(t) {
        var o = this;
        app.util.request({
            url: "entry/wxapp/PostInfo",
            cachetime: "0",
            data: {
                id: o.data.id
            },
            success: function(t) {
                console.log(t);
                var a = t.data.tz;
                Number(t.data.tz.hb_num);
                a.img = a.img.split(","), 1 == a.hb_random ? a.hb_money = Number(a.hb_money) : a.hb_money = Number(a.hb_money) * Number(a.hb_num), "" == a.hb_keyword ? o.setData({
                    sure: !0
                }) : o.setData({
                    sure: !1
                }), app.util.request({
                    url: "entry/wxapp/HongList",
                    cachetime: "0",
                    data: {
                        id: t.data.tz.id
                    },
                    success: function(t) {
                        console.log(t);
                        var e = t.data,
                            n = 0;
                        for (var r in e) e[r].time = app.ormatDate(e[r].time).slice(5, 16), n += Number(e[r].money);
                        var i = a.hb_money - n;
                        console.log(i), console.log(n), o.setData({
                            hongbao: e,
                            total_comment: i.toFixed(2),
                            total_num: e.length
                        })
                    }
                }), console.log(t.data.pl), a.hb_money = Number(a.hb_money).toFixed(2), a.trans1 = 1, a.trans2 = 1, a.dis1 = "block", a.trans_1 = 2, a.trans_2 = 1, o.setData({
                    store: a,
                    criticism: t.data.pl,
                    label: t.data.label
                })
            }
        })
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});