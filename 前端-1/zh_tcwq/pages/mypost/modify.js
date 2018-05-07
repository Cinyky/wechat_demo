var app = getApp(),
    imgArray = [];
Page({
    data: {},
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
        var a = wx.getStorageSync("url"),
            i = wx.getStorageSync("url2"),
            n = e.id;
        t.setData({
            url: a,
            url1: i,
            id: n
        });
        var o, s, r, c = (o = new Date, s = o.getMonth() + 1, r = o.getDate(), s >= 1 && s <= 9 && (s = "0" + s), r >= 0 && r <= 9 && (r = "0" + r), o.getFullYear() + "-" + s + "-" + r + " " + o.getHours() + ":" + o.getMinutes() + ":" + o.getSeconds());
        app.util.request({
            url: "entry/wxapp/PostInfo",
            cachetime: "0",
            data: {
                id: n
            },
            success: function(e) {
                console.log(e);
                var a = e.data.tz;
                if (a.dq_time = app.ormatDate(a.dq_time), a.dq_time >= c ? a.dq = !0 : a.dq_ = !1, a.img = a.img.split(","), "" != a.img) for (var i in a.img) imgArray.push(a.img[i]);
                app.util.request({
                    url: "entry/wxapp/Label",
                    cachetime: "0",
                    data: {
                        type2_id: a.type2_id
                    },
                    success: function(e) {
                        for (var a in e.data) e.data[a].click_class = "selected1";
                        t.setData({
                            label: e.data
                        })
                    }
                }), t.setData({
                    post: a,
                    imgArray: imgArray
                })
            }
        }), app.util.request({
            url: "entry/wxapp/Top",
            cachetime: "0",
            success: function(e) {
                var a = e.data;
                for (var i in a) 1 == a[i].type ? a[i].array = "置顶一天（收费" + a[i].money + "元）" : 2 == a[i].type ? a[i].array = "置顶一周（收费" + a[i].money + "元）" : 3 == a[i].type && (a[i].array = "置顶一月（收费" + a[i].money + "元）");
                var n = [];
                a.map(function(e) {
                    var t;
                    t = e.array, n.push(t)
                }), n.push("取消置顶"), t.setData({
                    stock: n,
                    stick: a
                })
            }
        })
    },
    radioChange: function(e) {
        this.setData({
            value: e.detail.value
        })
    },
    chooseImage2: function() {
        var e = this,
            t = wx.getStorageSync("uniacid"),
            a = 9 - [].length;
        a > 0 && a <= 9 ? wx.chooseImage({
            count: a,
            sizeType: ["compressed"],
            sourceType: ["album", "camera"],
            success: function(a) {
                wx.showToast({
                    icon: "loading",
                    title: "正在上传"
                });
                var i = a.tempFilePaths;
                e.uploadimg({
                    url: e.data.url1 + "app/index.php?i=" + t + "&c=entry&a=wxapp&do=Upload&m=zh_tcwq",
                    path: i
                })
            }
        }) : wx.showModal({
            title: "上传提示",
            content: "最多上传9张图片",
            showCancel: !0,
            cancelText: "取消",
            cancelColor: "",
            confirmText: "确定",
            confirmColor: "",
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        })
    },
    uploadimg: function(e) {
        var t = this,
            a = e.i ? e.i : 0,
            i = e.success ? e.success : 0,
            n = e.fail ? e.fail : 0;
        wx.uploadFile({
            url: e.url,
            filePath: e.path[a],
            name: "upfile",
            formData: null,
            success: function(e) {
                "" != e.data ? (i++, imgArray.push(e.data), t.setData({
                    imgArray: imgArray
                })) : wx.showToast({
                    icon: "loading",
                    title: "请重试"
                })
            },
            fail: function(e) {
                n++
            },
            complete: function() {
                ++a == e.path.length ? (t.setData({
                    imgArray: imgArray
                }), wx.hideToast()) : (e.i = a, e.success = i, e.fail = n, t.uploadimg(e))
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
        var t = e.currentTarget.dataset.index;
        imgArray.remove(imgArray[t]), this.setData({
            imgArray: imgArray
        })
    },
    label: function(e) {
        var t = this.data.label,
            a = e.currentTarget.dataset.inde;
        "selected1" == t[a].click_class ? t[a].click_class = "selected2" : "selected2" == t[a].click_class && (t[a].click_class = "selected1"), this.setData({
            label: t
        })
    },
    add: function(e) {
        var t = this;
        wx.chooseLocation({
            type: "wgs84",
            success: function(e) {
                e.latitude, e.longitude, e.speed, e.accuracy;
                var a = e.latitude + "," + e.longitude,
                    i = t.data.post;
                i.address = e.address, i.coordinates = a, t.setData({
                    post: i
                })
            }
        })
    },
    formSubmit: function(e) {
        var t = this.data.post;
        if (null == t.type_name) var a = e.detail.value.content,
            i = t.user_name,
            n = t.user_tel;
        else a = e.detail.value.content, i = e.detail.value.name, n = e.detail.value.tel;
        var o = this.data.value,
            s = this.data.stick;
        if ("取消置顶" == o || null == o) var r = 0,
            c = 0;
        else for (var l in s) if (s[l].array == o) r = s[l].type, c = s[l].money;
        console.log(r), console.log(c);
        var u = this.data.label,
            d = [];
        for (var p in u) "selected2" == u[p].click_class && d.push(u[p]);
        var m = [];
        d.map(function(e) {
            var t = {};
            t.label_id = e.id, m.push(t)
        });
        var y, g = this.data.id;
        if (y = imgArray.join(","), c > 0) {
            var f = wx.getStorageSync("openid");
            app.util.request({
                url: "entry/wxapp/Pay",
                cachetime: "0",
                data: {
                    openid: f,
                    money: c
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
                                url: "entry/wxapp/UpdPost",
                                cachetime: "0",
                                data: {
                                    id: g,
                                    details: a,
                                    img: y,
                                    user_id: t.user_id,
                                    user_name: i,
                                    user_tel: n,
                                    type2_id: t.type2_id,
                                    type_id: t.type_id,
                                    money: t.money,
                                    top_type: r,
                                    sz: m,
                                    address: t.address,
                                    hb_money: t.hb_money,
                                    hb_keyword: t.hb_keyword,
                                    hb_num: t.hb_num,
                                    hb_type: t.hb_type,
                                    hb_random: t.hb_random,
                                    cityname: t.cityname
                                },
                                success: function(e) {
                                    console.log(e), wx.showToast({
                                        title: "修改成功",
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
                        },
                        fail: function(e) {
                            console.log("这里是支付失败"), console.log(e), wx.showToast({
                                title: "支付失败",
                                duration: 1e3
                            })
                        }
                    })
                }
            })
        } else app.util.request({
            url: "entry/wxapp/UpdPost",
            cachetime: "0",
            data: {
                id: g,
                details: a,
                img: y,
                user_id: t.user_id,
                user_name: i,
                user_tel: n,
                type2_id: t.type2_id,
                type_id: t.type_id,
                money: t.money,
                top_type: r,
                sz: m,
                address: t.address,
                hb_money: t.hb_money,
                hb_keyword: t.hb_keyword,
                hb_num: t.hb_num,
                hb_type: t.hb_type,
                hb_random: t.hb_random,
                cityname: t.cityname
            },
            success: function(e) {
                console.log(e), wx.showToast({
                    title: "修改成功",
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