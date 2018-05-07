var _Page;

function _defineProperty(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e
}
var app = getApp(),
    Data = require("../../utils/util.js");
Page((_defineProperty(_Page = {
    data: {
        index: 0,
        currentTab: 0,
        swiperCurrent: 0,
        indicatorDots: !1,
        autoplay: !0,
        interval: 5e3,
        duration: 1e3,
        circular: !0,
        averdr: !1,
        hotels: !1,
        refresh_top: !1,
        scroll_top: !0,
        index_class: !1
    },
    swiperChange: function(e) {
        this.setData({
            swiperCurrent: e.detail.current
        })
    },
    swiperChange1: function(e) {
        this.setData({
            swiperCurrent1: e.detail.current
        })
    },
    jumps: function(e) {
        var t = this,
            a = (e.currentTarget.dataset.name, e.currentTarget.dataset.appid),
            n = e.currentTarget.dataset.src,
            r = e.currentTarget.dataset.id;
        console.log(r);
        var i = e.currentTarget.dataset.type;
        if (1 == i) {
            var o = n.replace(/[^0-9]/gi, "");
            n = n = n.replace(/(\d+|\s+)/g, ""), console.log(n), console.log(o), console.log(), wx.navigateTo({
                url: n + Number(o),
                success: function(e) {
                    t.setData({
                        averdr: !0
                    })
                },
                fail: function(e) {},
                complete: function(e) {}
            })
        } else 2 == i ? wx.navigateTo({
            url: "../car/car?vr=" + r,
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        }) : 3 == i && wx.navigateToMiniProgram({
            appId: a,
            path: "",
            extraData: {
                foo: "bar"
            },
            success: function(e) {
                t.setData({
                    averdr: !0
                })
            }
        })
    },
    city_select: function(e) {
        wx.navigateTo({
            url: "city",
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        })
    },
    delete: function(e) {
        this.setData({
            averdr: !0
        })
    },
    changeIndicatorDots: function(e) {
        this.setData({
            indicatorDots: !this.data.indicatorDots
        })
    },
    changeAutoplay: function(e) {
        this.setData({
            autoplay: !this.data.autoplay
        })
    },
    intervalChange: function(e) {
        this.setData({
            interval: e.detail.value
        })
    },
    durationChange: function(e) {
        this.setData({
            duration: e.detail.value
        })
    },
    seller: function(e) {
        wx.navigateTo({
            url: "../sellerinfo/sellerinfo"
        })
    },
    settled: function(e) {
        wx.navigateTo({
            url: "../settled/settled"
        })
    },
    onLoad: function(e) {
        console.log("onLoad");
        var t = this;
        wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: wx.getStorageSync("color"),
            animation: {
                duration: 0,
                timingFunc: "easeIn"
            }
        }), wx.getLocation({
            type: "wgs84",
            success: function(e) {
                e.latitude, e.longitude, e.speed, e.accuracy
            }
        }), wx.getSystemInfo({
            success: function(e) {
                t.setData({
                    windowHeight: e.windowHeight
                })
            }
        }), app.util.request({
            url: "entry/wxapp/Url2",
            cachetime: "0",
            success: function(e) {
                wx.setStorageSync("url2", e.data)
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
            url: "entry/wxapp/Views",
            cachetime: "0",
            success: function(e) {
                console.log(e);
                var a = e.data;
                "" == a ? a = 0 : Number(a) > 1e4 && (a = (Number(a) / 1e4).toFixed(2) + "万"), t.setData({
                    views: a
                })
            }
        }), app.util.request({
            url: "entry/wxapp/Num",
            cachetime: "0",
            success: function(e) {
                t.setData({
                    Num: e.data
                })
            }
        }), app.util.request({
            url: "entry/wxapp/Url",
            cachetime: "0",
            success: function(e) {
                wx.setStorageSync("url", e.data), t.setData({
                    url: e.data
                })
            }
        }), t.refresh(), t.seller()
    },
    refresh: function(e) {
        var t = this,
            a = wx.getStorageSync("city");
        app.util.request({
            url: "entry/wxapp/Storelist",
            cachetime: "0",
            data: {
                cityname: a
            },
            success: function(e) {
                e.data.length <= 5 ? t.setData({
                    store: e.data
                }) : t.setData({
                    store: e.data.slice(0, 6)
                })
            }
        }), app.util.request({
            url: "entry/wxapp/Ad",
            cachetime: "0",
            data: {
                cityname: a
            },
            success: function(e) {
                console.log(e);
                var a = [],
                    n = [],
                    r = [];
                for (var i in e.data) 8 == e.data[i].type && a.push(e.data[i]), 5 == e.data[i].type && n.push(e.data[i]), 7 == e.data[i].type && r.push(e.data[i]);
                t.setData({
                    slide: a,
                    advert: n,
                    ggslide: r
                })
            }
        }), app.util.request({
            url: "entry/wxapp/news",
            cachetime: "0",
            data: {
                cityname: a
            },
            success: function(e) {
                var a = [];
                for (var n in e.data) 4 == e.data[n].type && a.push(e.data[n]);
                t.setData({
                    msgList: a
                })
            }
        }), app.util.request({
            url: "entry/wxapp/type",
            cachetime: "0",
            success: function(e) {
                var a = e.data;
                a.length <= 5 ? t.setData({
                    height: 165
                }) : a.length > 5 && t.setData({
                    height: 330
                });
                for (var n = [], r = 0, i = a.length; r < i; r += 10) n.push(a.slice(r, r + 10));
                console.log(n, a), t.setData({
                    nav: n,
                    navs: a
                })
            }
        })
    }
}, "seller", function(e) {
    var t = this,
        a = t.data.index_class,
        n = wx.getStorageSync("city"),
        r = wx.getStorageSync("index"),
        i = t.data.page,
        o = t.data.seller;
    if (console.log(n), 1 == a) {
        null != i && "" != i || (i = 1), null != o && "" != o || (o = []);
        var s = t.data.navs[r].id;
        app.util.request({
            url: "entry/wxapp/list2",
            cachetime: "0",
            data: {
                type_id: s,
                page: t.data.page,
                cityname: n
            },
            success: function(e) {
                if (console.log(e.data), 0 == e.data.length) t.setData({
                    refresh_top: !0
                });
                else {
                    t.setData({
                        refresh_top: !1,
                        page: i + 1
                    }), o = o.concat(e.data), o = function(e) {
                        for (var t = [], a = 0; a < e.length; a++) - 1 == t.indexOf(e[a]) && t.push(e[a]);
                        return t
                    }(o)
                }
                if (e.data.length > 0) {
                    var a = function() {
                        var e = "rgb(" + Math.floor(255 * Math.random()) + "," + Math.floor(255 * Math.random()) + "," + Math.floor(255 * Math.random()) + ")";
                        return e
                    };
                    for (var n in e.data) {
                        var r = app.ormatDate(e.data[n].tz.sh_time);
                        e.data[n].tz.img = e.data[n].tz.img.split(","), e.data[n].tz.details = e.data[n].tz.details.replace("?", " "), e.data[n].tz.img.length > 4 && (e.data[n].tz.img_length = Number(e.data[n].tz.img.length) - 4), e.data[n].tz.img.length >= 4 ? e.data[n].tz.img1 = e.data[n].tz.img.slice(0, 4) : e.data[n].tz.img1 = e.data[n].tz.img, e.data[n].tz.time = r.slice(0, 16)
                    }
                    for (var s in o) {
                        for (var c in o[s].label) o[s].label[c].number = a();
                        t.setData({
                            seller: o
                        })
                    }
                } else t.setData({
                    seller: o
                })
            }
        })
    } else null == i && (i = 1), null == o && (o = []), app.util.request({
        url: "entry/wxapp/list2",
        cachetime: "0",
        data: {
            page: t.data.page,
            cityname: n
        },
        success: function(e) {
            if (console.log(e.data), 0 == e.data.length) t.setData({
                refresh_top: !0
            });
            else {
                t.setData({
                    refresh_top: !1,
                    page: i + 1
                }), o = o.concat(e.data), o = function(e) {
                    for (var t = [], a = 0; a < e.length; a++) - 1 == t.indexOf(e[a]) && t.push(e[a]);
                    return t
                }(o)
            }
            if (e.data.length > 0) {
                var a = function() {
                    var e = "rgb(" + Math.floor(255 * Math.random()) + "," + Math.floor(255 * Math.random()) + "," + Math.floor(255 * Math.random()) + ")";
                    return e
                };
                for (var n in e.data) {
                    var r = app.ormatDate(e.data[n].tz.sh_time);
                    e.data[n].tz.img = e.data[n].tz.img.split(","), e.data[n].tz.details = e.data[n].tz.details.replace("?", " "), e.data[n].tz.img.length > 4 && (e.data[n].tz.img_length = Number(e.data[n].tz.img.length) - 4), e.data[n].tz.img.length >= 4 ? e.data[n].tz.img1 = e.data[n].tz.img.slice(0, 4) : e.data[n].tz.img1 = e.data[n].tz.img, e.data[n].tz.time = r.slice(0, 16)
                }
                for (var s in o) {
                    for (var c in o[s].label) o[s].label[c].number = a();
                    t.setData({
                        seller: o
                    })
                }
            } else t.setData({
                seller: o
            })
        }
    })
}), _defineProperty(_Page, "commend", function(e) {
    var t = e.currentTarget.id;
    var a = e.currentTarget.dataset.index;
    wx.setStorageSync("index", a), this.setData({
        page: "",
        seller: "",
        index: a,
        index_class: !0,
        activeIndex: t
    }), this.seller()
}), _defineProperty(_Page, "whole", function(e) {
    wx.removeStorage({
        key: "index",
        success: function(e) {}
    }), this.setData({
        page: 1,
        seller: [],
        index_class: !1
    }), this.seller()
}), _defineProperty(_Page, "bindinput", function(e) {
    var t = e.detail.value;
    "" != t && app.util.request({
        url: "entry/wxapp/list2",
        cachetime: "0",
        data: {
            keywords: t
        },
        success: function(e) {
            0 == e.data.length ? wx.showModal({
                title: "提示",
                content: "没有这个帖子",
                showCancel: !0,
                cancelText: "取消",
                confirmText: "确定",
                success: function(e) {},
                fail: function(e) {},
                complete: function(e) {}
            }) : wx.navigateTo({
                url: "../infodetial/infodetial?id=" + e.data[0].tz.id,
                success: function(e) {},
                fail: function(e) {},
                complete: function(e) {}
            })
        }
    })
}), _defineProperty(_Page, "ormatDate", function(e) {
    var t = new Date(1e3 * e);
    return t.getFullYear() + "-" + a(t.getMonth() + 1, 2) + "-" + a(t.getDate(), 2) + " " + a(t.getHours(), 2) + ":" + a(t.getMinutes(), 2) + ":" + a(t.getSeconds(), 2);

    function a(e, t) {
        for (var a = "" + e, n = a.length, r = "", i = t; i-- > n;) r += "0";
        return r + a
    }
}), _defineProperty(_Page, "thumbs_up", function(e) {
    var t = this,
        a = t.data.seller,
        n = e.currentTarget.dataset.id,
        r = wx.getStorageSync("users").id,
        i = (Number(e.currentTarget.dataset.num), function(e) {
            a[e].tz.id == n && (a[e].thumbs_up = !0, app.util.request({
                url: "entry/wxapp/Like",
                cachetime: "0",
                data: {
                    information_id: n,
                    user_id: r
                },
                success: function(n) {
                    1 != n.data ? wx.showModal({
                        title: "提示",
                        content: "不能重复点赞",
                        showCancel: !0,
                        cancelText: "取消",
                        confirmText: "确认",
                        success: function(e) {},
                        fail: function(e) {},
                        complete: function(e) {}
                    }) : (a[e].tz.givelike = Number(a[e].tz.givelike) + 1, t.setData({
                        seller: a
                    }))
                }
            }))
        });
    for (var o in a) i(o)
}), _defineProperty(_Page, "previewImage", function(e) {
    console.log(e);
    var t = e.currentTarget.dataset.id,
        a = this.data.url,
        n = [],
        r = e.currentTarget.dataset.inde,
        i = this.data.seller;
    for (var o in i) if (i[o].tz.id == t) {
        var s = i[o].tz.img;
        for (var c in s) n.push(a + s[c]);
        wx.previewImage({
            current: a + s[r],
            urls: n
        })
    }
}), _defineProperty(_Page, "red", function(e) {
    wx.navigateTo({
        url: "../redbag/redbag",
        success: function(e) {},
        fail: function(e) {},
        complete: function(e) {}
    })
}), _defineProperty(_Page, "redinfo", function(e) {
    wx.showModal({
        title: "温馨提示",
        content: "功能暂未开放,敬请期待",
        showCancel: !0,
        cancelText: "取消",
        confirmText: "确定",
        success: function(e) {},
        fail: function(e) {},
        complete: function(e) {}
    })
}), _defineProperty(_Page, "yellow_page", function(e) {
    wx.reLaunch({
        url: "../yellow_page/yellow"
    })
}), _defineProperty(_Page, "post1", function(e) {
    wx.switchTab({
        url: "../fabu/fabu/fabu"
    })
}), _defineProperty(_Page, "store_info", function(e) {
    var t = e.currentTarget.id;
    wx.navigateTo({
        url: "../sellerinfo/sellerinfo?id=" + t,
        success: function(e) {},
        fail: function(e) {},
        complete: function(e) {}
    })
}), _defineProperty(_Page, "notice", function(e) {
    var t = e.currentTarget.dataset.id;
    wx.navigateTo({
        url: "../notice/notice?id=" + t,
        success: function(e) {},
        fail: function(e) {},
        complete: function(e) {}
    })
}), _defineProperty(_Page, "post", function(e) {
    wx, wx.reLaunch({
        url: "../shun/shun",
        success: function(e) {},
        fail: function(e) {},
        complete: function(e) {}
    })
}), _defineProperty(_Page, "phone", function(e) {
    var t = e.currentTarget.dataset.id;
    wx.makePhoneCall({
        phoneNumber: t
    })
}), _defineProperty(_Page, "more", function(e) {
    wx.switchTab({
        url: "../store/store",
        success: function(e) {},
        fail: function(e) {},
        complete: function(e) {}
    })
}), _defineProperty(_Page, "jump", function(e) {
    var t = e.currentTarget.dataset.id,
        a = e.currentTarget.dataset.name;
    wx.navigateTo({
        url: "../marry/marry?id=" + t + "&name=" + a,
        success: function(e) {},
        fail: function(e) {},
        complete: function(e) {}
    })
}), _defineProperty(_Page, "see", function(e) {
    this.data.seller;
    var t = e.currentTarget.dataset.id;
    wx.navigateTo({
        url: "../infodetial/infodetial?id=" + t,
        success: function(e) {},
        fail: function(e) {},
        complete: function(e) {}
    })
}), _defineProperty(_Page, "formid_one", function(e) {
    console.log("搜集第一个formid"), console.log(e), app.util.request({
        url: "entry/wxapp/SaveFormid",
        cachetime: "0",
        data: {
            user_id: wx.getStorageSync("users").id,
            form_id: e.detail.formId,
            openid: wx.getStorageSync("openid")
        },
        success: function(e) {}
    })
}), _defineProperty(_Page, "onReady", function() {
    this.setData({
        first: 1
    })
}), _defineProperty(_Page, "onShow", function() {}), _defineProperty(_Page, "onHide", function() {}), _defineProperty(_Page, "onUnload", function() {
    wx.removeStorageSync("city_type")
}), _defineProperty(_Page, "onPullDownRefresh", function() {
    this.setData({
        page: 1,
        seller: [],
        refresh_top: !1
    }), this.refresh(), this.seller(), wx.stopPullDownRefresh()
}), _defineProperty(_Page, "onReachBottom", function() {
    0 == this.data.refresh_top && this.seller()
}), _defineProperty(_Page, "onShareAppMessage", function() {}), _Page));