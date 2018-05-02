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
        spec: [{
            text: "",
            id: 0,
            spec: [{
                id: "0",
                name: "",
                price: "",
                spec_id: ""
            }]
        }],
        add_spec: !1,
        spec1: [{
            text: "",
            id: 0,
            spec: [{
                id: "0",
                name: "",
                price: "",
                spec_id: ""
            }]
        }],
        classification: !1,
        imgarr1: [],
        imgarr2: []
    },
    onLoad: function(e) {
        _imgArray = [], _imgArray2 = [], console.log("onLoad");
        var a = this,
            t = e.store_id,
            s = wx.getStorageSync("url2"),
            o = wx.getStorageSync("url");
        a.setData({
            url: s,
            url1: o,
            store_id: t
        });
        a.data.add;
        console.log(a.data.spec), app.util.request({
            url: "entry/wxapp/Spec",
            cachetime: "0",
            success: function(e) {
                console.log(e), a.setData({
                    label: e.data
                })
            }
        })
    },
    classification: function(e) {
        console.log(e);
        var a = e.currentTarget.dataset.index,
            t = this.data.classification;
        0 == t ? this.setData({
            classification: !0,
            index: a
        }) : this.setData({
            classification: !1,
            index: a
        })
    },
    select: function(e) {
        console.log(e), console.log(this.data);
        this.data.label;
        var a = this.data.index,
            t = e.currentTarget.dataset.name,
            s = e.currentTarget.dataset.id,
            o = (this.data.add, this.data.text1, this.data.text2, this.data.text3, this.data.id1, this.data.id2, this.data.id3, this.data.spec);
        o[a].text = t, o[a].spec_id = s, console.log(o), this.setData({
            spec: o,
            classification: !1
        })
    },
    imgArray1: function(e) {
        var a = this,
            t = wx.getStorageSync("uniacid"),
            s = this.data.imgarr1;
        _imgArray = [], console.log(s), wx.chooseImage({
            count: 4 - s.length,
            sizeType: ["compressed"],
            sourceType: ["album", "camera"],
            success: function(e) {
                wx.showToast({
                    icon: "loading",
                    title: "正在上传"
                });
                var o = e.tempFilePaths;
                s = s.concat(o), a.uploadimg({
                    url: a.data.url + "app/index.php?i=" + t + "&c=entry&a=wxapp&do=Upload&m=zh_tcwq",
                    path: s
                })
            }
        })
    },
    uploadimg: function(e) {
        var a = this,
            t = e.i ? e.i : 0,
            s = e.success ? e.success : 0,
            o = e.fail ? e.fail : 0;
        wx.uploadFile({
            url: e.url,
            filePath: e.path[t],
            name: "upfile",
            formData: null,
            success: function(e) {
                "" != e.data ? (console.log(e), s++, _imgArray.push(e.data), console.log("上传商品主图时候提交的图片数组", _imgArray)) : wx.showToast({
                    icon: "loading",
                    title: "请重试"
                })
            },
            fail: function(e) {
                o++, console.log("fail:" + t + "fail:" + o)
            },
            complete: function() {
                console.log(t), ++t == e.path.length ? (a.setData({
                    imgarr1: e.path
                }), wx.hideToast(), console.log("执行完毕"), console.log("成功：" + s + " 失败：" + o)) : (console.log(t), e.i = t, e.success = s, e.fail = o, a.uploadimg(e))
            }
        })
    },
    delete: function(e) {
        var a = e.currentTarget.dataset.index,
            t = this.data.imgarr1;
        console.log(t, _imgArray), t.splice(a, 1), _imgArray.splice(a, 1), console.log("删除imgarr1里的图片后剩余的图片", _imgArray), this.setData({
            imgarr1: t
        })
    },
    imgArray2: function(e) {
        var a = this,
            t = wx.getStorageSync("uniacid"),
            s = this.data.imgarr2;
        _imgArray2 = [], console.log(s), wx.chooseImage({
            count: 8 - s.length,
            sizeType: ["compressed"],
            sourceType: ["album", "camera"],
            success: function(e) {
                wx.showToast({
                    icon: "loading",
                    title: "正在上传"
                });
                var o = e.tempFilePaths;
                s = s.concat(o), a.uploadimg1({
                    url: a.data.url + "app/index.php?i=" + t + "&c=entry&a=wxapp&do=Upload&m=zh_tcwq",
                    path: s
                })
            }
        })
    },
    uploadimg1: function(e) {
        var a = this,
            t = e.i ? e.i : 0,
            s = e.success ? e.success : 0,
            o = e.fail ? e.fail : 0;
        wx.uploadFile({
            url: e.url,
            filePath: e.path[t],
            name: "upfile",
            formData: null,
            success: function(e) {
                "" != e.data ? (console.log(e), s++, _imgArray2.push(e.data), console.log("上传商品详情页时候提交的图片数组", _imgArray2)) : wx.showToast({
                    icon: "loading",
                    title: "请重试"
                })
            },
            fail: function(e) {
                o++, console.log("fail:" + t + "fail:" + o)
            },
            complete: function() {
                console.log(t), ++t == e.path.length ? (a.setData({
                    imgarr2: e.path
                }), wx.hideToast(), console.log("执行完毕"), console.log("成功：" + s + " 失败：" + o)) : (console.log(t), e.i = t, e.success = s, e.fail = o, a.uploadimg1(e))
            }
        })
    },
    delete1: function(e) {
        var a = e.currentTarget.dataset.index,
            t = this.data.imgarr2;
        console.log(t, _imgArray2), t.splice(a, 1), _imgArray2.splice(a, 1), console.log("删除imgarr2里的图片后剩余的图片", _imgArray2), this.setData({
            imgarr2: t
        })
    },
    add: function(e) {
        console.log(this.data), console.log(e);
        e.currentTarget.dataset.index;
        var a = e.currentTarget.dataset.id,
            t = this.data.spec;
        console.log(t);
        var s = this.data.spec1[0].spec[0];
        for (var o in console.log(a), t[a].spec.push(s), t) for (var c in t[o].spec) t[o].spec[c].id = t[o].id;
        console.log(t), t[a].spec.length > 3 ? wx.showModal({
            title: "提示",
            content: "只能添加三条子分类",
            showCancel: !0,
            cancelText: "取消",
            confirmText: "确定",
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        }) : this.setData({
            spec: t
        })
    },
    add1: function(e) {
        var a = e.currentTarget.dataset.index;
        console.log(this.data), console.log(a);
        var t = this.data.spec,
            s = this.data.spec1[0];
        for (var o in console.log(s), 1 == t.length ? (console.log("只要一个"), s.id = 1) : 2 == t.length && (console.log("只要两个"), s.id = 2), t.push(s), t) for (var c in t[o].spec) t[o].spec[c].id = t[o].id;
        t.length <= 3 ? (console.log(s), console.log(t), this.setData({
            spec: t,
            len: t.length
        })) : wx.showModal({
            title: "提示",
            content: "只能添加三条",
            showCancel: !0,
            cancelText: "取消",
            confirmText: "确定",
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        })
    },
    add2: function(e) {
        console.log(e);
        var a = this.data.spec,
            t = e.currentTarget.dataset.index;
        console.log(t), a.pop(), console.log(a), this.setData({
            spec: a,
            len: a.length
        })
    },
    checkboxChange: function(e) {
        console.log(e);
        var a = e.detail.value;
        this.setData({
            check_box: a
        })
    },
    add_spec: function(e) {
        var a = this.data.add_spec;
        0 == a ? this.setData({
            add_spec: !0
        }) : this.setData({
            add_spec: !1
        })
    },
    delete_spec_small: function(e) {
        var a = e.currentTarget.dataset.index,
            t = e.currentTarget.dataset.id,
            s = this.data.spec;
        for (var o in console.log(a), s[t].spec.splice(1, 1), s) for (var c in s[o].spec) s[o].spec[c].id = s[o].id;
        this.setData({
            spec: s
        })
    },
    spec_0_0_name: function(e) {
        console.log(e);
        var a = this.data.spec;
        a[0].spec[0].name = e.detail.value, this.setData({
            spec: a
        })
    },
    spec_0_0_price: function(e) {
        console.log(e);
        var a = this.data.spec;
        a[0].spec[0].price = e.detail.value, this.setData({
            spec: a
        })
    },
    spec_0_1_name: function(e) {
        console.log(e);
        var a = this.data.spec;
        a[0].spec[1].name = e.detail.value, this.setData({
            spec: a
        })
    },
    spec_0_1_price: function(e) {
        console.log(e);
        var a = this.data.spec;
        a[0].spec[1].price = e.detail.value, this.setData({
            spec: a
        })
    },
    spec_0_2_name: function(e) {
        console.log(e);
        var a = this.data.spec;
        a[0].spec[2].name = e.detail.value, this.setData({
            spec: a
        })
    },
    spec_0_2_price: function(e) {
        console.log(e);
        var a = this.data.spec;
        a[0].spec[2].price = e.detail.value, this.setData({
            spec: a
        })
    },
    spec_1_0_name: function(e) {
        console.log(e);
        var a = this.data.spec;
        a[1].spec[0].name = e.detail.value, this.setData({
            spec: a
        })
    },
    spec_1_0_price: function(e) {
        console.log(e);
        var a = this.data.spec;
        a[1].spec[0].price = e.detail.value, this.setData({
            spec: a
        })
    },
    spec_1_1_name: function(e) {
        console.log(e);
        var a = this.data.spec;
        a[1].spec[1].name = e.detail.value, this.setData({
            spec: a
        })
    },
    spec_1_1_price: function(e) {
        console.log(e);
        var a = this.data.spec;
        a[1].spec[1].price = e.detail.value, this.setData({
            spec: a
        })
    },
    spec_1_2_name: function(e) {
        console.log(e);
        var a = this.data.spec;
        a[1].spec[2].name = e.detail.value, this.setData({
            spec: a
        })
    },
    spec_1_2_price: function(e) {
        console.log(e);
        var a = this.data.spec;
        a[1].spec[2].price = e.detail.value, this.setData({
            spec: a
        })
    },
    spec_2_0_name: function(e) {
        console.log(e);
        var a = this.data.spec;
        a[2].spec[0].name = e.detail.value, this.setData({
            spec: a
        })
    },
    spec_2_0_price: function(e) {
        console.log(e);
        var a = this.data.spec;
        a[2].spec[0].price = e.detail.value, this.setData({
            spec: a
        })
    },
    spec_2_1_name: function(e) {
        console.log(e);
        var a = this.data.spec;
        a[2].spec[1].name = e.detail.value, this.setData({
            spec: a
        })
    },
    spec_2_1_price: function(e) {
        console.log(e);
        var a = this.data.spec;
        a[2].spec[1].price = e.detail.value, this.setData({
            spec: a
        })
    },
    spec_2_2_name: function(e) {
        console.log(e);
        var a = this.data.spec;
        a[2].spec[2].name = e.detail.value, this.setData({
            spec: a
        })
    },
    spec_2_2_price: function(e) {
        console.log(e);
        var a = this.data.spec;
        a[2].spec[2].price = e.detail.value, this.setData({
            spec: a
        })
    },
    formSubmit: function(e) {
        console.log(e), console.log(_imgArray), console.log(_imgArray2);
        console.log(this.data.spec);
        var a = e.detail.value.spec_name,
            t = e.detail.value.spec_num,
            s = e.detail.value.spec_price,
            o = e.detail.value.spec_freight,
            c = e.detail.value.spec_delivery,
            i = e.detail.value.goods_details,
            n = this.data.check_box,
            l = this.data.spec;
        for (var r in l) for (var p in l[r].spec) l[r].spec[p].spec_id = l[r].spec_id, l[r].spec[p].spec_name = l[r].text;
        console.log(l);
        var d = [];
        for (var u in l) d = d.concat(l[u].spec);
        console.log(d);
        var g = 2,
            h = 2,
            f = 2,
            m = 2,
            _ = 2,
            v = 2;
        for (var x in n) "正品保证" == n[x] && (g = 1), "全程包邮" == n[x] && (h = 1), "24h发货" == n[x] && (f = 1), "售后保障" == n[x] && (m = 1), "急速退款" == n[x] && (_ = 1), "七天包退" == n[x] && (v = 1);
        var y = "";
        if ("" == a) y = "商品名称不能为空";
        else if ("" == s) y = "商品价格不能为空";
        else if ("" == t) y = "商品数量不能为空";
        else if ("" == o) y = "商品运费不能为空";
        else if ("" == c) y = "发货说明不能为空";
        else if (0 == _imgArray.length) y = "还没有上传商品图片哦";
        else if (1 == this.data.add_spec) for (var w in d) "" == d[w].spec_name ? y = "没有选择规格" : "" == d[w].name ? y = "还有规格名字没输入" : "" == d[w].price && (y = "还有规格价格没输入");
        if ("" != y) wx.showModal({
            title: "提示",
            content: y,
            showCancel: !0,
            cancelText: "取消",
            confirmText: "确定",
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        });
        else {
            if (1 == this.data.add_spec) {
                var D = [];
                d.map(function(e) {
                    var a = {};
                    a.name = e.name, a.money = e.price, a.spec_id = e.spec_id, D.push(a)
                }), console.log(D)
            } else D = [];
            if (_imgArray.length > 0) var T = _imgArray.join(",");
            else T = "";
            if (_imgArray2.length > 0) var A = _imgArray2.join(",");
            else A = "";
            console.log(T), console.log(A), app.util.request({
                url: "entry/wxapp/AddGoods",
                cachetime: "0",
                data: {
                    store_id: this.data.store_id,
                    imgs: A,
                    lb_imgs: T,
                    goods_name: a,
                    goods_num: t,
                    goods_cost: s,
                    freight: o,
                    delivery: c,
                    goods_details: i,
                    sz: D,
                    quality: g,
                    free: h,
                    all_day: f,
                    service: m,
                    refund: _,
                    weeks: v
                },
                success: function(e) {
                    console.log(e), 1 == e.data && (wx.showToast({
                        title: "发布成功",
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
                    }, 2e3))
                }
            })
        }
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