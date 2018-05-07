var app = getApp();
Page({
    data: {
        iszd: !1
    },
    qxzd: function() {
        this.setData({
            iszd: !1
        })
    },
    dkxf: function(e) {
        this.setData({
            iszd: !0
        })
    },
    selected: function(e) {
        var t = this,
            n = e.currentTarget.id,
            o = wx.getStorageSync("openid"),
            a = t.data.stick,
            i = a[n].money,
            s = a[n].type,
            c = this.data.seller.id;
        t.setData({
            iszd: !1
        }), console.log(i, s, c), app.util.request({
            url: "entry/wxapp/Pay",
            cachetime: "0",
            data: {
                openid: o,
                money: i
            },
            success: function(e) {
                wx.requestPayment({
                    timeStamp: e.data.timeStamp,
                    nonceStr: e.data.nonceStr,
                    package: e.data.package,
                    signType: e.data.signType,
                    paySign: e.data.paySign,
                    success: function(e) {
                        wx.showModal({
                            title: "提示",
                            content: "支付成功",
                            showCancel: !1
                        })
                    },
                    complete: function(e) {
                        console.log(e), "requestPayment:fail cancel" == e.errMsg && wx.showToast({
                            title: "取消支付",
                            icon: "loading",
                            duration: 1e3
                        }), "requestPayment:ok" == e.errMsg && (app.util.request({
                            url: "entry/wxapp/SjXf",
                            cachetime: "0",
                            data: {
                                id: c,
                                type: s
                            },
                            success: function(e) {
                                console.log(e)
                            }
                        }), setTimeout(function() {
                            t.refresh1()
                        }, 1e3))
                    }
                })
            }
        })
    },
    onLoad: function(e) {
        var t = this;
        if (console.log(e), wx.hideShareMenu(), wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: wx.getStorageSync("color"),
            animation: {
                duration: 0,
                timingFunc: "easeIn"
            }
        }), null == wx.getStorageSync("users").money);
        var n = wx.getStorageSync("url");
        t.setData({
            url: n
        });
        app.util.request({
            url: "entry/wxapp/StoreInfo",
            cachetime: "0",
            data: {
                id: e.id
            },
            success: function(e) {
                console.log(e), t.setData({
                    seller: e.data.store[0]
                }), t.refresh()
            }
        }), app.util.request({
            url: "entry/wxapp/System",
            cachetime: "0",
            success: function(e) {
                console.log(e), t.setData({
                    System: e.data
                })
            }
        }), app.util.request({
            url: "entry/wxapp/InMoney",
            cachetime: "0",
            success: function(e) {
                console.log(e);
                var n = e.data;
                for (var o in n) n[o].money > 0 ? n[o].money1 = "（收费" + n[o].money + "元）" : n[o].money1 = "  免费", 1 == n[o].type ? (n[o].array = "一周" + n[o].money1, n[o].hidden1 = !1) : 2 == n[o].type ? (n[o].array = "半年" + n[o].money1, n[o].hidden1 = !0) : 3 == n[o].type && (n[o].array = "一年" + n[o].money1, n[o].hidden1 = !0);
                console.log(n), t.setData({
                    stick: n
                })
            }
        })
    },
    refresh1: function() {
        var e = this,
            t = e.data.seller.id;
        app.util.request({
            url: "entry/wxapp/StoreInfo",
            cachetime: "0",
            data: {
                id: t
            },
            success: function(t) {
                console.log(t), e.setData({
                    seller: t.data.store[0]
                }), e.refresh()
            }
        })
    },
    refresh: function(e) {
        var t = this;
        console.log(t.data.seller), this.setData({
            dqdate: app.ormatDate(t.data.seller.dq_time).substring(0, 10)
        });
        var n, o, a, i = (n = new Date, o = n.getMonth() + 1, a = n.getDate(), o >= 1 && o <= 9 && (o = "0" + o), a >= 0 && a <= 9 && (a = "0" + a), n.getFullYear() + "/" + o + "/" + a + " " + n.getHours() + ":" + n.getMinutes() + ":" + n.getSeconds()).slice(0, 10);
        console.log(i);
        var s = t.data.seller.id;
        app.util.request({
            url: "entry/wxapp/StoreOrder",
            cachetime: "0",
            data: {
                store_id: s
            },
            success: function(e) {
                console.log(e);
                var n = new Date;
                n.setTime(n.getTime() - 864e5);
                var o = function(e) {
                    var t = e.getFullYear(),
                        n = e.getMonth() + 1;
                    n = n < 10 ? "0" + n : n;
                    var o = e.getDate();
                    return t + "-" + n + "-" + (o = o < 10 ? "0" + o : o)
                }(n).replace(/-/g, "/");
                if (console.log(o), 0 != e.data.length) {
                    var a = e.data,
                        s = 0,
                        c = [],
                        r = [];
                    for (var l in a) a[l].time = app.ormatDate(a[l].time).slice(0, 10).replace(/-/g, "/"), "4" == a[l].state && (s += Number(a[l].money), o == a[l].time && (console.log("有昨天的订单"), c.push(a[l])), i == a[l].time && (console.log("有今天的订单"), console.log(a[l]), r.push(a[l])));
                    var u = 0;
                    for (var f in c) u += Number(c[f].money);
                    var d = 0;
                    for (var p in r) d += Number(r[p].money);
                    t.setData({
                        profit: s.toFixed(2),
                        yes_profit: u,
                        toady_profit: d
                    })
                } else t.setData({
                    profit: 0,
                    yes_profit: 0,
                    toady_profit: 0
                })
            }
        }), app.util.request({
            url: "entry/wxapp/StoreOrder",
            cachetime: "0",
            data: {
                store_id: s
            },
            success: function(e) {
                console.log(e);
                var n = e.data,
                    o = [];
                for (var a in n) n[a].time = app.ormatDate(n[a].time).slice(0, 10), n[a].time = n[a].time.replace(/-/g, "/"), i == n[a].time && o.push(n[a]);
                t.setData({
                    order_num: o.length
                })
            }
        })
    },
    onReady: function() {},
    yemx: function(e) {
        wx.navigateTo({
            url: "wallet/wallet?store_id=" + this.data.seller.id
        })
    },
    more: function(e) {
        console.log(e);
        var t = this.data.seller.id;
        wx.navigateTo({
            url: "../sellerinfo/sellerinfo?id=" + t,
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        })
    },
    cash: function(e) {
        wx.navigateTo({
            url: "../logs/cash?&state=2&store_id=" + this.data.seller.id + "&profit=" + this.data.seller.wallet,
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        })
    },
    activeIndex_one: function(e) {
        wx.navigateTo({
            url: "mine_order?activeIndex=1&store_id=" + this.data.seller.id,
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        })
    },
    activeIndex_two: function(e) {
        wx.navigateTo({
            url: "mine_order?activeIndex=0&store_id=" + this.data.seller.id,
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        })
    },
    activeIndex_three: function(e) {
        wx.navigateTo({
            url: "mine_order?activeIndex=3&store_id=" + this.data.seller.id,
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        })
    },
    activeIndex_four: function(e) {
        wx.navigateTo({
            url: "mine_order?activeIndex=4&store_id=" + this.data.seller.id,
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        })
    },
    fuck: function(e) {
        wx.navigateTo({
            url: "../logs/publish?store_id=" + this.data.seller.id,
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        })
    },
    customer: function(e) {
        wx.navigateTo({
            url: "customer/customer?user_id=" + this.data.seller.id
        })
    },
    welfare: function(e) {
        wx.navigateTo({
            url: "welfare?user_id=" + this.data.seller.id,
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        })
    },
    sent: function(e) {
        wx.navigateTo({
            url: "sent?user_id=" + this.data.seller.id,
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        })
    },
    mechat: function(e) {
        wx.navigateTo({
            url: "../logs/index?user_id=" + this.data.seller.id,
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        })
    },
    mine_shop: function(e) {
        wx.navigateTo({
            url: "commodity?store_id=" + this.data.seller.id,
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        })
    },
    interests: function(e) {
        wx.showModal({
            title: "提示",
            content: "此功能暂未开放",
            showCancel: !0,
            cancelText: "取消",
            cancelColor: "",
            confirmText: "确定",
            confirmColor: "",
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        })
    },
    vip: function(e) {
        wx.showModal({
            title: "提示",
            content: "此功能暂未开放",
            showCancel: !0,
            cancelText: "取消",
            cancelColor: "",
            confirmText: "确定",
            confirmColor: "",
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        })
    },
    tuichu: function(e) {
        wx.removeStorage({
            key: "store_info",
            success: function(e) {
                wx.showToast({
                    title: "退出登陆"
                }), setTimeout(function() {
                    wx.navigateBack({
                        delta: 1
                    })
                }, 2e3)
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