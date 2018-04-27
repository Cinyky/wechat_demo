import { dg, request, API_HOST, util, _, wxParse, _DuoguanData } from './export';

Page({
    shareInfo: null,
    point: { // 跳转到单页列表 需要的参数
        isMultiStore: false, // 默认false为单门店，true为多门店
        isJumpToList: false, // 是否跳转到单页列表（门店列表）        
    },
    data: {
        baseUrl: _DuoguanData.duoguan_host_api_url + '/index.php/addon/DuoguanDianDanYe',
        isAli: dg.os.isAlipay(),
        info: null, // 单页信息
        isMultiStore: false, // 默认false为单门店，true为多门店
        isShowService: false, // 
        // canIUseRichText: dg.canIUse('rich-text'), // 兼容处理微信rich-text组件
        canIUseRichText: false, // 兼容处理
        danYeId: 0, // 评论ID（微页ID）
        page: 1, // 分页
        pageSize: 20,// 分页大小
        commentList: [], // 评论内容
        anonymity: true, //评论是否匿名
        isShowLoading: false, // 是否展示上拉加载中
        hasMore: false, // 是否还有评论
        location: false, // 默认false为定位失败，true为定位成功
        wxLocation: {
            latitude: 0,
            longitude: 0,
        },
        name: {
            showName: '店铺展示',
            listName: '店铺列表',
            serviceName: '店铺服务',
            introductionName: '店铺简介',
            evaluationName: '店铺评价',
        },
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let listName = this.loadListName();
        options.id || (options.id = 0)
        if (options.id != 0) {
            // 根据ID获取单页信息，如果单页是tabBar 的页面的路径，则跳转不过来。
            let requestUrl = this.data.baseUrl + '/SinglePageApi/getMarkersById.html'
            request.get(requestUrl, { id: options.id }, (data) => {
                this.initialize(data)
            })
        } else {
            // 获取默认单页信息
            let requestUrl = this.data.baseUrl + '/SinglePageApi/getDefaultMarkers.html'
            request.get(requestUrl, {}, (data) => {
                this.initialize(data)
            })
            this.getLocation(listName);
        }
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
        try {
            // 同步存储      
            let danyeIndexPageFromMarkersPage = dg.getStorageSync('danyeIndexPageFromMarkersPage')
            if (parseInt(danyeIndexPageFromMarkersPage) == 1) {
                let id = dg.getStorageSync('danyeIndexPageId')
                id || (id = 0)
                if (id != 0) {
                    // 根据ID获取单页信息，如果单页是tabBar 的页面的路径，则跳转不过来。
                    let postdata = { id: id, wx_location_longitude: this.data.wxLocation.longitude, wx_location_latitude: this.data.wxLocation.latitude }
                    request.get(this.data.baseUrl + '/SinglePageApi/getMarkersById.html', postdata, (data) => {
                        this.initialize(data)
                    })
                }
                dg.setStorageSync('danyeIndexPageFromMarkersPage', 0)
                return false
            }
        } catch (e) {
            // console.log('catch')
        }
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
        this.getLocation()
    },

    /**
     * 页面上拉触底事件的处理函数(滚动加载)
     */
    onReachBottom: function (e) {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        this.shareInfo = this.shareInfo || {};
        const title = this.shareInfo.title || '';
        const desc = this.shareInfo.desc || '';
        return {
            title: title,
            desc: desc,
            path: 'pages/dian-ye/index'
        }
    },

    /**
     * 初次加载单页信息
     */
    initialize: function (data) {
        this.setData({
            info: data,
            danYeId: data.id,
            page: 1,
            hasMore: true,
            isShowLoading: false,
            isShowService: data.service.length > 0 ? true : false,
        })
        dg.setStorageSync('danYeId', data.id)
        if (!this.data.canIUseRichText)
            wxParse.wxParse('intro', 'html', data.intro, this) // 处理富文本
        this.loadCommentData(this.data.page)

        //获取分享信息，先关闭分享按钮
        dg.hideShareMenu();
        let requestUrl = _DuoguanData.duoguan_host_api_url + "/index.php/addon/DuoguanUser/Api/getShareInfo.html";
        request.get(requestUrl, { mmodule: 'duoguan_danye' }, (info) => {
            this.shareInfo = info;
            dg.showShareMenu();
        }, this, { isShowLoading: false });
    },

    /**
     * 用户点击联系客服之后，拨打客户发电话
     */
    tapMakePhoneCall: function (e) {
        let phoneNumber = e.currentTarget.dataset.phoneNumber
        dg.makePhoneCall({
            phoneNumber: phoneNumber,
        })
    },

    /**
     * 跳转到标记地图页面
     */
    tagMarkers: function (e) {
        let latitude = this.data.info.location.latitude
        let longitude = this.data.info.location.longitude
        let name = this.data.info.name
        let address = this.data.info.address
        dg.openLocation({
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
            name: name,
            address: address,
            scale: 18,
        })
    },

    /**
     * 选择门店列表
     */
    tapSelectList: function (e) {     
        if (typeof(e.isJumpToList) != "undefined") {
            /**
             * 用户建议：如果单页是多店，可以显示图文列表页，如果是单页直接显示单页
             * 满足的条件
             * 定位成功是大前提
             * 是多单页
             * 后台设置了跳转到单页列表
             * @date 2017-11-23
             */
            if ( !(e.isJumpToList && e.isMultiStore) ) return false;
        }

        if (this.data.location == true || this.data.isAli) {
            dg.navigateTo({
                url: '../../pages/dian-ye/markers' +
                '?wxLocationLatitude=' + this.data.wxLocation.latitude +
                '&wxLocationLongitude=' + this.data.wxLocation.longitude +
                '&danyeLocationLatitude=' + this.data.info.location.latitude +
                '&danyeLocationLongitude=' + this.data.info.location.longitude,
            })
        } else {
            if (this.data.isAli) {
                /**
                 * 支付宝目前定位授权未处理
                 * @date 2017-11-23
                 * @auther 魏亚辉
                 */
                dg.navigateTo({
                    url: '../../pages/dian-ye/markers' +
                    '?wxLocationLatitude=' + this.data.wxLocation.latitude +
                    '&wxLocationLongitude=' + this.data.wxLocation.longitude +
                    '&danyeLocationLatitude=' + this.data.info.location.latitude +
                    '&danyeLocationLongitude=' + this.data.info.location.longitude,
                })  
            }
            dg.showToast({
                title: '定位失败，请下拉刷新！',
                icon: 'success',
                duration: 3000,
            })
        }
    },

    /**
     * 跳转到店铺展示页面
     */
    tapShowShop: function (e) {
        dg.navigateTo({
            url: `img-show?id=${this.data.info.id}&title=${this.data.name.showName}`,
        })
    },

    /**
     * 获取本地微信客户端的经纬度
     */
    getLocation: function (e) {
        let _this = this

        try {
            let wxLocation = dg.getStorageSync('danyeWxLocation')
            if (wxLocation == '') {
                dg.getLocation({
                    // type: 'gcj02',
                    success: function (res) {
                        _this.setData({
                            wxLocation: {
                                latitude: res.latitude,
                                longitude: res.longitude,
                            },
                            location: true,
                        })
                        dg.setStorageSync('danyeWxLocation', _this.data.wxLocation);
                        
                        _this.tapSelectList(_this.point); // 是否跳转到单页列表
                    },
                    fail: function (res) {
                        dg.showToast({
                            title: '定位失败！',
                            icon: 'success',
                            duration: 3000,
                        });
                        return false
                    },
                })
            } else {
                this.setData({
                    wxLocation: {
                        latitude: wxLocation.latitude,
                        longitude: wxLocation.longitude,
                    },
                    location: true,
                })
            }

            dg.stopPullDownRefresh()

            // 刷新单页
            let requestData = {
                latitude: this.data.wxLocation.latitude,
                longitude: this.data.wxLocation.longitude,
                wx_location_latitude: this.data.wxLocation.latitude,
                wx_location_longitude: this.data.wxLocation.longitude,
            }
            let requestUrl = this.data.baseUrl + '/SinglePageApi/config.html'
            request.get(requestUrl, requestData, (data) => {
                this.setData({
                    info: data,
                    danYeId: data.id,
                    page: 1,
                    hasMore: true,
                    isShowLoading: false,
                    isShowService: data.service.length > 0 ? true : false,
                })
                dg.setStorageSync('danYeId', data.id)
                if (!this.data.canIUseRichText)
                    wxParse.wxParse('intro', 'html', data.intro, this) // 处理富文本
                this.loadCommentData(this.data.page)

                let _this = this;
                _this.tapSelectList(_this.point); // 是否跳转到单页列表
            })
        } catch (e) {

        }
    },

    /**
     * 加载评论数据
     */
    loadCommentData: function (page) {
        if (!this.data.hasMore) {
            this.setData({
                isShowLoading: false,
            })
            return false
        }
        let requestData = { ddy_id: this.data.danYeId, _p: page }
        let requestUrl = this.data.baseUrl + '/EvaluationsApi/lists.html'
        request.get(requestUrl, requestData, (data) => {
            let orginData = this.data.commentList;
            data = data || [];
            if (data.length != 0)
                _(data).map((item) => {
                    item.create_time = util.format(item.create_time * 1000, 'yyyy-MM-dd')
                    item.test_id = Date.parse(new Date())
                    item.nickname = this.handleNickname(item.nickname, this.data.anonymity)
                    return item
                })
            orginData = page == 1 ? (data || []) : orginData.concat(data || []);
            // orginData = orginData.concat(data || []);
            this.setData({
                isShowLoading: false,
                hasMore: data.length < this.data.pageSize ? false : true,
                commentList: orginData,
                page: parseInt(page) + 1,
            })
        })
    },

    /**
     * 隐藏名字
     */
    handleNickname: function (nickname, anonymity = true) {
        return anonymity ? (nickname ? (nickname.substr(0, 1) + '***' + nickname.substr(-1)) : '***') : (nickname || "")
    },

    /**
     * 预览图片
     */
    tapPreviewImage: function (e) {
        dg.previewImage({
            current: e.currentTarget.dataset.url, // 当前显示图片的http链接
            urls: e.currentTarget.dataset.images,// 需要预览的图片http链接列表
        })
    },

    /**
     * 显示店铺评价列表
     */
    tapShowComment: function (e) {
        // let id = e.currentTarget.dataset.id
        let url = './comment'
        dg.navigateTo({
            url: url,
        })
    },

    // 获取店铺中的列表名
    loadListName: function () {
        const that = this
        let requestUrl = this.data.baseUrl + '/NameApi/getName.html'
        request.get(requestUrl, {}, (data) => {
            let d_name = {
                showName: data.showname,
                listName: data.listname,
                serviceName: data.servicename,
                introductionName: data.introductionname,
                evaluationName: data.evaluationname,
            }
            that.setData({
                name: d_name,
                isMultiStore: data.isMultiStore,
            });

            this.point = {
                isMultiStore: data.isMultiStore,
                isJumpToList: data.isJumpToList                
            }
        })
    },
})