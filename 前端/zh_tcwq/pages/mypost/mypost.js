var app = getApp();
Page({
    data: {
        tabs: ["全部", "审核中", "已通过", "已拒绝"],
        activeIndex: 0,
        sliderOffset: 0,
        sliderLeft: 15,
        iszd: !1
    },
    qxzd: function() {
        this.setData({
            iszd: !1
        })
    },
    dkxf: function(t) {
        console.log(t.currentTarget.dataset.id), this.setData({
            iszd: !0,
            xfid: t.currentTarget.dataset.id
        })
    },
    shuaxin: function(t) {
        var e = t.currentTarget.dataset.id,
            a = wx.getStorageSync("openid");
        console.log(e, t.currentTarget.dataset.typeid, a), app.util.request({
            url: "entry/wxapp/SxMoney",
            cachetime: "0",
            data: {
                type_id: t.currentTarget.dataset.typeid,
                id: e
            },
            success: function(t) {
                console.log(t);
                var n = Number(t.data.sx_money);
                console.log(n), wx.showModal({
                    title: "提示",
                    content: "刷新此帖子需付费" + n + "元",
                    confirmText: "确定刷新",
                    success: function(t) {
                        t.confirm ? (console.log("用户点击确定"), n <= 0 ? (console.log("免费刷新"), app.util.request({
                            url: "entry/wxapp/SxTz",
                            cachetime: "0",
                            data: {
                                id: e
                            },
                            success: function(t) {
                                console.log(t), 1 == t.data && (wx.showToast({
                                    title: "刷新帖子成功"
                                }), setTimeout(function() {
                                    wx.switchTab({
                                        url: "../index/index"
                                    })
                                }, 1e3))
                            }
                        })) : (console.log("付费刷新"), app.util.request({
                            url: "entry/wxapp/Pay",
                            cachetime: "0",
                            data: {
                                openid: a,
                                money: n
                            },
                            success: function(t) {
                                wx.requestPayment({
                                    timeStamp: t.data.timeStamp,
                                    nonceStr: t.data.nonceStr,
                                    package: t.data.package,
                                    signType: t.data.signType,
                                    paySign: t.data.paySign,
                                    success: function(t) {
                                        wx.showModal({
                                            title: "提示",
                                            content: "支付成功",
                                            showCancel: !1
                                        })
                                    },
                                    complete: function(t) {
                                        console.log(t), "requestPayment:fail cancel" == t.errMsg && wx.showToast({
                                            title: "取消支付",
                                            icon: "loading",
                                            duration: 1e3
                                        }), "requestPayment:ok" == t.errMsg && (app.util.request({
                                            url: "entry/wxapp/SxTz",
                                            cachetime: "0",
                                            data: {
                                                id: e
                                            },
                                            success: function(t) {
                                                console.log(t)
                                            }
                                        }), setTimeout(function() {
                                            wx.switchTab({
                                                url: "../index/index"
                                            })
                                        }, 1e3))
                                    }
                                })
                            }
                        }))) : t.cancel && console.log("用户点击取消")
                    }
                })
            }
        })
    },
    selected: function(t) {
        var e = this,
            a = t.currentTarget.id,
            n = wx.getStorageSync("openid"),
            o = e.data.stick,
            i = o[a].money,
            c = o[a].type,
            s = this.data.xfid;
        e.setData({
            iszd: !1
        }), console.log(i, c, s), app.util.request({
            url: "entry/wxapp/Pay",
            cachetime: "0",
            data: {
                openid: n,
                money: i
            },
            success: function(t) {
                wx.requestPayment({
                    timeStamp: t.data.timeStamp,
                    nonceStr: t.data.nonceStr,
                    package: t.data.package,
                    signType: t.data.signType,
                    paySign: t.data.paySign,
                    success: function(t) {
                        wx.showModal({
                            title: "提示",
                            content: "支付成功",
                            showCancel: !1
                        })
                    },
                    complete: function(t) {
                        console.log(t), "requestPayment:fail cancel" == t.errMsg && wx.showToast({
                            title: "取消支付",
                            icon: "loading",
                            duration: 1e3
                        }), "requestPayment:ok" == t.errMsg && (app.util.request({
                            url: "entry/wxapp/TzXf",
                            cachetime: "0",
                            data: {
                                id: s,
                                type: c
                            },
                            success: function(t) {
                                console.log(t)
                            }
                        }), setTimeout(function() {
                            e.reload()
                        }, 1e3))
                    }
                })
            }
        })
    },
    tabClick: function(t) {
        console.log(t), this.setData({
            sliderOffset: t.currentTarget.offsetLeft,
            activeIndex: t.currentTarget.id
        })
    },
    onLoad: function(t) {
        var e = this;
        wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: wx.getStorageSync("color"),
            animation: {
                duration: 0,
                timingFunc: "easeIn"
            }
        }), app.util.request({
            url: "entry/wxapp/Top",
            cachetime: "0",
            success: function(t) {
                console.log(t);
                var a = t.data;
                for (var n in a) 1 == a[n].type ? a[n].array = "置顶一天（收费" + a[n].money + "元）" : 2 == a[n].type ? a[n].array = "置顶一周（收费" + a[n].money + "元）" : 3 == a[n].type && (a[n].array = "置顶一月（收费" + a[n].money + "元）");
                console.log(a), e.setData({
                    stick: a
                })
            }
        }), e.reload()
    },
    reload: function(t) {
        var e = this,
            a = wx.getStorageSync("users").id,
            n = wx.getStorageSync("url"),
            o = wx.getStorageSync("users").img;
        console.log(o), app.util.request({
            url: "entry/wxapp/MyPost",
            cachetime: "0",
            data: {
                user_id: a
            },
            success: function(t) {
                console.log(t);
                var a = [],
                    i = [],
                    c = [],
                    s = [];
                for (var r in t.data) t.data[r].time = e.ormatDate(t.data[r].time).slice(0, 16), t.data[r].img = t.data[r].img.split(",").slice(0, 4), s.push(t.data[r]), 1 == t.data[r].state && null != t.data[r].type_name ? a.push(t.data[r]) : 2 == t.data[r].state && null != t.data[r].type_name ? i.push(t.data[r]) : 3 == t.data[r].state && null != t.data[r].type_name && c.push(t.data[r]);
                e.setData({
                    slide: s,
                    user_img: o,
                    url: n,
                    audit: a,
                    adopt: i,
                    refuse: c
                })
            }
        })
    },
    see: function(t) {
        console.log(t), console.log(this.data);
        var e = this.data.slide,
            a = t.currentTarget.dataset.id;
        for (var n in e) if (e[n].id == a) var o = e[n];
        console.log(o), wx.navigateTo({
            url: "../infodetial/infodetial?id=" + o.id,
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        })
    },
    ormatDate: function(t) {
        var e = new Date(1e3 * t);
        return e.getFullYear() + "-" + a(e.getMonth() + 1, 2) + "-" + a(e.getDate(), 2) + " " + a(e.getHours(), 2) + ":" + a(e.getMinutes(), 2) + ":" + a(e.getSeconds(), 2);

        function a(t, e) {
            for (var a = "" + t, n = a.length, o = "", i = e; i-- > n;) o += "0";
            return o + a
        }
    },
    bianji: function(t) {
        console.log(t);
        var e = t.currentTarget.dataset.id;
        console.log(e), wx.navigateTo({
            url: "modify?id=" + e,
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        })
    },
    cancel: function(t) {
        var e = this;
        wx.showModal({
            title: "提示",
            content: "是否删除帖子",
            showCancel: !0,
            cancelText: "取消",
            confirmText: "确定",
            success: function(a) {
                if (a.confirm) {
                    console.log("用户点击确定");
                    var n = t.currentTarget.dataset.id;
                    app.util.request({
                        url: "entry/wxapp/DelPost",
                        cachetime: "0",
                        data: {
                            id: n
                        },
                        success: function(t) {
                            console.log(t), 1 == t.data && e.reload()
                        }
                    })
                } else a.cancel && console.log("用户点击取消")
            },
            fail: function(t) {},
            complete: function(t) {}
        })
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.reload(), wx.stopPullDownRefresh()
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});