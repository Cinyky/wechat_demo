var app = getApp();
Page({
    data: {
        index: 0,
        types: 1
    },
    onLoad: function(e) {
        var t = this;
        wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: wx.getStorageSync("color"),
            animation: {
                duration: 0,
                timingFunc: "easeIn"
            }
        });
        var n = wx.getStorageSync("url");
        t.setData({
            url: n
        }), t.refresh()
    },
    refresh: function(e) {
        var t = this,
            n = wx.getStorageSync("users").id,
            o = function() {
                var e = new Date,
                    t = e.getMonth() + 1,
                    n = e.getDate();
                return t >= 1 && t <= 9 && (t = "0" + t), n >= 0 && n <= 9 && (n = "0" + n), e.getFullYear() + "/" + t + "/" + n + " " + e.getHours() + ":" + e.getMinutes() + ":" + e.getSeconds()
            }();
        app.util.request({
            url: "entry/wxapp/MyFootprint",
            cachetime: "0",
            data: {
                user_id: n
            },
            success: function(e) {
                console.log(e);
                var n = e.data;
                for (var a in n) {
                    n[a].time = n[a].time.slice(0, 16), null == n[a].img ? n[a].type = 1 : n[a].type = 2;
                    var r = o,
                        i = n[a].zx_time.replace(/-/g, "/"),
                        s = /(\d{4})-(\d{1,2})-(\d{1,2})( \d{1,2}:\d{1,2})/g,
                        c = Math.abs(Date.parse(r.replace(s, "$2-$3-$1$4")) - Date.parse(i.replace(s, "$2-$3-$1$4"))) / 1e3,
                        u = Math.floor(c / 3600),
                        f = Math.floor(c % 3600 / 60);
                    n[a].m = u, n[a].h = f, console.log(u + " 小时 " + f + " 分钟"), n[a].imgs = n[a].imgs.split(",").slice(0, 3)
                }
                t.setData({
                    info: n,
                    info1: n
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