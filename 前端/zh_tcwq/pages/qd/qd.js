var app = getApp(),
    util = require("../../utils/util.js"),
    date = new Date,
    year = date.getFullYear(),
    month = date.getMonth() + 1,
    dayInMonth = date.getDate(),
    dayInWeek = date.getDay(),
    selected = [year, month, dayInMonth],
    week = [{
        value: "日",
        class: "weekend"
    }, {
        value: "一",
        class: ""
    }, {
        value: "二",
        class: ""
    }, {
        value: "三",
        class: ""
    }, {
        value: "四",
        class: ""
    }, {
        value: "五",
        class: ""
    }, {
        value: "六",
        class: "weekend"
    }],
    isLeapYear = function(t) {
        return t % 400 == 0 || t % 4 == 0 && t % 100 != 0
    }, isToday = function(t, e, a) {
        return t == year && e == month && a == dayInMonth
    }, isWeekend = function(t, e) {
        return (t + e) % 7 == 0 || (t + e - 1) % 7 == 0
    }, calEmptyGrid = function(t, e) {
        return new Date(t + "/" + e + "/02 00:00:00").getUTCDay()
    }, calDaysInMonth = function(t, e) {
        var a = isLeapYear(t);
        return 2 == month && a ? 29 : 2 != month || a ? [4, 6, 9, 11].includes(e) ? 30 : 31 : 28
    }, calWeekDay = function(t, e, a) {
        return new Date(t + "/" + e + "/" + a + " 00:00:00").getUTCDay()
    }, getThisMonthDays = function(t, e) {
        return new Date(t, e, 0).getDate()
    }, calDays = function(t, e) {
        for (var a = getThisMonthDays(t, e), s = calEmptyGrid(t, e), n = [], o = 1; o <= a; o++) {
            var r = isToday(t, e, o),
                i = selected[0] == t && selected[1] == e && selected[2] == o,
                l = r ? "today" : "",
                c = i ? "selected" : "",
                d = {
                    value: o,
                    date: [t, e, o],
                    class: "date-bg " + (isWeekend(s, o) ? "weekend" : "") + " " + l + " " + c + " " + (r && i ? "today-selected" : "")
                };
            n.push(d)
        }
        return n.slice(0, calDaysInMonth(t, e))
    };
