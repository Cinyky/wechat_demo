var app = getApp();
Page({
    data: {
        open: !0,
        txtype: 2,
        zhtext: "微信帐号",
        zhtstext: "请输入微信帐号",
        zhtype: "number",
        disabled: !1,
        logintext: "提现",
        fwxy: !0
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
    tradeinfo: function() {
        this.setData({
            open: !this.data.open
        })
    },
    radioChange: function(t) {
        console.log("radio发生change事件，携带value值为：", t.detail.value), "zfbtx" == t.detail.value && this.setData({
            txtype: 1,
            zhtext: "支付宝帐号",
            zhtstext: "请输入支付宝帐号",
            zhtype: "number"
        }), "wxtx" == t.detail.value && this.setData({
            txtype: 2,
            zhtext: "微信帐号",
            zhtstext: "请输入微信帐号",
            zhtype: "text"
        }), "yhktx" == t.detail.value && this.setData({
            txtype: 3,
            zhtext: "银行卡号",
            zhtstext: "请输入银行卡号",
            zhtype: "number"
        })
    },
    formSubmit: function(t) {
        var e = this;
        console.log("form发生了submit事件，携带数据为：", t.detail.value);
        var a = wx.getStorageSync("users").id,
            o = Number(this.data.userinfo.commission),
            s = this.data.fxset.tx_rate,
            n = Number(this.data.fxset.tx_money),
            i = t.detail.value.je,
            u = t.detail.value.name,
            l = t.detail.value.zh,
            c = t.detail.value.checkbox.length,
            r = t.detail.value.radiogroup;
        if (console.log(a, o, s, n, i, u, l, c, r), "zfbtx" == r) var d = 1;
        if ("wxtx" == r) d = 2;
        if ("yhktx" == r) d = 3;
        var x = Number(t.detail.value.je) * (100 - Number(s)) / 100;
        console.log(x);
        var h = "",
            f = !0;
        o < n ? h = "佣金满" + n + "才能申请提现" : "" == i ? h = "请填写提现金额！" : Number(i) < n ? h = "提现金额未满足提现要求" : Number(i) > o ? h = "提现金额超出您的实际佣金" : "" == u ? h = "请填写姓名！" : "" == l ? h = "请填写帐号！" : 0 == c ? h = "请阅读并同意分销商提现协议" : (e.setData({
            disabled: !0,
            logintext: "提交中..."
        }), f = !1, app.util.request({
            url: "entry/wxapp/Yjtx",
            cachetime: "0",
            data: {
                user_id: a,
                type: d,
                user_name: u,
                account: l,
                tx_cost: i,
                sj_cost: x
            },
            success: function(t) {
                console.log(t), 1 == t.data ? (wx.showToast({
                    title: "提交成功"
                }), setTimeout(function() {
                    wx.redirectTo({
                        url: "txmx"
                    })
                }, 1e3)) : (wx.showToast({
                    title: "请重试！",
                    icon: "loading"
                }), e.setData({
                    disabled: !1,
                    logintext: "提现"
                }))
            }
        })), 1 == f && wx.showModal({
            title: "提示",
            content: h
        })
    },
    onLoad: function(t) {
        var e = this,
            a = wx.getStorageSync("users").id;
        app.util.request({
            url: "entry/wxapp/FxSet",
            cachetime: "0",
            success: function(t) {
                console.log(t.data), e.setData({
                    fxset: t.data
                })
            }
        }), app.util.request({
            url: "entry/wxapp/UserInfo",
            cachetime: "0",
            data: {
                user_id: a
            },
            success: function(t) {
                console.log(t), e.setData({
                    userinfo: t.data
                })
            }
        }), app.util.request({
            url: "entry/wxapp/MyCommission",
            cachetime: "0",
            data: {
                user_id: a
            },
            success: function(t) {
                console.log(t), e.setData({
                    wdyj: t.data
                })
            }
        })
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.onLoad()
    },
    onReachBottom: function() {}
});