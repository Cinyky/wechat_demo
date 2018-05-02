var app = getApp();
Page({
    data: {
        star2: [{
            img: "../image/star_none.png"
        }, {
            img: "../image/star_none.png"
        }, {
            img: "../image/star_none.png"
        }, {
            img: "../image/star_none.png"
        }, {
            img: "../image/star_none.png"
        }],
        activeIndex: 0,
        sliderOffset: 0,
        sliderLeft: 35,
        tabs: ["收藏的帖子", "收藏的商家"],
        activeIndexe: 0,
        sliderOffsete: 0,
        sliderLefte: 0
    },
    navClick: function(a) {
        this.setData({
            sliderOffsete: a.currentTarget.offsetLeft,
            activeIndexe: a.currentTarget.id
        })
    },
    tabClick: function(a) {
        var t = this;
        console.log(a);
        var e = t.data.classification,
            o = a.currentTarget.id,
            n = e[o].id,
            i = e[o].name;
        console.log(e[o]), this.setData({
            activeIndex: o
        }), app.util.request({
            url: "entry/wxapp/PostList",
            cachetime: "0",
            data: {
                type2_id: n
            },
            success: function(a) {
                console.log(a);
                var e = [];
                for (var o in a.data) a.data[o].type2_name = i, a.data[o].img = a.data[o].img.split(","), null != a.data[o].store_name && e.concat(a.data[o]);
                console.log(e), t.setData({
                    classification_info: e
                })
            }
        })
    },
    onLoad: function(a) {
        console.log(a), wx.setNavigationBarTitle({
            title: a.name
        });
        var t = wx.getStorageSync("url");
        this.setData({
            url: t
        }), this.reload()
    },
    reload: function(a) {
        var t = this,
            e = wx.getStorageSync("users").id;
        console.log(e), app.util.request({
            url: "entry/wxapp/MyCollection",
            cachetime: "0",
            data: {
                user_id: e
            },
            success: function(a) {
                console.log(a);
                var e = [];
                for (var o in a.data) if (null != a.data[o].details) {
                    var n = t.ormatDate(a.data[o].time);
                    a.data[o].img = a.data[o].img.split(","), a.data[o].img.length >= 4 ? a.data[o].img1 = a.data[o].img.slice(0, 4) : a.data[o].img1 = a.data[o].img, a.data[o].time = n.slice(0, 16), e.push(a.data[o])
                }
                console.log(e), t.setData({
                    classification_info: e
                })
            }
        }), app.util.request({
            url: "entry/wxapp/MyStoreCollection",
            cachetime: "0",
            data: {
                user_id: e
            },
            success: function(a) {
                console.log(a);
                var e = t.data.star2;
                console.log(e);
                var o = "../image/xing.png",
                    n = [];
                for (var i in a.data) if (null != a.data[i].store_name) {
                    n.push(a.data[i]);
                    var r = a.data[i].coordinates.split(",");
                    a.data[i].lat2 = Number(wx.getStorageSync("Location").latitude), a.data[i].lng2 = Number(wx.getStorageSync("Location").longitude);
                    var s = Number(wx.getStorageSync("Location").latitude),
                        c = Number(wx.getStorageSync("Location").longitude),
                        l = r[0],
                        d = r[1],
                        g = s * Math.PI / 180,
                        u = l * Math.PI / 180,
                        f = g - u,
                        m = c * Math.PI / 180 - d * Math.PI / 180,
                        h = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(f / 2), 2) + Math.cos(g) * Math.cos(u) * Math.pow(Math.sin(m / 2), 2)));
                    h *= 6378.137;
                    h = (h = Math.round(1e4 * h) / 1e4).toFixed(2);
                    a.data[i].distance = h, a.data[i].star = e, a.data[i].score = parseInt(a.data[i].score), 0 == a.data[i].score ? a.data[i].star = a.data[i].star : 1 == a.data[i].score ? a.data[i].star[0].img = o : 2 == a.data[i].score ? (a.data[i].star[0].img = o, a.data[i].star[1].img = o) : 3 == a.data[i].score ? (a.data[i].star[0].img = o, a.data[i].star[1].img = o, a.data[i].star[2].img = o) : 4 == a.data[i].score ? (a.data[i].star[0].img = o, a.data[i].star[1].img = o, a.data[i].star[2].img = o, a.data[i].star[3].img = o) : 5 == a.data[i].score && (a.data[i].star[0].img = o, a.data[i].star[1].img = o, a.data[i].star[2].img = o, a.data[i].star[3].img = o, a.data[i].star[4].img = o), console.log(n), t.setData({
                        sellers: n
                    })
                }
            }
        })
    },
    ormatDate: function(a) {
        var t = new Date(1e3 * a);
        return t.getFullYear() + "-" + e(t.getMonth() + 1, 2) + "-" + e(t.getDate(), 2) + " " + e(t.getHours(), 2) + ":" + e(t.getMinutes(), 2) + ":" + e(t.getSeconds(), 2);

        function e(a, t) {
            for (var e = "" + a, o = e.length, n = "", i = t; i-- > o;) n += "0";
            return n + e
        }
    },
    store: function(a) {
        console.log(a);
        var t = a.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../sellerinfo/sellerinfo?id=" + t,
            success: function(a) {},
            fail: function(a) {},
            complete: function(a) {}
        })
    },
    see: function(a) {
        console.log(a), console.log(this.data);
        var t = this.data.classification_info,
            e = a.currentTarget.dataset.id;
        for (var o in t) if (t[o].id == e) var n = t[o];
        console.log(n), wx.navigateTo({
            url: "../infodetial/infodetial?id=" + n.information_id,
            success: function(a) {},
            fail: function(a) {},
            complete: function(a) {}
        })
    },
    phone: function(a) {
        var t = a.currentTarget.dataset.id;
        wx.makePhoneCall({
            phoneNumber: t
        })
    },
    phone1: function(a) {
        console.log(a);
        var t = a.currentTarget.dataset.tel;
        wx.makePhoneCall({
            phoneNumber: t
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
        })
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.reload(), wx.stopPullDownRefresh()
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});