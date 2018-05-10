var util = require("../../utils/util.js"), app = getApp();

Page({
    data: {
        Return: !1
    },
    onLoad: function(n) {
        var t = this, e = getCurrentPages();
        e.route = "zh_tcwq/pages/logs/index", 1 == t.data.Return && e.setData({
            Return: !0
        }), wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: wx.getStorageSync("color"),
            animation: {
                duration: 0,
                timingFunc: "easeIn"
            }
        });
        var o = wx.getStorageSync("System").bq_name, c = wx.getStorageSync("System").bq_logo, a = wx.getStorageSync("user_info");
        console.log(a);
        var i = wx.getStorageSync("store"), u = wx.getStorageSync("url");
        console.log(i), t.setData({
            store: i,
            url: u,
            System: wx.getStorageSync("System"),
            support: o,
            bq_logo: c
        }), t.setData({
            avatarUrl: a.avatarUrl,
            nickName: a.nickName
        }), app.util.request({
            url: "entry/wxapp/Signset",
            cachetime: "0",
            success: function(n) {
                console.log("签到设置", n), t.setData({
                    qdset: n.data
                });
            }
        });
    },
    collection: function(n) {
        wx.navigateTo({
            url: "../Collection/Collection"
        });
    },
    settled: function(n) {
        wx.navigateTo({
            url: "../settled/settled"
        });
    },
    yellow_page: function(n) {
        wx.navigateTo({
            url: "../yellow_page/mine_yellow",
            success: function(n) {},
            fail: function(n) {},
            complete: function(n) {}
        });
    },
    jfsc: function() {
        wx.navigateTo({
            url: "../integral/integral"
        });
    },
    tchhr: function(n) {
        var t = wx.getStorageSync("users").id;
        app.util.request({
            url: "entry/wxapp/MyDistribution",
            cachetime: "0",
            data: {
                user_id: t
            },
            success: function(n) {
                console.log(n.data), "2" == n.data.state ? (console.log("是分销商"), wx.navigateTo({
                    url: "../distribution/yaoqing"
                })) : "1" == n.data.state ? wx.showModal({
                    title: "提示",
                    content: "您的申请正在审核中，请耐心等待"
                }) : wx.navigateTo({
                    url: "../distribution/jrhhr"
                });
            }
        });
    },
    my_post: function(n) {
        wx.navigateTo({
            url: "../mypost/mypost",
            success: function(n) {},
            fail: function(n) {},
            complete: function(n) {}
        });
    },
    content: function(n) {
        wx.navigateTo({
            url: "../content/content",
            success: function(n) {},
            fail: function(n) {},
            complete: function(n) {}
        });
    },
    logs_store: function(n) {
        wx.navigateTo({
            url: "bbaa",
            success: function(n) {},
            fail: function(n) {},
            complete: function(n) {}
        });
    },
    order: function(n) {
        wx.navigateTo({
            url: "order",
            success: function(n) {},
            fail: function(n) {},
            complete: function(n) {}
        });
    },
    payment: function(n) {
        wx.navigateTo({
            url: "order?activeIndex=0",
            success: function(n) {},
            fail: function(n) {},
            complete: function(n) {}
        });
    },
    payment_one: function(n) {
        wx.navigateTo({
            url: "order?activeIndex=1",
            success: function(n) {},
            fail: function(n) {},
            complete: function(n) {}
        });
    },
    payment_two: function(n) {
        wx.navigateTo({
            url: "order?activeIndex=2",
            success: function(n) {},
            fail: function(n) {},
            complete: function(n) {}
        });
    },
    payment_three: function(n) {
        wx.navigateTo({
            url: "order?activeIndex=3",
            success: function(n) {},
            fail: function(n) {},
            complete: function(n) {}
        });
    },
    payment_four: function(n) {
        wx.navigateTo({
            url: "order?activeIndex=4",
            success: function(n) {},
            fail: function(n) {},
            complete: function(n) {}
        });
    },
    help: function(n) {
        wx.navigateTo({
            url: "../store/help",
            success: function(n) {},
            fail: function(n) {},
            complete: function(n) {}
        });
    },
    wallet: function(n) {
        wx.navigateTo({
            url: "income",
            success: function(n) {},
            fail: function(n) {},
            complete: function(n) {}
        });
    },
    mine_car: function(n) {
        wx.navigateTo({
            url: "mine_car",
            success: function(n) {},
            fail: function(n) {},
            complete: function(n) {}
        });
    },
    address: function(n) {
        var t = wx.getStorageSync("users").id;
        wx.chooseAddress({
            success: function(n) {
                console.log(n), app.util.request({
                    url: "entry/wxapp/UpdAdd",
                    cachetime: "0",
                    data: {
                        user_id: t,
                        user_name: n.userName,
                        user_tel: n.telNumber,
                        user_address: n.provinceName + n.cityName + n.countyName + n.detailInfo
                    },
                    success: function(n) {
                        console.log(n);
                    }
                });
            }
        });
    },
    jump: function(n) {
        wx.navigateToMiniProgram({
            appId: wx.getStorageSync("System").tz_appid,
            path: "",
            extraData: {
                foo: "bar"
            },
            envVersion: "develop",
            success: function(n) {
                console.log("跳转成功"), console.log(n);
            }
        });
    },
    about: function(n) {
        wx.navigateTo({
            url: "system",
            success: function(n) {},
            fail: function(n) {},
            complete: function(n) {}
        });
    },
    onReady: function() {},
    onShow: function() {
        this.onLoad();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});