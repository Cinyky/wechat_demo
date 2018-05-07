var app = getApp();
Page({
    data: {
        luntext: ["最新收录", "热门推荐", "附近发现"],
        activeIndex: 0,
        sliderOffset: 0,
        sliderLeft: 35,
        currentTab: 0,
        swiperCurrent: 0,
        indicatorDots: !1,
        autoplay: !0,
        interval: 5e3,
        duration: 1e3,
        refresh_top: !1,
        yellow_list: [],
        page: 1
    },
    swiperChange: function(t) {
        this.setData({
            swiperCurrent: t.detail.current
        })
    },
    onLoad: function(t) {
        var e = this,
            a = wx.getStorageSync("url");
        e.setData({
            url: a
        }), app.util.request({
            url: "entry/wxapp/StoreType",
            cachetime: "0",
            success: function(t) {
                console.log(t);
                var a = t.data;
                a.length <= 5 ? e.setData({
                    height: 130
                }) : a.length > 5 && e.setData({
                    height: 260
                });
                for (var n = [], o = 0, s = a.length; o < s; o += 10) n.push(a.slice(o, o + 10));
                console.log(n), e.setData({
                    nav: n
                })
            }
        }), wx.getSystemInfo({
            success: function(t) {
                e.setData({
                    windowHeight: t.windowHeight
                })
            }
        });
        var n = wx.getStorageSync("city");
        console.log("轮播图的城市为" + n), app.util.request({
            url: "entry/wxapp/Ad",
            cachetime: "0",
            data: {
                cityname: n
            },
            success: function(t) {
                var a = [];
                for (var n in t.data) 6 == t.data[n].type && a.push(t.data[n]);
                e.setData({
                    slide: a
                })
            }
        }), e.refresh()
    },
    refresh: function(t) {
        var e = this,
            a = wx.getStorageSync("city");
        console.log("城市为" + a);
        var n = e.data.page,
            o = e.data.yellow_list;
        null == n && (n = 1), null == o && (o = []), console.log("page为" + a), app.util.request({
            url: "entry/wxapp/YellowPageList",
            cachetime: "0",
            data: {
                page: n,
                cityname: a
            },
            success: function(t) {
                if (console.log(t), 0 == t.data) e.setData({
                    refresh_top: !0
                });
                else {
                    for (var a in o = o.concat(t.data)) {
                        var s = o[a].coordinates.split(",");
                        o[a].lat2 = Number(wx.getStorageSync("Location").latitude), o[a].lng2 = Number(wx.getStorageSync("Location").longitude);
                        var r = Number(wx.getStorageSync("Location").latitude),
                            i = Number(wx.getStorageSync("Location").longitude),
                            c = s[0],
                            l = s[1],
                            u = r * Math.PI / 180,
                            f = c * Math.PI / 180,
                            d = u - f,
                            g = i * Math.PI / 180 - l * Math.PI / 180,
                            h = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(d / 2), 2) + Math.cos(u) * Math.cos(f) * Math.pow(Math.sin(g / 2), 2)));
                        h *= 6378.137;
                        h = (h = Math.round(1e4 * h) / 1e4).toFixed(2);
                        o[a].distance = h
                    }
                    e.setData({
                        yellow_list: o,
                        yellow_list1: o,
                        page: n + 1,
                        refresh_top: !1
                    })
                }
            }
        })
    },
    search: function(t) {
        var e = this;
        console.log(t);
        var a = t.detail.value;
        "" == a ? e.setData({
            search_yellow: []
        }) : app.util.request({
            url: "entry/wxapp/YellowPageList",
            cachetime: "0",
            data: {
                keywords: a
            },
            success: function(t) {
                console.log(t), e.setData({
                    search_yellow: t.data
                })
            }
        })
    },
    tabClick: function(t) {
        var e = t.currentTarget.id;
        console.log(e);
        var a = this.data.yellow_list,
            n = this.data.yellow_list1;
        0 == e ? this.setData({
            yellow_list: n
        }) : 1 == e ? (a = a.sort(function(t, e) {
            return (t = Number(t.views)) < (e = Number(e.views)) ? -1 : t > e ? 1 : 0
        }), this.setData({
            yellow_list: a
        })) : 2 == e && (a = a.sort(function(t, e) {
            return (t = Number(t.distance)) < (e = Number(e.distance)) ? -1 : t > e ? 1 : 0
        }), this.setData({
            yellow_list: a
        })), this.setData({
            sliderOffset: t.currentTarget.offsetLeft,
            activeIndex: t.currentTarget.id
        })
    },
    yellow_info: function(t) {
        var e = t.currentTarget.dataset.id,
            a = t.currentTarget.dataset.user_id;
        console.log(a), wx.navigateTo({
            url: "yellowinfo?id=" + e,
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        })
    },
    sellted: function(t) {
        wx.navigateTo({
            url: "settled",
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        })
    },
    store_type_id: function(t) {
        var e = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../store/business?id=" + e,
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        })
    },
    mine_yellow: function(t) {
        wx.reLaunch({
            url: "mine_yellow"
        })
    },
    shouye: function(t) {
        wx.switchTab({
            url: "../index/index"
        })
    },
    jumps: function(t) {
        var e = this,
            a = (t.currentTarget.dataset.name, t.currentTarget.dataset.appid),
            n = t.currentTarget.dataset.src,
            o = t.currentTarget.dataset.wb_src,
            s = t.currentTarget.dataset.type;
        if (1 == s) {
            var r = n.replace(/[^0-9]/gi, "");
            n = n = n.replace(/(\d+|\s+)/g, ""), console.log(n), console.log(r), console.log(), wx.navigateTo({
                url: n + Number(r),
                success: function(t) {
                    e.setData({
                        averdr: !0
                    })
                },
                fail: function(t) {},
                complete: function(t) {}
            })
        } else 2 == s ? wx.navigateTo({
            url: "../car/car?vr=" + o,
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        }) : 3 == s && wx.navigateToMiniProgram({
            appId: a,
            path: "",
            extraData: {
                foo: "bar"
            },
            envVersion: "develop",
            success: function(t) {
                e.setData({
                    averdr: !0
                })
            }
        })
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.setData({
            page: 1,
            yellow_list: []
        }), this.refresh(), wx.stopPullDownRefresh()
    },
    onReachBottom: function() {
        0 == this.data.refresh_top && this.refresh()
    },
    onShareAppMessage: function() {}
});