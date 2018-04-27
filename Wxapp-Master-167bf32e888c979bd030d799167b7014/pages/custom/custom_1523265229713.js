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

Page({
    
    data:{
        dgGlobal_options:null,
        
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
        requestUtil.get(url, { id: 13041 }, (data) => {
			that.setData({ config_options: data });
			that.parseVideoUrl(data);
			
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
        var sharePath = 'pages/custom/custom_1523265229713';
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