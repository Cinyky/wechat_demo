var app = getApp();
Page({
    data: {
        index: 0,
        base: !1
    },
    onLoad: function(t) {
        wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: wx.getStorageSync("color"),
            animation: {
                duration: 0,
                timingFunc: "easeIn"
            }
        }), this.reload()
    },
    reload: function(t) {
        var a = this,
            e = wx.getStorageSync("System");
        console.log(e);
        var n = wx.getStorageSync("url");
        a.setData({
            url: n,
            pt_name: e.pt_name
        }), app.util.request({
            url: "entry/wxapp/type",
            cachetime: "0",
            success: function(t) {
                var e = t.data;
                a.setData({
                    nav: e
                })
            }
        })
    },
    settled: function(t) {
        wx.navigateTo({
            url: "../../settled/settled",
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        })
    },
    formid_one: function(t) {
        console.log("搜集第一个formid"), console.log(t), app.util.request({
            url: "entry/wxapp/SaveFormid",
            cachetime: "0",
            data: {
                user_id: wx.getStorageSync("users").id,
                form_id: t.detail.formId,
                openid: wx.getStorageSync("openid")
            },
            success: function(t) {}
        })
    },
    bindPickerChange: function(t) {
        console.log(t);
        var a = this.data.id,
            e = t.detail.value,
            n = this.data.nav[this.data.index].array[e];
        for (var i in this.data.nav[this.data.index].array) if (n == this.data.nav[this.data.index].arrays[i].name) var o = this.data.nav[this.data.index].arrays[i].id,
            d = this.data.nav[this.data.index].arrays[i].type_id,
            s = this.data.nav[this.data.index].money;
        console.log(this.data.nav[this.data.index]), wx.navigateTo({
            url: "../edit/edit?info=" + n + "&id=" + a + "&type_id=" + o + "&money=" + s + "&type2_id=" + d
        })
    },
    edit: function(t) {
        var a = this;
        console.log(t);
        var e = t.currentTarget.dataset.index,
            n = t.currentTarget.dataset.id,
            i = a.data.nav[e].money,
            o = [],
            d = wx.getStorageSync("users").id;
        app.util.request({
            url: "entry/wxapp/FtXz",
            cachetime: "0",
            data: {
                user_id: d
            },
            success: function(t) {
                console.log(t, d), "今天发帖次数已经超限!" == t.data ? wx.showModal({
                    title: "提示",
                    content: "今天发帖次数已经超限!"
                }) : app.util.request({
                    url: "entry/wxapp/type2",
                    cachetime: "0",
                    data: {
                        id: n
                    },
                    success: function(t) {
                        console.log(t), 0 != t.data.length ? (t.data.map(function(t) {
                            var a;
                            a = t.name, o.push(a)
                        }), console.log(o), a.setData({
                            array: o,
                            arrays: t.data,
                            base: !0,
                            type_id: n,
                            money: i
                        })) : wx.navigateTo({
                            url: "../edit/edit?id=" + a.data.id + "&type_id=" + n + "&money=" + i + "&type2_id=0"
                        })
                    }
                })
            }
        })
    },
    cancel: function(t) {
        this.setData({
            base: !1
        })
    },
    selected: function(t) {
        var a = this.data.arrays,
            e = t.currentTarget.id,
            n = this.data.type_id,
            i = a[e].id,
            o = a[e].name,
            d = this.data.money;
        this.setData({
            base: !1
        }), wx.navigateTo({
            url: "../edit/edit?type2_id=" + i + "&type_id=" + n + "&money=" + d + "&info=" + o
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