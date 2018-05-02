var app = getApp(),
    _imgArray = [],
    _imgArray2 = [];
Page({
    data: {
        items: [{
            name: "正品保证",
            value: "正品保证"
        }, {
            name: "全程包邮",
            value: "全程包邮"
        }, {
            name: "24h发货",
            value: "24h发货"
        }, {
            name: "售后保障",
            value: "售后保障"
        }, {
            name: "极速退款",
            value: "极速退款"
        }, {
            name: "七天包退",
            value: "七天包退"
        }],
        classification: !1
    },
    onLoad: function(a) {
        var e = this,
            t = a.id,
            o = a.store_id;
        wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: wx.getStorageSync("color"),
            animation: {
                duration: 0,
                timingFunc: "easeIn"
            }
        });
        var i = wx.getStorageSync("url2"),
            n = wx.getStorageSync("url");
        e.setData({
            url: i,
            url1: n,
            store_id: o,
            id: t
        });
        e.data.add;
        app.util.request({
            url: "entry/wxapp/Spec",
            cachetime: "0",
            success: function(a) {
                console.log(a), e.setData({
                    label: a.data
                })
            }
        }), app.util.request({
            url: "entry/wxapp/GoodInfo",
            cachetime: "0",
            data: {
                id: t
            },
            success: function(a) {
                console.log(a), "" == a.data.good.imgs ? a.data.good.imgs = [] : a.data.good.imgs = a.data.good.imgs.split(",");
                var t = a.data.good;
                a.data.good.lb_imgs = a.data.good.lb_imgs.split(","), _imgArray = a.data.good.lb_imgs, _imgArray2 = a.data.good.imgs;
                for (var o = e.data.items, i = 0; i < o.length; i++) "正品保证" == o[i].value ? 1 == t.quality ? o[i].checked = !0 : o[i].checked = !1 : "全程包邮" == o[i].value ? 1 == t.free ? o[i].checked = !0 : o[i].checked = !1 : "24h发货" == o[i].value ? 1 == t.all_day ? o[i].checked = !0 : o[i].checked = !1 : "售后保障" == o[i].value ? 1 == t.service ? o[i].checked = !0 : o[i].checked = !1 : "极速退款" == o[i].value ? 1 == t.refund ? o[i].checked = !0 : o[i].checked = !1 : "七天包退" == o[i].value && (1 == t.weeks ? o[i].checked = !0 : o[i].checked = !1);
                console.log(o);
                var n = a.data.spec,
                    s = {}, l = [];
                n.forEach(function(a) {
                    var e = a.spec_id + "_" + a.spec_name;
                    void 0 === s[e] && (s[e] = []), s[e].push(a)
                });
                var c = Object.keys(s);
                for (i = 0; i < c.length; i++) {
                    var r = c[i].split("_");
                    l.push({
                        spec_id: r[0],
                        spec_name: r[1],
                        value: s[c[i]]
                    })
                }
                e.data.add;
                if (1 == l.length) l[0].spec_name;
                if (2 == l.length) l[0].spec_name, l[1].spec_name;
                if (3 == l.length) l[0].spec_name, l[1].spec_name, l[2].spec_name;
                e.setData({
                    add: l,
                    spec: n,
                    store_good: a.data.good,
                    items: o,
                    imgArray1: _imgArray,
                    imgArray2: _imgArray2
                })
            }
        })
    },
    getIdDataSet: function(a) {
        for (var e = new Array, t = a.length, o = 0; o < t; o++) e.push(a[o].coupons_id);
        return e
    },
    classify: function(a, e) {
        for (var t = new Array, o = new Array, i = a.length, n = 0; n < i; n++) - 1 === e.indexOf(a[n].id) ? o.push(a[n]) : t.push(a[n]);
        console.log(t), console.log(o), this.setData({
            received: t,
            unreceive: o
        })
    },
    classification: function(a) {
        console.log(a);
        var e = a.currentTarget.dataset.index,
            t = this.data.classification;
        0 == t ? this.setData({
            classification: !0,
            index: e
        }) : this.setData({
            classification: !1,
            index: e
        })
    },
    select: function(a) {
        console.log(a), console.log(this.data);
        this.data.label;
        var e = this.data.index,
            t = a.currentTarget.dataset.name,
            o = a.currentTarget.dataset.id,
            i = (this.data.add, this.data.text1),
            n = this.data.text2,
            s = this.data.text3,
            l = this.data.id1,
            c = this.data.id2,
            r = this.data.id3;
        if (0 == e) if (null == i) i = t, l = o;
        else i = i, l = l;
        if (1 == e) if (null == n) n = t, c = o;
        else n = n, c = c;
        if (2 == e) if (null == s) s = t, r = o;
        else s = s, r = r;
        this.setData({
            id1: l,
            id2: c,
            id3: r,
            text1: i,
            text2: n,
            text3: s,
            classification: !1
        })
    },
    imgArray1: function(a) {
        var e = this,
            t = wx.getStorageSync("uniacid"),
            o = 4 - _imgArray.length;
        console.log(o), o > 0 && o <= 9 ? wx.chooseImage({
            count: o,
            sizeType: ["compressed"],
            sourceType: ["album", "camera"],
            success: function(a) {
                wx.showToast({
                    icon: "loading",
                    title: "正在上传"
                });
                var o = a.tempFilePaths;
                e.uploadimg({
                    url: e.data.url + "app/index.php?i=" + t + "&c=entry&a=wxapp&do=Upload&m=zh_tcwq",
                    path: o
                })
            }
        }) : wx.showModal({
            title: "上传提示",
            content: "最多上传4张图片",
            showCancel: !0,
            cancelText: "取消",
            confirmText: "确定",
            success: function(a) {},
            fail: function(a) {},
            complete: function(a) {}
        })
    },
    uploadimg: function(a) {
        var e = this,
            t = a.i ? a.i : 0,
            o = a.success ? a.success : 0,
            i = a.fail ? a.fail : 0;
        wx.uploadFile({
            url: a.url,
            filePath: a.path[t],
            name: "upfile",
            formData: null,
            success: function(a) {
                "" != a.data ? (console.log(a), o++, _imgArray.push(a.data), e.setData({
                    imgArray1: _imgArray
                }), console.log("上传商家轮播图时候提交的图片数组", _imgArray)) : wx.showToast({
                    icon: "loading",
                    title: "请重试"
                })
            },
            fail: function(a) {
                i++, console.log("fail:" + t + "fail:" + i)
            },
            complete: function() {
                console.log(t), ++t == a.path.length ? (e.setData({
                    images: a.path
                }), wx.hideToast(), console.log("执行完毕"), console.log("成功：" + o + " 失败：" + i)) : (console.log(t), a.i = t, a.success = o, a.fail = i, e.uploadimg(a))
            }
        })
    },
    delete: function(a) {
        console.log(this.data), console.log(imgArray), Array.prototype.indexOf = function(a) {
            for (var e = 0; e < this.length; e++) if (this[e] == a) return e;
            return -1
        }, Array.prototype.remove = function(a) {
            var e = this.indexOf(a);
            e > -1 && this.splice(e, 1)
        };
        var e = a.currentTarget.dataset.index;
        this.data.images;
        _imgArray.remove(imgArray[e]), this.setData({
            imgArray1: _imgArray
        })
    },
    imgArray2: function(a) {
        var e = this,
            t = wx.getStorageSync("uniacid"),
            o = 9 - _imgArray2.length;
        console.log(o), o > 0 && o <= 9 ? wx.chooseImage({
            count: o,
            sizeType: ["compressed"],
            sourceType: ["album", "camera"],
            success: function(a) {
                wx.showToast({
                    icon: "loading",
                    title: "正在上传"
                });
                var o = a.tempFilePaths;
                e.uploadimg1({
                    url: e.data.url + "app/index.php?i=" + t + "&c=entry&a=wxapp&do=Upload&m=zh_tcwq",
                    path: o
                })
            }
        }) : wx.showModal({
            title: "上传提示",
            content: "最多上传9张图片",
            showCancel: !0,
            cancelText: "取消",
            confirmText: "确定",
            success: function(a) {},
            fail: function(a) {},
            complete: function(a) {}
        })
    },
    uploadimg1: function(a) {
        var e = this,
            t = a.i ? a.i : 0,
            o = a.success ? a.success : 0,
            i = a.fail ? a.fail : 0;
        wx.uploadFile({
            url: a.url,
            filePath: a.path[t],
            name: "upfile",
            formData: null,
            success: function(a) {
                "" != a.data ? (console.log(a), o++, _imgArray2.push(a.data), e.setData({
                    imgArray2: _imgArray2
                }), console.log("上传商家轮播图时候提交的图片数组", _imgArray)) : wx.showToast({
                    icon: "loading",
                    title: "请重试"
                })
            },
            fail: function(a) {
                i++, console.log("fail:" + t + "fail:" + i)
            },
            complete: function() {
                console.log(t), ++t == a.path.length ? (e.setData({
                    images: a.path
                }), wx.hideToast(), console.log("执行完毕"), console.log("成功：" + o + " 失败：" + i)) : (console.log(t), a.i = t, a.success = o, a.fail = i, e.uploadimg1(a))
            }
        })
    },
    delete1: function(a) {
        Array.prototype.indexOf = function(a) {
            for (var e = 0; e < this.length; e++) if (this[e] == a) return e;
            return -1
        }, Array.prototype.remove = function(a) {
            var e = this.indexOf(a);
            e > -1 && this.splice(e, 1)
        };
        var e = a.currentTarget.dataset.index;
        this.data.images;
        _imgArray2.remove(imgArray[e]), this.setData({
            imgArray2: _imgArray2
        })
    },
    add: function(a) {
        console.log(this.data), console.log(a);
        var e = a.currentTarget.dataset.index,
            t = a.currentTarget.dataset.id,
            o = this.data.add,
            i = (this.data.add2, this.data.add[t][e]);
        for (var n in o) for (var s in o[n]) o[n][s].id = n;
        for (var l in o[t].push(i), o) for (var c in o[l]) o[l][c].id = l;
        console.log(o), this.setData({
            add: o,
            len: o.length
        })
    },
    add1: function(a) {
        console.log(this.data);
        var e = this.data.add,
            t = (this.data.add2, this.data.add2[0]);
        if (console.log(t), e.length < 3) {
            for (var o in e.push(t), e) for (var i in e[o]) e[o][i].id = o;
            this.setData({
                add: e,
                len: e.length
            })
        } else wx.showModal({
            title: "提示",
            content: "只能添加三条",
            showCancel: !0,
            cancelText: "取消",
            confirmText: "确定",
            success: function(a) {},
            fail: function(a) {},
            complete: function(a) {}
        })
    },
    add2: function(a) {
        console.log(a);
        var e = this.data.add,
            t = a.currentTarget.dataset.index;
        console.log(t), this.data.add.splice(t, 1), this.setData({
            add: this.data.add,
            len: e.length
        })
    },
    checkboxChange: function(a) {
        console.log(a);
        var e = a.detail.value;
        this.setData({
            check_box: e
        })
    },
    formSubmit: function(a) {
        console.log(a);
        var e = this.data.spec,
            t = a.detail.value.spec_name,
            o = a.detail.value.spec_num,
            i = a.detail.value.spec_price,
            n = a.detail.value.spec_freight,
            s = a.detail.value.spec_delivery,
            l = a.detail.value.goods_details,
            c = this.data.check_box;
        console.log(c);
        var r = 2,
            d = 2,
            g = 2,
            u = 2,
            h = 2,
            f = 2;
        for (var m in c) "正品保证" == c[m] && (r = 1), "全程包邮" == c[m] && (d = 1), "24h发货" == c[m] && (g = 1), "售后保障" == c[m] && (u = 1), "极速退款" == c[m] && (h = 1), "七天包退" == c[m] && (f = 1);
        var p = "";
        if ("" == t ? p = "商品名称不能为空" : "" == i ? p = "商品价格不能为空" : "" == o ? p = "商品数量不能为空" : "" == n ? p = "商品运费不能为空" : "" == s && (p = "发货说明不能为空"), "" != p) wx.showModal({
            title: "提示",
            content: p,
            showCancel: !0,
            cancelText: "取消",
            confirmText: "确定",
            success: function(a) {},
            fail: function(a) {},
            complete: function(a) {}
        });
        else {
            var v = [];
            if (e.map(function(a) {
                var e = {};
                e.name = a.name, e.money = a.money, e.num = a.num, e.spec_id = a.spec_id, v.push(e)
            }), console.log(v), _imgArray.length > 0) var y = _imgArray.join(",");
            else y = "";
            if (_imgArray2.length > 0) var _ = _imgArray2.join(",");
            else _ = "";
            console.log(this.data.id), console.log(this.data.store_id), console.log(_), console.log(y), console.log(t), console.log(o), console.log(i), console.log(n), console.log(s), console.log(l), console.log(v), console.log(r), console.log(d), console.log(g), console.log(u), console.log(h), console.log(f), app.util.request({
                url: "entry/wxapp/UpdGoods",
                cachetime: "0",
                data: {
                    good_id: this.data.id,
                    store_id: this.data.store_id,
                    imgs: _,
                    lb_imgs: y,
                    goods_name: t,
                    goods_num: o,
                    goods_cost: i,
                    freight: n,
                    delivery: s,
                    goods_details: l,
                    sz: v,
                    quality: r,
                    free: d,
                    all_day: g,
                    service: u,
                    refund: h,
                    weeks: f
                },
                success: function(a) {
                    console.log(a), 1 == a.data && (wx.showToast({
                        title: "修改成功",
                        icon: "",
                        image: "",
                        duration: 2e3,
                        mask: !0,
                        success: function(a) {},
                        fail: function(a) {},
                        complete: function(a) {}
                    }), setTimeout(function() {
                        wx.navigateBack({
                            delta: 1
                        })
                    }, 2e3))
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