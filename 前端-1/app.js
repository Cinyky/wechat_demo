App({
    onLaunch: function() {},
    onShow: function() {},
    onHide: function() {
        console.log(getCurrentPages())
    },
    onError: function(e) {
        console.log(e)
    },
    ormatDate: function(e) {
        var o = new Date(1e3 * e);
        return o.getFullYear() + "-" + n(o.getMonth() + 1, 2) + "-" + n(o.getDate(), 2) + " " + n(o.getHours(), 2) + ":" + n(o.getMinutes(), 2) + ":" + n(o.getSeconds(), 2);

        function n(e, o) {
            for (var n = "" + e, t = n.length, r = "", c = o; c-- > t;) r += "0";
            return r + n
        }
    },
    ab: function(e) {},
    util: require("we7/resource/js/util.js"),
    siteInfo: require("siteinfo.js"),
    tabBar: {
        color: "#123",
        selectedColor: "#1ba9ba",
        borderStyle: "#1ba9ba",
        backgroundColor: "#fff",
        list: [{
            pagePath: "/we7/pages/index/index",
            iconPath: "/we7/resource/icon/home.png",
            selectedIconPath: "/we7/resource/icon/homeselect.png",
            text: "首页"
        }, {
            pagePath: "/we7/pages/user/index/index",
            iconPath: "/we7/resource/icon/user.png",
            selectedIconPath: "/we7/resource/icon/userselect.png",
            text: "微擎我的"
        }]
    },
    globalData: {
        userInfo: null
    }
});