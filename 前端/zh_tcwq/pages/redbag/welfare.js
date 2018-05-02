var imgArray = [],
    app = getApp();
Page({
    data: {
        images: [],
        lunbo_len: 0,
        checked1: !1,
        checked2: !1,
        checked3: !1,
        checked4n: !1,
        disabled: !1
    },
    onLoad: function(e) {
        var t = this;
        wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: wx.getStorageSync("color"),
            animation: {
                duration: 0,
                timingFunc: "easeIn"
            }
        });
        var o = wx.getStorageSync("url2"),
            a = wx.getStorageSync("url"),
            n = wx.getStorageSync("System");
        t.setData({
            url: o,
            procedures: Number(n.hb_sxf) / 100,
            url1: a
        });
        wx.getStorageSync("users").id;
        app.util.request({
            url: "entry/wxapp/MyStore",
            cachetime: "0",
            data: {
                user_id: e.user_id
            },
            success: function(e) {
                console.log(e), t.setData({
                    store: e.data,
                    user_id: ""
                })
            }
        })
    },
    choiseimg: function() {
        var e = this;
        console.log(e.data);
        var t = wx.getStorageSync("uniacid"),
            o = 9 - [].length;
        o > 0 && o <= 9 ? wx.chooseImage({
            count: o,
            sizeType: ["compressed"],
            sourceType: ["album", "camera"],
            success: function(o) {
                wx.showToast({
                    icon: "loading",
                    title: "正在上传"
                });
                var a = o.tempFilePaths;
                e.uploadimg({
                    url: e.data.url + "app/index.php?i=" + t + "&c=entry&a=wxapp&do=Upload&m=zh_tcwq",
                    path: a
                })
            }
        }) : wx.showModal({
            title: "上传提示",
            content: "最多上传9张图片",
            showCancel: !0,
            cancelText: "取消",
            confirmText: "确定",
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        })
    },
    uploadimg: function(e) {
        var t = this,
            o = e.i ? e.i : 0,
            a = e.success ? e.success : 0,
            n = e.fail ? e.fail : 0;
        wx.uploadFile({
            url: e.url,
            filePath: e.path[o],
            name: "upfile",
            formData: null,
            success: function(e) {
                "" != e.data ? (console.log(e), a++, imgArray.push(e.data), t.setData({
                    imgArray: imgArray
                }), console.log(o), console.log("上传商家轮播图时候提交的图片数组", imgArray)) : wx.showToast({
                    icon: "loading",
                    title: "请重试"
                })
            },
            fail: function(e) {
                n++, console.log("fail:" + o + "fail:" + n)
            },
            complete: function() {
                console.log(o), ++o == e.path.length ? (t.setData({
                    images: e.path
                }), wx.hideToast(), console.log("执行完毕"), console.log("成功：" + a + " 失败：" + n)) : (console.log(o), e.i = o, e.success = a, e.fail = n, t.uploadimg(e))
            }
        })
    },
    delete: function(e) {
        console.log(this.data), console.log(e), Array.prototype.indexOf = function(e) {
            for (var t = 0; t < this.length; t++) if (this[t] == e) return t;
            return -1
        }, Array.prototype.remove = function(e) {
            var t = this.indexOf(e);
            t > -1 && this.splice(t, 1)
        };
        var t = e.currentTarget.dataset.index;
        imgArray.remove(imgArray[t]), this.setData({
            imgArray: imgArray
        })
    },
    switch1Change: function(e) {
        console.log(e), this.setData({
            checked1: e.detail.value
        })
    },
    switch2Change: function(e) {
        console.log(e), this.setData({
            checked2: e.detail.value
        })
    },
    formSubmit: function(e) {
        var t = this,
            o = wx.getStorageSync("users"),
            a = (o.id, o.openid),
            n = t.data.images,
            i = t.data.store,
            c = t.data.procedures,
            s = e.detail.value,
            l = Number(s.money),
            r = Number(s.share),
            u = s.details,
            d = t.data.checked1,
            g = t.data.checked2;
        if (0 == d) var f = 1,
            h = (l + c * l).toFixed(2),
            m = l / r;
        else f = 2, h = (l * r + l * r * c).toFixed(2);
        if (0 == g) var p = "",
            y = 1;
        else p = s.hb_keyword, y = 2;
        console.log(imgArray);
        var w = "";
        console.log(w), console.log("红包总金额  " + h);
        var x = new RegExp("^[一-龥]+$"),
            S = "";
        "" == u ? S = "福利描述不能为空" : "" == l ? S = "红包金额不能为空" : !t.data.checked1 && l < 1 ? S = "福利红包金额不能小于1元" : "" == r ? S = "红包个数不能为空" : m < .1 ? S = "红包份数过大，请合理设置" : t.data.checked1 && l < .1 ? S = "单个红包最小金额不能小于0.1" : 1 == g && ("" == p ? S = "红包口令不能为空" : x.test(p) || (S = "口令只能输入汉字")), "" != S ? wx.showModal({
            title: "提示",
            content: S,
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        }) : imgArray.length < n.length ? wx.showModal({
            title: "提示",
            content: "图片正在上传，请稍候",
            showCancel: !0,
            cancelText: "取消",
            confirmText: "确定",
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        }) : (w = imgArray.join(","), console.log(w), t.setData({
            disabled: !0
        }), app.util.request({
            url: "entry/wxapp/Pay",
            cachetime: "0",
            data: {
                openid: a,
                money: h
            },
            success: function(e) {
                wx.requestPayment({
                    timeStamp: e.data.timeStamp,
                    nonceStr: e.data.nonceStr,
                    package: e.data.package,
                    signType: e.data.signType,
                    paySign: e.data.paySign,
                    success: function(e) {
                        console.log("这里是支付成功"), console.log(e), app.util.request({
                            url: "entry/wxapp/Posting",
                            cachetime: "0",
                            data: {
                                store_id: i.id,
                                details: u,
                                img: w,
                                user_id: t.data.user_id,
                                user_name: i.store_name,
                                user_tel: i.tel,
                                type2_id: "",
                                type_id: "",
                                money: h,
                                type: "",
                                sz: i.logo,
                                address: i.address,
                                hb_money: l,
                                hb_keyword: p,
                                hb_num: r,
                                hb_type: y,
                                hb_random: f
                            },
                            success: function(e) {
                                console.log(e), wx.showToast({
                                    title: "发布成功",
                                    icon: "",
                                    image: "",
                                    duration: 2e3,
                                    mask: !0,
                                    success: function(e) {},
                                    fail: function(e) {},
                                    complete: function(e) {}
                                }), setTimeout(function() {
                                    wx.reLaunch({
                                        url: "../index/index",
                                        success: function(e) {},
                                        fail: function(e) {},
                                        complete: function(e) {}
                                    })
                                }, 2e3)
                            }
                        })
                    },
                    fail: function(e) {
                        console.log("这里是支付失败"), console.log(e), wx.showToast({
                            title: "支付失败",
                            duration: 1e3
                        }), t.setData({
                            disabled: !1
                        })
                    }
                })
            }
        }))
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {
        imgArray.splice(0, imgArray.length)
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});