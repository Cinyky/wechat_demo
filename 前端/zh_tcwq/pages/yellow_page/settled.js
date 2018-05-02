var app = getApp(),
    util = require("../../utils/util.js"),
    imgArray = [],
    imgArray1 = [],
    lbimgArray = [],
    lbimgArray1 = [],
    imglogo = "";
Page({
    data: {
        index: 0,
        zsnum: 0,
        lbimages1: [],
        images1: [],
        logo: []
    },
    onLoad: function(e) {
        imgArray = [], imgArray1 = [], lbimgArray = [], lbimgArray1 = [];
        var t = wx.getStorageSync("System").is_tel,
            a = wx.getStorageSync("users").id;
        app.util.request({
            url: "entry/wxapp/GetUserInfo",
            cachetime: "0",
            data: {
                user_id: a
            },
            success: function(e) {
                2 == e.data.state && wx.showModal({
                    title: "提示",
                    content: "您的账号异常，请尽快联系管理员",
                    showCancel: !0,
                    cancelText: "取消",
                    confirmText: "确定",
                    success: function(e) {
                        wx.navigateBack({
                            delta: 1
                        })
                    },
                    fail: function(e) {},
                    complete: function(e) {}
                })
            }
        });
        var o = wx.getStorageSync("users"),
            n = this;
        console.log(o), console.log(getApp().imglink, getApp().getuniacid);
        var i = wx.getStorageSync("url");
        app.util.request({
            url: "entry/wxapp/StoreType",
            cachetime: "0",
            success: function(e) {
              console.log("获取的分类信息")
                console.log(e);
                var a = e.data,
                    l = [];
                a.map(function(e) {
                    var t;
                    t = e.type_name, l.push(t)
                }), console.log(l), n.setData({
                    nav: l,
                    store: a,
                    link: i,
                    is_tel: t,
                    user_info: o
                })
            }
        }), app.util.request({
            url: "entry/wxapp/YellowSet",
            cachetime: "0",
            success: function(e) {
                console.log(e);
                var t = [];
                for (var a in e.data) {
                    var o = e.data;
                    0 == e.data[a].money ? e.data[a].money1 = "免费" : e.data[a].money1 = e.data[a].money + "元", e.data[a].text = e.data[a].days + "天 " + e.data[a].money1
                }
                e.data.map(function(e) {
                    var a = {};
                    a.value = e.text, a.name = e.id, t.push(a)
                }), console.log(t), t[0].checked = !0, n.setData({
                    items: t,
                    yellow_set: o,
                    rz_type: t[0].name
                })
            }
        });
        var l = wx.getStorageSync("url2");
        console.log(i), this.setData({
            url: l,
            link: i
        })
    },
    getPhoneNumber: function(e) {
        var t = this,
            a = wx.getStorageSync("key"),
            o = e.detail.iv,
            n = e.detail.encryptedData;
        console.log(a), console.log(o), console.log(n), app.util.request({
            url: "entry/wxapp/jiemi",
            cachetime: "0",
            data: {
                sessionKey: a,
                iv: o,
                data: n
            },
            success: function(e) {
                console.log(e), t.setData({
                    num: e.data.phoneNumber
                })
            }
        })
    },
    bindPickerChange: function(e) {
        console.log("picker发送选择改变，携带值为", e.detail.value), this.setData({
            index: e.detail.value
        })
    },
    radioChange: function(e) {
        console.log("radio发生change事件，携带value值为：", e.detail.value), this.setData({
            rz_type: e.detail.value
        })
    },
    choose: function(e) {
        var t = this,
            a = t.data.url,
            o = wx.getStorageSync("uniacid");
        console.log(a), console.log(o), wx.chooseImage({
            count: 1,
            sizeType: ["original", "compressed"],
            sourceType: ["album", "camera"],
            success: function(e) {
                console.log(e);
                var n = e.tempFilePaths[0];
                wx.uploadFile({
                    url: a + "app/index.php?i=" + o + "&c=entry&a=wxapp&do=Upload&m=zh_tcwq",
                    filePath: n,
                    name: "upfile",
                    formData: {},
                    success: function(e) {
                        console.log(e);
                        var a = t.data.logo;
                        a[0] = e.data, t.setData({
                            logo: a
                        })
                    },
                    fail: function(e) {
                        console.log(e)
                    }
                })
            }
        })
    },
    lbdelete1: function(e) {
        var t = e.currentTarget.dataset.index,
            a = this.data.logo;
        a.splice(t, 1), console.log(a), this.setData({
            logo: a
        })
    },
    gongg: function(e) {
        console.log(e.detail.value);
        var t = parseInt(e.detail.value.length);
        this.setData({
            zsnum: t
        })
    },
    add: function(e) {
        var t = this;
        wx.chooseLocation({
            type: "wgs84",
            success: function(e) {
                console.log(e);
                e.latitude, e.longitude, e.speed, e.accuracy;
                t.setData({
                    address: e.address,
                    start_lat: e.latitude,
                    start_lng: e.longitude
                })
            }
        })
    },
    formSubmit: function(e) {
        console.log(e);
        var t = wx.getStorageSync("city"),
            a = e.detail.value.name,
            o = e.detail.value.tel,
            n = e.detail.value.details,
            i = e.detail.value.address,
            l = "",
            s = this.data.logo,
            c = this.data.yellow_set,
            r = (this.data.items, this.data.start_lat + "," + this.data.start_lng);
        console.log(r);
        var u = this.data.store,
            d = this.data.nav[this.data.index];
        if (2 == this.data.is_tel) var g = 1;
        else g = this.data.num;
        for (var p in u) if (u[p].type_name == d) var m = u[p].id;
        var y = this.data.rz_type;
        for (var f in c) if (c[f].id == y) {
            console.log(c[f].money);
            var h = Number(c[f].money)
        }
        if (console.log(c), console.log(this.data.rz_type), console.log(s[0]), "" == a ? l = "公司名称不能为空" : "" == o ? l = "公司电话不能为空" : "" == n ? l = "公司简介不能为空" : null == i || "" == i ? l = "请正确填写公司地址" : 0 == s.length ? l = "请上传公司logo" : null == g && (l = "还没进行手机号验证"), "" != l) wx.showModal({
            title: "提示",
            content: l,
            showCancel: !0,
            cancelText: "取消",
            confirmText: "确定",
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        });
        else {
            s = s[0];
            var v = wx.getStorageSync("users").id,
                w = wx.getStorageSync("openid");
            h > 0 ? app.util.request({
                url: "entry/wxapp/Pay",
                cachetime: "0",
                data: {
                    openid: w,
                    money: h
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
                                url: "entry/wxapp/YellowPage",
                                cachetime: "0",
                                data: {
                                    user_id: v,
                                    logo: s,
                                    company_name: a,
                                    company_address: i,
                                    type_id: m,
                                    link_tel: o,
                                    rz_type: y,
                                    coordinates: r,
                                    content: n,
                                    imgs: "",
                                    tel2: g,
                                    cityname: t
                                },
                                success: function(e) {
                                    console.log(e), app.util.request({
                                        url: "entry/wxapp/SaveHyPayLog",
                                        cachetime: "0",
                                        data: {
                                            hy_id: e.data,
                                            money: h
                                        },
                                        success: function(e) {
                                            console.log(e)
                                        }
                                    }), wx.showModal({
                                        title: "提示",
                                        content: "提交成功等待审核"
                                    }), setTimeout(function() {
                                        wx.navigateBack({
                                            delta: 1
                                        })
                                    }, 2e3)
                                }
                            })
                        },
                        fail: function(e) {
                            console.log("这里是支付失败"), console.log(e), wx.showToast({
                                title: "支付失败",
                                duration: 1e3
                            })
                        }
                    })
                }
            }) : app.util.request({
                url: "entry/wxapp/YellowPage",
                cachetime: "0",
                data: {
                    user_id: v,
                    logo: s,
                    company_name: a,
                    company_address: i,
                    type_id: m,
                    link_tel: o,
                    rz_type: y,
                    coordinates: r,
                    content: n,
                    imgs: "",
                    tel2: g,
                    cityname: t
                },
                success: function(e) {
                    console.log(e), wx.showToast({
                        title: "入驻成功",
                        icon: "",
                        image: "",
                        duration: 2e3,
                        mask: !0,
                        success: function(e) {},
                        fail: function(e) {},
                        complete: function(e) {}
                    }), setTimeout(function() {
                        wx.navigateBack({
                            delta: 1
                        })
                    }, 2e3)
                }
            })
        }
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});