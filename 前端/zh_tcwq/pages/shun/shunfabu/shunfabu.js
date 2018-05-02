var app = getApp();
Page({
    data: {
        shunfabu: ["人找车", "车找人", "车找货", "货找车"],
        index: 0,
        arr_index: 0,
        array: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        icon_hidden: !0,
        duty: !0,
        money: "0",
        time: "00:00"
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
        var e = wx.getStorageSync("System");
        console.log(e);
        var a = this,
            n = wx.getStorageSync("users").id;
        app.util.request({
            url: "entry/wxapp/GetUserInfo",
            cachetime: "0",
            data: {
                user_id: n
            },
            success: function(t) {
                2 == t.data.state && wx.showModal({
                    title: "提示",
                    content: "您的账号异常，请尽快联系管理员",
                    showCancel: !0,
                    cancelText: "取消",
                    confirmText: "确定",
                    success: function(t) {
                        wx.navigateBack({
                            delta: 1
                        })
                    },
                    fail: function(t) {},
                    complete: function(t) {}
                })
            }
        });
        var o, c, i, s = (o = new Date, c = o.getMonth() + 1, i = o.getDate(), c >= 1 && c <= 9 && (c = "0" + c), i >= 0 && i <= 9 && (i = "0" + i), o.getFullYear() + "-" + c + "-" + i + " " + o.getHours() + ":" + o.getMinutes() + ":" + o.getSeconds()).slice(0, 11),
            l = "";
        0 == t.id ? l = "人找车" : 1 == t.id ? l = "车找人" : 2 == t.id ? l = "车找货" : 3 == t.id && (l = "货找车"), app.util.request({
            url: "entry/wxapp/CarTag",
            cachetime: "0",
            data: {
                typename: l
            },
            success: function(t) {
                for (var e in console.log(t), t.data) t.data[e].click_class = "select1";
                a.setData({
                    label: t.data
                })
            }
        }), a.setData({
            date: s,
            id: t.id,
            type_name: l,
            money: e.pc_money,
            pc_xuz: e.pc_xuz
        })
    },
    changeColor: function(t) {
        console.log(t);
        var e = t.currentTarget.id,
            a = this.data.label;
        for (var n in a);
        "select1" == a[e].click_class ? a[e].click_class = "select2" : "select2" == a[e].click_class && (a[e].click_class = "select1"), this.setData({
            label: a
        })
    },
    text: function(t) {
        console.log(t);
        var e = t.detail.value;
        this.setData({
            text: e
        })
    },
    add: function(t) {
        var e = this;
        wx.chooseLocation({
            type: "wgs84",
            success: function(t) {
                console.log(t);
                t.latitude, t.longitude, t.speed, t.accuracy;
                e.setData({
                    address: t.address,
                    start_lat: t.latitude,
                    start_lng: t.longitude
                })
            }
        })
    },
    add1: function(t) {
        var e = this;
        wx.chooseLocation({
            type: "wgs84",
            success: function(t) {
                console.log(t);
                t.latitude, t.longitude, t.speed, t.accuracy, t.latitude, t.longitude;
                e.setData({
                    address1: t.address,
                    end_lat: t.latitude,
                    end_lng: t.longitude
                })
            }
        })
    },
    bindPickerChange: function(t) {
        this.setData({
            arr_index: t.detail.value
        })
    },
    bindDateChange: function(t) {
        console.log("picker发送选择改变，携带值为", t.detail.value), this.setData({
            date: t.detail.value
        })
    },
    bindTimeChange: function(t) {
        console.log("picker发送选择改变，携带值为", t.detail.value), this.setData({
            time: t.detail.value
        })
    },
    icon_show: function(t) {
        0 == this.data.icon_hidden ? this.setData({
            icon_hidden: !0
        }) : this.setData({
            icon_hidden: !1
        })
    },
    cancel: function(t) {
        0 == this.data.duty ? this.setData({
            duty: !0
        }) : this.setData({
            duty: !1
        })
    },
    formSubmit: function(t) {
        console.log(t);
        wx.getStorageSync("city_type");
        var e = wx.getStorageSync("city");
        console.log(e);
        var a = wx.getStorageSync("users").id,
            n = this.data.id,
            o = this.data.type_name,
            c = t.detail.value.address1,
            i = t.detail.value.address2,
            s = t.detail.value.path;
        null == s && (s = " ", console.log(s));
        var l = this.data.date + this.data.time,
            u = this.data.array[this.data.arr_index],
            d = t.detail.value.weight,
            r = t.detail.value.contacts,
            g = t.detail.value.contacts_tel,
            f = t.detail.value.other_demand,
            p = Number(this.data.money),
            h = (o = this.data.type_name, this.data.start_lat),
            m = this.data.start_lng,
            _ = this.data.end_lat,
            y = this.data.end_lng;
        console.log(h), console.log(m), console.log(_), console.log(this.data.label);
        var w = this.data.label,
            v = [];
        for (var x in w) "select2" == w[x].click_class && v.push(w[x]);
        console.log(v);
        var S = [];
        v.map(function(t) {
            var e = {};
            e.tag_id = t.id, S.push(e)
        }), console.log(S);
        var k = "";
        if ("" == c ? k = "还没有选择出发地址哦" : "" == i ? k = "还没有选择目的地哦" : 3 == n ? "" == d && (k = "还没有填写货物重量") : "" == r ? k = "还没有填写联系人" : "" == g && (k = "还没有填写联系人的电话"), "" != k) wx.showModal({
            title: "温馨提示",
            content: k,
            showCancel: !0,
            cancelText: "取消",
            confirmText: "确定",
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        });
        else if (p <= 0) app.util.request({
            url: "entry/wxapp/car",
            cachetime: "0",
            data: {
                user_id: a,
                start_place: c,
                end_place: i,
                start_time: l,
                num: u,
                link_name: r,
                link_tel: g,
                typename: o,
                other: f,
                tj_place: s,
                sz: S,
                hw_wet: d,
                star_lat: h,
                star_lng: m,
                end_lat: _,
                end_lng: y,
                cityname: e
            },
            success: function(t) {
                console.log(t), wx.showToast({
                    title: "发布成功",
                    icon: "",
                    image: "",
                    duration: 2e3,
                    mask: !0,
                    success: function(t) {},
                    fail: function(t) {},
                    complete: function(t) {}
                }), setTimeout(function() {
                    wx.navigateBack({
                        url: "../shun",
                        success: function(t) {},
                        fail: function(t) {},
                        complete: function(t) {}
                    })
                }, 2e3)
            }
        });
        else {
            var D = wx.getStorageSync("openid");
            app.util.request({
                url: "entry/wxapp/Pay",
                cachetime: "0",
                data: {
                    openid: D,
                    money: p
                },
                success: function(t) {
                    console.log(t), wx.requestPayment({
                        timeStamp: t.data.timeStamp,
                        nonceStr: t.data.nonceStr,
                        package: t.data.package,
                        signType: t.data.signType,
                        paySign: t.data.paySign,
                        success: function(t) {
                            console.log(t), app.util.request({
                                url: "entry/wxapp/car",
                                cachetime: "0",
                                data: {
                                    user_id: a,
                                    start_place: c,
                                    end_place: i,
                                    start_time: l,
                                    num: u,
                                    link_name: r,
                                    link_tel: g,
                                    typename: o,
                                    other: f,
                                    tj_place: s,
                                    sz: S,
                                    hw_wet: d,
                                    star_lat: h,
                                    star_lng: m,
                                    end_lat: _,
                                    end_lng: y,
                                    cityname: e
                                },
                                success: function(t) {
                                    console.log(t), app.util.request({
                                        url: "entry/wxapp/SaveCarPayLog",
                                        cachetime: "0",
                                        data: {
                                            car_id: t.data,
                                            money: p
                                        },
                                        success: function(t) {
                                            console.log(t)
                                        }
                                    }), wx.showToast({
                                        title: "发布成功",
                                        icon: "",
                                        image: "",
                                        duration: 2e3,
                                        mask: !0,
                                        success: function(t) {},
                                        fail: function(t) {},
                                        complete: function(t) {}
                                    }), setTimeout(function() {
                                        wx.navigateBack({
                                            url: "../shun",
                                            success: function(t) {},
                                            fail: function(t) {},
                                            complete: function(t) {}
                                        })
                                    }, 2e3)
                                }
                            })
                        }
                    })
                }
            })
        }
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});