var api=require("../../api.js"),app=getApp();Page({data:{list:[]},onLoad:function(t){app.pageOnLoad(this),this.setData({status:t.status||0}),this.loadData(t)},loadData:function(t){var a=this;wx.showLoading({title:"加载中"}),app.request({url:api.coupon.index,data:{status:a.data.status},success:function(t){0==t.code&&a.setData({list:t.data.list})},complete:function(){wx.hideLoading()}})},onShow:function(){}}); 
 			