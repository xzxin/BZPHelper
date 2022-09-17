// pages/index/index.js
const utils = require('../../utils/util');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        selectedRank: true,
        selectedBlast: false,
        rankHeader: ["排名", "选手","胜率","总局","胜局"],
        blastHeader: ["排名", "选手","胜率","总局","胜局"],
        user_info_list_rank: [],
        user_info_list_blast: [],
        game_now_info: ""
    },

    navigateToStartGame() {
        if (wx.getStorageSync('cur_game') != null && wx.getStorageSync('cur_game')!="") {
            wx.showToast({
                title: '存在进行中牌局',
                icon: 'error',
                duration: 2000
              })
              return;
        }
        wx.navigateTo({
          url: '/pages/start_game/start_game',
        })
    },

    navigateToGameRecord() {
        console.log(wx.getStorageSync('cur_game'))
        if (wx.getStorageSync('cur_game') == null || wx.getStorageSync('cur_game')=="") {
              return;
        }
        wx.navigateTo({
          url: '/pages/game_record/game_record',
        })
    },

    selectRank() {
        var user_info = utils.queryUserRank()
        this.setData({
            selectedRank: true,
            selectedBlast: false,
            user_info_list_rank: user_info
        })
    },

    
    selectedBlast() {
        var user_info = utils.queryUserBlast()
        this.setData({
            selectedRank: false,
            selectedBlast: true,
            user_info_list_blast: user_info
        })
    },

    setCurGame() {
        let game_info = wx.getStorageSync('cur_game')
        let game_info_str = game_info === "" ? "无" : game_info["name"]
        this.setData({
            game_now_info: game_info_str
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        this.selectRank()
        this.setCurGame()
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})