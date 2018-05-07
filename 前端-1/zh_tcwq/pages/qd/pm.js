var app = getApp();
Page({
    data: {
        tabs: ["手速榜", "总榜"],
        activeIndex: 0,
        sliderOffset: 0,
        sliderLeft: 15,
        refresh_top: !1,
        refresh_top1: !1,
        rankpage: 1,
        zrankpage: 1,
        sranklist: [],
        szrank: []
    },
    tabClick: function(a) {
        console.log(a), this.setData({
            sliderOffset: a.currentTarget.offsetLeft,
            activeIndex: a.currentTarget.id
        })
    },
    onLoad: function(a) {
        wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: wx.getStorageSync("color"),
            animation: {
                duration: 0,
                timingFunc: "easeIn"
            }
        });
        var t = this,
            e = wx.getStorageSync("users").id,
            n = wx.getStorageSync("user_info");
        console.log(n), t.setData({
            userinfo: n
        }), app.util.request({
            url: "entry/wxapp/Continuous",
            cachetime: "0",
            data: {
                user_id: e
            },
            success: function(a) {
                console.log("查看连续签到天数", a), t.setData({
                    lxts: a.data
                })
            }
        }), app.util.request({
            url: "entry/wxapp/MySign",
            cachetime: "0",
            data: {
                user_id: e
            },
            success: function(a) {
                console.log("MySign", a), t.setData({
                    ljqd: a.data
                })
            }
        }), app.util.request({
            url: "entry/wxapp/MyJrRank",
            cachetime: "0",
            data: {
                user_id: e
            },
            success: function(a) {
                console.log("MyJrRank", a.data), a.data.time3 = app.ormatDate(a.data.time3).substring(11), t.setData({
                    MyRank: a.data
                })
            }
        }), this.rank(), this.zrank()
    },
    rank: function() {
        var a = this,
            t = (wx.getStorageSync("users").id, a.data.rankpage),
            e = a.data.zrankpage,
            n = a.data.sranklist,
            s = a.data.szrank;
        console.log(t, e, n, s), app.util.request({
            url: "entry/wxapp/JrRank",
            cachetime: "0",
            data: {
                page: t,
                pagesize: 20
            },
            success: function(e) {
                for (var s in console.log("JrRank", e.data), console.log(e), a.setData({
                    rankpage: t + 1
                }), e.data.length < 20 ? a.setData({
                    refresh_top: !0
                }) : a.setData({
                    refresh_top: !1
                }), e.data) e.data[s].time3 = app.ormatDate(e.data[s].time3).substring(11);
                n = n.concat(e.data), console.log(n), a.setData({
                    ranklist: n,
                    sranklist: n
                })
            }
        })
    },
    zrank: function() {
        var a = this,
            t = (wx.getStorageSync("users").id, a.data.rankpage),
            e = a.data.zrankpage,
            n = a.data.sranklist,
            s = a.data.szrank;
        console.log(t, e, n, s), app.util.request({
            url: "entry/wxapp/Rank",
            cachetime: "0",
            data: {
                page: e,
                pagesize: 20
            },
            success: function(t) {
                console.log("rank", t), console.log(t), a.setData({
                    zrankpage: e + 1
                }), t.data.length < 20 ? a.setData({
                    refresh_top1: !0
                }) : a.setData({
                    refresh_top1: !1
                }), s = s.concat(t.data), console.log(s), a.setData({
                    zrank: s,
                    szrank: s
                })
            }
        })
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {
        console.log("上拉加载", this.data.activeIndex, this.data.rankpage, this.data.zrankpage), 0 == this.data.refresh_top && 0 == this.data.activeIndex ? this.rank() : console.log("今日没有了"), 0 == this.data.refresh_top1 && 1 == this.data.activeIndex ? this.zrank() : console.log("总的没有了")
    }
});