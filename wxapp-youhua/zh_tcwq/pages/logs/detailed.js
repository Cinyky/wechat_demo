var app = getApp();

Page({
    data: {},
    onLoad: function(t) {
        var n = this;
        console.log(t);
        var a = t.state;
        wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: wx.getStorageSync("color"),
            animation: {
                duration: 0,
                timingFunc: "easeIn"
            }
        });
        var e = wx.getStorageSync("users").id;
        n.setData({
            state: a
        }), app.util.request({
            url: "entry/wxapp/MyTiXian",
            cachetime: "0",
            data: {
                user_id: e
            },
            success: function(t) {
                console.log(t);
                for (var a in t.data) t.data[a].time = n.ormatDate(t.data[a].time).slice(0, 16), 
                n.setData({
                    detailed: t.data
                });
            }
        }), app.util.request({
            url: "entry/wxapp/Hbmx",
            cachetime: "0",
            data: {
                user_id: e
            },
            success: function(t) {
                for (var a in t.data) t.data[a].time = n.ormatDate(t.data[a].time).slice(0, 16);
                var e = t.data.sort(function(t, a) {
                    return (t = Number(t.time)) < (a = Number(a.time)) ? -1 : a < t ? 1 : 0;
                });
                console.log(e), n.setData({
                    detaileds: e
                });
            }
        });
    },
    ormatDate: function(t) {
        var a = new Date(1e3 * t);
        return a.getFullYear() + "-" + e(a.getMonth() + 1, 2) + "-" + e(a.getDate(), 2) + " " + e(a.getHours(), 2) + ":" + e(a.getMinutes(), 2) + ":" + e(a.getSeconds(), 2);
        function e(t, a) {
            for (var e = "" + t, n = e.length, o = "", r = a; r-- > n; ) o += "0";
            return o + e;
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