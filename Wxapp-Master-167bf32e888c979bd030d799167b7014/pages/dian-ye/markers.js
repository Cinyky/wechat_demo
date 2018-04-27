import { dg, request, API_HOST, _ } from './export';

Page({

    /**
     * 页面的初始数据
     */
    data: {
        baseUrl: API_HOST + '/index.php/addon/DuoguanDianDanYe',
        markers: [],
        wxLocation: {
            longitude: 0,
            latitude: 0,
        },
        danyeLocation: {
            longitude: 0,
            latitude: 0,
        },
        longitude: 0,
        latitude: 0,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.init(options);
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    // onShareAppMessage: function () {

    // },

    /**
     * 初始化
     */
    init: function (options) {
        this.setData({
            wxLocation: {
                longitude: options.wxLocationLongitude ? options.wxLocationLongitude : 0,
                latitude: options.wxLocationLatitude ? options.wxLocationLatitude : 0,
            },
            danyeLocation: {
                longitude: options.danyeLocationLatitude ? options.danyeLocationLatitude : 0,
                latitude: options.danyeLocationLongitude ? options.danyeLocationLongitude : 0,
            },
            longitude: options.danyeLocationLatitude ? options.danyeLocationLatitude : 0,
            latitude: options.danyeLocationLongitude ? options.danyeLocationLongitude : 0,
        })

        //获取所以区域点
        let requestData = {
            wx_location_longitude: this.data.wxLocation.longitude,
            wx_location_latitude: this.data.wxLocation.latitude
        }
        let requestUrl = this.data.baseUrl + '/SinglePageApi/getMarkers.html'
        request.get(requestUrl, requestData, (data) => {
            data = _.map(data, function (item) {
                return {
                    id: item.id,
                    longitude: item.longitude, latitude: item.latitude,
                    iconPath: "/images/location.png",
                    title: item.name,
                    address: item.address,
                    distance: item.distance,
                    callout: {
                        content: item.name + "(" + item.address + ")",
                        bgColor: '#09BB17',
                        color: '#ffffff',
                        padding: 10,
                        borderRadius: 3,
                        display: 'ALWAYS'
                    },
                };
            });
            this.setData({ markers: data });
        }, this, { isShowLoading: false });
    },

    /**
     * 查看单页
     */
    tapDanYeIndex: function (e) {
        // 同步存储
        dg.setStorageSync('danyeIndexPageId', e.currentTarget.dataset.id)
        dg.setStorageSync('danyeIndexPageFromMarkersPage', 1)

        dg.switchTab({
            url: '../../pages/dian-ye/index',
            fail: function (res) {
                dg.navigateTo({
                    url: '../../pages/dian-ye/index',
                    fail: function (res) {

                    },
                })
            },
        })
    },

    /**
     * 选择地址
     */
    eventSelect: function (e) {
        /**
         * 处理跳转到tabBar 的页面时需要带参数的问题
         * is_form_markers
         */
        let pages = getCurrentPages()
        let currPage = pages[pages.length - 1] // 当前页面 
        let prevPage = pages[pages.length - 2] // 上一个页面
        prevPage.setData({
            is_form_markers: 1,
            markers_location: {
                latitude: e.currentTarget.dataset.latitude,
                longitude: e.currentTarget.dataset.longitude,
            },
        })
        dg.navigateBack() // 返回上一个页面,会调用上一个页面的 onShow
    },

    /**
     * 打开地图
     */
    openLocation: function (e) {
        let dataset = e.currentTarget.dataset;
        let latitude = dataset.latitude, longitude = dataset.longitude, name = dataset.name, address = dataset.address;

        dg.openLocation({
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
            name: name,
            address: address,
            scale: 18,
        })
    },
})