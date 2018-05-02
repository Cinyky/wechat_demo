var app = getApp();
Page({
    data: {
        index: 0,
        types: 1
    },
    onLoad: function(e) {
        wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: wx.getStorageSync("color"),
            animation: {
                duration: 0,
                timingFunc: "easeIn"
            }
        });
        var t = wx.getStorageSync("url");
        this.setData({
            url: t
        }), this.refresh()
    },
    refresh: function(e) {
        var t = this,
            o = wx.getStorageSync("users").id;
        var n, a, i, r = (n = new Date, a = n.getMonth() + 1, i = n.getDate(), a >= 1 && a <= 9 && (a = "0" + a), i >= 0 && i <= 9 && (i = "0" + i), n.getFullYear() + "/" + a + "/" + i + " " + n.getHours() + ":" + n.getMinutes() + ":" + n.getSeconds());
        app.util.request({
            url: "entry/wxapp/MyFootprint",
            cachetime: "0",
            data: {
                user_id: o
            },
            success: function(e) {
                console.log(e);
                var o = e.data;
                for (var n in o) {
                    o[n].time = o[n].time.slice(0, 16), null == o[n].img ? o[n].type = 1 : o[n].type = 2;
                    var a = r,
                        i = o[n].zx_time.replace(/-/g, "/"),
                        s = /(\d{4})-(\d{1,2})-(\d{1,2})( \d{1,2}:\d{1,2})/g,
                        c = Math.abs(Date.parse(a.replace(s, "$2-$3-$1$4")) - Date.parse(i.replace(s, "$2-$3-$1$4"))) / 1e3,
                        u = Math.floor(c / 3600),
                        l = Math.floor(c % 3600 / 60);
                    o[n].m = u, o[n].h = l, console.log(u + " 小时 " + l + " 分钟"), o[n].imgs = o[n].imgs.split(",").slice(0, 3)
                }
                t.setData({
                    info: o,
                    info1: o
                })
            }
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
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.refresh(), wx.stopPullDownRefresh()
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});