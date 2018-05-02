var app = getApp();
Page({
    data: {
        djss: !1,
        luntext: ["附近", "新入", "热门"],
        activeIndex: 0,
        sliderOffset: 0,
        sliderLeft: 35,
        currentTab: 0,
        swiperCurrent: 0,
        indicatorDots: !1,
        autoplay: !0,
        interval: 5e3,
        duration: 1e3,
        circular: !0,
        refresh_top: !1,
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
    tabClick: function(t) {
        var a = t.currentTarget.id;
        console.log(this.data);
        var e = this.data.business;
        if (null != this.data.business && 0 != e.length) {
            if (0 == a) this.refresh();
            else if (1 == a) console.log(this.data.store);
            else if (2 == a) {
                var n = [];
                for (var i in e) e[i].score >= 4 && n.push(e[i]);
                this.setData({
                    store2: n
                })
            }
        }
        this.setData({
            sliderOffset: t.currentTarget.offsetLeft,
            activeIndex: t.currentTarget.id
        })
    },
    jumps: function(t) {
        var a = this,
            e = (t.currentTarget.dataset.name, t.currentTarget.dataset.appid),
            n = t.currentTarget.dataset.src,
            i = t.currentTarget.dataset.wb_src,
            s = t.currentTarget.dataset.type;
        if (1 == s) {
            var r = n.replace(/[^0-9]/gi, "");
            n = n = n.replace(/(\d+|\s+)/g, ""), console.log(n), console.log(r), console.log(), wx.navigateTo({
                url: n + Number(r),
                success: function(t) {
                    a.setData({
                        averdr: !0
                    })
                },
                fail: function(t) {},
                complete: function(t) {}
            })
        } else 2 == s ? wx.navigateTo({
            url: "../car/car?vr=" + i,
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        }) : 3 == s && wx.navigateToMiniProgram({
            appId: e,
            path: "",
            extraData: {
                foo: "bar"
            },
            envVersion: "develop",
            success: function(t) {
                a.setData({
                    averdr: !0
                })
            }
        })
    },
    onLoad: function(t) {
        var a = this;
        wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: wx.getStorageSync("color"),
            animation: {
                duration: 0,
                timingFunc: "easeIn"
            }
        }), wx.getSystemInfo({
            success: function(t) {
                a.setData({
                    windowHeight: t.windowHeight
                })
            }
        }), a.setData({
            store_name: wx.getStorageSync("System").link_name,
            msgList1: wx.getStorageSync("msgList1"),
            System: wx.getStorageSync("System")
        }), a.reload(), a.refresh()
    },
    reload: function(t) {
        var a = this,
            e = wx.getStorageSync("url");
        a.setData({
            url: e
        }), app.util.request({
            url: "entry/wxapp/StoreType",
            cachetime: "0",
            success: function(t) {
                var e = t.data;
                e.length <= 5 ? a.setData({
                    height: 150
                }) : e.length > 5 && a.setData({
                    height: 300
                });
                for (var n = [], i = 0, s = e.length; i < s; i += 10) n.push(e.slice(i, i + 10));
                a.setData({
                    nav: n
                })
            }
        });
        var n = wx.getStorageSync("city");
        app.util.request({
            url: "entry/wxapp/Ad",
            cachetime: "0",
            data: {
                cityname: n
            },
            success: function(t) {
                var e = [];
                for (var n in t.data) 2 == t.data[n].type && e.push(t.data[n]);
                a.setData({
                    slide: e
                })
            }
        })
    },
    refresh: function() {
        var t = this,
            a = (t.data.star1, wx.getStorageSync("city"));
        console.log("城市为" + a), console.log("page数量为" + t.data.page);
        var e = t.data.page,
            n = t.data.business;
        null == e && (e = 1), null == n && (n = []), app.util.request({
            url: "entry/wxapp/StoreList",
            cachetime: "0",
            data: {
                page: e,
                cityname: a
            },
            success: function(a) {
                if (console.log(a), 0 == a.data.length) t.setData({
                    refresh_top: !0
                }), 1 == e && t.setData({
                    store: [],
                    business: [],
                    fjpx: [],
                    store1: []
                });
                else {
                    t.setData({
                        page: e + 1,
                        refresh_top: !1
                    });
                    for (var i = {}, s = [], r = 0, o = (n = n.concat(a.data)).length; r < o; r++) i[n[r]] || (s.push(n[r]), i[n[r]] = !0);
                    for (var g in a.data) {
                        a.data[g].star = t.data.star1;
                        a.data[g].star;
                        a.data[g].score = Number(a.data[g].score);
                        a.data[g].score;
                        var c = a.data[g].coordinates.split(",");
                        a.data[g].lat2 = Number(wx.getStorageSync("Location").latitude), a.data[g].lng2 = Number(wx.getStorageSync("Location").longitude);
                        var u = Number(wx.getStorageSync("Location").latitude),
                            l = Number(wx.getStorageSync("Location").longitude),
                            d = c[0],
                            p = c[1],
                            f = u * Math.PI / 180,
                            m = d * Math.PI / 180,
                            h = f - m,
                            v = l * Math.PI / 180 - p * Math.PI / 180,
                            x = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(h / 2), 2) + Math.cos(f) * Math.cos(m) * Math.pow(Math.sin(v / 2), 2)));
                        x *= 6378.137;
                        x = (x = Math.round(1e4 * x) / 1e4).toFixed(2);
                        a.data[g].distance = x
                    }
                    t.setData({
                        store: n,
                        business: n,
                        fjpx: n
                    }), t.setData({
                        store1: t.data.fjpx.sort(function(t, a) {
                            return (t = Number(t.distance)) < (a = Number(a.distance)) ? -1 : t > a ? 1 : 0
                        })
                    })
                }
            }
        }), app.util.request({
            url: "entry/wxapp/news",
            cachetime: "0",
            data: {
                cityname: a
            },
            success: function(a) {
                var e = [];
                for (var n in a.data) 2 == a.data[n].type && e.push(a.data[n]);
                t.setData({
                    msgList: e
                })
            }
        })
    },
    sellted: function(t) {
        wx.navigateTo({
            url: "../settled/settled",
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        })
    },
    store: function(t) {
        var a = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../sellerinfo/sellerinfo?id=" + a,
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        })
    },
    notice: function(t) {
        var a = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../notice/notice?id=" + a,
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        })
    },
    phone: function(t) {
        var a = t.currentTarget.dataset.tel;
        wx.makePhoneCall({
            phoneNumber: a
        })
    },
    store_type_id: function(t) {
        var a = t.currentTarget.dataset.id,
            e = t.currentTarget.dataset.name;
        wx.navigateTo({
            url: "business?id=" + a + "&typename=" + e,
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        })
    },
    bindinput: function(t) {
        var a = t.detail.value;
        this.setData({
            value: a
        })
    },
    sqss: function() {
        this.setData({
            djss: !1
        })
    },
    search: function(t) {
        var a = this.data.value,
            e = this;
        console.log(a), e.setData({
            ssjgarr: [],
            djss: !1
        }), "" != a ? app.util.request({
            url: "entry/wxapp/StoreList",
            cachetime: "0",
            data: {
                keywords: a
            },
            success: function(t) {
                console.log(t), e.setData({
                    djss: !0,
                    ssjgarr: t.data
                })
            }
        }) : wx.showToast({
            title: "请输入内容",
            icon: "loading"
        })
    },
    onReady: function() {
        this.setData({
            first: 1
        })
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.reload(), this.setData({
            page: 1,
            business: [],
            store: []
        }), this.refresh(), wx.stopPullDownRefresh()
    },
    onReachBottom: function() {
        0 == this.data.refresh_top && this.refresh()
    },
    onShareAppMessage: function() {}
});