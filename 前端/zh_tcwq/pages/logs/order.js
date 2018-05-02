var app = getApp();
Page({
    data: {
        luntext: ["待付款", "待发货", "待收货", "已完成", "退货/售后"],
        activeIndex: 0,
        sliderOffset: 0,
        sliderLeft: 35
    },
    onLoad: function(t) {
        var e = wx.getStorageSync("url");
        null == t.activeIndex ? this.setData({
            activeIndex: 0,
            url: e
        }) : this.setData({
            activeIndex: t.activeIndex,
            url: e
        }), this.refresh()
    },
    refresh: function(t) {
        var e = this;
        var a, r, o, n = (a = new Date, r = a.getMonth() + 1, o = a.getDate(), r >= 1 && r <= 9 && (r = "0" + r), o >= 0 && o <= 9 && (o = "0" + o), a.getFullYear() + "-" + r + "-" + o + " " + a.getHours() + ":" + a.getMinutes() + ":" + a.getSeconds()).slice(0, 10);

        function s(t, e) {
            var a = new Date(t),
                r = new Date(a.getFullYear(), a.getMonth(), a.getDate() + e);
            a.getFullYear(), a.getMonth(), a.getDate();
            return r.getFullYear() + "-" + (r.getMonth() + 1) + "-" + r.getDate()
        }
        var c = e.data.activeIndex,
            i = wx.getStorageSync("users").id;
        app.util.request({
            url: "entry/wxapp/MyOrder",
            cachetime: "0",
            data: {
                user_id: i
            },
            success: function(t) {
                console.log(t);
                var a = [],
                    r = [],
                    o = [],
                    i = [],
                    d = [];
                for (var u in t.data) t.data[u].time = app.ormatDate(t.data[u].time), 1 == t.data[u].state ? a.push(t.data[u]) : 2 == t.data[u].state ? r.push(t.data[u]) : 3 == t.data[u].state ? (t.data[u].time = s(t.data[u].time, 7), console.log(n), t.data[u].time >= n ? console.log(t.data[u]) : app.util.request({
                    url: "entry/wxapp/CompleteOrder",
                    cachetime: "0",
                    data: {
                        order_id: t.data[u].id
                    },
                    success: function(t) {
                        console.log(t), e.refresh()
                    }
                }), o.push(t.data[u])) : 4 == t.data[u].state ? i.push(t.data[u]) : 5 != t.data[u].state && 6 != t.data[u].state && 7 != t.data[u].state || d.push(t.data[u]);
                0 == c ? e.setData({
                    order: a
                }) : 1 == c ? e.setData({
                    order: r
                }) : 2 == c ? e.setData({
                    order: o
                }) : 3 == c ? e.setData({
                    order: i
                }) : 4 == c && e.setData({
                    order: d
                }), console.log(a)
            }
        })
    },
    tabClick: function(t) {
        var e = this,
            a = t.currentTarget.id,
            r = wx.getStorageSync("users").id;
        app.util.request({
            url: "entry/wxapp/MyOrder",
            cachetime: "0",
            data: {
                user_id: r
            },
            success: function(t) {
                var r = [],
                    o = [],
                    n = [],
                    s = [],
                    c = [];
                for (var i in t.data) 1 == t.data[i].state && r.push(t.data[i]), 2 == t.data[i].state && o.push(t.data[i]), 3 == t.data[i].state && n.push(t.data[i]), 4 == t.data[i].state && s.push(t.data[i]), 5 != t.data[i].state && 6 != t.data[i].state && 7 != t.data[i].state || c.push(t.data[i]);
                0 == a ? e.setData({
                    order: r
                }) : 1 == a ? e.setData({
                    order: o
                }) : 2 == a ? e.setData({
                    order: n
                }) : 3 == a ? e.setData({
                    order: s
                }) : 4 == a && e.setData({
                    order: c
                })
            }
        }), e.setData({
            sliderOffset: t.currentTarget.offsetLeft,
            activeIndex: t.currentTarget.id
        })
    },
    complete: function(t) {
        var e = this;
        console.log(t);
        var a = t.currentTarget.dataset.id;
        app.util.request({
            url: "entry/wxapp/CompleteOrder",
            cachetime: "0",
            data: {
                order_id: a
            },
            success: function(t) {
                console.log(t), e.refresh()
            }
        })
    },
    toorder: function(t) {
        var e = this;
        console.log(t);
        var a = t.currentTarget.dataset.id;
        app.util.request({
            url: "entry/wxapp/TuOrder",
            cachetime: "0",
            data: {
                order_id: a
            },
            success: function(t) {
                console.log(t), e.refresh()
            }
        })
    },
    delorder: function(t) {
        var e = this;
        console.log(t);
        var a = t.currentTarget.dataset.id;
        app.util.request({
            url: "entry/wxapp/DelOrder",
            cachetime: "0",
            data: {
                order_id: a
            },
            success: function(t) {
                console.log(t), wx.showModal({
                    title: "提示",
                    content: "是否删除订单，删除后不可恢复",
                    showCancel: !0,
                    cancelText: "取消",
                    cancelColor: "",
                    confirmText: "确定",
                    confirmColor: "",
                    success: function(t) {
                        t.confirm && e.refresh()
                    },
                    fail: function(t) {},
                    complete: function(t) {}
                })
            }
        })
    },
    pay: function(t) {
        var e = this,
            a = wx.getStorageSync("openid"),
            r = t.currentTarget.dataset.id,
            o = t.currentTarget.dataset.money;
        app.util.request({
            url: "entry/wxapp/Pay",
            cachetime: "0",
            data: {
                openid: a,
                money: o,
                order_id: r
            },
            success: function(t) {
                console.log(t), wx.requestPayment({
                    timeStamp: t.data.timeStamp,
                    nonceStr: t.data.nonceStr,
                    package: t.data.package,
                    signType: t.data.signType,
                    paySign: t.data.paySign,
                    success: function(t) {
                        console.log("这里是支付成功"), console.log(t), app.util.request({
                            url: "entry/wxapp/PayOrder",
                            cachetime: "0",
                            data: {
                                order_id: r
                            },
                            success: function(t) {
                                console.log("改变订单状态"), console.log(t), e.refresh()
                            }
                        })
                    },
                    fail: function(t) {
                        wx.showToast({
                            title: "支付失败",
                            duration: 1e3
                        })
                    }
                })
            }
        })
    },
    order_info: function(t) {
        var e = t.currentTarget.dataset.id,
            a = t.currentTarget.dataset.store_id;
        wx.navigateTo({
            url: "order_info?id=" + e + "&store_id=" + a,
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
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
        }), this.refresh()
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.refresh(), wx.stopPullDownRefresh()
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});