var _data;

function _defineProperty(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e
}
var app = getApp();
Page({
    data: (_data = {
        sure: !1,
        receive: !1,
        loadText: "加载更多",
        duanziInfo: [],
        reply: !1,
        comment: !1,
        select: 0,
        arrow: 1
    }, _defineProperty(_data, "sure", !1), _defineProperty(_data, "receive", !1), _defineProperty(_data, "rob_redbag", !1), _defineProperty(_data, "share", !1), _defineProperty(_data, "share_red", !1), _data),
    dizhi: function(e) {
        var t = Number(this.data.store.coordinates.split(",")[0]),
            a = Number(this.data.store.coordinates.split(",")[1]);
        wx.openLocation({
            latitude: t,
            longitude: a,
            name: this.data.store.user_name,
            address: this.data.store.address
        })
    },
    shouye: function(e) {
        wx.reLaunch({
            url: "../../index/index",
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        })
    },
    phone: function(e) {
        var t = this.data.store.user_tel;
        wx.makePhoneCall({
            phoneNumber: t
        })
    },
    jrsj: function() {
        wx.redirectTo({
            url: "../../sellerinfo/sellerinfo?id=" + this.data.store.store_id
        })
    },
    onLoad: function(e) {
        var t = this;
        wx.getStorageSync("System");
        wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: wx.getStorageSync("color"),
            animation: {
                duration: 0,
                timingFunc: "easeIn"
            }
        });
        var a = e.store_id,
            o = wx.getStorageSync("url"),
            n = e.logo;
        t.setData({
            url: o,
            store_id: a,
            logo: n
        }), app.util.request({
            url: "entry/wxapp/System",
            cachetime: "0",
            success: function(e) {
                console.log(e), t.setData({
                    system: e.data
                })
            }
        }), wx.login({
            success: function(e) {
                var a = e.code;
                wx.setStorageSync("code", a), wx.getUserInfo({
                    success: function(e) {
                        wx.setStorageSync("user_info", e.userInfo);
                        var o = e.userInfo.nickName,
                            n = e.userInfo.avatarUrl;
                        app.util.request({
                            url: "entry/wxapp/openid",
                            cachetime: "0",
                            data: {
                                code: a
                            },
                            success: function(e) {
                                wx.setStorageSync("key", e.data.session_key);
                                var a = n,
                                    s = o;
                                wx.setStorageSync("openid", e.data.openid);
                                var r = e.data.openid;
                                app.util.request({
                                    url: "entry/wxapp/Login",
                                    cachetime: "0",
                                    data: {
                                        openid: r,
                                        img: a,
                                        name: s
                                    },
                                    success: function(e) {
                                        wx.setStorageSync("users", e.data), wx.setStorageSync("uniacid", e.data.uniacid), t.setData({
                                            user_id: e.data.id,
                                            name: s
                                        })
                                    }
                                })
                            }
                        })
                    }
                })
            }
        }), t.reload()
    },
    reload: function(e) {
        var t = this,
            a = wx.getStorageSync("users").id,
            o = t.data.store_id;
        app.util.request({
            url: "entry/wxapp/IsCollection",
            cachetime: "0",
            data: {
                information_id: o,
                user_id: a
            },
            success: function(e) {
                console.log(e), 1 == e.data ? t.setData({
                    Collection: !0
                }) : t.setData({
                    Collection: !1
                })
            }
        }), app.util.request({
            url: "entry/wxapp/PostInfo",
            cachetime: "0",
            data: {
                id: o
            },
            success: function(e) {
                console.log(e);
                var o = e.data.tz,
                    n = Number(e.data.tz.hb_num);
                for (var s in o.img = o.img.split(","), 1 == o.hb_random ? o.hb_money = Number(o.hb_money) : o.hb_money = Number(o.hb_money) * Number(o.hb_num), "" == o.hb_keyword ? t.setData({
                    sure: !0
                }) : t.setData({
                    sure: !1
                }), app.util.request({
                    url: "entry/wxapp/HongList",
                    cachetime: "0",
                    data: {
                        id: e.data.tz.id
                    },
                    success: function(e) {
                        console.log(e);
                        var o = e.data;
                        console.log(o);
                        var s = 0;
                        for (var r in o) s += Number(o[r].money);
                        s = s.toFixed(2), console.log(s);
                        var i = function(e, t) {
                            for (var a = 0; a < e.length; a++) if (t === e[a].user_id) return !0;
                            return !1
                        }(o, a);
                        if (console.log(s), 1 == i) var c = 2;
                        else if (0 == i) if (n == o.length) {
                            console.log("红包已经抢完");
                            c = 1
                        } else {
                            console.log("红包还没抢完");
                            c = 3
                        }
                        console.log(c), t.setData({
                            hongbao_use1: c,
                            hongbao_len: e.data.length,
                            hongbao: o,
                            z_money: s
                        })
                    }
                }), console.log(e.data.pl), e.data.pl) e.data.pl[s].time = app.ormatDate(e.data.pl[s].time);
                o.hb_money = Number(o.hb_money).toFixed(2), o.trans1 = 1, o.trans2 = 1, o.dis1 = "block", o.trans_1 = 2, o.trans_2 = 1, t.setData({
                    store: o,
                    criticism: e.data.pl,
                    label: e.data.label
                })
            }
        })
    },
    rob_redbag: function(e) {
        var t = this.data.rob_redbag;
        1 == t ? this.setData({
            rob_redbag: !1
        }) : this.setData({
            rob_redbag: !0
        })
    },
    gethong: function(e) {
        var t = this,
            a = wx.getStorageSync("users").id,
            o = t.data.store_id;
        app.util.request({
            url: "entry/wxapp/GetHong",
            cachetime: "0",
            data: {
                id: o,
                user_id: a
            },
            success: function(e) {
                console.log("领取红包"), console.log(e), t.reload(), t.setData({
                    receive: !0,
                    sure: !1
                })
            }
        })
    },
    receive1: function(e) {
        this.setData({
            receive: !1,
            sure: !1
        })
    },
    hb_keyword: function(e) {
        console.log(e);
        var t = e.detail.value;
        this.data.store.hb_keyword == t ? this.setData({
            sure: !0
        }) : wx.showModal({
            title: "提示",
            content: "输入的口令错误，请重新输入",
            showCancel: !0,
            cancelText: "取消",
            cancelColor: "",
            confirmText: "确定",
            confirmColor: "",
            success: function(t) {
                e.detail.value
            },
            fail: function(e) {},
            complete: function(e) {}
        })
    },
    trans1: function(e) {
        var t = this,
            a = t.data.store;
        if (2 == t.data.system.is_hbzf) {
            a.trans1 = "trans1", a.trans2 = "trans2";
            var o = wx.getStorageSync("users").id,
                n = t.data.store_id;
            app.util.request({
                url: "entry/wxapp/GetHong",
                cachetime: "0",
                data: {
                    id: n,
                    user_id: o
                },
                success: function(e) {
                    console.log("领取红包"), console.log(e), "error" == e.data && wx.showModal({
                        title: "提示",
                        content: "手慢了，红包被抢光了"
                    })
                }
            }), setTimeout(function() {
                a.trans_1 = 1, a.trans_2 = 2, a.dis1 = "none", a.dis2 = "block", t.setData({
                    store: a
                })
            }, 500), setTimeout(function() {
                a.trans_1 = 2, a.trans_2 = 1, a.dis1 = "block", a.dis2 = "none", t.setData({
                    store: a
                })
            }, 1e3), setTimeout(function() {
                a.trans_1 = 1, a.trans_2 = 2, a.dis1 = "none", a.dis2 = "block", t.setData({
                    store: a
                })
            }, 1500), setTimeout(function() {
                wx.navigateTo({
                    url: "see_rob?id=" + t.data.store_id,
                    success: function(e) {},
                    fail: function(e) {},
                    complete: function(e) {}
                }), t.setData({
                    rob_redbag: !1
                })
            }, 1300), t.setData({
                store: a
            })
        } else t.setData({
            share_red: !0,
            rob_redbag: !1
        })
    },
    hb_text: function(e) {
        this.setData({
            value: e.detail.value
        })
    },
    trans2: function(e) {
        this.data.store;
        wx.navigateTo({
            url: "see_rob?id=" + this.data.store_id,
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        }), this.setData({
            rob_redbag: !1
        })
    },
    comment: function(e) {
        this.setData({
            comment: !0
        })
    },
    complete: function(e) {
        console.log(e), this.setData({
            complete: e.detail.value
        })
    },
    complete1: function(e) {
        console.log(e), this.setData({
            complete1: e.detail.value
        })
    },
    publish: function(e) {
        var t = this,
            a = t.data.complete,
            o = t.data.user_id;
        console.log(o), console.log(a);
        var n = t.data.store_id;
        "" == a || null == a ? wx.showToast({
            title: "内容为空",
            icon: "loading",
            duration: 1e3
        }) : (t.setData({
            replay: !1,
            comment: !1
        }), app.util.request({
            url: "entry/wxapp/Comments",
            cachetime: "0",
            data: {
                information_id: n,
                details: a,
                user_id: o
            },
            success: function(e) {
                console.log(e), "error" != e.data ? (wx.showToast({
                    title: "评论成功"
                }), setTimeout(function() {
                    t.reload()
                }, 1e3)) : wx.showToast({
                    title: "评论失败",
                    icon: "loading"
                })
            }
        }))
    },
    reply1: function(e) {
        var t = e.currentTarget.dataset.reflex_id,
            a = e.currentTarget.dataset.name,
            o = this.data.user_id;
        this.data.store.user_id == o ? this.setData({
            reply: !0,
            reflex_id: t,
            reflex_name: "回复" + a
        }) : wx.showToast({
            title: "管理员可回复",
            icon: "loading",
            duration: 1e3
        })
    },
    reply2: function(e) {
        this.setData({
            reply: !1,
            comment: !1
        })
    },
    reply3: function(e) {
        var t = this,
            a = t.data.reflex_id,
            o = t.data.complete1;
        console.log(a), console.log(o), "" == o || null == o ? wx.showToast({
            title: "内容为空",
            icon: "loading",
            duration: 1e3
        }) : (t.setData({
            reply: !1
        }), app.util.request({
            url: "entry/wxapp/reply",
            cachetime: "0",
            data: {
                id: a,
                reply: o
            },
            success: function(e) {
                console.log(e), 1 == e.data && (wx.showToast({
                    title: "回复成功"
                }), setTimeout(function() {
                    t.reload()
                }, 1e3))
            }
        }))
    },
    move: function(e) {
        var t = this,
            a = t.data.select;
        1 == t.data.arrow ? setTimeout(function() {
            t.setData({
                arrow: 2
            })
        }, 1500) : setTimeout(function() {
            t.setData({
                arrow: 1
            })
        }, 1500), 1 == a ? t.setData({
            select: 0
        }) : t.setData({
            select: 1
        })
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {
        this.reload()
    },
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function(e) {
        var t = this,
            a = t.data.system.hb_content;
        if (console.log(a), "" == a) var o = t.data.name + "邀您一起抢红包";
        else o = (o = t.data.system.hb_content.replace("name", t.data.name)).replace("type", "【" + t.data.store.type_name + "】");
        return "button" == e.from ? {
            title: o,
            path: "/zh_tcwq/pages/redbag/redinfo/redinfo?store_id=" + t.data.store_id,
            imageUrl: t.data.url + t.data.system.hb_img,
            success: function(e) {
                console.log("这是转发成功"), app.util.request({
                    url: "entry/wxapp/HbFx",
                    cachetime: "0",
                    data: {
                        information_id: t.data.store.id
                    },
                    success: function(e) {
                        console.log(e)
                    }
                }), console.log(e), t.setData({
                    share_red: !1
                });
                var a = t.data.user_id,
                    o = t.data.store_id;
                app.util.request({
                    url: "entry/wxapp/GetHong",
                    cachetime: "0",
                    data: {
                        id: o,
                        user_id: a
                    },
                    success: function(e) {
                        console.log("领取红包"), console.log(e), "error" == e.data && wx.showModal({
                            title: "提示",
                            content: "手慢了，红包被抢光了"
                        })
                    }
                }), wx.navigateTo({
                    url: "see_rob?id=" + t.data.store_id,
                    success: function(e) {},
                    fail: function(e) {},
                    complete: function(e) {}
                })
            },
            fail: function(e) {}
        } : {
            title: o,
            path: "/zh_tcwq/pages/redbag/redinfo/redinfo?store_id=" + t.data.store_id,
            imageUrl: t.data.url + t.data.system.hb_img,
            success: function(e) {
                console.log("这是转发成功"), app.util.request({
                    url: "entry/wxapp/HbFx",
                    cachetime: "0",
                    data: {
                        information_id: t.data.store.id
                    },
                    success: function(e) {
                        console.log(e)
                    }
                }), console.log(e), t.setData({
                    share_red: !1
                })
            },
            fail: function(e) {}
        }
    }
});