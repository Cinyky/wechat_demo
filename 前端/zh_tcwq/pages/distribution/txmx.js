var app = getApp();
Page({
    data: {
        tabs: ["待审核", "已通过", "已拒绝"],
        activeIndex: 0,
        djd: [],
        score: [{
            note: "支付宝提现",
            time: "2017-10-18 12：11：25",
            money: "2.00",
            type: "1"
        }, {
            note: "银行卡提现",
            time: "2017-10-18 12：11：25",
            money: "5.00",
            type: "1"
        }]
    },
    tabClick: function(t) {
        this.setData({
            activeIndex: t.currentTarget.id
        })
    },
    reLoad: function() {
        var t = this,
            a = wx.getStorageSync("users").id;
        app.util.request({
            url: "entry/wxapp/YjtxList",
            cachetime: "0",
            data: {
                user_id: a
            },
            success: function(a) {
                console.log(a.data);
                for (var e = 0; e < a.data.length; e++) a.data[e].time = util.ormatDate(a.data[e].time), a.data[e].sh_time = util.ormatDate(a.data[e].sh_time);
                var n = [],
                    o = [],
                    i = [];
                for (e = 0; e < a.data.length; e++) "1" == a.data[e].state && n.push(a.data[e]), "2" == a.data[e].state && o.push(a.data[e]), "3" == a.data[e].state && i.push(a.data[e]);
                console.log(n, o, i), t.setData({
                    dsh: n,
                    ytg: o,
                    yjj: i
                })
            }
        })
    },
    onLoad: function(t) {
        this.reLoad()
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.reLoad()
    },
    onReachBottom: function() {}
});