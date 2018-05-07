var app = getApp(),
    searchTitle = "";
Page({
    data: {
        scrollTop: 0,
        inputShowed: !1,
        inputVal: "",
        searchLogShowed: !0,
        refresh_top: !1,
        seller: [],
        page: 1
    },
    showInput: function() {
        this.setData({
            inputShowed: !0,
            searchLogShowed: !0
        })
    },
    searchData: function() {
        console.log(searchTitle);
        this.setData({
            refresh_top: !1,
            seller: [],
            page: 1
        }), "" != searchTitle ? (this.refresh(searchTitle), this.setData({
            djss: !0
        })) : wx.showToast({
            title: "搜索内容为空",
            icon: "loading",
            duration: 1e3
        })
    },
    clearInput: function() {
        this.setData({
            inputVal: ""
        }), searchTitle = ""
    },
    inputTyping: function(t) {
        this.setData({
            inputVal: t.detail.value,
            searchLogShowed: !0
        }), searchTitle = t.detail.value
    },
    onLoad: function(t) {
        console.log("onLoad");
        var a = this;
        wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: wx.getStorageSync("color"),
            animation: {
                duration: 0,
                timingFunc: "easeIn"
            }
        }), app.util.request({
            url: "entry/wxapp/Url",
            cachetime: "0",
            success: function(t) {
                a.setData({
                    url: t.data,
                    color: wx.getStorageSync("color")
                })
            }
        })
    },
    see: function(t) {
        this.data.seller;
        var a = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../infodetial/infodetial?id=" + a,
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        })
    },
    previewImage: function(t) {
        console.log(t);
        var a = t.currentTarget.dataset.id,
            e = this.data.url,
            o = [],
            n = t.currentTarget.dataset.inde,
            r = this.data.seller;
        for (var i in r) if (r[i].tz.id == a) {
            var s = r[i].tz.img;
            for (var l in s) o.push(e + s[l]);
            wx.previewImage({
                current: e + s[n],
                urls: o
            })
        }
    },
    phone: function(t) {
        var a = t.currentTarget.dataset.id;
        wx.makePhoneCall({
            phoneNumber: a
        })
    },
    refresh: function(t) {
        console.log(t);
        var a = this,
            e = (wx.getStorageSync("city"), a.data.page),
            o = a.data.seller;
        console.log(o, e), app.util.request({
            url: "entry/wxapp/list2",
            cachetime: "0",
            data: {
                keywords: t,
                page: e
            },
            success: function(t) {
                for (var n in a.setData({
                    page: e + 1,
                    djss: !1
                }), console.log(t), t.data.length < 10 ? a.setData({
                    refresh_top: !0
                }) : a.setData({
                    refresh_top: !1
                }), o = function(t) {
                    for (var a = [], e = 0; e < t.length; e++) - 1 == a.indexOf(t[e]) && a.push(t[e]);
                    return a
                }(o = o.concat(t.data)), t.data) {
                    var r = app.ormatDate(t.data[n].tz.sh_time);
                    t.data[n].tz.img = t.data[n].tz.img.split(","), t.data[n].tz.details = t.data[n].tz.details.replace("?", " "), t.data[n].tz.img.length > 4 && (t.data[n].tz.img_length = Number(t.data[n].tz.img.length) - 4), t.data[n].tz.img.length >= 4 ? t.data[n].tz.img1 = t.data[n].tz.img.slice(0, 4) : t.data[n].tz.img1 = t.data[n].tz.img, t.data[n].tz.time = r.slice(0, 16)
                }
                for (var i in o) {
                    for (var s in o[i].label) o[i].label[s].number = "rgb(" + Math.floor(255 * Math.random()) + "," + Math.floor(255 * Math.random()) + "," + Math.floor(255 * Math.random()) + ")";
                    a.setData({
                        seller: o
                    })
                }
            }
        })
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {
        0 == this.data.refresh_top && this.refresh(searchTitle)
    },
    onShareAppMessage: function() {}
});