Page({
    data: {
        currYear: year,
        currMonth: month,
        week: week,
        emptyGrids: calEmptyGrid(year, month),
        days: calDays(year, month),
        selected: selected,
        disabled: !1,
        logintext: "点击签到",
        lxts: 0,
        isbq: !1,
        bqtext: "点击补签",
        fwxy: !0,
        djqd: !0,
        qdtc: !0
    },
    gbrl: function() {
        this.setData({
            djqd: !0
        })
    },
    qqd: function() {
        this.setData({
            djqd: !1
        })
    },
    ycqdtc: function() {
        this.setData({
            qdtc: !0
        })
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
    onLoad: function() {
        function t() {
            var t = new Date,
                e = t.getMonth() + 1,
                a = t.getDate();
            return [t.getFullYear(), e, a]
        }
        wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: wx.getStorageSync("color"),
            animation: {
                duration: 0,
                timingFunc: "easeIn"
            }
        }), console.log(this.data.days, this.data.selected), console.log(t()), this.setData({
            nowtime: t()
        });
        var e = this,
            a = wx.getStorageSync("user_info");
        console.log(a), app.util.request({
            url: "entry/wxapp/Signset",
            cachetime: "0",
            success: function(t) {
                console.log("签到设置", t), e.setData({
                    qdset: t.data,
                    userinfo: a
                }), e.reLoad()
            }
        }), app.util.request({
            url: "entry/wxapp/ContinuousList",
            cachetime: "0",
            success: function(t) {
                console.log("查看连签奖励", t), e.setData({
                    jl: t.data
                })
            }
        }), this.lqts()
    },
    rank: function() {
        var t = this,
            e = wx.getStorageSync("users").id;
        app.util.request({
            url: "entry/wxapp/JrRank",
            cachetime: "0",
            data: {
                page: 1,
                pagesize: 10
            },
            success: function(e) {
                for (var a in console.log("JrRank", e.data), e.data) e.data[a].time3 = app.ormatDate(e.data[a].time3).substring(11);
                t.setData({
                    ranklist: e.data
                })
            }
        }), app.util.request({
            url: "entry/wxapp/MyJrRank",
            cachetime: "0",
            data: {
                user_id: e
            },
            success: function(e) {
                console.log("MyJrRank", e.data), t.setData({
                    MyRank: e.data
                })
            }
        })
    },
    in_array: function(t, e) {
        for (var a = 0; a < e.length; a++) {
            if (e[a].toString() == t) return !0
        }
        return !1
    },
    lqts: function() {
        this.setData({
            isbq: !1
        });
        var t = this,
            e = wx.getStorageSync("users").id;
        console.log(e), app.util.request({
            url: "entry/wxapp/Continuous",
            cachetime: "0",
            data: {
                user_id: e
            },
            success: function(e) {
                console.log("查看连续签到天数", e), t.setData({
                    lxts: e.data
                })
            }
        }), app.util.request({
            url: "entry/wxapp/Isbq",
            cachetime: "0",
            data: {
                user_id: e
            },
            success: function(e) {
                console.log("isbq", e), t.setData({
                    havebq: e.data
                })
            }
        }), app.util.request({
            url: "entry/wxapp/UserInfo",
            cachetime: "0",
            data: {
                user_id: e
            },
            success: function(e) {
                console.log("个人信息", e), t.setData({
                    grjf: e.data.total_score
                })
            }
        })
    },
    reLoad: function() {
        var t = this,
            e = wx.getStorageSync("users").id;
        console.log(e), app.util.request({
            url: "entry/wxapp/MySign",
            cachetime: "0",
            data: {
                user_id: e
            },
            success: function(a) {
                console.log("我的签到", a), t.setData({
                    wdqd: a.data
                });
                for (var s = [], n = t.data.days, o = 0; o < a.data.length; o++) s.push(a.data[o].time);
                console.log(s, n), t.in_array(t.data.nowtime.toString(), s) ? (console.log("今日已签到"), t.setData({
                    disabled: !0,
                    logintext: "今日已签到"
                })) : (console.log("今日未签到"), t.setData({
                    disabled: !1,
                    logintext: "点击签到"
                }));
                for (var r = 0; r < n.length; r++) t.in_array(n[r].date.toString(), s) && (n[r].isqd = 1);
                app.util.request({
                    url: "entry/wxapp/Special",
                    cachetime: "0",
                    success: function(a) {
                        console.log("Special", a);
                        for (var s = a.data, o = 0; o < s.length; o++) {
                            s[o].day = s[o].day.split("-");
                            var r = new Date(s[o].day[0], s[o].day[1] - 1, s[o].day[2]),
                                i = r.getFullYear(),
                                l = r.getMonth() + 1,
                                c = r.getDate();
                            s[o].day = i + "," + l + "," + c
                        }
                        console.log(s), t.setData({
                            special: s
                        });
                        for (var d = 0; d < n.length; d++) for (var u = 0; u < s.length; u++) n[d].date.toString() == s[u].day && (n[d].tsrq = s[u]);
                        t.setData({
                            days: n
                        }), app.util.request({
                            url: "entry/wxapp/MyJrSign",
                            cachetime: "0",
                            data: {
                                user_id: e
                            },
                            success: function(a) {
                                console.log("jrsfqd", a), "2" == a.data && (console.log("未签到"), t.qd()), "1" == a.data && (console.log("已签到"), app.util.request({
                                    url: "entry/wxapp/MyJrJf",
                                    cachetime: "0",
                                    data: {
                                        user_id: e
                                    },
                                    success: function(e) {
                                        console.log("MyJrJf", e), t.setData({
                                            qdddjf: e.data
                                        })
                                    }
                                }), t.rank())
                            }
                        })
                    }
                })
            }
        })
    },
    qd: function() {
        var t = this,
            e = wx.getStorageSync("users").id,
            a = this.data.wdqd;
        console.log(t.data.nowtime, t.data.special, t.data.qdset, a);
        for (var s = t.data.qdset[0].integral, n = 0; n < t.data.special.length; n++) t.data.nowtime.toString() == t.data.special[n].day && (s = t.data.special[n].integral);
        if (0 == a.length) var o = t.data.qdset[0].one;
        else o = 0;
        console.log(s, o), app.util.request({
            url: "entry/wxapp/Sign",
            cachetime: "0",
            data: {
                user_id: e,
                time: t.data.nowtime.toString(),
                integral: s,
                one: o
            },
            success: function(e) {
                console.log(e), "1" == e.data && (t.setData({
                    qdddjf: s,
                    qdtc: !1
                }), t.reLoad(), t.lqts())
            }
        })
    },
    bq: function() {
        var t = this,
            e = wx.getStorageSync("users").id,
            a = this.data.wdqd,
            s = Number(this.data.grjf);
        console.log(t.data.bqtime, t.data.special, t.data.qdset, a, s);
        for (var n = t.data.qdset[0].integral, o = 0; o < t.data.special.length; o++) t.data.bqtime.toString() == t.data.special[o].day && (n = t.data.special[o].integral);
        if (0 == a.length) var r = t.data.qdset[0].one;
        else r = 0;
        console.log(n, r), wx.showModal({
            title: "温馨提示",
            content: "补签将会扣除您" + t.data.qdset[0].bq_integral + "积分哦",
            success: function(a) {
                a.confirm ? (console.log("用户点击确定"), Number(t.data.qdset[0].bq_integral) > s ? wx.showModal({
                    title: "提示",
                    content: "您的积分为" + s + ",不足补签扣除"
                }) : app.util.request({
                    url: "entry/wxapp/Sign2",
                    cachetime: "0",
                    data: {
                        user_id: e,
                        time: t.data.bqtime.toString(),
                        integral: n,
                        one: r
                    },
                    success: function(e) {
                        console.log(e), t.reLoad(), t.lqts()
                    }
                })) : a.cancel && console.log("用户点击取消")
            }
        })
    },
    changeMonth: function(t) {
        var e = t.target.id,
            a = this.data.currYear,
            s = this.data.currMonth;
        s = "prev" == e ? s - 1 : s + 1, "prev" == e && s < 1 && (a -= 1, s = 12), "next" == e && s > 12 && (a += 1, s = 1), this.setData({
            currYear: a,
            currMonth: s,
            emptyGrids: calEmptyGrid(a, s),
            days: calDays(a, s)
        }), this.reLoad()
    },
    selectDate: function(t) {
        var e = this.data.havebq,
            a = this.data.nowtime,
            s = t.currentTarget.dataset.selected,
            n = t.currentTarget.dataset.tsrq;
        console.log(a, s, n), this.setData({
            bqtime: s
        });
        var o = new Date(a[0], a[1], a[2]),
            r = new Date(s[0], s[1], s[2]),
            i = o.getTime(),
            l = r.getTime();
        console.log(i, l, e), i > l ? (console.log("以前"), 2 == e ? this.setData({
            bqdisabled: !1,
            bqtext: "点击补签"
        }) : this.setData({
            bqdisabled: !0,
            bqtext: "今日已补签一次"
        }), this.setData({
            isbq: !0
        }), null != n.tsrq && wx.showModal({
            title: n.tsrq.day + "是" + n.tsrq.title,
            content: "本日签到特殊奖励" + n.tsrq.integral + "积分"
        })) : i == l ? (null != n.tsrq && wx.showModal({
            title: n.tsrq.day + "是" + n.tsrq.title,
            content: "本日签到特殊奖励" + n.tsrq.integral + "积分"
        }), console.log("今日"), this.setData({
            isbq: !1
        })) : (null != n.tsrq && wx.showModal({
            title: n.tsrq.day + "是" + n.tsrq.title,
            content: "本日签到特殊奖励" + n.tsrq.integral + "积分"
        }), console.log("以后"), this.setData({
            isbq: !1
        }));
        var c = n.value;
        this.setData({
            xz: c
        })
    },
    onPullDownRefresh: function() {
        this.reLoad(), this.lqts(), setTimeout(function() {
            wx.stopPullDownRefresh()
        }, 1e3)
    }
});