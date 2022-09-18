// pages/game_record/game_record.js
const utils = require('../../utils/util');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        game_records:[],
        hiddenCurGame: true,
        types: [{value: 'plain', name: '赢单', checked: 'true'},
        {value: 'turnoff', name: '关机'},
        {value: 'blastWin', name: '爆赢'},
        {value: 'blastLose', name: '爆输'}],
        current_game_type: 'plain',
        bomb_cnt: 0,
        game_players: [],
        win_players:[],
        game_info:[]
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
        let game_records = this.data.game_records
        let game_players = this.data.game_players
        let win_players = this.data.win_players
        if (win_players.length == 0) {
            wx.showToast({
                title: '未选择获胜选手',
                icon: 'error',
                duration: 2000
            })
            return;
        }
        let current_game_type = this.data.current_game_type;
        let record = {};
        if (current_game_type == "plain") {
            record["type"] = "赢单";
        } else if (current_game_type == "turnoff") {
            record["type"] = "关机";
        } else if (current_game_type == "blastWin"){
            record["type"] = "爆赢";
        } else {
            record["type"] = "爆输";
        }
        record["bombCnt"] = this.data.bomb_cnt;

        if (win_players.length == 1 && (current_game_type=="blastWin")) {

        } else if (win_players.length == 2 && (current_game_type=="plain"
        || current_game_type=="turnoff")) {

        } else if (win_players.length == 3 &&  current_game_type=="blastLose") {

        } else {
            wx.showToast({
                title: '输入有误',
                icon: 'error',
                duration: 2000
            })
            return;
        }
        let base = utils.queryScoreWinLose(current_game_type, this.data.bomb_cnt)
        let scores = [];
        let game_info = this.data.game_info
        for (let i=0; i < game_players.length; i++) {
            let player = game_players[i];
            let curScore;
            if (win_players.indexOf(player.value) > -1) {
                // 赢
                if (current_game_type == "blastWin") {
                    curScore = base * 3
                } else {
                    curScore = base
                }
            } else {
                // 输
                if (current_game_type == "blastLose") {
                    curScore = -base * 3
                } else {
                    curScore = -base;
                }
            }
            scores.push(curScore)
            game_info.player[i].score = game_info.player[i].score + curScore;
        }
        record["scores"] = scores
        game_records.push(record)
        wx.setStorageSync('game_records', game_records)
        wx.setStorageSync('cur_game', game_info)
        console.log(game_info)
        this.setData ({
            hiddenCurGame: true,
            game_records: game_records,
            game_info:game_info
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
        let game_records = utils.queryGameRecords();
        let game_info = utils.queryGameInfo();
        let game_players = game_info["player"]
        this.setData({
            game_info: game_info,
            game_records: game_records,
            game_players: game_players
        });

        console.log(this.data.game_players)
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

    },

    winPersonChoose(e) {
        let winPlayers = e.detail.value
        this.setData({
            win_players:winPlayers
        })
    },

    bombCntInput(e) {
        this.setData({
            bomb_cnt:Number(e.detail.value)
        })
    },

    endGame(e) {
        utils.addResult();
        wx.setStorageSync('cur_game', "")
        wx.setStorageSync('game_records', [])
        wx.navigateTo({
            url: '/pages/index/index',
        })
    }
})