var app = getApp();
Page({
    data: {
        dianzan: [{
            user_img: "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJ3PQDXes9vbhKKv49rbGEEv0EhCwHo4BvRMhx61xtQXFlvm6ILN8TxZ8r6pM8HCgqB3icIxtQAUfw/0"
        }, {
            user_img: "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJ3PQDXes9vbhKKv49rbGEEv0EhCwHo4BvRMhx61xtQXFlvm6ILN8TxZ8r6pM8HCgqB3icIxtQAUfw/0"
        }, {
            user_img: "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJ3PQDXes9vbhKKv49rbGEEv0EhCwHo4BvRMhx61xtQXFlvm6ILN8TxZ8r6pM8HCgqB3icIxtQAUfw/0"
        }],
        pl: [{
            details: "哦哦哦哦哦哦",
            name: "萌得发芽",
            user_img: "https://wx.qlogo.cn/mmopen/vi_32/MMxbq4GKvwLmcq6geRVEq9iay9KaXf7D5ax2p6bgBBFcpQpAjFqygWty9by9JHH4S3klOmicq2DaHbm7IppCGoDQ/0",
            time: "2018-01-24 15:29"
        }],
        dz: !0
    },
    dz: function() {
        var t = this,
            a = wx.getStorageSync("users").id,
            o = this.data.spid;
        console.log(a, o), app.util.request({
            url: "entry/wxapp/VideoDz",
            cachetime: "0",
            data: {
                user_id: a,
                video_id: o
            },
            success: function(a) {
                console.log(a), "点赞成功!" == a.data ? (wx.showToast({
                    title: a.data,
                    duration: 1e3
                }), t.setData({
                    dz: !t.data.dz
                }), t.reLoad()) : "取消成功!" == a.data ? (wx.showToast({
                    title: a.data,
                    duration: 1e3
                }), t.setData({
                    dz: !t.data.dz
                }), t.reLoad()) : wx.showToast({
                    title: "请求失败",
                    duration: 1e3
                })
            }
        })
    },
    bindinput: function(t) {
        console.log(t.detail.value), this.setData({
            plnr: t.detail.value
        })
    },
    bindconfirm: function() {
        this.pl()
    },
    pl: function() {
        var t = this.data.plnr,
            a = this,
            o = wx.getStorageSync("users").id,
            i = this.data.spid;
        console.log(t, o, i), "" == t || null == t ? wx.showToast({
            title: "评论内容为空",
            icon: "loading",
            duration: 1e3
        }) : app.util.request({
            url: "entry/wxapp/VideoPl",
            cachetime: "0",
            data: {
                user_id: o,
                video_id: i,
                content: t
            },
            success: function(t) {
                console.log(t), "评论成功!" == t.data ? (wx.showToast({
                    title: t.data,
                    duration: 1e3
                }), a.reLoad()) : wx.showToast({
                    title: "请求失败",
                    duration: 1e3
                })
            }
        })
    },
    back: function() {
        wx.redirectTo({
            url: "spzx"
        })
    },
    jrzy: function() {
        wx.switchTab({
            url: "../index/index"
        })
    },
    fbxx: function() {
        wx.switchTab({
            url: "../fabu/fabu/fabu"
        })
    },
    gdzx: function() {
        wx.redirectTo({
            url: "../message/message"
        })
    },
    onLoad: function(t) {
        console.log(t), wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: wx.getStorageSync("color"),
            animation: {
                duration: 0,
                timingFunc: "easeIn"
            }
        });
        var a = this;
        a.setData({
            spid: t.spid
        }), app.util.request({
            url: "entry/wxapp/Url",
            cachetime: "0",
            success: function(t) {
                a.setData({
                    url: t.data
                })
            }
        }), this.reLoad()
    },
    reLoad: function() {
        var t = this,
            a = this.data.spid,
            o = wx.getStorageSync("users").id;
        console.log(a, o), app.util.request({
            url: "entry/wxapp/VideoInfo",
            cachetime: "0",
            data: {
                video_id: a
            },
            success: function(a) {
                console.log(a), t.setData({
                    spinfo: a.data
                });
                for (var i = 0; i < a.data.dz.length; i++) o == a.data.dz[i].user_id && t.setData({
                    dz: !1
                })
            }
        })
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return console.log(this.data.url + this.data.spinfo.fm_logo), {
            title: this.data.spinfo.info.title,
            path: "zh_tcwq/pages/spzx/spzxinfo?spid=" + this.data.spid,
            imageUrl: this.data.url + this.data.spinfo.info.fm_logo,
            success: function(t) {},
            fail: function(t) {}
        }
    }
});