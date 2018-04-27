const app = getApp();
import _ from '../../utils/underscore';
import requestUtil from '../../utils/requestUtil';
import _DuoguanData, { duoguan_host_api_url as API_HOST } from '../../utils/data';
import _function from '../../utils/functionData';
import util from '../../utils/util';
import dg from '../../utils/dg';
import plugUtil from '../../utils/plugUtil';
import wxParse from '../../wxParse/wxParse';
import listener from '../../utils/listener';

const baseUrl_dgDianDanYe = _DuoguanData.duoguan_host_api_url + '/index.php/addon/DuoguanDianDanYe';

Page({
    
    dgDianDanYe_point: { // 跳转到单页列表 需要的参数
        dgDianDanYe_isMultiStore: false, // 默认false为单门店，true为多门店
        isJumpToList: false, // 是否跳转到单页列表（门店列表）        
    },
    
    data:{
        dgGlobal_options:null,
        
        dgDanyeNew_isAli: dg.os.isAlipay(),
        dgDianDanYe_info: null, // 单页信息
        dgDianDanYe_isMultiStore: false, // 默认false为单门店，true为多门店
        dgDianDanYe_isShowService: false,
        dgDianDanYe_danYeId: 0, // 评论ID（微页ID）
        dgDianDanYe_page: 1, // 分页
        dgDianDanYe_pageSize: 20,// 分页大小
        dgDianDanYe_isShowLoading: false, // 是否展示上拉加载中
        dgDianDanYe_hasMore: false, // 是否还有评论
        dgDianDanYe_commentList: [], // 评论内容
        dgDianDanYe_anonymity: true, //评论是否匿名
        dgDianDanYe_location: false, // 默认false为定位失败，true为定位成功
        dgDianDanYe_wxLocation: {
            latitude: 0,
            longitude: 0,
        },
        dgDanye_name: {
            showName: '店铺展示',
            listName: '店铺列表',
            serviceName: '店铺服务',
            introductionName: '店铺简介',
            evaluationName: '店铺评价',
        },
        dgDianDanYe_intro: {
            nodes: {},
        },
				dgDianDanYe_markers:null,
				dgDianDanYe_covers:null,
        
    dgBigCms_tabIndex: '',//选项卡索引（发现）
    dgBigCms_page: 1,//当前请求的页数
    dgBigCms_cate_data: [],//分类
    dgBigCms_c_data: [],//内容数据
    dgBigCms_picdata: [],//轮播图
    dgBigCms_indicatorDots: true,//是否面板指示点
    dgBigCms_autoPlay: true,//是否自动切换
    dgBigCms_change_title: '',//查询标题
    dgBigCms_title: '',
    dgBigCms_this_page_size: 1,
    dgBigCms_this_page_num: 10,
    dgBigCms_is_load_more: true,
    dgBigCms_is_rmd: 1,//是否推荐
    dgBigCms_cid: '',//分类id（详情页根据分类传递）
    dgBigCms_keyword: "",//关键词
    
    },
    onLoad:function(options) {
        this.setData({dgGlobal_options:options});
        this.loadControlOptions(options);
    },
    /**
    * 加载页面组件配置数据
    */
    loadControlOptions: function (options) {
        var that = this;
        const url = API_HOST + '/index.php/addon/DuoguanUser/Api/getCustomConfig';
        requestUtil.get(url, { id: 13040 }, (data) => {
			that.setData({ config_options: data });
			that.parseVideoUrl(data);
			
            that.dgDanYeNewOnLoad(options);
            
    that.dgBigCmsLoad();
    
        });
    },
    
	/**
	 * 解析视频地址
	 */
    parseVideoUrl: function (options) {
        const videos = [];
        for (const key in options) {
            const item = options[key];
            if (item.autoplay !== undefined && item.src !== undefined) {
                videos.push(item);
            }
        }
        if (videos.length === 0) return;
        
        requestUtil.post(API_HOST + '/index.php/home/utils/parseVideoUrls', {
            urls: JSON.stringify(videos.map(item => item.src))
        }, (data) => {
            for (let i = 0; i < data.length; i++) {
                const url = data[i];
                videos[i].src = url;
            }
            this.setData({ config_options: options });
        });
    },
    
    //下拉刷新
    onPullDownRefresh: function () {
        var that = this;
        that.onLoad(that.data.dgGlobal_options);
        setTimeout(() => {
            wx.stopPullDownRefresh();
        }, 1000);
    },
    onShareAppMessage: function () {
        var that = this;
        var shareTitle = '新页面';
        var shareDesc = '新页面';
        var sharePath = 'pages/custom/custom_1523265145988';
        return {
            title: shareTitle,
            desc: shareDesc,
            imageUrl:'',
            path: sharePath
        }
    },
    /**
     * 拨打电话
     */
    onCallTap: function (e) {
        const dataset = e.currentTarget.dataset || e.target.dataset, mobile = dataset.mobile,tips = dataset.tips;
        if (!mobile) return;
        const msg = tips || '你将要拨打电话：' + mobile;

        wx.showModal({
            title: '温馨提示',
            content: msg,
            success: (res) => {
                if (res.cancel) return;
                wx.makePhoneCall({ phoneNumber: mobile, });
            }
        });
    },

    /**
     * 跳转页面
     */
    onNavigateTap: function (e) {
       const dataset = e.detail.target ? e.detail.target.dataset : e.currentTarget.dataset;
        const url = dataset.url, type = dataset.type, nav = { url: url }, appId = dataset.appId;
        if (dataset.invalid) return console.warn('链接已被禁用');
        if (!url) return console.warn('页面地址未配置');

        if (e.detail.formId) requestUtil.pushFormId(e.detail.formId);

        if (type === 'mini') {
            wx.navigateToMiniProgram({
                appId: appId, path: url, fail: (err) => {
                    console.error(err);
                }
            });
        } else {
            wx.navigateTo({
                url: url, fail: () => {
                    wx.switchTab({
                        url: url,
                    });
                }
            });
        }
    },

    /**
     * 预览视图
     */
    onPreviewTap: function (e) {
        let dataset = e.target.dataset, index = dataset.index, url = dataset.url;
        if (index === undefined && url === undefined) return;

        let urls = e.currentTarget.dataset.urls;
        urls = urls === undefined ? [] : urls;
        if (index !== undefined && !url) url = urls[index];
        wx.previewImage({ current: url, urls: urls });
    },
    

    dgDanYeNewOnLoad: function (options) {
        let listName = this.dgDanyeLoadListName();
        options.id || (options.id = 0)
        if (options.id != 0) {
            // 根据ID获取单页信息，如果单页是tabBar 的页面的路径，则跳转不过来。
            let requestUrl = baseUrl_dgDianDanYe + '/SinglePageApi/getMarkersById.html'
            requestUtil.get(requestUrl, { id: options.id }, (data) => {
                this.dgDianDanYeInitialize(data)
            })
        } else {           
            // 获取默认单页信息
            let requestUrl = baseUrl_dgDianDanYe + '/SinglePageApi/getDefaultMarkers.html'
            requestUtil.get(requestUrl, {}, (data) => {
                this.dgDianDanYeInitialize(data)
            })
            this.dgDianDanYeGetLocation(listName);
        }
    },

    dgDanYeNewOnShow: function () {
        try {
            // 同步存储      
            let danyeIndexPageFromMarkersPage = dg.getStorageSync('danyeIndexPageFromMarkersPage')
            if (parseInt(danyeIndexPageFromMarkersPage) == 1) {
                let id = dg.getStorageSync('danyeIndexPageId')
                id || (id = 0)
                if (id != 0) {
                    // 根据ID获取单页信息，如果单页是tabBar 的页面的路径，则跳转不过来。
                    let postdata = { id: id, wx_location_longitude: this.data.dgDianDanYe_wxLocation.longitude, wx_location_latitude: this.data.dgDianDanYe_wxLocation.latitude }
                    requestUtil.get(baseUrl_dgDianDanYe + '/SinglePageApi/getMarkersById.html', postdata, (data) => {
                        this.dgDianDanYeInitialize(data)
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
     * 初次加载单页信息
     */
    dgDianDanYeInitialize: function (data) {
        this.setData({
            dgDianDanYe_info: data,
            dgDianDanYe_danYeId: data.id,
            dgDianDanYe_page: 1,
            dgDianDanYe_hasMore: true,
            dgDianDanYe_isShowLoading: false,
            dgDianDanYe_isShowService: data.service.length > 0 ? true : false,
        })

				let latitude = parseFloat(this.data.dgDianDanYe_info.location.latitude)
				let longitude = parseFloat(this.data.dgDianDanYe_info.location.longitude)
				let name = this.data.dgDianDanYe_info.name
				let address = this.data.dgDianDanYe_info.address
				let iconPath = "/images/location.png"

				let markers = new Array()
				let marker = {
					id : 1,
					latitude: parseFloat(latitude),
					longitude: parseFloat(longitude),
					name: name,
				}
				markers.push(marker)
			  let covers = new Array()
				let cover = {
					latitude: parseFloat(latitude),
					longitude: parseFloat(longitude),
				}
				covers.push(cover)
				covers.push(cover)
				this.setData({
					dgDianDanYe_markers: markers,
					dgDianDanYe_covers: covers
				})
        dg.setStorageSync('danYeId', data.id)
        wxParse.wxParse('dgDianDanYe_intro', 'html', data.intro, this) // 处理富文本
        this.loadCommentData(this.data.dgDianDanYe_page)
    },

    /**
     * 用户点击联系客服之后，拨打客户发电话
     */
    dgDianDanYeTapMakePhoneCall: function (e) {
        let phoneNumber = e.currentTarget.dataset.phoneNumber
        dg.makePhoneCall({
            phoneNumber: phoneNumber,
        })
    },

    /**
     * 跳转到标记地图页面
     */
    tagMarkers: function (e) {
        let latitude = this.data.dgDianDanYe_info.location.latitude
        let longitude = this.data.dgDianDanYe_info.location.longitude
        let name = this.data.dgDianDanYe_info.name
        let address = this.data.dgDianDanYe_info.address
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
    dgDianDanYeTapSelectList: function (e) {
        if (typeof (e.isJumpToList) != "undefined") {
            /**
             * 用户建议：如果单页是多店，可以显示图文列表页，如果是单页直接显示单页
             * 满足的条件
             * 定位成功是大前提
             * 是多单页
             * 后台设置了跳转到单页列表
             * @date 2017-11-23
             */
            if (!(e.isJumpToList && e.dgDianDanYe_isMultiStore)) return false;
        }

        if (this.data.dgDianDanYe_location == true || this.data.dgDanyeNew_isAli) {
            dg.navigateTo({
                url: '/pages/dian-ye/markers' +
                '?wxLocationLatitude=' + this.data.dgDianDanYe_wxLocation.latitude +
                '&wxLocationLongitude=' + this.data.dgDianDanYe_wxLocation.longitude +
                '&danyeLocationLatitude=' + this.data.dgDianDanYe_info.location.latitude +
                '&danyeLocationLongitude=' + this.data.dgDianDanYe_info.location.longitude,
            })
        } else {
            if (this.data.dgDanyeNew_isAli) {
                /**
                 * 支付宝目前定位授权未处理
                 * @date 2017-11-23
                 * @auther 魏亚辉
                 */
                dg.navigateTo({
                    url: '/pages/dian-ye/markers' +
                    '?wxLocationLatitude=' + this.data.dgDianDanYe_wxLocation.latitude +
                    '&wxLocationLongitude=' + this.data.dgDianDanYe_wxLocation.longitude +
                    '&danyeLocationLatitude=' + this.data.dgDianDanYe_info.location.latitude +
                    '&danyeLocationLongitude=' + this.data.dgDianDanYe_info.location.longitude,
                })
            }
            dg.showToast({
                title: '定位失败！',
                icon: 'success',
                duration: 3000,
            })
        }
    },

    /**
     * 跳转到店铺展示页面
     */
    dgDianDanYeTapShowShop: function (e) {
        dg.navigateTo({
            url: `/pages/dian-ye/img-show?id=${this.data.dgDianDanYe_info.id}`,
            success: function (res) {
                // console.log('success')
            },
        })
    },

    /**
     * 获取本地微信客户端的经纬度
     */
    dgDianDanYeGetLocation: function (e) {
        let _this = this

        try {
            let wxLocation = dg.getStorageSync('danyeWxLocation')
            if (wxLocation == '') {
                dg.getLocation({
                    // type: 'gcj02',
                    success: function (res) {
                        _this.setData({
                            dgDianDanYe_wxLocation: {
                                latitude: res.latitude,
                                longitude: res.longitude,
                            },
                            dgDianDanYe_location: true,
                        })
                        dg.setStorageSync('danyeWxLocation', _this.data.dgDianDanYe_wxLocation);

                        _this.dgDianDanYeTapSelectList(_this.dgDianDanYe_point); // 是否跳转到单页列表
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
                    dgDianDanYe_wxLocation: {
                        latitude: wxLocation.latitude,
                        longitude: wxLocation.longitude,
                    },
                    dgDianDanYe_location: true,
                })
            }

            dg.stopPullDownRefresh()

            // 刷新单页
            let requestData = {
                latitude: this.data.dgDianDanYe_wxLocation.latitude,
                longitude: this.data.dgDianDanYe_wxLocation.longitude,
                wx_location_latitude: this.data.dgDianDanYe_wxLocation.latitude,
                wx_location_longitude: this.data.dgDianDanYe_wxLocation.longitude,
            }
            let requestUrl = baseUrl_dgDianDanYe + '/SinglePageApi/config.html'
            requestUtil.get(requestUrl, requestData, (data) => {
                this.setData({
                    dgDianDanYe_info: data,
                    dgDianDanYe_danYeId: data.id,
                    dgDianDanYe_page: 1,
                    dgDianDanYe_hasMore: true,
                    dgDianDanYe_isShowLoading: false,
                    dgDianDanYe_isShowService: data.service.length > 0 ? true : false,
                })
                dg.setStorageSync('danYeId', data.id)
                if (!this.data.canIUseRichText)
                    wxParse.wxParse('dgDianDanYe_intro', 'html', data.intro, this) // 处理富文本
                this.loadCommentData(this.data.dgDianDanYe_page)

                let _this = this;
                _this.dgDianDanYeTapSelectList(_this.dgDianDanYe_point); // 是否跳转到单页列表
            })
        } catch (e) {

        }
    },

    /**
     * 加载评论数据
     */
    loadCommentData: function (page) {
        if (!this.data.dgDianDanYe_hasMore) {
            this.setData({
                dgDianDanYe_isShowLoading: false,
            })
            return false
        }
        
        let limit = this.data.config_options['dg-diandanye-shop-evaluate'].listNumber || 2; // 兼容处理

        let requestData = { ddy_id: this.data.dgDianDanYe_danYeId, _p: page, _r: limit }
        let requestUrl = baseUrl_dgDianDanYe + '/EvaluationsApi/lists.html'
        requestUtil.get(requestUrl, requestData, (data) => {
            let orginData = this.data.dgDianDanYe_commentList;
            data = data || [];
            if (data.length != 0)
                _(data).map((item) => {
                    item.create_time = util.format(item.create_time * 1000, 'yyyy-MM-dd')
                    item.test_id = Date.parse(new Date())
                    item.nickname = this.handleNickname(item.nickname, this.data.dgDianDanYe_anonymity)
                    return item
                })
            orginData = page == 1 ? (data || []) : orginData.concat(data || []);
            orginData = orginData.concat(data || []);
            this.setData({
                dgDianDanYe_isShowLoading: false,
                dgDianDanYe_hasMore: data.length < this.data.dgDianDanYe_pageSize ? false : true,
                dgDianDanYe_commentList: orginData,
                dgDianDanYe_page: parseInt(page) + 1,
            })
        })
    },

    /**
     * 隐藏名字
     */
    handleNickname: function (nickname, dgDianDanYe_anonymity = true) {
        return dgDianDanYe_anonymity ? (nickname ? (nickname.substr(0, 1) + '***' + nickname.substr(-1)) : '***') : (nickname || "")
    },

    /**
     * 预览图片
     */
    dgDianDanYeTapPreviewImage: function (e) {
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
        let url = '/pages/dian-ye/comment'
        dg.navigateTo({
            url: url,
        })
    },

    // 获取店铺中的列表名
    dgDanyeLoadListName: function () {
        const that = this
        let requestUrl = baseUrl_dgDianDanYe + '/NameApi/getName.html'
        requestUtil.get(requestUrl, {}, (data) => {
            let d_name = {
                showName: data.showname,
                listName: data.listname,
                serviceName: data.servicename,
                introductionName: data.introductionname,
                evaluationName: data.evaluationname,
            }
            that.setData({
                dgDanye_name: d_name,
                dgDianDanYe_isMultiStore: data.isMultiStore,
            });

            this.dgDianDanYe_point = {
                dgDianDanYe_isMultiStore: data.isMultiStore,
                isJumpToList: data.isJumpToList
            }
        })
    },
    
    
  dgBigCmsLoad: function () {
    this.dgBigCmsGetBigcmsList();//请求加载数据
    this.dgBigCmsGetCarousel();//获取轮播图
    this.dgBigCmsGetCatelist();//获取分类
  },

  dgBigCmsInit: function () {
    var that = this;
    that.setData({ dgBigCms_this_page_size: 1 });
    that.dgBigCmsGetBigcmsList();//请求内容列表
    this.dgBigCmsGetCarousel();//获取轮播图
    //加载插件
    plugUtil.popup(this, "DuoguanBigCms");
  },
  dgBigCmsBottom: function () {
    var that = this;
    if (that.data.dgBigCms_is_load_more == false) {
      wx.hideNavigationBarLoading();
      return false;
    } else {
      that.setData({ dgBigCms_this_page_size: ++that.data.dgBigCms_this_page_size });
      that.dgBigCmsGetBigcmsList(true);//请求内容列表
    }
  },

  //获取分类
  dgBigCmsGetCatelist: function () {
    var that = this;
    //分类
    requestUtil.get(_DuoguanData.duoguan_host_api_url + "/index.php?s=/addon/DuoguanBigCms/Api/getCateList.html", {}, (data) => {
      that.setData({ dgBigCms_cate_data: data });
    }, this, {});
  },
  //获取轮播图
  dgBigCmsGetCarousel: function () {
    var that = this;
    // 轮播图
    requestUtil.get(_DuoguanData.duoguan_host_api_url + "/index.php?s=/addon/DuoguanBigCms/Api/getCarousel.html", {}, (data) => {
      that.setData({ dgBigCms_picdata: data });//轮播图信息
      // 是否自动切换
      if (data.apdata == 1) {
        that.setData({ dgBigCms_autoPlay: true });
      } else {
        that.setData({ dgBigCms_autoPlay: false });
      }
      // 是否显示面板指示点
      if (data.iddata == 1) {
        that.setData({ dgBigCms_indicatorDots: true });
      } else {
        that.setData({ dgBigCms_indicatorDots: false });
      }
    }, this, {});
  },

  //请求获取内容列表
  dgBigCmsGetBigcmsList: function (isShowLoading) {
    var that = this;
    var cid = that.data.dgBigCms_cid;
    var keyword = that.data.dgBigCms_keyword;

    var this_data = that.data.dgBigCms_c_data;
    isShowLoading = isShowLoading || false;

    var requestData = {};
    if (cid) {
      that.setData({
        dgBigCms_is_rmd: 0,
        dgBigCms_tabIndex: cid,
      })
    }
    if (keyword) {
      that.setData({
        dgBigCms_is_rmd: 0,
      })
    }

    //配置的首页列表数量
    var list_num_index = that.data.config_options['dg-cmsB-article-list']['store_num'];
    requestData.pagenum = list_num_index ? list_num_index * 5 :2;

    requestData.cateid = that.data.dgBigCms_tabIndex;
    requestData.pagesize = that.data.dgBigCms_this_page_size;
    // requestData.pagenum = that.data.dgBigCms_this_page_num;
    requestData.change_title = that.data.dgBigCms_change_title;
    requestData.is_rmd = that.data.dgBigCms_is_rmd;
    requestData.keyword = that.data.dgBigCms_keyword;
    

    requestUtil.get(_DuoguanData.duoguan_host_api_url + "/index.php?s=/addon/DuoguanBigCms/Api/getIndexDataList.html", requestData, (data) => {
      if (data == null || data == '') {
        that.setData({ dgBigCms_is_load_more: false });
      } else {
        if (that.data.dgBigCms_this_page_size == 1 && data.length < that.data.dgBigCms_this_page_num) {
          that.setData({ dgBigCms_c_data: data, dgBigCms_is_load_more: false });
        } else if (that.data.dgBigCms_this_page_size == 1 && data.length == that.data.dgBigCms_this_page_num) {
          that.setData({ dgBigCms_c_data: data, dgBigCms_is_load_more: true });
        } else if (that.data.dgBigCms_this_page_size > 1) {
          this_data = this_data.concat(data);
          that.setData({ dgBigCms_c_data: this_data, dgBigCms_is_load_more: true });
        }
      }

    }, this, { completeAfter: wx.stopPullDownRefresh, isShowLoading: isShowLoading });
  },

  dgBigCmsOnTabChangeTap: function (e) {
    //切换选项卡
    const that = this;
    that.setData({ dgBigCms_is_load_more: true })
    var index = e.currentTarget.dataset.tabIndex;
    if (index == 'rmd') {
      that.setData({ dgBigCms_tabIndex: '', dgBigCms_is_rmd: 1, dgBigCms_change_title: '', dgBigCms_this_page_size: 1, dgBigCms_this_page_num: 10, dgBigCms_c_data: [], dgBigCms_cid: '', dgBigCms_keyword: '' });
    } else {
      that.setData({ dgBigCms_tabIndex: index, dgBigCms_is_rmd: 0, dgBigCms_change_title: '', dgBigCms_this_page_size: '1', dgBigCms_c_data: [], dgBigCms_cid: '', dgBigCms_keyword: '' });
    }
    that.dgBigCmsGetBigcmsList();//加载数据
  },
  //搜索
  dgBigCmsSearchTitle: function (e) {
    this.setData({ dgBigCms_title: e.detail.value, dgBigCms_is_load_more: true });
  },
  dgBigCmsOnSearch: function (e) {
    var that = this;
    var title = that.data.dgBigCms_title;
    that.setData({ dgBigCms_change_title: title, dgBigCms_this_page_size: 1, dgBigCms_c_data: [], dgBigCms_tabIndex: '', dgBigCms_cid: '', dgBigCms_keyword: '' });
    that.dgBigCmsGetBigcmsList();//加载数据
  },
  // 关闭搜索
  dgBigCmsCloseSearch: function (e) {
    var that = this;
    that.setData({ dgBigCms_title: '', dgBigCms_search_open_status: false,});//清除搜索名
    var chtitle = that.data.dgBigCms_change_title;

    if (chtitle) {
      that.setData({  dgBigCms_tabIndex: '', dgBigCms_is_rmd: 1, dgBigCms_change_title: '', dgBigCms_this_page_size: 1, dgBigCms_this_page_num: 10, dgBigCms_c_data: [], dgBigCms_cid: '', dgBigCms_keyword: '' });
      that.dgBigCmsGetBigcmsList();//加载数据
    }
  },
  dgBigCmsOnNavIndex:function(e){
    var url = e.currentTarget.dataset.url;
    //跳转模块首页
    wx.switchTab({
      url: url,
      fail: function (e) {
        wx.navigateTo({
          url: url,
        })
      },
    })
  },
  dgBigCmsOnNavigateTap: function (e) {
    //跳转页面
    wx.navigateTo({
      url: e.currentTarget.dataset.url
    })
  },
  dgBigCmsOnLunboContent: function (e) {
    //轮播跳转页面
    wx.navigateTo({
      url: e.currentTarget.dataset.url
    })
  },
  
  //生成页面二维码
  dgBigCmsGetCode: function (e) {
    const that = this;
    const url = _DuoguanData.duoguan_host_api_url + "/index.php?s=/addon/DuoguanBigCms/Api/FXIndexCode.html&&token=" + _DuoguanData.duoguan_user_token + "&_r=" + (new Date().getTime());
    wx.showToast({
      title: '正在努力加载中...',
      icon: 'loading',
      duration: 10000
    });
    wx.getImageInfo({
      src: url,
      success: (res) => {
        wx.hideToast();
        wx.previewImage({
          current: res.path,
          urls: [res.path],
        });
      },
      fail: function (res) {
        console.error(res);
        wx.showModal({ content: '加载失败！', showCancel: false, });
        wx.hideToast();
      },
      complete: function (res) {
        console.log(res)
      }
    });
  },

  changeSearchStatus: function () {
    this.setData({ dgBigCms_search_open_status: this.data.dgBigCms_search_open_status ? false : true });
  },
  
})