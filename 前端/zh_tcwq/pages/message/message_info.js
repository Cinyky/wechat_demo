var app = getApp();
Page({
    data: {
        speak: !1
    },
    previewImage: function(e) {
        var t = this,
            a = t.data.url,
            n = [],
            o = e.currentTarget.dataset.inde,
            s = t.data.info.imgs;
        for (var i in s) n.push(a + s[i]);
        wx.previewImage({
            current: a + s[o],
            urls: n
        })
    },
    onLoad: function(e) {
        console.log(e);
        var t = e.id,
            a = this;
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
            success: function(e) {
                a.setData({
                    url: e.data
                })
            }
        });
        var n = wx.getStorageSync("System");
        console.log(n), a.setData({
            id: t,
            system: n
        }), a.refresh()
    },
    refresh: function(e) {
        function t() {
            var e = new Date,
                t = e.getMonth() + 1,
                a = e.getDate();
            return t >= 1 && t <= 9 && (t = "0" + t), a >= 0 && a <= 9 && (a = "0" + a), e.getFullYear() + "/" + t + "/" + a + " " + e.getHours() + ":" + e.getMinutes() + ":" + e.getSeconds()
        }
        var a = this,
            n = a.data.id,
            o = 0;
        wx.login({
            success: function(e) {
                console.log("这是登录所需要的code"), console.log(e.code);
                var s = e.code;
                wx.setStorageSync("code", s), wx.getUserInfo({
                    success: function(e) {
                        var i = e.userInfo.nickName,
                            c = e.userInfo.avatarUrl;
                        app.util.request({
                            url: "entry/wxapp/openid",
                            cachetime: "0",
                            data: {
                                code: s
                            },
                            success: function(e) {
                                var s = c,
                                    u = i,
                                    l = e.data.openid;
                                app.util.request({
                                    url: "entry/wxapp/Login",
                                    cachetime: "0",
                                    data: {
                                        openid: l,
                                        img: s,
                                        name: u
                                    },
                                    success: function(e) {
                                        console.log(e), o = e.data.id, a.setData({
                                            user_id: e.data.id
                                        });
                                        var s = t();
                                        app.util.request({
                                            url: "entry/wxapp/ZxInfo",
                                            cachetime: "0",
                                            data: {
                                                id: n,
                                                user_id: o
                                            },
                                            success: function(e) {
                                                console.log(e);
                                                var t = e.data;
                                                null == t.img ? t.type = 1 : t.type = 2, t.content = t.content.replace("?", "\n");
                                                var n = s,
                                                    i = t.time.replace(/-/g, "/"),
                                                    c = /(\d{4})-(\d{1,2})-(\d{1,2})( \d{1,2}:\d{1,2})/g,
                                                    u = Math.abs(Date.parse(n.replace(c, "$2-$3-$1$4")) - Date.parse(i.replace(c, "$2-$3-$1$4"))) / 1e3,
                                                    l = Math.floor(u / 3600),
                                                    r = Math.floor(u % 3600 / 60);
                                                t.m = Number(l), t.h = Number(r), console.log(l + " 小时 " + r + " 分钟"), console.log(s), null != t.imgs && (t.imgs = t.imgs.split(",")), console.log(t), t.time = t.time.slice(0, 16), app.util.request({
                                                    url: "entry/wxapp/ZxPlList",
                                                    cachetime: "0",
                                                    data: {
                                                        zx_id: t.id
                                                    },
                                                    success: function(e) {
                                                        console.log(e), t.pl = e.data, a.setData({
                                                            info: t
                                                        })
                                                    }
                                                }), app.util.request({
                                                    url: "entry/wxapp/ZxLikeList",
                                                    cachetime: "0",
                                                    data: {
                                                        zx_id: t.id
                                                    },
                                                    success: function(e) {
                                                        console.log(e), a.setData({
                                                            thumbs_up: e.data
                                                        })
                                                    }
                                                }), app.util.request({
                                                    url: "entry/wxapp/Footprint",
                                                    cachetime: "0",
                                                    data: {
                                                        zx_id: t.id,
                                                        user_id: o
                                                    },
                                                    success: function(e) {
                                                        console.log(e)
                                                    }
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
        })
    },
    speak: function(e) {
        this.setData({
            speak: !0,
            speak_type: 1
        })
    },
    speak1: function(e) {
        this.setData({
            speak: !1
        })
    },
    speak3: function(e) {
        console.log(e), wx.getStorageSync("users").id != this.data.info.user_id ? wx.showModal({
            title: "提示",
            content: "只有管理员才可以回复",
            showCancel: !0,
            cancelText: "取消",
            confirmText: "确定",
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        }) : this.setData({
            speak: !0,
            speak_type: 2,
            speak_id: e.currentTarget.id
        })
    },
    speaks: function(e) {
        console.log(e);
        var t = this,
            a = e.detail.value;
        t.setData({
            value: a
        })
    },
    Collection: function(e) {
        var t = this,
            a = t.data.info,
            n = t.data.user_id;
        app.util.request({
            url: "entry/wxapp/ZxLike",
            cachetime: "0",
            data: {
                zx_id: a.id,
                user_id: n
            },
            success: function(e) {
                console.log(e), 1 == e.data ? (wx.showToast({
                    title: "点赞成功",
                    icon: "",
                    image: "",
                    duration: 2e3,
                    mask: !0,
                    success: function(e) {},
                    fail: function(e) {},
                    complete: function(e) {}
                }), setTimeout(function() {
                    t.refresh()
                }, 2e3)) : wx.showModal({
                    title: "提示",
                    content: e.data,
                    showCancel: !0,
                    cancelText: "取消",
                    confirmText: "确定",
                    success: function(e) {},
                    fail: function(e) {},
                    complete: function(e) {}
                }), t.setData({
                    Collection: e.data
                })
            }
        })
    },
    speak2: function(e) {
        var t = this,
            a = t.data.value;
        if (console.log(a), null == a || "" == a) wx.showModal({
            title: "提示",
            content: "还没输入内容哦",
            showCancel: !0,
            cancelText: "取消",
            confirmText: "确定",
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        });
        else {
            var n = t.data.user_id,
                o = t.data.info.id,
                s = t.data.speak_type,
                i = t.data.speak_id;
            1 == s ? app.util.request({
                url: "entry/wxapp/ZxPl",
                cachetime: "0",
                data: {
                    zx_id: o,
                    content: a,
                    user_id: n
                },
                success: function(e) {
                    console.log(e), 1 == e.data && (wx.showToast({
                        title: "发布成功",
                        icon: "",
                        image: "",
                        duration: 2e3,
                        mask: !0,
                        success: function(e) {},
                        fail: function(e) {},
                        complete: function(e) {}
                    }), setTimeout(function(e) {
                        t.refresh(), t.setData({
                            speak: !1
                        })
                    }, 2e3))
                }
            }) : app.util.request({
                url: "entry/wxapp/ZxHf",
                cachetime: "0",
                data: {
                    id: i,
                    reply: a
                },
                success: function(e) {
                    console.log(e), 1 == e.data && (wx.showToast({
                        title: "回复成功",
                        icon: "",
                        image: "",
                        duration: 2e3,
                        mask: !0,
                        success: function(e) {},
                        fail: function(e) {},
                        complete: function(e) {}
                    }), setTimeout(function(e) {
                        t.refresh(), t.setData({
                            speak: !1
                        })
                    }, 2e3))
                }
            })
        }
    },
    shouye: function(e) {
        wx.reLaunch({
            url: "../index/index",
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        })
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.refresh(), wx.stopPullDownRefresh()
    },
    onReachBottom: function() {},
    onShareAppMessage: function(e) {
        var t = this.data.info;
        return console.log(t), "button" === e.from && console.log(e.target), {
            title: t.title,
            path: "zh_tcwq/pages/message/message_info?id=" + t.id,
            success: function(e) {},
            fail: function(e) {}
        }
    }
});