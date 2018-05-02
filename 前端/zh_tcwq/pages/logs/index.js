var app = getApp(),
    imgArray = [],
    uploaded = [];
Page({
    data: {
        hidden1: !1,
        hidden2: !0,
        hidden3: !0,
        index_two: 0,
        prompt: !1,
        choise: !1,
        images: [],
        upload_img: [],
        upload_img_length: 0,
        getmsg: "获取验证码",
        tel_code: !1,
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
    bindMultiPickerChange: function(e) {
        console.log("picker发送选择改变，携带值为", e.detail.value), this.setData({
            multiIndex: e.detail.value
        })
    },
    cost1: function(e) {
        if (console.log(this.data), console.log(e), 2 == this.data.store_info.time_over) wx.showModal({
            title: "提示",
            content: "入驻时间不可以修改喔",
            showCancel: !0,
            cancelText: "取消",
            confirmText: "确定",
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        });
        else {
            var t = this.data.stick,
                a = e.currentTarget.id;
            for (var o in t) t[o].hidden1 = o != a;
            this.setData({
                stick: t,
                type: t[a].type,
                inmoney: t[a].money
            })
        }
    },
    onLoad: function(e) {
        console.log(e);
        var t = this,
            a = getCurrentPages(),
            o = (a[a.length - 1], a[a.length - 2]);
        console.log(o), o.setData({
            Return: !0
        }), wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: wx.getStorageSync("color"),
            animation: {
                duration: 0,
                timingFunc: "easeIn"
            }
        }), console.log(t.data);
        var n = wx.getStorageSync("url2"),
            i = wx.getStorageSync("url"),
            s = wx.getStorageSync("openid"),
            l = e.user_id;
        console.log("用户的openid为 " + s + " 用户的user_id为 " + l), t.setData({
            user_id: l,
            openid: s,
            url: n,
            url1: i
        }), app.util.request({
            url: "entry/wxapp/MyStore",
            cachetime: "0",
            data: {
                user_id: l
            },
            success: function(e) {
                if (console.log(e), 0 == e.data) t.setData({
                    mystore: !0
                });
                else {
                    for (var a in e.data.img = e.data.img.split(","), e.data.ad = e.data.ad.split(","), e.data.ad) imgArray.push(e.data.ad[a]);
                    for (var o in e.data.img) uploaded.push(e.data.img[o]);
                    console.log(imgArray), console.log(uploaded);
                    var n = t.data.items,
                        i = e.data;
                    1 == i.time_over && wx.showModal({
                        title: "提示",
                        content: "您的入驻已经到期了喔,赶紧去续费吧",
                        showCancel: !0,
                        cancelText: "取消",
                        confirmText: "确定",
                        success: function(e) {},
                        fail: function(e) {},
                        complete: function(e) {}
                    }), i.yy_time = i.yy_time.split("-"), console.log(i.yy_time);
                    for (var s = 0; s < n.length; s++) "刷卡支付" == n[s].value ? 1 == i.skzf ? n[s].checked = !0 : n[s].checked = !1 : "免费wifi" == n[s].value ? 1 == i.wifi ? n[s].checked = !0 : n[s].checked = !1 : "免费停车" == n[s].value ? 1 == i.mftc ? n[s].checked = !0 : n[s].checked = !1 : "禁止吸烟" == n[s].value ? 1 == i.jzxy ? n[s].checked = !0 : n[s].checked = !1 : "提供包间" == n[s].value ? 1 == i.tgbj ? n[s].checked = !0 : n[s].checked = !1 : "沙发休闲" == n[s].value && (1 == i.sfxx ? n[s].checked = !0 : n[s].checked = !1);
                    console.log(n);
                    var l = i.coordinates,
                        c = i.address;
                    t.setData({
                        time: i.start_time,
                        time1: i.end_time,
                        store_info: i,
                        address: c,
                        coordinates: l,
                        lunbo_len: imgArray.length,
                        imgArray: imgArray,
                        items: n,
                        type: i.type,
                        uploaded: uploaded,
                        upload_img_length: uploaded.length,
                        upload_img: e.data.img,
                        hotel_logo: i.logo,
                        wechat: i.weixin_logo
                    }), app.util.request({
                        url: "entry/wxapp/Area",
                        cachetime: "0",
                        success: function(e) {
                            for (var a in console.log(e), e.data) e.data[a].id == i.area_id && t.setData({
                                inde: a
                            });
                            var o = [];
                            e.data.map(function(e) {
                                var t;
                                t = e.area_name, o.push(t)
                            }), console.log(o), t.setData({
                                area: e.data,
                                city: o
                            })
                        }
                    }), app.util.request({
                        url: "entry/wxapp/StoreType",
                        cachetime: "0",
                        success: function(e) {
                            console.log(e);
                            var a = e.data,
                                o = [];
                            a.map(function(e) {
                                var t;
                                t = e.type_name, o.push(t)
                            }), console.log(o), console.log(t.data);
                            var n = i.type_name;
                            for (var s in o) o[s] == n && (console.log(o[s]), t.setData({
                                index: s
                            }));
                            t.setData({
                                store: a,
                                store_type: o
                            })
                        }
                    }), app.util.request({
                        url: "entry/wxapp/InMoney",
                        cachetime: "0",
                        success: function(e) {
                            console.log(e);
                            var a = e.data;
                            for (var o in a) if (a[o].hidden1 = !0, 0 != a[o].money ? a[o].money1 = "（收费" + a[o].money + "元）" : a[o].money1 = "  免费", 1 == a[o].type ? a[o].array = "一周" + a[o].money1 : 2 == a[o].type ? a[o].array = "半年" + a[o].money1 : 3 == a[o].type && (a[o].array = "一年" + a[o].money1), a[o].type == i.type) {
                                var n = a[o].type,
                                    s = a[o].money;
                                a[o].hidden1 = !1
                            }
                            t.setData({
                                stick: a,
                                type: n,
                                inmoney: s
                            })
                        }
                    })
                }
            }
        }), app.util.request({
            url: "entry/wxapp/IsSms",
            cachetime: "0",
            success: function(e) {
                console.log(e), 1 == e.data ? t.setData({
                    send: !1,
                    sms: !0,
                    tel_code: !1
                }) : t.setData({
                    send: !0,
                    sms: !1,
                    tel_code: !1
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
        else if ("获取验证码" == t.data.getmsg) {
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
                    num: e.data.phoneNumber,
                    tel_code: !0
                })
            }
        })
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
                var a = e.latitude + "," + e.longitude,
                    o = t.data.store_info;
                o.address = e.address, o.coordinates = a, t.setData({
                    store_info: o
                })
            }
        })
    },
    bindPickerChanges: function(e) {
        this.data.store;
        var t = e.detail.value;
        this.setData({
            index: t,
            index_two: 0
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
        console.log(t);
        var e = this,
            t = e.data.imgArray;
        console.log(e.data);
        var a = wx.getStorageSync("uniacid"),
            o = 9 - t.length;
        o > 0 && o <= 9 ? wx.chooseImage({
            count: o,
            sizeType: ["compressed"],
            sourceType: ["album", "camera"],
            success: function(t) {
                wx.showToast({
                    icon: "loading",
                    title: "正在上传"
                });
                var o = t.tempFilePaths;
                e.uploadimg({
                    url: e.data.url + "app/index.php?i=" + a + "&c=entry&a=wxapp&do=Upload&m=zh_tcwq",
                    path: o
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
                "" != e.data ? (console.log(e), o++, imgArray.push(e.data), t.setData({
                    imgArray: imgArray,
                    lunbo_len: imgArray.length
                }), console.log(a), console.log("上传商家轮播图时候提交的图片数组", imgArray)) : wx.showToast({
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
            imgArray: imgArray,
            lunbo_len: imgArray.length
        })
    },
    upload_image: function() {
        var e = this;
        uploaded = e.data.uploaded;
        var t = wx.getStorageSync("uniacid"),
            a = 9 - uploaded.length;
        a > 0 && a <= 9 ? wx.chooseImage({
            count: a,
            sizeType: ["compressed"],
            sourceType: ["album", "camera"],
            success: function(a) {
                wx.showToast({
                    icon: "loading",
                    title: "正在上传"
                });
                var o = a.tempFilePaths;
                e.already({
                    url1: e.data.url + "app/index.php?i=" + t + "&c=entry&a=wxapp&do=Upload&m=zh_tcwq",
                    path1: o
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
                    uploaded: uploaded,
                    upload_img_length: uploaded.length
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
            uploaded: uploaded,
            upload_img_length: uploaded.length
        })
    },
    formSubmit: function(e) {
        var t = this;
        if (console.log(e), console.log(t.data), null == t.data.inmoney) var a = 0;
        else a = Number(t.data.inmoney);
        var o = t.data.type;
        console.log(a + " " + o);
        var n = t.data.store_info.id;
        console.log(n);
        var i = wx.getStorageSync("openid"),
            s = t.data.facilities,
            l = t.data.hotel_logo,
            c = t.data.wechat,
            u = e.detail.value.business_name,
            r = e.detail.value.business_keyword,
            d = t.data.store_info.address,
            g = (t.data.time, t.data.time1, t.data.time1),
            f = t.data.time,
            m = e.detail.value.vr_demo,
            p = e.detail.value.business_number,
            h = e.detail.value.business_notice,
            y = e.detail.value.textarea,
            w = t.data.store_info.coordinates,
            v = t.data.store,
            x = t.data.index,
            _ = (v[x], v[x].id),
            T = t.data.tel_code,
            D = t.data.num,
            k = (t.data.index_two, imgArray.join(",")),
            S = uploaded.join(",");
        t.data.city;
        "" != y && null != y || (y = ""), t.data.sms;
        var b = "";
        if ("" == u ? b = "请输入商家名称" : "" == r ? b = "请输入关键字" : "" == d ? b = "请输入详细地址" : "" == p ? b = "请输入联系电话" : "00:00" == f ? b = "请输入营业开始时间" : "00:00" == g ? b = "请输入营业结束时间" : "" == h ? b = "请输入公告说明" : 0 == t.data.sms ? "" == D && (b = "请进行手机号验证") : 1 == t.data.sms && null == t.data.yz_code && (b = "请进行手机号验证"), "" != b) wx.showModal({
            title: "提示",
            content: b,
            showCancel: !0,
            cancelText: "取消",
            confirmText: "确定",
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        });
        else {
            var A = 0,
                z = 0,
                C = 0,
                P = 0,
                q = 0,
                I = 0;
            console.log(t.data.items);
            var j = t.data.items;
            if (null == s) {
                for (var M in j) if (1 == j[M].checked) if ("刷卡支付" == j[M].value) A = 1;
                else if ("免费wifi" == j[M].value) z = 1;
                else if ("免费停车" == j[M].value) C = 1;
                else if ("禁止吸烟" == j[M].value) P = 1;
                else if ("提供包间" == j[M].value) q = 1;
                else if ("沙发休闲" == j[M].value) I = 1
            } else for (var F = 0; F < s.length; F++) if ("刷卡支付" == s[F]) A = 1;
            else if ("免费wifi" == s[F]) z = 1;
            else if ("免费停车" == s[F]) C = 1;
            else if ("禁止吸烟" == s[F]) P = 1;
            else if ("提供包间" == s[F]) q = 1;
            else if ("沙发休闲" == s[F]) I = 1;
            if (1 == T) if (2 == t.data.store_info.time_over) app.util.request({
                url: "entry/wxapp/UpdStore",
                cachetime: "0",
                data: {
                    id: n,
                    user_id: t.data.user_id,
                    store_name: u,
                    address: d,
                    announcement: h,
                    storetype_id: _,
                    start_time: f,
                    end_time: g,
                    keyword: r,
                    skzf: A,
                    wifi: z,
                    mftc: C,
                    jzxy: P,
                    tgbj: q,
                    sfxx: I,
                    tel: p,
                    logo: l,
                    weixin_logo: c,
                    ad: k,
                    img: S,
                    money: U,
                    details: y,
                    coordinates: w,
                    vr_link: m
                },
                success: function(e) {
                    console.log("这里是发布成功"), console.log(e), 1 == e.data && (wx.showToast({
                        title: "修改成功",
                        icon: "",
                        image: "",
                        duration: 2e3,
                        mask: !0,
                        success: function(e) {},
                        fail: function(e) {},
                        complete: function(e) {}
                    }), setTimeout(function() {
                        wx.reLaunch({
                            url: "../logs/logs",
                            success: function(e) {},
                            fail: function(e) {},
                            complete: function(e) {}
                        })
                    }, 2e3))
                }
            });
            else {
                var U = a;
                U <= 0 ? app.util.request({
                    url: "entry/wxapp/UpdStore",
                    cachetime: "0",
                    data: {
                        id: n,
                        user_id: t.data.user_id,
                        store_name: u,
                        address: d,
                        announcement: h,
                        storetype_id: _,
                        start_time: f,
                        end_time: g,
                        keyword: r,
                        skzf: A,
                        wifi: z,
                        mftc: C,
                        jzxy: P,
                        tgbj: q,
                        sfxx: I,
                        tel: p,
                        logo: l,
                        weixin_logo: c,
                        ad: k,
                        img: S,
                        money: U,
                        details: y,
                        coordinates: w,
                        type: o,
                        vr_link: m
                    },
                    success: function(e) {
                        console.log("这里是发布成功"), console.log(e), 1 == e.data && (wx.showToast({
                            title: "入驻成功",
                            icon: "",
                            image: "",
                            duration: 2e3,
                            mask: !0,
                            success: function(e) {},
                            fail: function(e) {},
                            complete: function(e) {}
                        }), setTimeout(function() {
                            wx.reLaunch({
                                url: "../logs/logs",
                                success: function(e) {},
                                fail: function(e) {},
                                complete: function(e) {}
                            })
                        }, 2e3))
                    }
                }) : app.util.request({
                    url: "entry/wxapp/Pay",
                    cachetime: "0",
                    data: {
                        openid: i,
                        money: U
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
                                    url: "entry/wxapp/UpdStore",
                                    cachetime: "0",
                                    data: {
                                        id: n,
                                        user_id: t.data.user_id,
                                        store_name: u,
                                        address: d,
                                        announcement: h,
                                        storetype_id: _,
                                        start_time: f,
                                        end_time: g,
                                        keyword: r,
                                        skzf: A,
                                        wifi: z,
                                        mftc: C,
                                        jzxy: P,
                                        tgbj: q,
                                        sfxx: I,
                                        tel: p,
                                        logo: l,
                                        weixin_logo: c,
                                        ad: k,
                                        img: S,
                                        money: U,
                                        details: y,
                                        coordinates: w,
                                        type: o,
                                        vr_link: m
                                    },
                                    success: function(e) {
                                        console.log("这里是发布成功"), console.log(e), 1 == e.data && (wx.showToast({
                                            title: "入驻成功",
                                            icon: "",
                                            image: "",
                                            duration: 2e3,
                                            mask: !0,
                                            success: function(e) {},
                                            fail: function(e) {},
                                            complete: function(e) {}
                                        }), setTimeout(function() {
                                            wx.reLaunch({
                                                url: "../logs/logs",
                                                success: function(e) {},
                                                fail: function(e) {},
                                                complete: function(e) {}
                                            })
                                        }, 2e3))
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
                title: "手机验证错误",
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
    onUnload: function() {
        console.log(this.data), imgArray.splice(0, imgArray.length), uploaded.splice(0, uploaded.length)
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});