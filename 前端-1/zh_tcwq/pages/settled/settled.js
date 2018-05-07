var app = getApp(),
    imgArray = [],
    uploaded = [];
Page({
    data: {
        hidden1: !1,
        hidden2: !0,
        hidden3: !0,
        index: 0,
        inde: 0,
        index_two: 0,
        prompt: !1,
        time: "00:00",
        time1: "00:00",
        choise: !1,
        images: [],
        upload_img: [],
        lunbo_len: 0,
        upload_img_length: 0,
        getmsg: "获取验证码",
        tel_code: !1,
        sms: !1,
        fwxy: !0,
        items: [{
            name: "刷卡支付",
            value: "刷卡支付"
        }, {
            name: "免费wifi",
            value: "免费wifi"
        }, {
            name: "免费停车",
            value: "免费停车"
        }, {
            name: "禁止吸烟",
            value: "禁止吸烟"
        }, {
            name: "提供包间",
            value: "提供包间"
        }, {
            name: "沙发休闲",
            value: "沙发休闲"
        }]
    },
    lookck: function() {
        this.setData({
            fwxy: !1
        })
    },
    queren: function() {
        this.setData({
            fwxy: !0
        })
    },
    bindMultiPickerChange: function(e) {
        console.log("picker发送选择改变，携带值为", e.detail.value), this.setData({
            multiIndex: e.detail.value
        })
    },
    cost1: function(e) {
        console.log(this.data), console.log(e);
        var t = this.data.stick,
            a = e.currentTarget.id;
        for (var o in t) t[o].hidden1 = o != a;
        this.setData({
            stick: t,
            type: t[a].type,
            inmoney: t[a].money
        })
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
        }), console.log(t.data);
        var a = wx.getStorageSync("url2"),
            o = wx.getStorageSync("openid"),
            n = wx.getStorageSync("users").id;
        console.log("用户的openid为 " + o + " 用户的user_id为 " + n), app.util.request({
            url: "entry/wxapp/GetUserInfo",
            cachetime: "0",
            data: {
                user_id: n
            },
            success: function(e) {
                console.log(e), 1 == e.data.state ? app.util.request({
                    url: "entry/wxapp/sjdlogin",
                    cachetime: "0",
                    data: {
                        user_id: n
                    },
                    success: function(e) {
                        console.log(e), 0 == e.data ? t.setData({
                            mystore: !0
                        }) : 2 == e.data.time_over ? wx.showModal({
                            title: "提示",
                            content: "你已经入驻过了哦",
                            showCancel: !0,
                            cancelText: "返回",
                            confirmText: "跳转首页",
                            success: function(e) {
                                wx.reLaunch({
                                    url: "../logs/logs",
                                    success: function(e) {},
                                    fail: function(e) {},
                                    complete: function(e) {}
                                })
                            },
                            fail: function(e) {},
                            complete: function(e) {}
                        }) : 1 == e.data.time_over && (wx.showModal({
                            title: "提示",
                            content: "你的入驻已到期，前往商家入口续费"
                        }), setTimeout(function() {
                            wx.switchTab({
                                url: "../logs/logs"
                            })
                        }, 2e3))
                    }
                }) : wx.showModal({
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
        }), t.setData({
            user_id: n,
            openid: o,
            url: a
        }), app.util.request({
            url: "entry/wxapp/IsSms",
            cachetime: "0",
            success: function(e) {
                console.log(e), 1 == e.data ? t.setData({
                    send: !1,
                    sms: !0
                }) : t.setData({
                    send: !0,
                    sms: !1,
                    tel_code: !0
                })
            }
        }), app.util.request({
            url: "entry/wxapp/System",
            cachetime: "0",
            success: function(e) {
                console.log(e), t.setData({
                    xtxx: e.data
                })
            }
        }), app.util.request({
            url: "entry/wxapp/StoreType",
            cachetime: "0",
            success: function(e) {
                console.log(e), 0 == e.data.length && (wx.showModal({
                    title: "提示",
                    content: "平台暂未添加行业分类，无法入驻"
                }), setTimeout(function() {
                    wx.navigateBack({})
                }, 2e3));
                var a = e.data,
                    o = [];
                a.map(function(e) {
                    var t;
                    t = e.type_name, o.push(t)
                }), t.setData({
                    store: a,
                    store_type: o
                }), app.util.request({
                    url: "entry/wxapp/StoreType2",
                    cachetime: "0",
                    data: {
                        type_id: a[0].id
                    },
                    success: function(e) {
                        console.log(e);
                        var a = [];
                        e.data.map(function(e) {
                            var t;
                            t = e.name, a.push(t)
                        }), t.setData({
                            store2: e.data,
                            store_type_two: a
                        })
                    }
                })
            }
        }), app.util.request({
            url: "entry/wxapp/InMoney",
            cachetime: "0",
            success: function(e) {
                console.log(e), 0 == e.data.length && (wx.showModal({
                    title: "提示",
                    content: "平台暂未添加入驻期限，无法入驻"
                }), setTimeout(function() {
                    wx.navigateBack({})
                }, 2e3));
                var a = e.data;
                for (var o in a) a[o].money > 0 ? a[o].money1 = "（收费" + a[o].money + "元）" : a[o].money1 = "  免费", 1 == a[o].type ? (a[o].array = "一周" + a[o].money1, a[o].hidden1 = !1) : 2 == a[o].type ? (a[o].array = "半年" + a[o].money1, a[o].hidden1 = !0) : 3 == a[o].type && (a[o].array = "一年" + a[o].money1, a[o].hidden1 = !0);
                t.setData({
                    stick: a,
                    type: a[0].type,
                    inmoney: a[0].money
                })
            }
        })
    },
    user_name: function(e) {
        console.log(e);
        var t = e.detail.value;
        this.setData({
            name: t
        })
    },
    user_code: function(e) {
        console.log(e);
        var t = e.detail.value;
        t != this.data.num ? wx.showToast({
            title: "验证码错误",
            icon: "",
            image: "",
            duration: 2e3,
            mask: !0,
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        }) : this.setData({
            tel_code: !0,
            yz_code: t
        })
    },
    sendmessg: function(e) {
        var t = this;
        console.log(t.data);
        var a = t.data.name;
        if ("" == a || null == a) wx.showToast({
            title: "请输入手机号",
            icon: "",
            image: "",
            duration: 2e3,
            mask: !0,
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        });
        else {
            for (var o = "", n = 0; n < 6; n++) o += Math.floor(10 * Math.random());
            console.log(o), app.util.request({
                url: "entry/wxapp/sms",
                cachetime: "0",
                data: {
                    code: o,
                    tel: a
                },
                success: function(e) {
                    console.log(e)
                }
            }), t.setData({
                num: o
            });
            var i = 60,
                s = setInterval(function() {
                    t.setData({
                        getmsg: i + "s后重新发送",
                        send: !0
                    }), --i <= 0 && (clearInterval(s), t.setData({
                        getmsg: "获取验证码",
                        send: !1,
                        num: 0
                    }))
                }, 1e3)
        }
    },
    bindTimeChange: function(e) {
        console.log("picker发送选择改变，携带值为", e.detail.value), this.setData({
            time: e.detail.value
        })
    },
    bindTimeChange1: function(e) {
        var t = this.data.time,
            a = e.detail.value;
        "00：00" == a ? wx.showModal({
            title: "提示",
            content: "营业结束时间不能为00:00",
            showCancel: !0,
            cancelText: "取消",
            confirmText: "确定",
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        }) : a <= t ? wx.showModal({
            title: "提示",
            content: "营业结束时间不能为小于或等于营业开始时间",
            showCancel: !0,
            cancelText: "取消",
            confirmText: "确定",
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        }) : this.setData({
            time1: e.detail.value
        })
    },
    add: function(e) {
        var t = this;
        wx.chooseLocation({
            type: "wgs84",
            success: function(e) {
                console.log(e);
                e.latitude, e.longitude, e.speed, e.accuracy;
                var a = e.latitude + "," + e.longitude;
                t.setData({
                    address: e.address,
                    coordinates: a
                })
            }
        })
    },
    bindPickerChanges: function(e) {
        var t = this,
            a = t.data.store,
            o = e.detail.value;
        this.setData({
            index: o,
            index_two: 0
        }), console.log(a[o].id), app.util.request({
            url: "entry/wxapp/StoreType2",
            cachetime: "0",
            data: {
                type_id: a[o].id
            },
            success: function(e) {
                console.log(e);
                var a = [];
                e.data.map(function(e) {
                    var t;
                    t = e.name, a.push(t)
                }), t.setData({
                    store2: e.data,
                    store_type_two: a
                })
            }
        })
    },
    bindchange_two: function(e) {
        this.setData({
            index_two: e.detail.value
        })
    },
    bindRegionChange: function(e) {
        this.setData({
            inde: e.detail.value
        })
    },
    choice: function(e) {
        this.setData({
            choice: !0
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
    previewImage: function(e) {
        var t = e.currentTarget.dataset.index,
            a = this.data.lunbo;
        wx.previewImage({
            current: a[t],
            urls: a
        })
    },
    previewImage1: function(e) {
        var t = e.currentTarget.dataset.index,
            a = this.data.lunbo1;
        wx.previewImage({
            current: a[t],
            urls: a
        })
    },
    lunbo1: function(e) {
        var t = this;
        wx.getStorageSync("uniacid");
        console.log(t.data);
        var a = t.data.lunbo;
        a = null == a ? [] : t.data.lunbo;
        t.data.url;
        wx.chooseImage({
            count: 9,
            sizeType: ["original", "compressed"],
            sourceType: ["album", "camera"],
            success: function(e) {
                console.log(e), Array.prototype.push.apply(a, e.tempFilePaths), a.length <= 9 ? t.setData({
                    lunbo1: a,
                    lunbo_len1: a.length,
                    log: !0
                }) : (a = a.slice(0, 9), t.setData({
                    lunbo1: a,
                    lunbo_len1: a.length,
                    log: !0
                }))
            }
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
                        console.log(e), t.setData({
                            hotel_logo: e.data
                        })
                    },
                    fail: function(e) {
                        console.log(e)
                    }
                }), t.setData({
                    hotel_logo1: n
                })
            }
        })
    },
    choose1: function(e) {
        var t = this,
            a = t.data.url,
            o = wx.getStorageSync("uniacid");
        wx.getStorageSync("openid");
        wx.chooseImage({
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
                        console.log(e), t.setData({
                            wechat: e.data
                        })
                    },
                    fail: function(e) {
                        console.log(e)
                    }
                }), t.setData({
                    hotel_logo2: n
                })
            }
        })
    },
    choose2: function(e) {
        var t = this,
            a = t.data.url,
            o = wx.getStorageSync("uniacid");
        wx.getStorageSync("openid");
        wx.chooseImage({
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
                        console.log(e), t.setData({
                            yyzz: e.data
                        })
                    },
                    fail: function(e) {
                        console.log(e)
                    }
                }), t.setData({
                    hotel_logo3: n
                })
            }
        })
    },
    choose3: function(e) {
        var t = this,
            a = t.data.url,
            o = wx.getStorageSync("uniacid");
        wx.getStorageSync("openid");
        wx.chooseImage({
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
                        console.log(e), t.setData({
                            sfzzm: e.data
                        })
                    },
                    fail: function(e) {
                        console.log(e)
                    }
                }), t.setData({
                    hotel_logo4: n
                })
            }
        })
    },
    checkboxChange: function(e) {
        console.log(e);
        var t = e.detail.value;
        this.setData({
            facilities: t
        })
    },
    chooseImage2: function() {
        var e = this,
            t = this.data.images;
        imgArray = [], console.log(e.data);
        var a = wx.getStorageSync("uniacid"),
            o = 9 - t.length;
        o > 0 && o <= 9 ? wx.chooseImage({
            count: o,
            sizeType: ["compressed"],
            sourceType: ["album", "camera"],
            success: function(o) {
                wx.showToast({
                    icon: "loading",
                    title: "正在上传"
                });
                var n = o.tempFilePaths;
                console.log(n);
                var i = o.tempFilePaths;
                t = t.concat(i), console.log(t), e.setData({
                    images: t,
                    lunbo_len: t.length
                }), e.uploadimg({
                    url: e.data.url + "app/index.php?i=" + a + "&c=entry&a=wxapp&do=Upload&m=zh_tcwq",
                    path: t
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
            o = e.success ? e.success : 0,
            n = e.fail ? e.fail : 0;
        wx.uploadFile({
            url: e.url,
            filePath: e.path[a],
            name: "upfile",
            formData: null,
            success: function(e) {
                "" != e.data ? (console.log(e), o++, imgArray.push(e.data), console.log(a), console.log("上传商家轮播图时候提交的图片数组", imgArray)) : wx.showToast({
                    icon: "loading",
                    title: "请重试"
                })
            },
            fail: function(e) {
                n++, console.log("fail:" + a + "fail:" + n)
            },
            complete: function() {
                console.log(a), ++a == e.path.length ? (t.setData({
                    images: e.path
                }), wx.hideToast(), console.log("执行完毕"), console.log("成功：" + o + " 失败：" + n)) : (console.log(a), e.i = a, e.success = o, e.fail = n, t.uploadimg(e))
            }
        })
    },
    delete: function(e) {
        console.log(this.data), console.log(imgArray), Array.prototype.indexOf = function(e) {
            for (var t = 0; t < this.length; t++) if (this[t] == e) return t;
            return -1
        }, Array.prototype.remove = function(e) {
            var t = this.indexOf(e);
            t > -1 && this.splice(t, 1)
        };
        var t = e.currentTarget.dataset.index,
            a = this.data.images;
        imgArray.remove(imgArray[t]), a.remove(a[t]), console.log(a), this.setData({
            images: a,
            lunbo_len: a.length
        })
    },
    upload_image: function() {
        var e = this,
            t = this.data.upload_img;
        uploaded = [], console.log(t);
        var a = wx.getStorageSync("uniacid"),
            o = 9 - t.length;
        o > 0 && o <= 9 ? wx.chooseImage({
            count: o,
            sizeType: ["compressed"],
            sourceType: ["album", "camera"],
            success: function(o) {
                wx.showToast({
                    icon: "loading",
                    title: "正在上传"
                });
                var n = o.tempFilePaths;
                t = t.concat(n), console.log(t), e.setData({
                    upload_img: t,
                    upload_img_length: t.length
                }), e.already({
                    url1: e.data.url + "app/index.php?i=" + a + "&c=entry&a=wxapp&do=Upload&m=zh_tcwq",
                    path1: t
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
    already: function(e) {
        var t = this,
            a = e.j ? e.j : 0,
            o = e.success ? e.success : 0,
            n = e.fail ? e.fail : 0;
        wx.uploadFile({
            url: e.url1,
            filePath: e.path1[a],
            name: "upfile",
            formData: null,
            success: function(e) {
                "" != e.data ? (console.log(e), o++, uploaded.push(e.data), t.setData({
                    uploaded: uploaded
                }), console.log(a), console.log("上传商家介绍时候提交的图片数组", uploaded)) : wx.showToast({
                    icon: "loading",
                    title: "请重试"
                })
            },
            fail: function(e) {
                n++, console.log("fail:" + a + "fail:" + n)
            },
            complete: function() {
                console.log(a), ++a == e.path1.length ? (t.setData({
                    upload_img: e.path1
                }), wx.hideToast(), console.log("执行完毕"), console.log("成功：" + o + " 失败：" + n)) : (console.log(a), e.j = a, e.success = o, e.fail = n, t.already(e))
            }
        })
    },
    delete2: function(e) {
        Array.prototype.indexOf = function(e) {
            for (var t = 0; t < this.length; t++) if (this[t] == e) return t;
            return -1
        }, Array.prototype.remove = function(e) {
            var t = this.indexOf(e);
            t > -1 && this.splice(t, 1)
        };
        var t = e.currentTarget.dataset.index,
            a = this.data.upload_img;
        uploaded.remove(uploaded[t]), a.remove(a[t]), console.log(a), this.setData({
            upload_img: a,
            upload_img_length: a.length
        })
    },
    formSubmit: function(e) {
        var t = this;
        console.log(e), console.log(t.data);
        var a = e.detail.formId,
            o = Number(t.data.inmoney),
            n = t.data.type;
        console.log(o + " " + n);
        wx.getStorageSync("uniacid");
        var i = wx.getStorageSync("openid"),
            s = t.data.facilities,
            l = t.data.hotel_logo,
            c = t.data.wechat,
            u = t.data.yyzz,
            r = t.data.sfzzm,
            d = e.detail.value.business_name,
            p = e.detail.value.business_keyword,
            g = t.data.address,
            m = t.data.time,
            f = t.data.time1,
            h = e.detail.value.business_number,
            y = e.detail.value.business_notice,
            w = e.detail.value.vr_demo,
            x = e.detail.value.textarea,
            v = t.data.coordinates,
            _ = t.data.store,
            T = t.data.store2,
            S = t.data.index,
            D = t.data.index_two,
            b = _[S],
            z = T[D];
        if (T.length > 0) var k = T[D].id;
        else k = "";
        var q = _[S].id,
            P = t.data.tel_code;
        console.log(_, T, b, z, q, k);
        var I = o;
        if (console.log(imgArray), console.log(uploaded), 0 == imgArray.length) var A = "";
        else A = imgArray.join(",");
        if (0 == uploaded.length) var M = "";
        else M = uploaded.join(",");
        var C = "";
        if ("" != x && null != x || (x = ""), 
        "" == d ? C = "请输入商家名称" :
         "" == p ? C = "请输入关键字" :
          "" == g ? C = "请输入详细地址" :
           null == s ? C = "请勾选店内设施" : 
           0 == s.length ? C = "请勾选店内设施" :
            "00:00" == m ? C = "请输入营业开始时间" :
             "00:00" == f ? C = "请输入营业结束时间" :
              "" == h ? C = "请输入联系电话" : 
              "" == y ? C = "请输入公告说明" :
               "1" == t.data.xtxx.is_img && null == u ? C = "请上传营业执照照片" :
                "1" == t.data.xtxx.is_img && null == r ? C = "请上传法人身份证正面照片" : 
                x.length >= 540 ? C = "内容超出": "" != C) {wx.showModal({
            title: "提示",
            content: C,
            showCancel: !0,
            cancelText: "取消",
            confirmText: "确定",
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        });}
        else {
            for (var F = 0, j = 0, U = 0, L = 0, B = 0, N = 0, O = 0; O < s.length; O++) if ("刷卡支付" == s[O]) F = 1;
            else if ("免费wifi" == s[O]) j = 1;
            else if ("免费停车" == s[O]) U = 1;
            else if ("禁止吸烟" == s[O]) L = 1;
            else if ("提供包间" == s[O]) B = 1;
            else if ("沙发休闲" == s[O]) N = 1;
            if (1 == P) {
                var R = wx.getStorageSync("city");
                I <= 0 ? app.util.request({
                    url: "entry/wxapp/store",
                    cachetime: "0",
                    data: {
                        user_id: t.data.user_id,
                        store_name: d,
                        address: g,
                        announcement: y,
                        storetype_id: q,
                        storetype2_id: k,
                        area_id: "",
                        start_time: m,
                        end_time: f,
                        keyword: p,
                        skzf: F,
                        wifi: j,
                        mftc: U,
                        jzxy: L,
                        tgbj: B,
                        sfxx: N,
                        tel: h,
                        logo: l,
                        weixin_logo: c,
                        yyzz_img: u,
                        sfz_img: r,
                        ad: A,
                        img: M,
                        money: I,
                        details: x,
                        coordinates: v,
                        type: n,
                        vr_link: w,
                        cityname: R
                    },
                    success: function(e) {
                        console.log("这里是发布成功"), console.log(e);
                        var t = e.data;
                        console.log(t), app.util.request({
                            url: "entry/wxapp/rzmessage",
                            cachetime: "0",
                            data: {
                                form_id: a,
                                openid: i,
                                store_id: t
                            },
                            success: function(e) {
                                console.log(e)
                            }
                        }), app.util.request({
                            url: "entry/wxapp/SaveStorePayLog",
                            cachetime: "0",
                            data: {
                                store_id: t,
                                money: I
                            },
                            success: function(e) {
                                console.log("这是入驻成功"), console.log(e)
                            }
                        }), wx.showModal({
                            title: "提示",
                            content: "提交成功，等待审核"
                        }), setTimeout(function() {
                            wx.reLaunch({
                                url: "../logs/logs",
                                success: function(e) {},
                                fail: function(e) {},
                                complete: function(e) {}
                            })
                        }, 2e3)
                    }
                }) : app.util.request({
                    url: "entry/wxapp/Pay",
                    cachetime: "0",
                    data: {
                        openid: i,
                        money: I
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
                                    url: "entry/wxapp/store",
                                    cachetime: "0",
                                    data: {
                                        user_id: t.data.user_id,
                                        store_name: d,
                                        address: g,
                                        announcement: y,
                                        storetype_id: q,
                                        storetype2_id: k,
                                        area_id: "",
                                        start_time: m,
                                        end_time: f,
                                        keyword: p,
                                        skzf: F,
                                        wifi: j,
                                        mftc: U,
                                        jzxy: L,
                                        tgbj: B,
                                        sfxx: N,
                                        tel: h,
                                        logo: l,
                                        weixin_logo: c,
                                        yyzz_img: u,
                                        sfz_img: r,
                                        ad: A,
                                        money: I,
                                        img: M,
                                        details: x,
                                        coordinates: v,
                                        type: n,
                                        vr_link: w,
                                        cityname: R
                                    },
                                    success: function(e) {
                                        console.log("这里是发布成功"), console.log(e);
                                        var t = e.data;
                                        app.util.request({
                                            url: "entry/wxapp/rzmessage",
                                            cachetime: "0",
                                            data: {
                                                form_id: a,
                                                openid: i,
                                                store_id: t
                                            },
                                            success: function(e) {
                                                console.log(e)
                                            }
                                        }), app.util.request({
                                            url: "entry/wxapp/SaveStorePayLog",
                                            cachetime: "0",
                                            data: {
                                                store_id: t,
                                                money: I
                                            },
                                            success: function(e) {
                                                console.log("这是入驻成功"), console.log(e), wx.showModal({
                                                    title: "提示",
                                                    content: "提交成功，等待审核"
                                                })
                                            }
                                        }), setTimeout(function() {
                                            wx.reLaunch({
                                                url: "../logs/logs",
                                                success: function(e) {},
                                                fail: function(e) {},
                                                complete: function(e) {}
                                            })
                                        }, 2e3)
                                    }
                                })
                            },
                            fail: function(e) {
                                console.log(e), wx.showToast({
                                    title: "支付失败",
                                    duration: 1e3
                                })
                            }
                        })
                    }
                })
            } else wx.showToast({
                title: "验证码错误",
                icon: "",
                image: "",
                duration: 2e3,
                mask: !0,
                success: function(e) {},
                fail: function(e) {},
                complete: function(e) {}
            })
        }
    },
    reset: function(e) {},
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});