var app = getApp(),
    Data = require("../../utils/util.js");
Page({
    data: {
        activeIndex: 0,
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
        index_class: !1,
        seller: [],
        page: 1,
        bkname: "最新信息",
        star: [{
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
        star1: [{
            img: "../image/xing.png"
        }, {
            img: "../image/star_none.png"
        }, {
            img: "../image/star_none.png"
        }, {
            img: "../image/star_none.png"
        }, {
            img: "../image/star_none.png"
        }],
        star2: [{
            img: "../image/xing.png"
        }, {
            img: "../image/xing.png"
        }, {
            img: "../image/star_none.png"
        }, {
            img: "../image/star_none.png"
        }, {
            img: "../image/star_none.png"
        }],
        star3: [{
            img: "../image/xing.png"
        }, {
            img: "../image/xing.png"
        }, {
            img: "../image/xing.png"
        }, {
            img: "../image/star_none.png"
        }, {
            img: "../image/star_none.png"
        }],
        star4: [{
            img: "../image/xing.png"
        }, {
            img: "../image/xing.png"
        }, {
            img: "../image/xing.png"
        }, {
            img: "../image/xing.png"
        }, {
            img: "../image/star_none.png"
        }]
    },
    swiperChange: function(t) {
        this.setData({
            swiperCurrent: t.detail.current
        })
    },
    swiperChange1: function(t) {
        this.setData({
            swiperCurrent1: t.detail.current
        })
    },
    jumps: function(t) {
        var e = this,
            a = (t.currentTarget.dataset.name, t.currentTarget.dataset.appid),
            n = t.currentTarget.dataset.src,
            i = t.currentTarget.dataset.id,
            o = t.currentTarget.dataset.sjtype;
        console.log(i, o);
        var s = t.currentTarget.dataset.type;
        1 == s ? (console.log(n), wx.navigateTo({
            url: n,
            success: function(t) {
                e.setData({
                    averdr: !0
                })
            },
            fail: function(t) {},
            complete: function(t) {}
        })) : 2 == s ? wx.navigateTo({
            url: "../car/car?vr=" + i + "&sjtype=" + o,
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        }) : 3 == s && wx.navigateToMiniProgram({
            appId: a,
            path: "",
            extraData: {
                foo: "bar"
            },
            success: function(t) {
                e.setData({
                    averdr: !0
                })
            }
        })
    },
    city_select: function(t) {
        wx.navigateTo({
            url: "city",
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        })
    },
    delete: function(t) {
        this.setData({
            averdr: !0
        })
    },
    changeIndicatorDots: function(t) {
        this.setData({
            indicatorDots: !this.data.indicatorDots
        })
    },
    changeAutoplay: function(t) {
        this.setData({
            autoplay: !this.data.autoplay
        })
    },
    intervalChange: function(t) {
        this.setData({
            interval: t.detail.value
        })
    },
    durationChange: function(t) {
        this.setData({
            duration: t.detail.value
        })
    },
    settled: function(t) {
        wx.navigateTo({
            url: "../settled/settled"
        })
    },
    onLoad: function(t) {
        console.log("onLoad");
        var e = this;
        wx.getLocation({
            type: "wgs84",
            success: function(t) {
                t.latitude, t.longitude, t.speed, t.accuracy
            }
        }), wx.getSystemInfo({
            success: function(t) {
                e.setData({
                    windowHeight: t.windowHeight
                }), console.log(t)
            }
        }), app.util.request({
            url: "entry/wxapp/Url2",
            cachetime: "0",
            success: function(t) {
                wx.setStorageSync("url2", t.data)
            }
        }), app.util.request({
            url: "entry/wxapp/Url",
            cachetime: "0",
            success: function(t) {
                console.log(t), wx.setStorageSync("url", t.data), e.setData({
                    url: t.data
                })
            }
        }), e.reload()
    },
    reload: function(t) {
        var e = this;
        wx.login({
            success: function(t) {
                var e = t.code;
                wx.setStorageSync("code", e), wx.getUserInfo({
                    success: function(t) {
                        console.log(t), wx.setStorageSync("user_info", t.userInfo);
                        var a = t.userInfo.nickName,
                            n = t.userInfo.avatarUrl;
                        app.util.request({
                            url: "entry/wxapp/openid",
                            cachetime: "0",
                            data: {
                                code: e
                            },
                            success: function(t) {
                                console.log(t), wx.setStorageSync("key", t.data.session_key), wx.setStorageSync("openid", t.data.openid);
                                var e = t.data.openid;
                                app.util.request({
                                    url: "entry/wxapp/Login",
                                    cachetime: "0",
                                    data: {
                                        openid: e,
                                        img: n,
                                        name: a
                                    },
                                    success: function(t) {
                                        console.log(t), wx.setStorageSync("users", t.data), wx.setStorageSync("uniacid", t.data.uniacid)
                                    }
                                })
                            }
                        })
                    },
                    fail: function(t) {
                        wx.getSetting({
                            success: function(t) {
                                0 == t.authSetting["scope.userInfo"] && wx.openSetting({
                                    success: function(t) {}
                                })
                            }
                        })
                    }
                })
            }
        }), wx.getLocation({
            type: "wgs84",
            success: function(t) {
                wx.setStorageSync("Location", t);
                var a = t.latitude + "," + t.longitude;
                app.util.request({
                    url: "entry/wxapp/map",
                    cachetime: "0",
                    data: {
                        op: a
                    },
                    success: function(t) {
                        console.log(t), e.setData({
                            dwcity: t.data.result.address_component.city
                        }), app.util.request({
                            url: "entry/wxapp/System",
                            cachetime: "0",
                            success: function(t) {
                                console.log(t);
                                var a = t.data.gd_key;
                                "" == a && wx.showModal({
                                    title: "配置提示",
                                    content: "请在后台配置高德地图的key",
                                    showCancel: !0,
                                    cancelText: "取消",
                                    confirmText: "确定",
                                    success: function(t) {},
                                    fail: function(t) {},
                                    complete: function(t) {}
                                }), new(require("../amap-wx.js").AMapWX)({
                                    key: a
                                }).getWeather({
                                    success: function(t) {
                                        var a, n, i = t.liveData.city,
                                            o = t.liveData.weather,
                                            s = t.liveData.reporttime.slice(0, 10),
                                            c = (0 == (a = new Date(s)).getDay() && (n = "星期日"), 1 == a.getDay() && (n = "星期一"), 2 == a.getDay() && (n = "星期二"), 3 == a.getDay() && (n = "星期三"), 4 == a.getDay() && (n = "星期四"), 5 == a.getDay() && (n = "星期五"), 6 == a.getDay() && (n = "星期六"), n),
                                            r = t.temperature.data;
                                        e.setData({
                                            area: i,
                                            reporttime: s,
                                            weather: o,
                                            w1: c,
                                            temperature: r
                                        })
                                    },
                                    fail: function(t) {}
                                });
                                var n = ["最新信息"];
                                "1" == t.data.is_sjrz && n.push("热门商家"), "1" == t.data.is_pageopen && n.push("黄页114"), "1" == t.data.is_pcfw && n.push("顺风车"), console.log(n), wx.setStorageSync("System", t.data), 1 == t.data.many_city ? (wx.setStorageSync("city", t.data.cityname), e.setData({
                                    city: t.data.cityname
                                })) : (console.log(wx.getStorageSync("city_type")), 1 != wx.getStorageSync("city_type") ? (wx.setStorageSync("city", e.data.dwcity), e.setData({
                                    city: e.data.dwcity
                                })) : (e.setData({
                                    city: wx.getStorageSync("city")
                                }), console.log("choosecity")));
                                var i = wx.getStorageSync("city");
                                console.log(i), app.util.request({
                                    url: "entry/wxapp/SaveHotCity",
                                    cachetime: "0",
                                    data: {
                                        cityname: i,
                                        user_id: wx.getStorageSync("users").id
                                    },
                                    success: function(t) {
                                        console.log(t)
                                    }
                                }), wx.setNavigationBarTitle({
                                    title: t.data.pt_name
                                }), wx.setStorageSync("color", t.data.color), wx.setNavigationBarColor({
                                    frontColor: "#ffffff",
                                    backgroundColor: wx.getStorageSync("color"),
                                    animation: {
                                        duration: 0,
                                        timingFunc: "easeIn"
                                    }
                                });
                                i = wx.getStorageSync("city");
                                e.setData({
                                    System: t.data,
                                    bkarr: n
                                }), e.refresh(), e.seller()
                            }
                        })
                    }
                })
            },
            fail: function(t) {
                wx.getSetting({
                    success: function(t) {
                        0 == t.authSetting["scope.userLocation"] && wx.openSetting({
                            success: function(t) {}
                        })
                    }
                })
            }
        }), app.util.request({
            url: "entry/wxapp/Views",
            cachetime: "0",
            success: function(t) {
                console.log(t);
                var a = t.data;
                "" == a ? a = 0 : Number(a) > 1e4 && (a = (Number(a) / 1e4).toFixed(2) + "万"), e.setData({
                    views: a
                })
            }
        }), app.util.request({
            url: "entry/wxapp/Num",
            cachetime: "0",
            success: function(t) {
                e.setData({
                    Num: t.data
                })
            }
        })
    },
    refresh: function(t) {
        var e = this,
            a = wx.getStorageSync("city");
        app.util.request({
            url: "entry/wxapp/Storelist",
            cachetime: "0",
            data: {
                cityname: a
            },
            success: function(t) {
                t.data.length <= 5 ? e.setData({
                    store: t.data
                }) : e.setData({
                    store: t.data.slice(0, 6)
                })
            }
        }), app.util.request({
            url: "entry/wxapp/Ad",
            cachetime: "0",
            data: {
                cityname: a
            },
            success: function(t) {
                console.log(t);
                var a = [],
                    n = [],
                    i = [];
                for (var o in t.data) 1 == t.data[o].type && a.push(t.data[o]), 5 == t.data[o].type && n.push(t.data[o]), 7 == t.data[o].type && i.push(t.data[o]);
                e.setData({
                    slide: a,
                    advert: n,
                    ggslide: i
                })
            }
        }), app.util.request({
            url: "entry/wxapp/news",
            cachetime: "0",
            data: {
                cityname: a
            },
            success: function(t) {
                var a = [];
                for (var n in t.data) 1 == t.data[n].type && a.push(t.data[n]);
                e.setData({
                    msgList: a
                })
            }
        }), app.util.request({
            url: "entry/wxapp/GetNav",
            cachetime: "0",
            success: function(t) {
                console.log(t);
                var a = t.data;
                a.length <= 5 ? e.setData({
                    height: 150
                }) : a.length > 5 && e.setData({
                    height: 300
                });
                for (var n = [], i = 0, o = a.length; i < o; i += 10) n.push(a.slice(i, i + 10));
                e.setData({
                    nav: n,
                    navs: a
                })
            }
        })
    },
    sjbk: function() {
        var t = this,
            e = wx.getStorageSync("city");
        console.log("城市为" + e), console.log("page数量为" + t.data.page);
        t.data.page;
        var a = [];
        app.util.request({
            url: "entry/wxapp/StoreList",
            cachetime: "0",
            data: {
                page: 1,
                cityname: e
            },
            success: function(e) {
                if (console.log(e), t.setData({
                    refresh_top: !0
                }), a = e.data, e.data.length > 0) {
                    for (var n = {}, i = [], o = 0, s = a.length; o < s; o++) n[a[o]] || (i.push(a[o]), n[a[o]] = !0);
                    for (var c in e.data) {
                        e.data[c].star = t.data.star1;
                        e.data[c].star;
                        e.data[c].score = Number(e.data[c].score);
                        e.data[c].score;
                        var r = e.data[c].coordinates.split(",");
                        e.data[c].lat2 = Number(wx.getStorageSync("Location").latitude), e.data[c].lng2 = Number(wx.getStorageSync("Location").longitude);
                        var u = Number(wx.getStorageSync("Location").latitude),
                            l = Number(wx.getStorageSync("Location").longitude),
                            g = r[0],
                            d = r[1],
                            p = u * Math.PI / 180,
                            f = g * Math.PI / 180,
                            m = p - f,
                            h = l * Math.PI / 180 - d * Math.PI / 180,
                            w = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(m / 2), 2) + Math.cos(p) * Math.cos(f) * Math.pow(Math.sin(h / 2), 2)));
                        w *= 6378.137;
                        w = (w = Math.round(1e4 * w) / 1e4).toFixed(2);
                        e.data[c].distance = w
                    }
                    t.setData({
                        store1: a.sort(function(t, e) {
                            return (t = Number(t.distance)) < (e = Number(e.distance)) ? -1 : t > e ? 1 : 0
                        })
                    })
                } else t.setData({
                    store1: a
                })
            }
        })
    },
    seller: function(t) {
        var e = this,
            a = (e.data.index_class, wx.getStorageSync("city")),
            n = (wx.getStorageSync("index"), e.data.page, []);
        console.log(a), app.util.request({
            url: "entry/wxapp/list2",
            cachetime: "0",
            data: {
                page: e.data.page,
                cityname: a
            },
            success: function(t) {
                if (console.log(t.data), e.setData({
                    refresh_top: !0
                }), n = t.data, t.data.length > 0) {
                    var a = function() {
                        var t = "rgb(" + Math.floor(255 * Math.random()) + "," + Math.floor(255 * Math.random()) + "," + Math.floor(255 * Math.random()) + ")";
                        return t
                    };
                    for (var i in t.data) {
                        var o = app.ormatDate(t.data[i].tz.sh_time);
                        t.data[i].tz.img = t.data[i].tz.img.split(","), t.data[i].tz.details = t.data[i].tz.details.replace("?", " "), t.data[i].tz.img.length > 4 && (t.data[i].tz.img_length = Number(t.data[i].tz.img.length) - 4), t.data[i].tz.img.length >= 4 ? t.data[i].tz.img1 = t.data[i].tz.img.slice(0, 4) : t.data[i].tz.img1 = t.data[i].tz.img, t.data[i].tz.time = o.slice(0, 16)
                    }
                    for (var s in n) {
                        for (var c in n[s].label) n[s].label[c].number = a();
                        e.setData({
                            seller: n
                        })
                    }
                } else e.setData({
                    seller: n
                })
            }
        })
    },
    hybk: function() {
        var t = this,
            e = (t.data.index_class, wx.getStorageSync("city")),
            a = (wx.getStorageSync("index"), t.data.page, []);
        console.log(e), app.util.request({
            url: "entry/wxapp/YellowPageList",
            cachetime: "0",
            data: {
                page: 1,
                cityname: e
            },
            success: function(e) {
                if (console.log(e), t.setData({
                    refresh_top: !0
                }), a = e.data, e.data.length > 0) {
                    for (var n in a) {
                        var i = a[n].coordinates.split(",");
                        a[n].lat2 = Number(wx.getStorageSync("Location").latitude), a[n].lng2 = Number(wx.getStorageSync("Location").longitude);
                        var o = Number(wx.getStorageSync("Location").latitude),
                            s = Number(wx.getStorageSync("Location").longitude),
                            c = i[0],
                            r = i[1],
                            u = o * Math.PI / 180,
                            l = c * Math.PI / 180,
                            g = u - l,
                            d = s * Math.PI / 180 - r * Math.PI / 180,
                            p = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(g / 2), 2) + Math.cos(u) * Math.cos(l) * Math.pow(Math.sin(d / 2), 2)));
                        p *= 6378.137;
                        p = (p = Math.round(1e4 * p) / 1e4).toFixed(2);
                        a[n].distance = p
                    }
                    t.setData({
                        yellow_list: a.sort(function(t, e) {
                            return (t = Number(t.distance)) < (e = Number(e.distance)) ? -1 : t > e ? 1 : 0
                        })
                    })
                } else t.setData({
                    yellow_list: a
                })
            }
        })
    },
    sfcbk: function() {
        var t = this,
            e = (t.data.index_class, wx.getStorageSync("city")),
            a = (wx.getStorageSync("index"), t.data.page, []);
        console.log(e), app.util.request({
            url: "entry/wxapp/CarList",
            cachetime: "0",
            data: {
                page: 1,
                cityname: e
            },
            success: function(e) {
                if (console.log(e), t.setData({
                    refresh_top: !0
                }), a = e.data, e.data.length > 0) {
                    for (var n in e.data) e.data[n].tz.time = app.ormatDate(e.data[n].tz.time).slice(5, 16), e.data[n].tz.start_time1 = e.data[n].tz.start_time.slice(5, 10), e.data[n].tz.start_time2 = e.data[n].tz.start_time.slice(10, 17), 2 == e.data[n].tz.is_open ? (e.data[n].tz.class2 = "car3", e.data[n].tz.class3 = "car4", e.data[n].tz.class4 = "car5") : (e.data[n].tz.class2 = "", e.data[n].tz.class3 = "", e.data[n].tz.class4 = ""), "人找车" == e.data[n].tz.typename ? (e.data[n].tz.class = "color1", e.data[n].tz.class1 = "car1") : "车找人" == e.data[n].tz.typename ? (e.data[n].tz.class = "color2", e.data[n].tz.class1 = "car2") : "货找车" == e.data[n].tz.typename ? (e.data[n].tz.class = "color1", e.data[n].tz.class1 = "car1") : "车找货" == e.data[n].tz.typename && (e.data[n].tz.class = "color2", e.data[n].tz.class1 = "car2");
                    t.setData({
                        pc: a
                    })
                } else t.setData({
                    pc: a
                })
            }
        })
    },
    bkswiperChange: function(t) {
        console.log("===== swiperChange " + t.detail.current), this.setData({
            refresh_top: !1,
            activeIndex: t.detail.current
        });
        var e = this.data.bkarr[t.detail.current];
        console.log(e), "最新信息" == e && this.seller(), "热门商家" == e && this.sjbk(), "黄页114" == e && this.hybk(), "顺风车" == e && this.sfcbk()
    },
    commend: function(t) {
        var e = t.currentTarget.id;
        var a = t.currentTarget.id,
            n = t.currentTarget.dataset.name;
        wx.setStorageSync("index", a), console.log(n), this.setData({
            index_class: !0,
            activeIndex: e,
            bkname: n,
            refresh_top: !1,
            swipecurrent: t.currentTarget.id
        }), "最新信息" == n && this.seller(), "热门商家" == n && this.sjbk(), "黄页114" == n && this.hybk(), "顺风车" == n && this.sfcbk()
    },
    whole: function(t) {
        wx.removeStorage({
            key: "index",
            success: function(t) {}
        }), this.setData({
            page: 1,
            seller: [],
            index_class: !1
        }), this.seller()
    },
    bindinput: function(t) {
        var e = t.detail.value;
        "" != e && app.util.request({
            url: "entry/wxapp/list2",
            cachetime: "0",
            data: {
                keywords: e
            },
            success: function(t) {
                0 == t.data.length ? wx.showModal({
                    title: "提示",
                    content: "没有这个帖子",
                    showCancel: !0,
                    cancelText: "取消",
                    confirmText: "确定",
                    success: function(t) {},
                    fail: function(t) {},
                    complete: function(t) {}
                }) : wx.navigateTo({
                    url: "../infodetial/infodetial?id=" + t.data[0].tz.id,
                    success: function(t) {},
                    fail: function(t) {},
                    complete: function(t) {}
                })
            }
        })
    },
    ormatDate: function(t) {
        var e = new Date(1e3 * t);
        return e.getFullYear() + "-" + a(e.getMonth() + 1, 2) + "-" + a(e.getDate(), 2) + " " + a(e.getHours(), 2) + ":" + a(e.getMinutes(), 2) + ":" + a(e.getSeconds(), 2);

        function a(t, e) {
            for (var a = "" + t, n = a.length, i = "", o = e; o-- > n;) i += "0";
            return i + a
        }
    },
    thumbs_up: function(t) {
        var e = this,
            a = e.data.seller,
            n = t.currentTarget.dataset.id,
            i = wx.getStorageSync("users").id,
            o = (Number(t.currentTarget.dataset.num), function(t) {
                a[t].tz.id == n && (a[t].thumbs_up = !0, app.util.request({
                    url: "entry/wxapp/Like",
                    cachetime: "0",
                    data: {
                        information_id: n,
                        user_id: i
                    },
                    success: function(n) {
                        1 != n.data ? wx.showModal({
                            title: "提示",
                            content: "不能重复点赞",
                            showCancel: !0,
                            cancelText: "取消",
                            confirmText: "确认",
                            success: function(t) {},
                            fail: function(t) {},
                            complete: function(t) {}
                        }) : (a[t].tz.givelike = Number(a[t].tz.givelike) + 1, e.setData({
                            seller: a
                        }))
                    }
                }))
            });
        for (var s in a) o(s)
    },
    previewImage: function(t) {
        console.log(t);
        var e = t.currentTarget.dataset.id,
            a = this.data.url,
            n = [],
            i = t.currentTarget.dataset.inde,
            o = this.data.seller;
        for (var s in o) if (o[s].tz.id == e) {
            var c = o[s].tz.img;
            for (var r in c) n.push(a + c[r]);
            wx.previewImage({
                current: a + c[i],
                urls: n
            })
        }
    },
    red: function(t) {
        wx.navigateTo({
            url: "../redbag/redbag",
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        })
    },
    redinfo: function(t) {
        wx.showModal({
            title: "温馨提示",
            content: "功能暂未开放,敬请期待",
            showCancel: !0,
            cancelText: "取消",
            confirmText: "确定",
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        })
    },
    yellow_page: function(t) {
        wx.reLaunch({
            url: "../yellow_page/yellow"
        })
    },
    post1: function(t) {
        wx.switchTab({
            url: "../fabu/fabu/fabu"
        })
    },
    store_info: function(t) {
        var e = t.currentTarget.id;
        wx.navigateTo({
            url: "../sellerinfo/sellerinfo?id=" + e,
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        })
    },
    notice: function(t) {
        var e = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../notice/notice?id=" + e,
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        })
    },
    post: function(t) {
        wx, wx.reLaunch({
            url: "../shun/shun",
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        })
    },
    phone: function(t) {
        var e = t.currentTarget.dataset.id;
        wx.makePhoneCall({
            phoneNumber: e
        })
    },
    more: function(t) {
        wx.switchTab({
            url: "../store/store",
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        })
    },
    jump: function(t) {
        var e = t.currentTarget.dataset.id,
            a = t.currentTarget.dataset.name;
        wx.navigateTo({
            url: "../marry/marry?id=" + e + "&name=" + a,
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        })
    },
    carinfo: function(t) {
        console.log(t);
        var e = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../shun/shuninfo2/shuninfo2?id=" + e,
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        })
    },
    yellow_info: function(t) {
        var e = t.currentTarget.dataset.id,
            a = t.currentTarget.dataset.user_id;
        console.log(a), wx.navigateTo({
            url: "../yellow_page/yellowinfo?id=" + e,
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        })
    },
    store: function(t) {
        var e = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../sellerinfo/sellerinfo?id=" + e,
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        })
    },
    see: function(t) {
        this.data.seller;
        var e = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../infodetial/infodetial?id=" + e,
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
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
    onReady: function() {
        this.setData({
            first: 1
        })
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {
        wx.removeStorageSync("city_type")
    },
    onPullDownRefresh: function() {
        this.setData({
            page: 1,
            seller: [],
            activeIndex: 0,
            swipecurrent: 0,
            refresh_top: !1
        }), this.reload(), wx.stopPullDownRefresh()
    },
    onReachBottom: function() {
        console.log("上拉触底")
    },
    onShareAppMessage: function() {}
});