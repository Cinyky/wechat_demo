var app = getApp(),
    screenWidth = 0,
    screenHeight = 0,
    screenWidth1 = 0,
    screenHeight1 = 0,
    screenWidth2 = 0,
    screenHeight2 = 0;
Page({
    data: {
        activeIndex: 0,
        sliderOffset: 0,
        sliderLeft: 15,
        comments: !1,
        wechat: !1,
        share: !1,
        tabs2: ["商家详情", "用户评论"],
        star: [{
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
        star1: [{
            img: "../image/xing.png"
        }, {
            img: "../image/xing.png"
        }, {
            img: "../image/xing.png"
        }, {
            img: "../image/xing.png"
        }, {
            img: "../image/xing.png"
        }],
        index: 0,
        swiperCurrent: 0
    },
    comments1: function(t) {
        0 == this.data.wechat ? this.setData({
            wechat: !0
        }) : this.setData({
            wechat: !1
        })
    },
    comments2: function(t) {
        0 == this.data.share ? this.setData({
            share: !0
        }) : this.setData({
            share: !1
        })
    },
    more: function(t) {
        var e = this.data.id;
        wx.navigateTo({
            url: "shop?store_id=" + e,
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        })
    },
    goods_info: function(t) {
        var e = this.data.id,
            a = t.currentTarget.id;
        wx.navigateTo({
            url: "good_info?id=" + a + "&store_id=" + e,
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        })
    },
    previewImage: function(t) {
        var e = this.data.url,
            a = [],
            i = this.data.store.weixin_logo;
        a.push(e + this.data.store.weixin_logo), wx.previewImage({
            current: e + i,
            urls: a
        })
    },
    previewImage3: function(t) {
        var e = this.data.url,
            a = [],
            i = this.data.store.ewm_logo;
        a.push(e + this.data.store.ewm_logo), wx.previewImage({
            current: e + i,
            urls: a
        })
    },
    previewImage2: function(t) {
        this.data.url;
        var e = [];
        e.push(this.data.bath), wx.previewImage({
            urls: e
        })
    },
    previewImage1: function(t) {
        var e = this.data.url,
            a = [],
            i = t.currentTarget.id,
            s = this.data.store.images;
        for (var n in s) a.push(e + s[n]);
        wx.previewImage({
            current: e + s[i],
            urls: a
        })
    },
    tabClick: function(t) {
        this.setData({
            sliderOffset: t.currentTarget.offsetLeft,
            activeIndex: t.currentTarget.id
        })
    },
    Demonstration: function(t) {
        "" != this.data.store.vr_link && wx.navigateTo({
            url: "../car/car?sjid=" + this.data.id,
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        })
    },
    swiperChange: function(t) {
        this.setData({
            swiperCurrent: t.detail.current
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
        });
        var a = decodeURIComponent(t.scene);
        if (app.util.request({
            url: "entry/wxapp/Url",
            cachetime: "0",
            success: function(t) {
                wx.setStorageSync("url", t.data), e.setData({
                    url: t.data
                })
            }
        }), null == t.scene) var i = wx.getStorageSync("users"),
            s = wx.getStorageSync("users").id,
            n = t.id;
        else {
            n = a;
            wx.login({
                success: function(t) {
                    var a = t.code;
                    wx.setStorageSync("code", a), wx.getUserInfo({
                        success: function(t) {
                            wx.setStorageSync("user_info", t.userInfo);
                            var i = t.userInfo.nickName,
                                s = t.userInfo.avatarUrl;
                            app.util.request({
                                url: "entry/wxapp/openid",
                                cachetime: "0",
                                data: {
                                    code: a
                                },
                                success: function(t) {
                                    wx.setStorageSync("key", t.data.session_key);
                                    var a = s,
                                        n = i;
                                    wx.setStorageSync("openid", t.data.openid);
                                    var o = t.data.openid;
                                    app.util.request({
                                        url: "entry/wxapp/Login",
                                        cachetime: "0",
                                        data: {
                                            openid: o,
                                            img: a,
                                            name: n
                                        },
                                        success: function(t) {
                                            wx.setStorageSync("users", t.data), wx.setStorageSync("uniacid", t.data.uniacid), e.setData({
                                                user_id: t.data.id,
                                                user_info: t.data
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
        app.util.request({
            url: "entry/wxapp/StoreCode",
            cachetime: "0",
            data: {
                store_id: n
            },
            success: function(t) {
                e.setData({
                    bath: t.data
                })
            }
        }), e.setData({
            id: n,
            user_id: s,
            user_info: i
        }), e.reload(), wx.getSystemInfo({
            success: function(t) {
                var a = t.windowWidth,
                    i = t.windowHeight;
                e.setData({
                    sys_width: a,
                    sys_height: i
                })
            },
            fail: function(t) {},
            complete: function(t) {}
        })
    },
    reload: function(t) {
        var e = this,
            a = e.data.star1,
            i = e.data.star;
        app.util.request({
            url: "entry/wxapp/StoreInfo",
            cachetime: "0",
            data: {
                id: e.data.id
            },
            success: function(t) {
                for (var s in t.data.star3 = i, t.data.store[0].img1 = t.data.store[0].ad.split(","), t.data.store[0].images = t.data.store[0].img.split(","), t.data.store[0].coordinates = t.data.store[0].coordinates.split(","), t.data.store[0].star = a.slice(0, t.data.store[0].score), t.data.pl) t.data.pl[s].star = a;
                var n = Number(t.data.store[0].score),
                    o = "../image/xing.png";
                0 == (n = parseInt(n)) ? t.data.star3 = e.data.star1 : 1 == n ? t.data.star3[0].img = o : 2 == n ? (t.data.star3[0].img = o, t.data.star3[1].img = o) : 3 == n ? (t.data.star3[0].img = o, t.data.star3[1].img = o, t.data.star3[2].img = o) : 4 == n ? (t.data.star3[0].img = o, t.data.star3[1].img = o, t.data.star3[2].img = o, t.data.star3[3].img = o) : 5 == n && (t.data.star3[0].img = o, t.data.star3[1].img = o, t.data.star3[2].img = o, t.data.star3[3].img = o, t.data.star3[4].img = o), e.setData({
                    score: n,
                    star3: t.data.star3
                }), app.util.request({
                    url: "entry/wxapp/IsCollection",
                    cachetime: "0",
                    data: {
                        store_id: e.data.id,
                        user_id: e.data.user_id
                    },
                    success: function(t) {
                        1 == t.data ? e.setData({
                            Collection: !0
                        }) : e.setData({
                            Collection: !1
                        })
                    }
                }), wx.setNavigationBarTitle({
                    title: t.data.store[0].store_name
                }), e.setData({
                    store: t.data.store[0],
                    comment: t.data.pl
                })
            }
        }), app.util.request({
            url: "entry/wxapp/StoreGoodList",
            cachetime: "0",
            data: {
                store_id: e.data.id
            },
            success: function(t) {
                for (var a in console.log(t), t.data) t.data[a].imgs = t.data[a].imgs.split(",")[0], t.data[a].lb_imgs = t.data[a].lb_imgs.split(",");
                var i = [];
                for (var s in t.data) 1 == t.data[s].is_show && i.push(t.data[s]);
                i = i.slice(0, 4);
                e.setData({
                    store_good: i
                })
            }
        })
    },
    formid_one: function(t) {
        console.log("搜集第一个formid"), console.log(t), app.util.request({
            url: "entry/wxapp/SaveFormid",
            cachetime: "0",
            data: {
                user_id: wx.getStorageSync("users").id,
                form_id: t.detail.formId,
                openid: wx.getStorageSync("openid")
            },
            success: function(t) {}
        })
    },
    dizhi: function(t) {
        var e = Number(this.data.store.coordinates[0]),
            a = Number(this.data.store.coordinates[1]);
        wx.openLocation({
            latitude: e,
            longitude: a,
            name: this.data.store.store_name,
            address: this.data.store.address
        })
    },
    shouye: function(t) {
        wx.reLaunch({
            url: "../index/index",
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        })
    },
    fabu: function(t) {
        wx.navigateTo({
            url: "../index/index",
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        })
    },
    phone: function(t) {
        var e = this.data.store.tel;
        wx.makePhoneCall({
            phoneNumber: e
        })
    },
    reply: function(t) {
        var e = t.currentTarget.dataset.id;
        this.setData({
            comments: !0,
            relpay: !0,
            reflex_id: e
        })
    },
    star: function(t) {
        var e = t.currentTarget.dataset.index,
            a = this.data.star,
            i = "../image/xing.png",
            s = "../image/star_none.png";
        0 == e ? (a[0].img = i, a[1].img = s, a[2].img = s, a[3].img = s, a[4].img = s) : 1 == e ? (a[0].img = i, a[1].img = i, a[2].img = s, a[3].img = s, a[4].img = s) : 2 == e ? (a[0].img = i, a[1].img = i, a[2].img = i, a[3].img = s, a[4].img = s) : 3 == e ? (a[0].img = i, a[1].img = i, a[2].img = i, a[3].img = i, a[4].img = s) : 4 == e && (a[0].img = i, a[1].img = i, a[2].img = i, a[3].img = i, a[4].img = i), this.setData({
            index: e + 1,
            star: a
        })
    },
    Collection: function(t) {
        var e = this,
            a = e.data.id,
            i = wx.getStorageSync("users").id;
        app.util.request({
            url: "entry/wxapp/Collection",
            cachetime: "0",
            data: {
                store_id: a,
                user_id: i
            },
            success: function(t) {
                1 == t.data ? (e.setData({
                    Collection: !0
                }), wx.showToast({
                    title: "收藏成功",
                    icon: "",
                    image: "",
                    duration: 2e3,
                    mask: !0,
                    success: function(t) {},
                    fail: function(t) {},
                    complete: function(t) {}
                })) : (wx.showToast({
                    title: "取消收藏成功",
                    icon: "fail",
                    image: "",
                    duration: 2e3,
                    mask: !0,
                    success: function(t) {},
                    fail: function(t) {},
                    complete: function(t) {}
                }), e.setData({
                    Collection: !1
                }))
            }
        })
    },
    textarea: function(t) {
        var e = t.detail.value;
        this.setData({
            value: e
        })
    },
    comments: function(t) {
        var e = this,
            a = wx.getStorageSync("users").id;
        app.util.request({
            url: "entry/wxapp/GetUserInfo",
            cachetime: "0",
            data: {
                user_id: a
            },
            success: function(t) {
                1 == t.data.state ? e.setData({
                    comments: !0,
                    relpay: !1
                }) : wx.showModal({
                    title: "提示",
                    content: "您的账号异常，请尽快联系管理员",
                    showCancel: !0,
                    cancelText: "取消",
                    cancelColor: "",
                    confirmText: "确定",
                    confirmColor: "",
                    success: function(t) {},
                    fail: function(t) {},
                    complete: function(t) {}
                })
            }
        })
    },
    formid_three: function(t) {
        app.util.request({
            url: "entry/wxapp/SaveFormid",
            cachetime: "0",
            data: {
                user_id: wx.getStorageSync("users").id,
                form_id: t.detail.formId,
                openid: wx.getStorageSync("openid")
            },
            success: function(t) {}
        });
        this.setData({
            comments: !1
        })
    },
    settled: function(t) {
        wx.navigateTo({
            url: "../settled/settled"
        })
    },
    formid_two: function(t) {
        console.log("点击完成评论"), app.util.request({
            url: "entry/wxapp/SaveFormid",
            cachetime: "0",
            data: {
                user_id: wx.getStorageSync("users").id,
                form_id: t.detail.formId,
                openid: wx.getStorageSync("openid")
            },
            success: function(t) {}
        });
        var e = this,
            a = e.data.index,
            i = e.data.value,
            s = e.data.id,
            n = wx.getStorageSync("users").id,
            o = e.data.reflex_id;
        var r, c, d, u = (r = new Date, c = r.getMonth() + 1, d = r.getDate(), c >= 1 && c <= 9 && (c = "0" + c), d >= 0 && d <= 9 && (d = "0" + d), r.getFullYear() + "-" + c + "-" + d + " " + r.getHours() + ":" + r.getMinutes() + ":" + r.getSeconds());
        null == i || "" == i ? wx.showModal({
            title: "提示",
            content: "请输入评论的内容",
            showCancel: !0,
            cancelText: "取消",
            cancelColor: "",
            confirmText: "确定",
            confirmColor: "",
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        }) : 0 == e.data.relpay ? 0 == a ? wx.showModal({
            title: "提示",
            content: "小主，给个评分吧",
            showCancel: !0,
            cancelText: "取消",
            cancelColor: "",
            confirmText: "确定",
            confirmColor: "",
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        }) : app.util.request({
            url: "entry/wxapp/StoreComments",
            cachetime: "0",
            data: {
                store_id: s,
                user_id: n,
                details: i,
                score: a
            },
            success: function(t) {
                console.log("评论完成"), console.log(t), e.setData({
                    comments: !1
                }), wx.showToast({
                    title: "发表成功",
                    icon: "",
                    image: "",
                    duration: 2e3,
                    mask: !0,
                    success: function(t) {},
                    fail: function(t) {},
                    complete: function(t) {}
                }), setTimeout(function() {
                    e.reload()
                }, 2e3);
                var a = t.data;
                app.util.request({
                    url: "entry/wxapp/GetFormid",
                    cachetime: "0",
                    data: {
                        user_id: e.data.store.user_id
                    },
                    success: function(t) {
                        console.log("搜索form_id"), console.log(t);
                        var e, i, s = [];
                        for (var n in t.data) t.data[n].hours = t.data[n].time.slice(10, 19), t.data[n].time = (t.data[n].time, e = void 0, i = void 0, e = new Date, (i = new Date(e)).setDate(e.getDate() + 7), i.getFullYear() + "-" + (i.getMonth() + 1) + "-" + i.getDate() + t.data[n].hours), u <= t.data[n].time ? s.push(t.data[n]) : app.util.request({
                            url: "entry/wxapp/DelFormid",
                            cachetime: "0",
                            data: {
                                user_id: t.data[n].id,
                                form_id: t.data[n].form_id
                            },
                            success: function(t) {
                                console.log("删除form_id"), console.log(t)
                            }
                        });
                        app.util.request({
                            url: "entry/wxapp/StorehfMessage",
                            cachetime: "0",
                            data: {
                                pl_id: a,
                                form_id: s[0].form_id,
                                user_id: s[0].user_id,
                                openid: s[0].openid
                            },
                            success: function(t) {
                                console.log("发送模板消息"), console.log(t), app.util.request({
                                    url: "entry/wxapp/DelFormid",
                                    cachetime: "0",
                                    data: {
                                        form_id: s[0].form_id,
                                        user_id: s[0].user_id
                                    },
                                    success: function(t) {
                                        console.log("删除已经使用的模板消息"), console.log(t)
                                    }
                                })
                            }
                        })
                    }
                })
            }
        }) : app.util.request({
            url: "entry/wxapp/reply",
            cachetime: "0",
            data: {
                id: o,
                reply: i
            },
            success: function(t) {
                1 == t.data && (e.setData({
                    reply: !1,
                    comments: !1
                }), e.reload())
            }
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
    onShareAppMessage: function() {
        var t = this,
            e = wx.getStorageSync("users").id,
            a = t.data.store.store_name,
            i = t.data.store.id;
        return {
            title: a,
            path: "/zh_tcwq/pages/sellerinfo/sellerinfo?user_id=" + e + "&id=" + i + "&type=1",
            success: function(e) {
                app.util.request({
                    url: "entry/wxapp/StoreFxNum",
                    cachetime: "0",
                    data: {
                        store_id: i
                    },
                    success: function(e) {
                        t.reload()
                    }
                })
            },
            fail: function(t) {}
        }
    }
});