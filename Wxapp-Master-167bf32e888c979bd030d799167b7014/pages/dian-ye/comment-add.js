import { dg, request, API_HOST, util } from './export';

Page({
    data: {
        isAli: dg.os.isAlipay(),
        baseUrl: API_HOST + '/index.php/addon/DuoguanDianDanYe',
        score_arr: [
            {
                'val': 1,
                'ischeck': true
            },
            {
                'val': 2,
                'ischeck': true
            },
            {
                'val': 3,
                'ischeck': true
            },
            {
                'val': 4,
                'ischeck': true
            },
            {
                'val': 5,
                'ischeck': true
            }
        ],
        score: 5,
        imageArray: [],
        submitIsLoading: false,
        buttonIsDisabled: false,
        this_score_val: 5,
        postData: {},
        imgsUrlArr: [],
        ddyId: 0,
    },
    onLoad: function (options) {
        this.ddyId = options.ddy_id;
        this.ddyId = options.id
    },
    onFormSubmit: function (e) {
        let _this = this;
        util.trySyncWechatInfo(function (userInfo) {
            if (!userInfo) {
                dg.alert('用户信息获取失败！');
            }
            _this.formSubmit(e);
        })
    },
    formSubmit: function (e) {
        const values = e.detail.value;
        values.ddy_id = this.ddyId;
        if (values.content == '') {
            dg.alert("对不起，请输入留言内容");
            this.setData({
                submitIsLoading: false,
                buttonIsDisabled: false
            })
            return false;
        }
        this.setData({
            submitIsLoading: true,
            buttonIsDisabled: true
        });

        const pushData = (imgs) => {
            //提交数据
            values.imgs = imgs.join(',');
            let requestUrl = this.data.baseUrl + '/EvaluationsApi/edit.html'
            request.post(requestUrl, values, (info) => {
                console.log(info);
                dg.navigateBack();
            }, this, {
                    completeAfter: () => {
                        this.setData({
                            submitIsLoading: false,
                            buttonIsDisabled: false
                        })
                    }
                });
        };
        if (this.data.imageArray.length)
            this.uploadImage(this.data.imageArray, pushData);
        else
            pushData([]);
    },
    uploadImage: function (paths, callback, imgs) {
        //上传图片
        const path = paths.shift();
        imgs = imgs || [];
        let requestUrl = this.data.baseUrl + '/SinglePageApi/imgUpload.html'
        request.upload(requestUrl, path, 'file', {}, (imgUrl) => {
            imgs.push(imgUrl);
            if (paths.length) {
                this.uploadImage(paths, callback, imgs);
            } else {
                callback.apply(this, [imgs]);
            }
        });
    },
    onScoreTap: function (e) {
        var value = e.currentTarget.dataset.value;
        var datas = this.data.score_arr
        for (var i = 0; i < datas.length; i++) {
            if (i < value) {
                datas[i].ischeck = true
            } else {
                datas[i].ischeck = false
            }
        }
        this.setData({
            score_arr: datas,
            score: value
        })
    },
    onChooseImageTap: function () {
        dg.chooseImage({
            count: 3, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: (res) => {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                var images = this.data.imageArray;
                images = images.concat(this.data.isAli ? res.apFilePaths : res.tempFilePaths);
                if (images.length > 3) {
                    images = images.splice(images.length - 3, images.length - 1);
                }
                this.setData({
                    imageList: images,
                    imageArray: images,
                });
            }
        })
    },
    onDeleteImageTap: function (event) {
        var index = event.currentTarget.dataset.index
        this.data.imageArray.splice(index, 1)
        this.setData({
            imageList: this.data.imageArray
        })
    }
})