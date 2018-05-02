var many_city = require("../../utils/many_city.js"),
    app = getApp();
Page({
    data: {
        showLetter: "",
        winHeight: 0,
        tHeight: 0,
        bHeight: 0,
        startPageY: 0,
        cityList: [],
        isShowLetter: !1,
        scrollTop: 0,
        city: "",
        activeIndex: "A",
        index: "A",
        result: [],
        activeIndex1: 0,
        activeIndex2: 0,
        activeIndex3: 0
    },
    onLoad: function(e) {
        var t = this,
            a = many_city.city[0].cityList,
            n = a[0].areaList;
        console.log(a, n), t.setData({
            many_city: many_city.city,
            province_city: a,
            province_area: n
        }), wx.getSystemInfo({
            success: function(e) {
                t.setData({
                    windowHeight: e.windowHeight,
                    search_top: 0
                })
            }
        }), wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: wx.getStorageSync("color"),
            animation: {
                duration: 0,
                timingFunc: "easeIn"
            }
        })
    },
    refresh: function(e) {
        var t = this.data.value,
            a = this.data.sz;
        if ("" != t) var n = a.filter(function(e) {
            return e.indexOf(t) >= 0
        });
        else n = [];
        this.setData({
            result: n
        })
    },
    selectMenu: function(e) {
        this.setData({
            activeIndex2: 0,
            activeIndex3: 0
        });
        var t = many_city.city,
            a = e.currentTarget.dataset.itemIndex;
        console.log(a);
        var n = t[a].cityList,
            i = n[0].areaList;
        console.log(n, i), this.setData({
            index_one: a,
            activeIndex1: a,
            province_city: n,
            province_area: i
        })
    },
    selectMenu_city: function(e) {
        this.setData({
            activeIndex3: 0
        }), console.log(e);
        var t = e.currentTarget.dataset.itemIndex;
        console.log(t);
        var a = this.data.province_city,
            n = a[t];
        console.log(a, n), this.setData({
            activeIndex2: t,
            province_area: n.areaList
        })
    },
    selectMenu_area: function(e) {
        console.log(e);
        var t = this.data.province_area,
            a = e.currentTarget.dataset.itemIndex;
        console.log(a, t), this.setData({
            activeIndex3: a,
            area: t[a]
        })
    },
    xzcs: function() {
        var e = this.data.activeIndex1,
            t = this.data.activeIndex2;
        console.log(e, t, this.data.many_city[e].name);
        var a, n = ["北京", "上海", "天津", "重庆"];
        if (-1 == n.indexOf(this.data.many_city[e].name)) {
            if (console.log("省"), console.log(this.data.province_city[t].name), "省直辖县级行政单位" == this.data.province_city[t].name || "省直辖行政单位" == this.data.province_city[t].name) return wx.showModal({
                title: "提示",
                content: "请选择有效的城市"
            }), !1;
            a = this.data.province_city[t].name
        } else console.log(n.indexOf(this.data.many_city[e].name)), console.log("直辖市", this.data.many_city[e].name), a = this.data.many_city[e].name + "市";
        console.log(a), wx.setStorageSync("city", a);
        var i = getCurrentPages(),
            c = (i[i.length - 1], i[i.length - 2]);
        c.setData({
            city: a,
            page: 1,
            activeIndex: 0,
            swipecurrent: 0,
            seller: []
        }), c.reload(), c.refresh(), c.seller(), wx.setStorageSync("city_type", 1), wx.navigateBack({
            url: "index"
        })
    },
    xzqx: function() {
        var e, t = this.data.activeIndex1,
            a = this.data.activeIndex2,
            n = this.data.activeIndex3;
        if (console.log(t, a, n, this.data.province_area[n]), "市辖区" == this.data.province_area[n]) return wx.showModal({
            title: "提示",
            content: "请选择有效的区县"
        }), !1;
        e = this.data.province_area[n], console.log(e), wx.setStorageSync("city", e);
        var i = getCurrentPages(),
            c = (i[i.length - 1], i[i.length - 2]);
        c.setData({
            city: e,
            page: 1,
            activeIndex: 0,
            swipecurrent: 0,
            seller: []
        }), c.reload(), c.refresh(), c.seller(), wx.setStorageSync("city_type", 1), wx.navigateBack({
            url: "index"
        })
    },
    select_city: function(e) {
        var t = e.currentTarget.dataset.city + "市";
        wx.setStorageSync("city", t), app.util.request({
            url: "entry/wxapp/SaveHotCity",
            cachetime: "0",
            data: {
                cityname: t,
                user_id: wx.getStorageSync("users").id
            },
            success: function(e) {
                console.log(e)
            }
        });
        var a = getCurrentPages(),
            n = (a[a.length - 1], a[a.length - 2]);
        n.setData({
            city: t,
            page: 1,
            activeIndex: 0,
            swipecurrent: 0,
            seller: []
        }), n.reload(), n.refresh(), n.seller(), wx.setStorageSync("city_type", 1), wx.navigateBack({
            url: "index"
        })
    },
    select_citys: function(e) {
        var t = e.currentTarget.dataset.city + "市";
        wx.setStorageSync("city", t), app.util.request({
            url: "entry/wxapp/SaveHotCity",
            cachetime: "0",
            data: {
                cityname: t,
                user_id: wx.getStorageSync("users").id
            },
            success: function(e) {
                console.log(e)
            }
        });
        var a = getCurrentPages(),
            n = (a[a.length - 1], a[a.length - 2]);
        n.setData({
            city: t,
            page: 1,
            activeIndex: 0,
            swipecurrent: 0,
            seller: []
        }), n.reload(), n.refresh(), n.seller(), wx.setStorageSync("city_type", 1), wx.navigateBack({
            url: "index"
        })
    },
    search: function(e) {
        console.log(e);
        var t = e.detail.value;
        this.setData({
            value: t
        }), this.refresh()
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return {
            title: "title",
            desc: "desc",
            path: "path"
        }
    }
});