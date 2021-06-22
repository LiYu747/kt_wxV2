// pages/userAddress/tenement/tenement.js
import address from '../../../vendor/address/address'
import user from '../../../vendor/user/userDetails'
import route from '../../../vendor/request/routes.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formData: [{
      label: '选择小区',
      value: '',
      ploder: '请选择',
      dised: true
    },
    {
      label: '联系电话',
      value: '',
      type: "text"
    }
  ],
  columns: [],//服务端返回的原始数据 
  show: false,
  ids:'',//选择的小区id
  images:[],//上传的图片
  isLoding:false,
  remak:''
  },


//提交
submit(){
  if(this.data.isLoding == true)return;
  if(!this.data.ids){
    wx.showToast({
      title:'请选择小区',
      icon:"none"
    })
    return;
  }
  if(!this.data.remak){
    wx.showToast({
      title:'请输入问题信息',
      icon:"none"
    })
    return;
  }
  address.feedback({
    data:{
      village_id:this.data.ids,
      content:this.data.remak,
      files:this.data.images,
      tel:this.data.formData[1].value
    },
    fail: () => {
      wx.showToast({
        title:'网络错误',
        icon:"none"
      })
    },
    success : (res) => {
      if(res.statusCode != 200) {
        wx.showToast({
          title:'网络出错了',
          icon:"none"
        })
        return;
      }
      if(res.data.code != 200) {
        wx.showToast({
          title:res.data.msg,
          icon:"none"
        })
        return;
      }
      wx.showToast({
        title:res.data.msg,
      })
      const timeout = setTimeout(() => {
        wx.navigateBack({
          delta:1
        })
        clearTimeout(timeout)
      },2000)
    }
  })
},

//获取输入框值
Bulrchenge(e){
  if(e.currentTarget.dataset.index != 1) return;
let val = 'formData[1].value'
this.setData({
  [val] : e.detail.value
})
},

//确定小区选择
onConfirm(e){
 let item = e.detail.value
 let val = 'formData[0].value'
 this.setData({
  [val] :item.name,
  ids:item.id,
  show: false
 })
},

//打开小区选择
celClass(e){
if(e.currentTarget.dataset.index != 0) return;
  this.setData({
    show : true
  })
},
//关闭小区选择
onCancel(){
this.setData({
  show : false
})
},
onClose(){
  this.onCancel()
},

//获取问题信息
Onchange(e){
  this.setData({
    remak : e.detail.value
  })
},

    //上传图片
    upPictures() {
      wx.chooseImage({
        extension: ['jpg', 'jpeg', 'png', 'gif'],
        success: (chooseImageRes) => {
          const files = chooseImageRes.tempFilePaths;
          this.setData({
            isLoding : true
          })
          let that = this;
  
          if (files.length == 0) return;
  
          let func = [];
          files.forEach((item) => {
            func.push(that.upload(item));
          });
  
          Promise.all(func).then((res) => {
            that.setData({
              isLoding : false
            })
          }).catch((err) => {
            that.setData({
              isLoding : false
            })
            wx.showModal({
              title: "上传文件出错:" + err,
            })
          })
        }
      })
    },
    upload(fileItem) {
      let that = this;
      return new Promise((res, rej) => {
        wx.uploadFile({
          url: route.services.file.upload,
          filePath: fileItem,
          name: 'file',
          fail: () => {
            rej('网络出错');
          },
          success: (val) => {
            if (val.statusCode != 200) {
              rej(val.statusCode);
              return;
            }
  
            let jres = JSON.parse(val.data);
  
            if (jres.code != 200) {
              rej(jres.msg);
              return;
            }
         this.data.images.push(jres.data.url)
            that.setData({
              images : this.data.images
            })
            res(jres);
          }
        })
      })
    },

  // 用户所有地址
  userAlladd(){
    address.alladd({
      data: {
      },
      fail: () => {
        this.isLoding = false;
        wx.showToast({
          title: '网络错误',
          icon: 'none'
        })
      },
      success: (res) => {
                
        if (res.statusCode != 200) return;
    
        if (res.data.code != 200) return;
    
        let data = res.data.data;
       var obj = {};
       data = data.reduce((item, next) => {
          obj[next.own_village.name] ? '' : obj[next.own_village.name] = true && item.push(next);
          return item;
       }, []);
        data.map( (item,index) =>{
          this.data.columns.push(item.own_village)
        })
        this.setData({
          columns :   this.data.columns
        })
      }
    })
 },

  // 获取用户资料
  Userdata() {
    user.userDeta({
      data: {},
      fail: (err) => {
        wx.showToast({
          title: '网络错误',
          icon: 'none'
        })
      },
      success: (res) => {
        if (res.statusCode != 200) return;
        if (res.data.code != 200) return;
        let Users = res.data.data
        let val = 'formData[1].value'
        this.setData({
          [val] :  Users.tel
        })
      },
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.userAlladd()
    this.Userdata()
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
  onShareAppMessage: function () {

  }
})