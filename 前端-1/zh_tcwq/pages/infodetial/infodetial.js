var app = getApp();
Page({
    data: {
        reply: !1,
        comment: !1,
        select: 0,
        arrow: 1,
        sure: !1,
        receive: !1,
        rob_redbag: !1,
        share: !1,
        hb_share: !1,
        share_red: !1
    },
    onLoad: function(t) {
        var e = this;
        console.log(t), app.util.request({
            url: "entry/wxapp/System",
            cachetime: "0",
            success: function(t) {
                console.log(t), e.setData({
                    system: t.data
                })
            }
        }), wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: wx.getStorageSync("color"),
            animation: {
                duration: 0,
                timingFunc: "easeIn"
            }
        }), wx.getSystemInfo({
            success: function(t) {
                var a = t.windowWidth / 2,
                    o = 1.095 * a;
                e.setData({
                    width: a,
                    height: o
                })
            }
        }), app.util.request({
            url: "entry/wxapp/Url",
            cachetime: "0",
            success: function(t) {
                wx.setStorageSync("url", t.data), e.setData({
                    url: t.data
                })
            }
        }), app.util.request({
            url: "entry/wxapp/Url2",
            cachetime: "0",
            success: function(t) {
                console.log(t), e.setData({
                    url2: t.data
                })
            }
        });
        var a = wx.getStorageSync("users").id;
        null != t.type ? (wx.login({
            success: function(t) {
                var a = t.code;
                wx.setStorageSync("code", a), wx.getUserInfo({
                    success: function(t) {
                        wx.setStorageSync("user_info", t.userInfo);
                        var o = t.userInfo.nickName,
                            n = t.userInfo.avatarUrl;
                        app.util.request({
                            url: "entry/wxapp/openid",
                            cachetime: "0",
                            data: {
                                code: a
                            },
                            success: function(t) {
                                wx.setStorageSync("key", t.data.session_key);
                                var a = n,
                                    s = o;
                                wx.setStorageSync("openid", t.data.openid);
                                var i = t.data.openid;
                                app.util.request({
                                    url: "entry/wxapp/Login",
                                    cachetime: "0",
                                    data: {
                                        openid: i,
                                        img: a,
                                        name: s
                                    },
                                    success: function(t) {
                                        wx.setStorageSync("users", t.data), wx.setStorageSync("uniacid", t.data.uniacid), e.setData({
                                            user_id: t.data.id,
                                            user_name: s
                                        }), e.reload()
                                    }
                                })
                            }
                        })
                    },
                    fail: function() {
                        wx.showModal({
                            title: "警告",
                            content: "您点击了拒绝授权,无法正常使用此小程序,点击确定重新获取授权。",
                            showCancel: !1,
                            success: function(t) {
                                t.confirm && wx.openSetting({
                                    success: function(t) {
                                        if (t.authSetting["scope.userInfo"]) wx.getUserInfo({
                                            success: function(t) {
                                                wx.setStorageSync("user_info", t.userInfo);
                                                var o = t.userInfo.nickName,
                                                    n = t.userInfo.avatarUrl;
                                                app.util.request({
                                                    url: "entry/wxapp/openid",
                                                    cachetime: "0",
                                                    data: {
                                                        code: a
                                                    },
                                                    success: function(t) {
                                                        wx.setStorageSync("key", t.data.session_key);
                                                        var a = n,
                                                            s = o;
                                                        wx.setStorageSync("openid", t.data.openid);
                                                        var i = t.data.openid;
                                                        app.util.request({
                                                            url: "entry/wxapp/Login",
                                                            cachetime: "0",
                                                            data: {
                                                                openid: i,
                                                                img: a,
                                                                name: s
                                                            },
                                                            success: function(t) {
                                                                wx.setStorageSync("users", t.data), wx.setStorageSync("uniacid", t.data.uniacid), e.setData({
                                                                    user_id: t.data.id,
                                                                    user_name: s
                                                                }), e.reload()
                                                            }
                                                        })
                                                    }
                                                })
                                            }
                                        });
                                        else {
                                            wx.setStorageSync("user_info", "");
                                            app.util.request({
                                                url: "entry/wxapp/openid",
                                                cachetime: "0",
                                                data: {
                                                    code: a
                                                },
                                                success: function(t) {
                                                    wx.setStorageSync("key", t.data.session_key);
                                                    wx.setStorageSync("openid", t.data.openid);
                                                    var a = t.data.openid;
                                                    app.util.request({
                                                        url: "entry/wxapp/Login",
                                                        cachetime: "0",
                                                        data: {
                                                            openid: a,
                                                            img: "",
                                                            name: ""
                                                        },
                                                        success: function(t) {
                                                            wx.setStorageSync("users", t.data), wx.setStorageSync("uniacid", t.data.uniacid), e.setData({
                                                                user_id: t.data.id,
                                                                user_name: ""
                                                            }), e.reload()
                                                        }
                                                    })
                                                }
                                            })
                                        }
                                    },
                                    fail: function(t) {}
                                })
                            }
                        })
                    }
                })
            }
        }), e.setData({
            post_info_id: t.my_post
        })) : (e.setData({
            user_id: a,
            post_info_id: t.id,
            user_name: wx.getStorageSync("users").name
        }), e.reload())
    },
    reload: function(t) {
        var e = this,
            a = e.data.post_info_id;
        app.util.request({
            url: "entry/wxapp/IsCollection",
            cachetime: "0",
            data: {
                information_id: a,
                user_id: e.data.user_id
            },
            success: function(t) {
                1 == t.data ? e.setData({
                    Collection: !0
                }) : e.setData({
                    Collection: !1
                })
            }
        });
        var o = wx.getStorageSync("System");
        e.setData({
            system_name: o.pt_name
        }), app.util.request({
            url: "entry/wxapp/PostInfo",
            cachetime: "0",
            data: {
                id: a
            },
            success: function(t) {
                if (console.log(t), null == t.data.tz.type2_name) var o = "";
                else o = t.data.tz.type2_name;
                wx.setNavigationBarTitle({
                    title: t.data.tz.type_name + " " + o
                });
                var n = e.ormatDate(t.data.tz.sh_time);
                for (var s in t.data.tz.time2 = n.slice(0, 16), t.data.pl) t.data.pl[s].time = e.ormatDate(t.data.pl[s].time), t.data.pl[s].time = t.data.pl[s].time.slice(0, 16);
                var i = t.data.tz.givelike;
                for (var r in t.data.tz.img = t.data.tz.img.split(","), t.data.label) t.data.label[r].number = "rgb(" + Math.floor(255 * Math.random()) + "," + Math.floor(255 * Math.random()) + "," + Math.floor(255 * Math.random()) + ")";
                var c = Number(t.data.tz.hb_num),
                    u = Number(t.data.tz.hb_random);
                Number(t.data.tz.hb_type);
                t.data.tz.hb_money = 1 == u ? t.data.tz.hb_money : (Number(t.data.tz.hb_money) * c).toFixed(2), app.util.request({
                    url: "entry/wxapp/HongList",
                    cachetime: "0",
                    data: {
                        id: t.data.tz.id
                    },
                    success: function(t) {
                        console.log(t);
                        var a = t.data,
                            o = 0;
                        if (1 == (n = function(t, e) {
                            for (var a = 0; a < t.length; a++) if (e === t[a].user_id) return !0;
                            return !1
                        }(a, e.data.user_id))) var n = 2;
                        else if (c == a.length) n = 1;
                        else n = 3;
                        for (var s in a) o += Number(a[s].money);
                        e.setData({
                            price: o.toFixed(2),
                            hongbao_use: n,
                            hongbao_len: t.data.length,
                            hongbao: a
                        })
                    }
                }), t.data.tz.details = t.data.tz.details.replace("?", "\n"), t.data.tz.trans1 = 1, t.data.tz.trans2 = 1, t.data.tz.dis1 = "block", t.data.tz.trans_1 = 2, t.data.tz.trans_2 = 1, e.setData({
                    post: t.data.tz,
                    dianzan: t.data.dz,
                    givelike: i,
                    post_info_id: a,
                    tei_id: t.data.tz.id,
                    criticism: t.data.pl,
                    label: t.data.label
                })
            }
        })
    },
    ormatDate: function(t) {
        var e = new Date(1e3 * t);
        return e.getFullYear() + "-" + a(e.getMonth() + 1, 2) + "-" + a(e.getDate(), 2) + " " + a(e.getHours(), 2) + ":" + a(e.getMinutes(), 2) + ":" + a(e.getSeconds(), 2);

        function a(t, e) {
            for (var a = "" + t, o = a.length, n = "", s = e; s-- > o;) n += "0";
            return n + a
        }
    },
    rob_redbag: function(t) {
        var e = this.data.rob_redbag;
        this.data.hongbao_use;
        1 == e ? this.setData({
            rob_redbag: !1
        }) : this.setData({
            rob_redbag: !0
        })
    },
    trans1: function(t) {
        var e = this,
            a = e.data.post,
            o = e.data.num;
        if (2 == e.data.system.is_hbzf) {
            if (null == o && (o = 1), 1 == o) {
                a.trans1 = "trans1", a.trans2 = "trans2";
                var n = wx.getStorageSync("users").id,
                    s = e.data.post_info_id;
                app.util.request({
                    url: "entry/wxapp/GetHong",
                    cachetime: "0",
                    data: {
                        id: s,
                        user_id: n
                    },
                    success: function(t) {
                        console.log("领取红包"), console.log(t), "error" == t.data && wx.showModal({
                            title: "提示",
                            content: "手慢了，红包被抢光了"
                        })
                    }
                }), setTimeout(function() {
                    a.trans_1 = 1, a.trans_2 = 2, a.dis1 = "none", a.dis2 = "block", e.setData({
                        store: a
                    })
                }, 500), setTimeout(function() {
                    a.trans_1 = 2, a.trans_2 = 1, a.dis1 = "block", a.dis2 = "none", e.setData({
                        store: a
                    })
                }, 1e3), setTimeout(function() {
                    a.trans_1 = 1, a.trans_2 = 2, a.dis1 = "none", a.dis2 = "block", e.setData({
                        store: a
                    })
                }, 1500), setTimeout(function() {
                    wx.navigateTo({
                        url: "../redbag/redinfo/see_rob?id=" + e.data.post_info_id,
                        success: function(t) {},
                        fail: function(t) {},
                        complete: function(t) {}
                    }), e.setData({
                        rob_redbag: !1
                    })
                }, 1300)
            }
            e.setData({
                post: a,
                num: o + 1
            })
        } else e.setData({
            share_red: !0,
            rob_redbag: !1
        })
    },
    trans2: function(t) {
        this.data.store;
        wx.navigateTo({
            url: "../redbag/redinfo/see_rob?id=" + this.data.post_info_id,
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        }), this.setData({
            rob_redbag: !1
        })
    },
    weixin: function(t) {
        this.setData({
            hb_share: !1
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
    receive1: function(t) {
        this.setData({
            receive: !1
        })
    },
    fabu: function(t) {
        wx.reLaunch({
            url: "../fabu/fabu/fabu",
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        })
    },
    previewImage: function(t) {
        var e = this.data.url,
            a = [],
            o = t.currentTarget.dataset.inde,
            n = this.data.post.img;
        for (var s in n) a.push(e + n[s]);
        wx.previewImage({
            current: e + n[o],
            urls: a
        })
    },
    Collection: function(t) {
        var e = this,
            a = e.data.tei_id,
            o = wx.getStorageSync("users").id;
        app.util.request({
            url: "entry/wxapp/Collection",
            cachetime: "0",
            data: {
                information_id: a,
                user_id: o
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
    hb_keyword: function(t) {
        var e = t.detail.value;
        this.data.post.hb_keyword == e ? this.setData({
            sure: !0
        }) : wx.showModal({
            title: "提示",
            content: "输入的口令错误，请重新输入",
            showCancel: !0,
            cancelText: "取消",
            confirmText: "确定",
            success: function(e) {
                t.detail.value
            },
            fail: function(t) {},
            complete: function(t) {}
        })
    },
    comment: function(t) {
        var e = this,
            a = wx.getStorageSync("users").id;
        app.util.request({
            url: "entry/wxapp/GetUserInfo",
            cachetime: "0",
            data: {
                user_id: a
            },
            success: function(t) {
                console.log(t), 1 == t.data.state ? e.setData({
                    comment: !0
                }) : wx.showModal({
                    title: "提示",
                    content: "您的账号异常，请尽快联系管理员",
                    showCancel: !0,
                    cancelText: "取消",
                    confirmText: "确定",
                    success: function(t) {},
                    fail: function(t) {},
                    complete: function(t) {}
                })
            }
        })
    },
    complete: function(t) {
        this.setData({
            complete: t.detail.value
        })
    },
    complete1: function(t) {
        this.setData({
            complete1: t.detail.value
        })
    },
    formid_two: function(t) {
        console.log(t), app.util.request({
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
            a = (t.detail.formId, e.data.complete),
            o = e.data.user_id,
            n = e.data.post_info_id,
            s = e.data.post.user_id;
        var i, r, c, u = (i = new Date, r = i.getMonth() + 1, c = i.getDate(), r >= 1 && r <= 9 && (r = "0" + r), c >= 0 && c <= 9 && (c = "0" + c), i.getFullYear() + "-" + r + "-" + c + " " + i.getHours() + ":" + i.getMinutes() + ":" + i.getSeconds());
        "" == a || null == a ? wx.showToast({
            title: "内容为空",
            icon: "loading",
            duration: 1e3
        }) : (e.setData({
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
            success: function(t) {
                if ("error" != t.data) {
                    wx.showToast({
                        title: "评论成功"
                    }), setTimeout(function() {
                        e.reload()
                    }, 1e3);
                    var a = t.data;
                    app.util.request({
                        url: "entry/wxapp/GetFormid",
                        cachetime: "0",
                        data: {
                            user_id: s
                        },
                        success: function(t) {
                            console.log(t);
                            var e, o, n = [];
                            for (var s in t.data) t.data[s].hours = t.data[s].time.slice(10, 19), t.data[s].time = (t.data[s].time, e = void 0, o = void 0, e = new Date, (o = new Date(e)).setDate(e.getDate() + 7), o.getFullYear() + "-" + (o.getMonth() + 1) + "-" + o.getDate() + t.data[s].hours), console.log(t.data[s].time), console.log(u), u <= t.data[s].time ? n.push(t.data[s]) : app.util.request({
                                url: "entry/wxapp/DelFormid",
                                cachetime: "0",
                                data: {
                                    user_id: t.data[s].user_id,
                                    form_id: t.data[s].form_id
                                },
                                success: function(t) {}
                            });
                            console.log(n), app.util.request({
                                url: "entry/wxapp/TzhfMessage",
                                cachetime: "0",
                                data: {
                                    pl_id: a,
                                    form_id: n[0].form_id,
                                    user_id: n[0].user_id,
                                    openid: n[0].openid
                                },
                                success: function(t) {
                                    console.log(t), app.util.request({
                                        url: "entry/wxapp/DelFormid",
                                        cachetime: "0",
                                        data: {
                                            form_id: n[0].form_id,
                                            user_id: n[0].user_id
                                        },
                                        success: function(t) {
                                            console.log(t)
                                        }
                                    })
                                }
                            })
                        }
                    })
                } else wx.showToast({
                    title: "评论失败",
                    icon: "loading"
                })
            }
        }))
    },
    reply1: function(t) {
        var e = t.currentTarget.dataset.reflex_id,
            a = t.currentTarget.dataset.name,
            o = this.data.user_id;
        this.data.post.user_id == o ? this.setData({
            reply: !0,
            reflex_id: e,
            reflex_name: "回复" + a
        }) : wx.showToast({
            title: "管理员可回复",
            icon: "loading",
            duration: 1e3
        })
    },
    formid_one: function(t) {
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
            reply: !1,
            comment: !1
        })
    },
    reply3: function(t) {
        var e = this,
            a = e.data.reflex_id,
            o = e.data.complete1;
        "" == o || null == o ? wx.showToast({
            title: "内容为空",
            icon: "loading",
            duration: 1e3
        }) : (e.setData({
            reply: !1
        }), app.util.request({
            url: "entry/wxapp/reply",
            cachetime: "0",
            data: {
                id: a,
                reply: o
            },
            success: function(t) {
                console.log(t), 1 == t.data && (wx.showToast({
                    title: "回复成功"
                }), setTimeout(function() {
                    e.reload()
                }, 1e3))
            }
        }))
    },
    phone: function(t) {
        var e = this.data.post;
        wx.makePhoneCall({
            phoneNumber: e.user_tel
        })
    },
    move: function(t) {
        var e = this,
            a = e.data.select;
        1 == e.data.arrow ? setTimeout(function() {
            e.setData({
                arrow: 2
            })
        }, 1500) : setTimeout(function() {
            e.setData({
                arrow: 1
            })
        }, 1500), 1 == a ? e.setData({
            select: 0
        }) : e.setData({
            select: 1
        })
    },
    formSubmit: function(t) {
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
        var e = t.detail.formId;
        console.log("用户的form——id是" + e), console.log(this.data);
        var a = wx.getStorageSync("openid");
        console.log(a);
        var o = this,
            n = o.data.tei_id,
            s = wx.getStorageSync("users").id,
            i = Number(o.data.givelike);
        o.data.post.user_id;
        app.util.request({
            url: "entry/wxapp/Like",
            cachetime: "0",
            data: {
                information_id: n,
                user_id: s
            },
            success: function(t) {
                console.log(t), "1" == t.data && (wx.showToast({
                    title: "点赞成功",
                    duration: 1e3
                }), o.reload(), o.setData({
                    thumbs_ups: !0,
                    thumbs_up: i + 1
                })), "不能重复点赞!" == t.data && (wx.showModal({
                    title: "提示",
                    content: "不能重复点赞",
                    showCancel: !0,
                    cancelText: "取消",
                    confirmText: "确认",
                    success: function(t) {},
                    fail: function(t) {},
                    complete: function(t) {}
                }), o.setData({
                    thumbs_ups: !0
                }))
            }
        })
    },
    shou: function(t) {
        wx.switchTab({
            url: "../index/index",
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        })
    },
    post: function(t) {
        wx.switchTab({
            url: "../fabu/fabu/fabu",
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        })
    },
    onReady: function() {},
    onShow: function() {
        this.reload()
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.reload(), wx.stopPullDownRefresh()
    },
    onReachBottom: function() {},
    onShareAppMessage: function(t) {
        console.log(t);
        var e = this;
        console.log(e.data), e.setData({
            share: !0
        });
        var a = e.data.post.user_name,
            o = e.data.post_info_id,
            n = Number(e.data.post.hb_money),
            s = e.data.system.hb_content,
            i = e.data.system.hb_img;
        if (console.log(i), "" == i) var r = e.data.url2 + "addons/zh_tcwq/template/images/hongbao.jpg";
        else r = e.data.url + e.data.system.hb_img;
        if (console.log(n, s, r), "" == s) var c = e.data.user_name + "邀您一起拆" + a + "的红包";
        else c = (c = e.data.system.hb_content.replace("name", e.data.user_name)).replace("type", "【" + e.data.post.type_name + "】");
        return n > 0 && "button" == t.from ? {
            title: c,
            path: "/zh_tcwq/pages/infodetial/infodetial?user_id=" + e.data.user_id + "&my_post=" + o + "&type=1",
            imageUrl: r,
            success: function(t) {
                console.log("这是转发成功"), app.util.request({
                    url: "entry/wxapp/HbFx",
                    cachetime: "0",
                    data: {
                        information_id: e.data.post.id
                    },
                    success: function(t) {
                        console.log(t)
                    }
                }), console.log(t), e.setData({
                    share_red: !1
                });
                var a = e.data.user_id,
                    o = e.data.post_info_id;
                console.log(o, a), app.util.request({
                    url: "entry/wxapp/GetHong",
                    cachetime: "0",
                    data: {
                        id: o,
                        user_id: a
                    },
                    success: function(t) {
                        console.log("领取红包"), console.log(t), "error" == t.data && wx.showModal({
                            title: "提示",
                            content: "手慢了，红包被抢光了"
                        })
                    }
                }), wx.navigateTo({
                    url: "../redbag/redinfo/see_rob?id=" + e.data.post_info_id,
                    success: function(t) {},
                    fail: function(t) {},
                    complete: function(t) {}
                }), e.setData({
                    share: !0,
                    hb_share: !1,
                    rob_redbag: !1
                })
            },
            fail: function(t) {}
        } : n > 0 && "menu" == t.from ? {
            title: c,
            path: "/zh_tcwq/pages/infodetial/infodetial?user_id=" + e.data.user_id + "&my_post=" + o + "&type=1",
            success: function(t) {
                console.log("这是转发成功"), app.util.request({
                    url: "entry/wxapp/HbFx",
                    cachetime: "0",
                    data: {
                        information_id: e.data.post.id
                    },
                    success: function(t) {
                        console.log(t)
                    }
                }), console.log(t), e.setData({
                    share_red: !1
                })
            },
            fail: function(t) {}
        } : {
            title: "【" + e.data.post.type_name + "】 " + e.data.post.details,
            path: "/zh_tcwq/pages/infodetial/infodetial?user_id=" + e.data.user_id + "&my_post=" + o + "&type=1",
            success: function(t) {
                console.log("这是转发成功"), app.util.request({
                    url: "entry/wxapp/HbFx",
                    cachetime: "0",
                    data: {
                        information_id: e.data.post.id
                    },
                    success: function(t) {
                        console.log(t)
                    }
                }), console.log(t), e.setData({
                    share_red: !1
                })
            },
            fail: function(t) {}
        }
    }
});