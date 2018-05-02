var app = getApp();
Page({
    data: {
        hidden: !1,
        hidden2: !0,
        hidden3: !0,
        hidden4: !1,
        hidden5: !0,
        hidden6: !1,
        button: !1,
        cash_wei: !1,
        cash_wei2: !1,
        tx_money: 0,
        sxf: 0,
        sh_money: 0,
        fwxy: !0
    },
    lookck: function() {
        this.setData({
            fwxy: !1
        })
    },
    queren: function() {
        this.setData({
            fwxy: !0
        })
    },
    onLoad: function(e) {
        wx.hideShareMenu({});
        console.log(e), this.setData({
            state: e.state,
            system: wx.getStorageSync("System")
        }), 2 == e.state && this.setData({
            store_id: e.store_id,
            profit: e.profit
        }), wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: wx.getStorageSync("color"),
            animation: {
                duration: 0,
                timingFunc: "easeIn"
            }
        }), this.reload()
    },
    reload: function(e) {
        var t = this,
            a = wx.getStorageSync("users").id;
        if (1 == t.data.state) wx.login({
            success: function(e) {
                console.log("这是登录所需要的code"), console.log(e.code);
                var a = e.code;
                wx.setStorageSync("code", a), wx.getUserInfo({
                    success: function(e) {
                        var n = e.userInfo.nickName,
                            o = e.userInfo.avatarUrl;
                        app.util.request({
                            url: "entry/wxapp/openid",
                            cachetime: "0",
                            data: {
                                code: a
                            },
                            success: function(e) {
                                var a = o,
                                    i = n,
                                    s = e.data.openid;
                                app.util.request({
                                    url: "entry/wxapp/Login",
                                    cachetime: "0",
                                    data: {
                                        openid: s,
                                        img: a,
                                        name: i
                                    },
                                    success: function(e) {
                                        console.log(e);
                                        var a = e.data;
                                        app.util.request({
                                            url: "entry/wxapp/MyTiXian",
                                            cachetime: "0",
                                            data: {
                                                user_id: e.data.id
                                            },
                                            success: function(e) {
                                                console.log(e);
                                                var n = 0;
                                                for (var o in e.data) n += Number(e.data[o].tx_cost);
                                                console.log(n);
                                                var i = Number(a.money);
                                                i = i.toFixed(2), console.log(i), t.setData({
                                                    money: i
                                                })
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    }
                })
            }
        });
        else {
            t.data.store_id;
            t.setData({
                money: t.data.profit
            })
        }
        console.log(wx.getStorageSync("System"));
        var n = wx.getStorageSync("System"),
            o = n.tx_sxf / 100,
            i = n.tx_sxf,
            s = n.tx_money;
        t.setData({
            tx_price: s,
            tx_sxf: o,
            tx_sxf1: i,
            user_id: a
        });
        wx.getStorageSync("img"), wx.getStorageSync("url"), wx.getStorageSync("name"), wx.getStorageSync("openid")
    },
    check: function(e) {
        this.setData({
            hidden: !1,
            hidden2: !0,
            hidden3: !0,
            hidden4: !1,
            hidden5: !0,
            hidden6: !1,
            cash_wei: !1,
            cash_wei2: !1,
            cash_zhi: !0,
            cash_zhi2: !0,
            cash_ka: !0,
            cash_ka2: !0
        })
    },
    check2: function(e) {
        this.setData({
            hidden: !0,
            hidden2: !1,
            hidden3: !1,
            hidden4: !0,
            hidden5: !0,
            hidden6: !1,
            cash_wei: !0,
            cash_wei2: !0,
            cash_ka: !0,
            cash_ka2: !0,
            cash_zhi2: !1,
            cash_zhi: !1
        })
    },
    check3: function(e) {
        this.setData({
            hidden: !0,
            hidden2: !1,
            hidden3: !0,
            hidden4: !1,
            hidden5: !1,
            hidden6: !0,
            cash_wei: !0,
            cash_wei2: !0,
            cash_zhi: !0,
            cash_zhi2: !0,
            cash_ka: !1,
            cash_ka2: !1
        })
    },
    bindblur: function(e) {
        var t = Number(e.detail.value),
            a = Number(this.data.money);
        if (console.log(t, a), t > a) return wx.showModal({
            title: "提示",
            content: "您的提现金额超出可提现金额"
        }), this.setData({
            button: !1
        }), void(t = a);
        var n = this.data.tx_sxf,
            o = t - t * n;
        this.setData({
            tx_money: t,
            sxf: Number(t * n).toFixed(2),
            sh_money: Number(o).toFixed(2)
        }), t > 0 ? this.setData({
            button: !0
        }) : this.setData({
            button: !1
        })
    },
    formSubmit: function(e) {
        console.log(e), console.log(this.data);
        var t = e.detail.formId,
            a = this.data.store_id,
            n = this.data.state,
            o = this.data.user_id,
            i = Number(this.data.tx_price),
            s = this.data.sh_money,
            c = (this.data.sxf, this.data.tx_money);
        console.log(c, i);
        var u = wx.getStorageSync("openid");
        if (c < i) wx.showModal({
            title: "提示",
            content: "不到提现门槛，再接再厉哦",
            showCancel: !0,
            cancelText: "取消",
            confirmText: "确定",
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        });
        else {
            if (1 == this.data.hidden2) {
                var l = 2;
                console.log("提现的方式为微信" + l)
            } else if (1 == this.data.hidden4) {
                l = 1;
                console.log("提现的方式为支付宝" + l)
            } else if (1 == this.data.hidden6) {
                l = 3;
                console.log("提现的方式为银联" + l)
            }
            if (1 == l) {
                var d = e.detail.value.zfname,
                    r = e.detail.value.zfkahao,
                    h = e.detail.value.zfka;
                "" == d || null == d ? wx.showToast({
                    title: "姓名不能为空",
                    icon: "",
                    image: "",
                    duration: 2e3,
                    mask: !0,
                    success: function(e) {},
                    fail: function(e) {},
                    complete: function(e) {}
                }) : "" == r || "" == h ? wx.showToast({
                    title: "账号不能为空",
                    icon: "",
                    image: "",
                    duration: 2e3,
                    mask: !0,
                    success: function(e) {},
                    fail: function(e) {},
                    complete: function(e) {}
                }) : h != r ? wx.showToast({
                    title: "输入不一致",
                    icon: "",
                    image: "",
                    duration: 2e3,
                    mask: !0,
                    success: function(e) {},
                    fail: function(e) {},
                    complete: function(e) {}
                }) : h == r && (this.setData({
                    button: !1
                }), app.util.request({
                    url: "entry/wxapp/TiXian",
                    cachetime: "0",
                    data: {
                        user_id: o,
                        type: l,
                        tx_cost: c,
                        sj_cost: s,
                        name: d,
                        username: h,
                        method: n,
                        store_id: a
                    },
                    success: function(e) {
                        console.log(e), wx.showToast({
                            title: "提现成功",
                            icon: "",
                            image: "",
                            duration: 2e3,
                            mask: !0,
                            success: function(e) {},
                            fail: function(e) {},
                            complete: function(e) {}
                        }), app.util.request({
                            url: "entry/wxapp/txmessage",
                            cachetime: "0",
                            data: {
                                form_id: t,
                                openid: u,
                                txsh_id: e.data
                            },
                            success: function(e) {
                                console.log(e)
                            }
                        });
                        var a = getCurrentPages();
                        (console.log(a), a.length > 1) && a[a.length - 2].refresh1();
                        setTimeout(function() {
                            wx.navigateBack({
                                delta: 1
                            })
                        }, 1e3)
                    }
                }))
            } else if (2 == l) {
                var f = e.detail.value.wxname,
                    m = e.detail.value.wxkahao,
                    g = e.detail.value.wxka;
                "" == f || null == f ? wx.showToast({
                    title: "姓名不能为空",
                    icon: "",
                    image: "",
                    duration: 2e3,
                    mask: !0,
                    success: function(e) {},
                    fail: function(e) {},
                    complete: function(e) {}
                }) : "" == m || "" == g ? wx.showToast({
                    title: "账号不能为空",
                    icon: "",
                    image: "",
                    duration: 2e3,
                    mask: !0,
                    success: function(e) {},
                    fail: function(e) {},
                    complete: function(e) {}
                }) : g != m ? wx.showToast({
                    title: "输入不一致",
                    icon: "",
                    image: "",
                    duration: 2e3,
                    mask: !0,
                    success: function(e) {},
                    fail: function(e) {},
                    complete: function(e) {}
                }) : m == g && (this.setData({
                    button: !1
                }), app.util.request({
                    url: "entry/wxapp/TiXian",
                    cachetime: "0",
                    data: {
                        user_id: o,
                        type: l,
                        tx_cost: c,
                        sj_cost: s,
                        name: f,
                        username: g,
                        method: n,
                        store_id: a
                    },
                    success: function(e) {
                        console.log(e), wx.showToast({
                            title: "提现成功",
                            icon: "",
                            image: "",
                            duration: 2e3,
                            mask: !0,
                            success: function(e) {},
                            fail: function(e) {},
                            complete: function(e) {}
                        }), app.util.request({
                            url: "entry/wxapp/txmessage",
                            cachetime: "0",
                            data: {
                                form_id: t,
                                openid: u,
                                txsh_id: e.data
                            },
                            success: function(e) {
                                console.log(e)
                            }
                        });
                        var a = getCurrentPages();
                        (console.log(a), a.length > 1) && a[a.length - 2].refresh1();
                        setTimeout(function() {
                            wx.navigateBack({
                                delta: 1
                            })
                        }, 1e3)
                    }
                }))
            } else if (3 == l) {
                var x = e.detail.value.ylname,
                    w = e.detail.value.ylka,
                    p = e.detail.value.ylkahao;
                "" == x || null == x ? wx.showToast({
                    title: "姓名不能为空",
                    icon: "",
                    image: "",
                    duration: 2e3,
                    mask: !0,
                    success: function(e) {},
                    fail: function(e) {},
                    complete: function(e) {}
                }) : "" == w || "" == p ? wx.showToast({
                    title: "账号不能为空",
                    icon: "",
                    image: "",
                    duration: 2e3,
                    mask: !0,
                    success: function(e) {},
                    fail: function(e) {},
                    complete: function(e) {}
                }) : w != p ? wx.showToast({
                    title: "输入不一致",
                    icon: "",
                    image: "",
                    duration: 2e3,
                    mask: !0,
                    success: function(e) {},
                    fail: function(e) {},
                    complete: function(e) {}
                }) : w == p && (this.setData({
                    button: !1
                }), app.util.request({
                    url: "entry/wxapp/TiXian",
                    cachetime: "0",
                    data: {
                        user_id: o,
                        type: l,
                        tx_cost: c,
                        sj_cost: s,
                        name: x,
                        username: w,
                        method: n,
                        store_id: a
                    },
                    success: function(e) {
                        console.log(e), wx.showToast({
                            title: "提现成功",
                            icon: "",
                            image: "",
                            duration: 2e3,
                            mask: !0,
                            success: function(e) {},
                            fail: function(e) {},
                            complete: function(e) {}
                        }), app.util.request({
                            url: "entry/wxapp/txmessage",
                            cachetime: "0",
                            data: {
                                form_id: t,
                                openid: u,
                                txsh_id: e.data
                            },
                            success: function(e) {
                                console.log(e)
                            }
                        });
                        var a = getCurrentPages();
                        (console.log(a), a.length > 1) && a[a.length - 2].refresh1();
                        setTimeout(function() {
                            wx.navigateBack({
                                delta: 1
                            })
                        }, 1e3)
                    }
                }))
            }
        }
    },
    onReady: function() {},
    onShow: function() {
        console.log(this.data)
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});