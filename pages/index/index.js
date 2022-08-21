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
        user_info_list_blast: []
    },

    navigateToStartGame() {
        wx.navigateTo({
          url: '/pages/start_game/start_game',
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

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
        this.selectRank()
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        var user_info_list = utils.queryUserRank()
        console.log(user_info_list)
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