// pages/game_record/game_record.js
const utils = require('../../utils/util');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        game_record:[],
        hiddenCurGame: true,
        types: [{value: 'plain', name: '赢单', checked: 'true'},
        {value: 'turnoff', name: '关机'},
        {value: 'blastWin', name: '爆赢'},
        {value: 'blastLose', name: '爆输'}],
        current_game_type: 'plain',
        bomb_cnt: 0
    },

    navigateToIndex() {
        wx.navigateTo({
          url: '/pages/index/index',
        })
    },
    cancelInput() {
        this.setData ({
            hiddenCurGame: true
        })
    },
    confirmInput() {
        // let game_record = this.data.game_record
        // record.no = game_record.length + 1
        // game_record.push(record)
        this.setData ({
            hiddenCurGame: true,
            // game_record: game_record
        })
    },

    newGame() {
        this.setData ({
            hiddenCurGame: false
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
    },

    game_type_change(e) {
        this.setData({
            current_game_type: e.detail.value
        })
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
        let game_record = utils.queryGameRecords();
        let game_info = utils.queryGameInfo();
        this.setData({
            game_info: game_info,
            game_record: game_record
        });
        console.log(this.data.game_info)
        console.log(this.data.game_info)
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