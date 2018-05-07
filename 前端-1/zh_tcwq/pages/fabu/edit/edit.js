var app = getApp(),
    _imgArray = [];
Page({
    data: {
        stick_none: !1,
        checked: !1,
        checked_welfare: !1,
        checked_average: !1,
        checked_password: !1,
        know: !1,
        num: 1,
        disabled: !1
    },
    bindMultiPickerChange: function(e) {
        this.setData({
            multiIndex: e.detail.value
        })
    },
    bindPickerChange: function(e) {
        var t = this.data.stock[e.detail.value];
        this.setData({
            index: e.detail.value,
            text: t
        })
    },
    onLoad: function(e) {
        var t = this,
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
        }), wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: wx.getStorageSync("color"),
            animation: {
                duration: 0,
                timingFunc: "easeIn"
            }
        }), app.util.request({
            url: "entry/wxapp/System",
            cachetime: "0",
            success: function(e) {
                t.setData({
                    System: e.data
                })
            }
        });
        var n = e.info,
            i = e.money,
            s = e.type_id,
            c = e.type2_id,
            o = wx.getStorageSync("System");
        wx.setNavigationBarTitle({
            title: n
        });
        wx.getStorageSync("uniacid");
        console.log(wx.getStorageSync("users")), t.setData({
            type_id: s,
            type2_id: c,
            info: n,
            procedures: Number(o.hb_sxf),
            money: i,
            url: wx.getStorageSync("url2"),
            url1: wx.getStorageSync("url"),
            name: wx.getStorageSync("users").name
        }), wx.getLocation({
            type: "wgs84",
            success: function(e) {
                var a = e.latitude + "," + e.longitude;
                app.util.request({
                    url: "entry/wxapp/map",
                    cachetime: "0",
                    data: {
                        op: a
                    },
                    success: function(e) {
                        t.setData({
                            address: e.data.result.address
                        })
                    }
                })
            }
        }), app.util.request({
            url: "entry/wxapp/Top",
            cachetime: "0",
            success: function(e) {
                var a = e.data;
                for (var n in a) 1 == a[n].type ? a[n].array = "置顶一天（收费" + a[n].money + "元）" : 2 == a[n].type ? a[n].array = "置顶一周（收费" + a[n].money + "元）" : 3 == a[n].type && (a[n].array = "置顶一月（收费" + a[n].money + "元）");
                var i = [];
                a.map(function(e) {
                    var t;
                    t = e.array, i.push(t)
                }), i.push("取消置顶"), t.setData({
                    stock: i,
                    stick: a
                })
            }
        }), app.util.request({
            url: "entry/wxapp/Label",
            cachetime: "0",
            data: {
                type2_id: c
            },
            success: function(e) {
                for (var a in e.data) e.data[a].click_class = "selected1";
                t.setData({
                    label: e.data
                })
            }
        })
    },
    selected: function(e) {
        var t = e.currentTarget.id,
            a = this.data.stick;
        this.setData({
            stick_info: a[t].array,
            money1: a[t].money,
            type: a[t].type,
            checked: !1,
            stick_none: !0
        })
    },
    add: function(e) {
        var t = this;
        wx.chooseLocation({
            type: "wgs84",
            success: function(e) {
                e.latitude, e.longitude, e.speed, e.accuracy;
                var a = e.latitude + "," + e.longitude;
                t.setData({
                    address: e.address,
                    coordinates: a
                })
            }
        })
    },
    label: function(e) {
        var t = this.data.label,
            a = e.currentTarget.dataset.inde;
        "selected1" == t[a].click_class ? t[a].click_class = "selected2" : "selected2" == t[a].click_class && (t[a].click_class = "selected1"), this.setData({
            label: t
        })
    },
    know: function(e) {
        var t = this.data.know;
        1 == t ? this.setData({
            know: !1
        }) : this.setData({
            know: !0
        })
    },
    imgArray1: function(e) {
        var t = this,
            a = wx.getStorageSync("uniacid"),
            n = 9 - _imgArray.length;
        n > 0 && n <= 9 ? wx.chooseImage({
            count: n,
            sizeType: ["compressed"],
            sourceType: ["album", "camera"],
            success: function(e) {
                wx.showToast({
                    icon: "loading",
                    title: "正在上传"
                });
                var n = e.tempFilePaths;
                t.uploadimg({
                    url: t.data.url + "app/index.php?i=" + a + "&c=entry&a=wxapp&do=Upload&m=zh_tcwq",
                    path: n
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
            a = e.i ? e.i : 0,
            n = e.success ? e.success : 0,
            i = e.fail ? e.fail : 0;
        wx.uploadFile({
            url: e.url,
            filePath: e.path[a],
            name: "upfile",
            formData: null,
            success: function(e) {
                console.log(e), "" != e.data ? (n++, _imgArray.push(e.data), t.setData({
                    imgArray1: _imgArray
                })) : wx.showToast({
                    icon: "loading",
                    title: "请重试"
                })
            },
            fail: function(e) {
                i++
            },
            complete: function() {
                ++a == e.path.length ? (t.setData({
                    images: e.path
                }), wx.hideToast()) : (e.i = a, e.success = n, e.fail = i, t.uploadimg(e))
            }
        })
    },
    delete: function(e) {
        Array.prototype.indexOf = function(e) {
            for (var t = 0; t < this.length; t++) if (this[t] == e) return t;
            return -1
        }, Array.prototype.remove = function(e) {
            var t = this.indexOf(e);
            t > -1 && this.splice(t, 1)
        };
        var t = e.currentTarget.dataset.inde;
        _imgArray.remove(_imgArray[t]), this.setData({
            imgArray1: _imgArray
        })
    },
    switch1Change: function(e) {
        console.log(e.detail.value), e.detail.value || this.setData({
            stick_none: !1,
            money1: 0,
            type: 0
        }), this.setData({
            checked: e.detail.value
        })
    },
    switch2Change: function(e) {
        this.setData({
            checked_welfare: e.detail.value
        })
    },
    switch3Change: function(e) {
        this.setData({
            checked_average: e.detail.value
        })
    },
    switch4Change: function(e) {
        this.setData({
            checked_password: e.detail.value
        })
    },
    formSubmit: function(e) {
        console.log("这是保存formid2"), console.log(e), app.util.request({
            url: "entry/wxapp/SaveFormid",
            cachetime: "0",
            data: {
                user_id: wx.getStorageSync("users").id,
                form_id: e.detail.formId,
                openid: wx.getStorageSync("openid")
            },
            success: function(e) {}
        });
        var t = this,
            a = wx.getStorageSync("city"),
            n = t.data.num + 1;
        t.setData({
            num: n
        });
        var i = t.data.money1;
        if ("1" == t.data.System.is_tzdz) var s = t.data.address;
        else s = "";
        console.log(s);
        var c = t.data.procedures;
        if (null == t.data.type) var o = 0;
        else o = t.data.type;
        if (null == i) i = 0;
        else i = t.data.money1;
        var r = t.data.label,
            l = [];
        for (var u in r) "selected2" == r[u].click_class && l.push(r[u]);
        var d = [];
        l.map(function(e) {
            var t = {};
            t.label_id = e.id, d.push(t)
        });
        var p = wx.getStorageSync("openid"),
            f = (e.detail.formId, e.detail.value.content.replace("\n", "?")),
            m = e.detail.value.name,
            y = e.detail.value.tel;
        console.log(y);
        var h = t.data.lunbo;
        null != h && 0 != h.length || (h = "");
        t.data.url, wx.getStorageSync("uniacid");
        var g = t.data.type2_id,
            w = t.data.type_id,
            _ = Number(t.data.money) + Number(i),
            v = _,
            x = wx.getStorageSync("users").id;
        console.log(x);
        var S = "",
            k = t.data.checked_welfare,
            b = t.data.checked_password,
            D = t.data.checked_average,
            T = 0,
            A = "",
            q = "",
            P = 0,
            C = 0,
            N = new RegExp("^[一-龥]+$"),
            z = 0;
        if (1 == k) {
            if (0 == D) {
                C = 1, T = Number(e.detail.value.welfare_money), q = Number(e.detail.value.welfare_share);
                var F = T / q;
                z = T + c / 100 * T, _ += Number(z.toFixed(2))
            } else {
                C = 2, T = Number(e.detail.value.welfare_money), q = Number(e.detail.value.welfare_share);
                F = 1;
                z = T * q + T * q * (c / 100), _ += Number(z.toFixed(2))
            }
            1 == b ? (A = e.detail.value.welfare_pass, P = 2) : P = 1
        } else _ = _;
        if ("" == f ? S = "内容不能为空" : f.length >= 540 ? S = "内容超出了" : "" == m ? S = "姓名不能为空" : "" == y ? S = "电话不能为空" : 1 == k && ("" == T ? S = "红包金额不能为空" : !t.data.checked_average && T < 1 ? S = "福利红包金额不能小于1元" : "" == q ? S = "红包个数不能为空" : F < .1 ? S = "红包份数过大，请合理设置" : t.data.checked_average && T < .1 ? S = "单个红包最小金额不能小于0.1元" : 1 == b && ("" == A ? S = "口令不能为空" : N.test(A) || (S = "口令只能输入汉字"))), "" != S) wx.showModal({
            title: "提示",
            content: S,
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        });
        else {
            _ = _;
            c = wx.getStorageSync("System");
            if (0 == _imgArray.length) var I = "";
            else I = _imgArray.join(",");
            _ <= 0 ? (t.setData({
                disabled: !0
            }), app.util.request({
                url: "entry/wxapp/Posting",
                cachetime: "0",
                data: {
                    details: f,
                    img: I,
                    user_id: x,
                    user_name: m,
                    user_tel: y,
                    type2_id: g,
                    type_id: w,
                    money: _,
                    type: o,
                    sz: d,
                    address: s,
                    hb_money: T,
                    hb_keyword: A,
                    hb_num: q,
                    hb_type: P,
                    hb_random: C,
                    cityname: a
                },
                success: function(e) {
                    wx.showToast({
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
                            url: "../../index/index",
                            success: function(e) {},
                            fail: function(e) {},
                            complete: function(e) {}
                        })
                    }, 2e3)
                }
            })) : (t.setData({
                disabled: !0
            }), app.util.request({
                url: "entry/wxapp/Pay",
                cachetime: "0",
                data: {
                    openid: p,
                    money: _
                },
                success: function(e) {
                    wx.requestPayment({
                        timeStamp: e.data.timeStamp,
                        nonceStr: e.data.nonceStr,
                        package: e.data.package,
                        signType: e.data.signType,
                        paySign: e.data.paySign,
                        success: function(e) {
                            app.util.request({
                                url: "entry/wxapp/Posting",
                                cachetime: "0",
                                data: {
                                    details: f,
                                    img: I,
                                    user_id: x,
                                    user_name: m,
                                    user_tel: y,
                                    type2_id: g,
                                    type_id: w,
                                    money: _,
                                    type: o,
                                    sz: d,
                                    address: s,
                                    hb_money: T,
                                    hb_keyword: A,
                                    hb_num: q,
                                    hb_type: P,
                                    hb_random: C,
                                    cityname: a
                                },
                                success: function(e) {
                                    0 == v || null == v || "" == v || app.util.request({
                                        url: "entry/wxapp/SaveTzPayLog",
                                        cachetime: "0",
                                        data: {
                                            tz_id: e.data,
                                            money: v
                                        },
                                        success: function(e) {}
                                    }), wx.showToast({
                                        title: "发布成功",
                                        icon: "",
                                        image: "",
                                        duration: 2e3,
                                        mask: !0,
                                        success: function(e) {},
                                        fail: function(e) {},
                                        complete: function(e) {}
                                    }), setTimeout(function() {
                                        wx.switchTab({
                                            url: "../../index/index",
                                            success: function(e) {},
                                            fail: function(e) {},
                                            complete: function(e) {}
                                        })
                                    }, 2e3)
                                }
                            })
                        },
                        fail: function(e) {
                            wx.showToast({
                                title: "支付失败",
                                duration: 1e3
                            })
                        },
                        complete: function(e) {
                            console.log(e), "requestPayment:fail cancel" == e.errMsg && (wx.showToast({
                                title: "取消支付",
                                icon: "loading",
                                duration: 1e3
                            }), t.setData({
                                disabled: !1
                            }))
                        }
                    })
                }
            }))
        }
    },
    cancel: function(e) {
        this.setData({
            money1: 0,
            type: 0,
            checked: !1,
            stick_none: !1,
            iszdchecked: !1
        })
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {
        console.log(this.data), _imgArray.splice(0, _imgArray.length)
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});