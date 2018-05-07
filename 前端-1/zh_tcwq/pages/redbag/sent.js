var app = getApp();
Page({
    data: {
        header: ["全部", "进行中", "已结束"],
        index: 0,
        activeIndex: 0
    },
    onLoad: function(e) {
        wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: wx.getStorageSync("color"),
            animation: {
                duration: 0,
                timingFunc: "easeIn"
            }
        }), this.setData({
            user_id: e.user_id
        }), this.reload()
    },
    reload: function(e) {
        var t = this,
            n = t.data.user_id,
            o = wx.getStorageSync("url");
        app.util.request({
            url: "entry/wxapp/MyPost2",
            cachetime: "0",
            data: {
                user_id: n
            },
            success: function(e) {
                var n = e.data,
                    a = [],
                    i = [],
                    r = [],
                    u = function(e) {
                        n[e].time = t.ormatDate(n[e].time).slice(0, 16), n[e].img = n[e].img.split(","), n[e].img.length >= 3 ? n[e].img = n[e].img.splice(0, 3) : n[e].img = n[e].img, c = 0, c = 1 == n[e].hb_random ? Number(n[e].hb_money) : Number(n[e].hb_money) * Number(n[e].hb_num), n[e].moneys = c, 0 != n[e].hb_money && app.util.request({
                            url: "entry/wxapp/HongList",
                            cachetime: "0",
                            data: {
                                id: n[e].id
                            },
                            success: function(u) {
                                console.log(u);
                                var s = 0;
                                for (var c in u.data) s += Number(u.data[c].money);
                                n[e].price = s.toFixed(2), Number(n[e].hb_num) == u.data.length ? (n[e].rob = !1, r.push(n[e])) : (n[e].rob = !0, i.push(n[e])), n[e].honglist = u.data, a.push(n[e]), console.log(n[e]), t.setData({
                                    slide: a,
                                    url: o,
                                    slide1: i,
                                    slide2: r
                                })
                            }
                        })
                    };
                for (var s in n) {
                    var c;
                    u(s)
                }
            }
        })
    },
    header: function(e) {
        console.log(e);
        var t = e.currentTarget.id;
        this.setData({
            index: t,
            activeIndex: t
        })
    },
    ormatDate: function(e) {
        var t = new Date(1e3 * e);
        return t.getFullYear() + "-" + n(t.getMonth() + 1, 2) + "-" + n(t.getDate(), 2) + " " + n(t.getHours(), 2) + ":" + n(t.getMinutes(), 2) + ":" + n(t.getSeconds(), 2);

        function n(e, t) {
            for (var n = "" + e, o = n.length, a = "", i = t; i-- > o;) a += "0";
            return a + n
        }
    },
    redinfo: function(e) {
        console.log(e);
        var t = e.currentTarget.dataset.id,
            n = e.currentTarget.dataset.logo;
        wx.navigateTo({
            url: "redinfo/redinfo?store_id=" + t + "&logo=" + n
        })
    },
    fabu: function(e) {
        wx.navigateTo({
            url: "welfare",
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        })
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});