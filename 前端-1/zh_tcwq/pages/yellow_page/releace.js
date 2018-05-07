var app = getApp();
Page({
    data: {
        items: [{
            name: "USA",
            value: "一天  费用 0.2 元"
        }, {
            name: "CHN",
            value: "一月  费用 20 元",
            checked: "true"
        }, {
            name: "BRA",
            value: "一年  费用 200 元"
        }],
        region: ["广东省", "广州市", "海珠区"],
        index: 0,
        index1: 0,
        multiIndex: [0, 0]
    },
    radioChange: function(e) {
        console.log("radio发生change事件，携带value值为：", e.detail.value), this.setData({
            radio: e.detail.value
        })
    },
    bindRegionChange: function(e) {
        console.log("picker发送选择改变，携带值为", e.detail.value), this.setData({
            region: e.detail.value
        })
    },
    bindMultiPickerColumnChange: function(e) {
        var a = this,
            t = e.detail.value,
            n = (e.detail.column, a.data.nav);
        if (0 == e.detail.column) {
            var o = n[0][t],
                i = a.data.store,
                l = [];
            for (var s in l[0] = e.detail.value, l[1] = 0, i) if (i[s].type_name == o) {
                i[s].id;
                app.util.request({
                    url: "entry/wxapp/StoreType2",
                    cachetime: "0",
                    data: {
                        type_id: i[s].id
                    },
                    success: function(e) {
                        var t = [];
                        e.data.map(function(e) {
                            var a;
                            a = e.name, t.push(a)
                        }), n[1] = t, a.setData({
                            nav: n,
                            multiIndex: l
                        })
                    }
                })
            }
        } else a.setData({
            multiIndex: [a.data.multiIndex[0], e.detail.value]
        })
    },
    onLoad: function(e) {
        this.refresh()
    },
    refresh: function(e) {
        var a = this;
        app.util.request({
            url: "entry/wxapp/StoreType",
            cachetime: "0",
            success: function(e) {
                console.log(e);
                var t = e.data,
                    n = [];
                t.map(function(e) {
                    var a;
                    a = e.type_name, n.push(a)
                }), console.log(n), app.util.request({
                    url: "entry/wxapp/StoreType2",
                    cachetime: "0",
                    data: {
                        type_id: t[0].id
                    },
                    success: function(e) {
                        console.log(e), t[0].classification = e.data;
                        var n = [];
                        t[0].classification.map(function(e) {
                            var a;
                            a = e.name, n.push(a)
                        }), console.log(n);
                        var o = [];
                        t.map(function(e) {
                            var a;
                            a = e.type_name, o.push(a)
                        });
                        var i = [];
                        i[0] = o, i[1] = n, console.log(i), a.setData({
                            nav: i,
                            store: t
                        })
                    }
                })
            }
        })
    },
    name: function(e) {
        console.log(e), this.setData({
            name: e.detail.value
        })
    },
    address: function(e) {
        console.log(e), this.setData({
            address: e.detail.value
        })
    },
    tel: function(e) {
        console.log(e), this.setData({
            tel: e.detail.value
        })
    },
    text: function(e) {
        console.log(e), this.setData({
            text: e.detail.value
        })
    },
    apply: function(e) {
        console.log(this.data);
        this.data.region;
        var a = this.data.name,
            t = this.data.address,
            n = this.data.tel,
            o = this.data.text,
            i = "";
        null == a ? i = "请输入公司名称" : null == t ? i = "请输入公司地址" : null == n ? i = "请输入联系电话" : null == o && (i = "请输入关键字"), "" != i && wx.showModal({
            title: "提示",
            content: i,
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
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});