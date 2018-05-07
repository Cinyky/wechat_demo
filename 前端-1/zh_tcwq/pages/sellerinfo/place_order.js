var app = getApp();
Page({
    data: {},
    onLoad: function(e) {
        var t = wx.getStorageSync("url"),
            o = e.price * e.num;
        this.setData({
            id: e.id,
            url: t,
            price: e.price,
            num: e.num,
            cost: o.toFixed(2),
            name1: e.name1,
            name2: e.name2,
            name3: e.name3,
            store_id: e.store_id
        }), console.log(e + "这是商家的id"), this.user_infos(), this.refresh()
    },
    refresh: function(e) {
        var t = this,
            o = t.data.id;
        app.util.request({
            url: "entry/wxapp/GoodInfo",
            cachetime: "0",
            data: {
                id: o
            },
            success: function(e) {
                console.log(e);
                var o = {}, a = [];
                e.data.spec.forEach(function(e) {
                    var t = e.spec_id + "_" + e.spec_name;
                    void 0 === o[t] && (o[t] = []), o[t].push(e)
                });
                for (var n = Object.keys(o), s = 0; s < n.length; s++) {
                    var i = n[s].split("_");
                    a.push({
                        spec_id: i[0],
                        spec_name: i[1],
                        value: o[n[s]]
                    })
                }
                console.log(a), e.data.good.imgs = e.data.good.imgs.split(","), e.data.good.lb_imgs = e.data.good.lb_imgs.split(",");
                var c = Number(t.data.cost),
                    r = Number(e.data.good.freight),
                    d = c + r;
                d = d.toFixed(2), t.setData({
                    store_good: e.data.good,
                    cost2: d,
                    freight: r,
                    result: a
                })
            }
        }), app.util.request({
            url: "entry/wxapp/StoreInfo",
            cachetime: "0",
            data: {
                id: t.data.store_id
            },
            success: function(e) {
                console.log(e), t.setData({
                    store: e.data.store[0]
                })
            }
        })
    },
    user_infos: function(e) {
        var t = this;
        wx.login({
            success: function(e) {
                var o = e.code;
                wx.getUserInfo({
                    success: function(e) {
                        var a = e.userInfo.nickName,
                            n = e.userInfo.avatarUrl;
                        app.util.request({
                            url: "entry/wxapp/openid",
                            cachetime: "0",
                            data: {
                                code: o
                            },
                            success: function(e) {
                                var o = n,
                                    s = a,
                                    i = e.data.openid;
                                app.util.request({
                                    url: "entry/wxapp/Login",
                                    cachetime: "0",
                                    data: {
                                        openid: i,
                                        img: o,
                                        name: s
                                    },
                                    success: function(e) {
                                        console.log("这是用户的登录信息"), console.log(e), t.setData({
                                            user_info: e.data,
                                            openid: i
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
    address: function(e) {
        var t = this,
            o = t.data.user_info.id;
        console.log(o), wx.chooseAddress({
            success: function(e) {
                console.log(e), app.util.request({
                    url: "entry/wxapp/UpdAdd",
                    cachetime: "0",
                    data: {
                        user_id: o,
                        user_name: e.userName,
                        user_tel: e.telNumber,
                        user_address: e.provinceName + e.cityName + e.countyName + e.detailInfo
                    },
                    success: function(e) {
                        console.log(e), t.user_infos()
                    }
                })
            }
        })
    },
    add: function(e) {
        var t = this.data.num + 1,
            o = this.data.cost1,
            a = (o *= t.toFixed(2)) + this.data.freight;
        this.setData({
            num: t,
            cost: o,
            cost2: a
        })
    },
    subtraction: function(e) {
        var t = this.data.num;
        t -= 1;
        var o = this.data.cost1,
            a = (o *= t.toFixed(2)) + this.data.freight;
        this.setData({
            num: t,
            cost: o,
            cost2: a
        })
    },
    note: function(e) {
        console.log(e), this.setData({
            note: e.detail.value
        })
    },
    order: function(e) {
        console.log(this.data);
        var t = this.data.store_good,
            o = this.data.user_info.id,
            a = this.data.user_info,
            n = this.data.openid,
            s = Number(t.freight),
            i = (Number(t.goods_cost), this.data.cost2),
            c = this.data.note,
            r = this.data.result;
        if (1 == r.length) var d = r[0].spec_name + ":" + this.data.name1;
        if (2 == r.length) d = r[0].spec_name + ":" + this.data.name1 + ";" + r[1].spec_name + ":" + this.data.name2;
        if (3 == r.length) d = r[0].spec_name + ":" + this.data.name1 + ";" + r[1].spec_name + ":" + this.data.name2 + ";" + r[2].spec_name + ":" + this.data.name3;
        console.log(r), console.log(String(d)), c = null == c ? "" : this.data.note, "" == a.user_name ? wx.showModal({
            title: "提示",
            content: "您还没有填写收货地址喔",
            showCancel: !0,
            cancelText: "取消",
            cancelColor: "",
            confirmText: "确定",
            confirmColor: "",
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        }) : (console.log(c), app.util.request({
            url: "entry/wxapp/addorder",
            cachetime: "0",
            data: {
                user_id: o,
                store_id: t.store_id,
                money: i,
                user_name: a.user_name,
                address: a.user_address,
                tel: a.user_tel,
                good_id: t.id,
                good_name: t.goods_name,
                good_img: t.imgs[0],
                good_money: this.data.price,
                good_spec: String(d),
                freight: s,
                good_num: this.data.num,
                note: c
            },
            success: function(e) {
                console.log(e);
                var t = e.data;
                console.log(i), app.util.request({
                    url: "entry/wxapp/Pay",
                    cachetime: "0",
                    data: {
                        openid: n,
                        money: i,
                        order_id: t
                    },
                    success: function(e) {
                        console.log(e), wx.requestPayment({
                            timeStamp: e.data.timeStamp,
                            nonceStr: e.data.nonceStr,
                            package: e.data.package,
                            signType: e.data.signType,
                            paySign: e.data.paySign,
                            success: function(e) {
                                console.log("这里是支付成功"), console.log(e), app.util.request({
                                    url: "entry/wxapp/PayOrder",
                                    cachetime: "0",
                                    data: {
                                        order_id: t
                                    },
                                    success: function(e) {
                                        console.log("改变订单状态"), console.log(e), wx.redirectTo({
                                            url: "../logs/order",
                                            success: function(e) {},
                                            fail: function(e) {},
                                            complete: function(e) {}
                                        })
                                    }
                                })
                            },
                            fail: function(e) {
                                console.log("这里是支付失败"), console.log(e), wx.showToast({
                                    title: "支付失败",
                                    duration: 1e3
                                }), wx.redirectTo({
                                    url: "../logs/order",
                                    success: function(e) {},
                                    fail: function(e) {},
                                    complete: function(e) {}
                                })
                            }
                        })
                    }
                })
            }
        }))
    },
    onReady: function() {},
    onShow: function() {
        wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: wx.getStorageSync("color"),
            animation: {
                duration: 0,
                timingFunc: "easeIn"
            }
        })
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});