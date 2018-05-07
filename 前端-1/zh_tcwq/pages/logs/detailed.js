var app = getApp();
Page({
    data: {},
    onLoad: function(t) {
        var a = this;
        console.log(t);
        var e = t.state;
        wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: wx.getStorageSync("color"),
            animation: {
                duration: 0,
                timingFunc: "easeIn"
            }
        });
        var n = wx.getStorageSync("users").id;
        a.setData({
            state: e
        }), app.util.request({
            url: "entry/wxapp/MyTiXian",
            cachetime: "0",
            data: {
                user_id: n
            },
            success: function(t) {
                console.log(t);
                for (var e in t.data) t.data[e].time = a.ormatDate(t.data[e].time).slice(0, 16), a.setData({
                    detailed: t.data
                })
            }
        }), app.util.request({
            url: "entry/wxapp/Hbmx",
            cachetime: "0",
            data: {
                user_id: n
            },
            success: function(t) {
                for (var e in t.data) t.data[e].time = a.ormatDate(t.data[e].time).slice(0, 16);
                var n = t.data.sort(function(t, a) {
                    return (t = Number(t.time)) < (a = Number(a.time)) ? -1 : t > a ? 1 : 0
                });
                console.log(n), a.setData({
                    detaileds: n
                })
            }
        })
    },
    ormatDate: function(t) {
        var a = new Date(1e3 * t);
        return a.getFullYear() + "-" + e(a.getMonth() + 1, 2) + "-" + e(a.getDate(), 2) + " " + e(a.getHours(), 2) + ":" + e(a.getMinutes(), 2) + ":" + e(a.getSeconds(), 2);

        function e(t, a) {
            for (var e = "" + t, n = e.length, o = "", r = a; r-- > n;) o += "0";
            return o + e
        }
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});