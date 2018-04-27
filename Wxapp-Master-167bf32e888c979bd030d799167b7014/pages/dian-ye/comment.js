import { dg, request, API_HOST, util, _ } from './export'; 

Page({

    /**
     * 页面的初始数据
     */
    data: {
        isAli: dg.os.isAlipay(),
        baseUrl: API_HOST + '/index.php/addon/DuoguanDianDanYe',
        id: 0, //
        page: 1, // 分页
        pageSize: 20, //
        commentList: [], // 评论内容
        anonymity: true, //评论是否匿名
        isShowLoading: false, // 是否展示上拉加载中
        hasMore: false, // 是否还有评论
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if (this.data.isAli) {
            /**
             * 兼容支付宝小程序
             * 支付宝不能出现 违规字段 互动性词汇 例如：评价
             * @date 2017-12-05
             */
            dg.switchTab({url: './index'});
        } else {
            dg.setNavigationBarTitle({
                title: '发表评价',
            })
            this.getIdFromStorage();
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
        this.setData({
            commentList: null,
        })
        this.getIdFromStorage()
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
        this.getIdFromStorage()
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        if (this.data.commentList === null) return;

        this.setData({
            isShowLoading: true,
        })
        this.loadCommentData(this.data.page);
    },

    /**
     * 用户点击右上角分享
     */
    // onShareAppMessage: function () {

    // },

    /**
     * 
     */
    tapAddComment: function (e) {
        // 需要使用时才调用。
        let url = e.currentTarget.dataset.url + `?id=${this.data.id}`
        dg.navigateTo({
            url: url,
        })
    },

    /**
     * 通过Storage获取ID
     */
    getIdFromStorage: function () {
        let res = {}

        try {
            let id = dg.getStorageSync('danYeId')
            if (id > 0) {
                this.setData({
                    id: id,
                    page: 1,
                    hasMore: true,
                })
                this.loadCommentData(this.data.page)
            }
        } catch (e) {
            console.log('catch')
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
        let requestData = { ddy_id: this.data.id, _p: page, timestamp: new Date().getTime() }
        let requestUrl = this.data.baseUrl + '/EvaluationsApi/lists.html'
        request.get(requestUrl, requestData, (data) => {
            dg.stopPullDownRefresh()
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
            this.setData({
                isShowLoading: false,
                hasMore: data.length < this.data.pageSize ? false : true,
                commentList: orginData,
                page: parseInt(page) + 1,
            })
        }, this, { isShowLoading: false })
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

})