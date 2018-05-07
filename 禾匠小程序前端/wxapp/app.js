var api, util = require("./utils/utils.js"),
  order_pay = require("./commons/order-pay/order-pay.js");
App({
  is_on_launch: !0,
  onLaunch: function () {
    this.setApi(),
      api = this.api,
      this.getNavigationBarColor(),
      console.log(wx.getSystemInfoSync()),
      this.getStoreData(),
      this.getCatList()
  },
  getStoreData: function () {
    var t = this;
    this.request({
      url: api.
        default.store,
      success: function (t) {
        0 == t.code && (wx.setStorageSync("store", t.data.store), wx.setStorageSync("store_name", t.data.store_name), wx.setStorageSync("show_customer_service", t.data.show_customer_service), wx.setStorageSync("contact_tel", t.data.contact_tel), wx.setStorageSync("share_setting", t.data.share_setting))
      },
      complete: function () {
        t.login()
      }
    })
  },
  getCatList: function () {
    this.request({
      url: api.
        default.cat_list,
      success: function (t) {
        if (0 == t.code) {
          var e = t.data.list || [];
          wx.setStorageSync("cat_list", e)
        }
      }
    })
  },
  login: function () {
    var t = getCurrentPages(),
      i = t[t.length - 1];
    wx.showLoading({
      title: "正在登录",
      mask: !0
    }),
      wx.login({
        success: function (t) {
          if (t.code) {
            var e = t.code;
            wx.getUserInfo({
              success: function (t) {
                getApp().request({
                  url: api.passport.login,
                  method: "post",
                  data: {
                    code: e,
                    user_info: t.rawData,
                    encrypted_data: t.encryptedData,
                    iv: t.iv,
                    signature: t.signature
                  },
                  success: function (t) {
                    if (wx.hideLoading(), 0 == t.code) {
                      wx.setStorageSync("access_token", t.data.access_token),
                        wx.setStorageSync("user_info", t.data);
                      var e = getCurrentPages(),
                        a = 0;
                      if (null != e[0].options.user_id) a = e[0].options.user_id;
                      else if (null != e[0].options.scene) a = e[0].options.scene;
                      if (getApp().bindParent({
                        parent_id: a || 0
                      }), null == i) return;
                      var o = getApp().loginNoRefreshPage;
                      for (var n in o) if (o[n] === i.route) return;
                      wx.redirectTo({
                        url: "/" + i.route + "?" + util.objectToUrlParams(i.options),
                        fail: function () {
                          wx.switchTab({
                            url: "/" + i.route
                          })
                        }
                      })
                    } else wx.showToast({
                      title: t.msg
                    })
                  }
                })
              },
              fail: function (t) {
                wx.hideLoading(),
                  getApp().getauth({
                    content: "需要获取您的用户信息授权，请到小程序设置中打开授权",
                    cancel: !0,
                    success: function (t) {
                      t && getApp().login()
                    }
                  })
              }
            })
          }
        }
      })
  },
  request: function (a) {
    a.data || (a.data = {});
    var t = wx.getStorageSync("access_token");
    t && (a.data.access_token = t),
      a.data._uniacid = this.siteInfo.uniacid,
      a.data._acid = this.siteInfo.acid,
      wx.request({
        url: a.url,
        header: a.header || {
          "content-type": "application/x-www-form-urlencoded"
        },
        data: a.data || {},
        method: a.method || "GET",
        dataType: a.dataType || "json",
        success: function (t) {
        - 1 == t.data.code ? getApp().login() : a.success && a.success(t.data)
        },
        fail: function (t) {
          console.warn("--- request fail >>>"),
            console.warn(t),
            console.warn("<<< request fail ---");
          var e = getApp();
          e.is_on_launch ? (e.is_on_launch = !1, wx.showModal({
            title: "网络请求出错",
            content: t.errMsg,
            showCancel: !1,
            success: function (t) {
              t.confirm && a.fail && a.fail(t)
            }
          })) : (wx.showToast({
            title: t.errMsg,
            image: "/images/icon-warning.png"
          }), a.fail && a.fail(t))
        },
        complete: function (t) {
          200 != t.statusCode && (console.log("--- request http error >>>"), console.log(t.statusCode), console.log(t.data), console.log("<<< request http error ---")),
            a.complete && a.complete(t)
        }
      })
  },
  saveFormId: function (t) {
    this.request({
      url: api.user.save_form_id,
      data: {
        form_id: t
      }
    })
  },
  loginBindParent: function (t) {
    if ("" == wx.getStorageSync("access_token")) return !0;
    getApp().bindParent(t)
  },
  bindParent: function (t) {
    if ("undefined" != t.parent_id && 0 != t.parent_id) {
      console.log("Try To Bind Parent With User Id:" + t.parent_id);
      var e = wx.getStorageSync("user_info");
      if (0 < wx.getStorageSync("share_setting").level) 0 != t.parent_id && getApp().request({
        url: api.share.bind_parent,
        data: {
          parent_id: t.parent_id
        },
        success: function (t) {
          0 == t.code && (e.parent = t.data, wx.setStorageSync("user_info", e))
        }
      })
    }
  },
  shareSendCoupon: function (a) {
    wx.showLoading({
      mask: !0
    }),
      a.hideGetCoupon || (a.hideGetCoupon = function (t) {
        var e = t.currentTarget.dataset.url || !1;
        a.setData({
          get_coupon_list: null
        }),
          e && wx.navigateTo({
            url: e
          })
      }),
      this.request({
        url: api.coupon.share_send,
        success: function (t) {
          0 == t.code && a.setData({
            get_coupon_list: t.data.list
          })
        },
        complete: function () {
          wx.hideLoading()
        }
      })
  },
  getauth: function (e) {
    wx.showModal({
      title: "是否打开设置页面重新授权",
      content: e.content,
      confirmText: "去设置",
      success: function (t) {
        t.confirm ? wx.openSetting({
          success: function (t) {
            e.success && e.success(t)
          },
          fail: function (t) {
            e.fail && e.fail(t)
          },
          complete: function (t) {
            e.complete && e.complete(t)
          }
        }) : e.cancel && getApp().getauth(e)
      }
    })
  },
  api: require("api.js"),
  setApi: function () {
    var o = this.siteInfo.siteroot;
    o = o.replace("app/index.php", ""),
      o += "addons/zjhj_mall/core/web/index.php?store_id=1&r=api/",
      this.api = function t(e) {
        for (var a in e) "string" == typeof e[a] ? e[a] = e[a].replace("{$_api_root}", o) : e[a] = t(e[a]);
        return e
      }(this.api);
    var t = this.api.
      default.index,
      e = t.substr(0, t.indexOf("/index.php"));
    this.webRoot = e
  },
  webRoot: null,
  siteInfo: require("siteinfo.js"),
  currentPage: null,
  pageOnLoad: function (t) {
    this.currentPage = t,
      console.log("--------pageOnLoad----------"),
      void 0 === t.openWxapp && (t.openWxapp = this.openWxapp),
      void 0 === t.showToast && (t.showToast = this.pageShowToast),
      this.setNavigationBarColor(),
      this.setPageNavbar(t);
    var e = this;
    this.currentPage.naveClick = function (t) {
      e.navigatorClick(t, this)
    },
      order_pay.init(this.currentPage, e)
  },
  pageOnReady: function (t) {
    console.log("--------pageOnReady----------")
  },
  pageOnShow: function (t) {
    console.log("--------pageOnShow----------")
  },
  pageOnHide: function (t) {
    console.log("--------pageOnHide----------")
  },
  pageOnUnload: function (t) {
    console.log("--------pageOnUnload----------")
  },
  setPageNavbar: function (n) {
    console.log("----setPageNavbar----"),
      console.log(n);
    var t = wx.getStorageSync("_navbar");
    function e(t) {
      var e = !1,
        a = n.route || n.__route__ || null;
      for (var o in t.navs) t.navs[o].url === "/" + a ? e = t.navs[o].active = !0 : t.navs[o].active = !1;
      e && n.setData({
        _navbar: t
      })
    }
    t && e(t),
      this.request({
        url: api.
          default.navbar,
        success: function (t) {
          0 == t.code && (e(t.data), wx.setStorageSync("_navbar", t.data))
        }
      })
  },
  getNavigationBarColor: function () {
    var e = this;
    e.request({
      url: api.
        default.navigation_bar_color,
      success: function (t) {
        0 == t.code && (wx.setStorageSync("_navigation_bar_color", t.data), e.setNavigationBarColor())
      }
    })
  },
  setNavigationBarColor: function () {
    var t = wx.getStorageSync("_navigation_bar_color");
    t && wx.setNavigationBarColor(t)
  },
  loginNoRefreshPage: ["pages/index/index"],
  openWxapp: function (t) {
    if (console.log("--openWxapp---"), t.currentTarget.dataset.url) {
      var e = t.currentTarget.dataset.url; (e = function (t) {
        var e = /([^&=]+)=([\w\W]*?)(&|$|#)/g,
          a = /^[^\?]+\?([\w\W]+)$/.exec(t),
          o = {};
        if (a && a[1]) for (var n, i = a[1]; null != (n = e.exec(i));) o[n[1]] = n[2];
        return o
      }(e)).path = e.path ? decodeURIComponent(e.path) : "",
        console.log("Open New App"),
        console.log(e),
        wx.navigateToMiniProgram({
          appId: e.appId,
          path: e.path,
          complete: function (t) {
            console.log(t)
          }
        })
    }
  },
  pageShowToast: function (t) {
    console.log("--- pageToast ---");
    var e = this.currentPage,
      a = t.duration || 2500,
      o = t.title || "",
      n = (t.success, t.fail, t.complete || null);
    e._toast_timer && clearTimeout(e._toast_timer),
      e.setData({
        _toast: {
          title: o
        }
      }),
      e._toast_timer = setTimeout(function () {
        var t = e.data._toast;
        t.hide = !0,
          e.setData({
            _toast: t
          }),
          "function" == typeof n && n()
      },
        a)
  },
  navigatorClick: function (t, e) {
    var a = t.currentTarget.dataset.open_type;
    if ("redirect" == a) return !0;
    if ("wxapp" == a) {
      var o = t.currentTarget.dataset.path;
      "/" != o.substr(0, 1) && (o = "/" + o),
        wx.navigateToMiniProgram({
          appId: t.currentTarget.dataset.appid,
          path: o,
          complete: function (t) {
            console.log(t)
          }
        })
    }
    if ("tel" == a) {
      var n = t.currentTarget.dataset.tel;
      wx.makePhoneCall({
        phoneNumber: n
      })
    }
    return !1
  }
});