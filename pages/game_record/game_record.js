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
        win_players:[]
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
        } else {
            record["type"] = "爆牌";
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
        for (let i=0; i < game_players.length; i++) {
            let player = game_players[i];
            if (win_players.indexOf(player.value) > -1) {
                // 赢
                if (current_game_type == "blastLose") {
                    scores.push(base)
                } else if (current_game_type == "blastWin") {
                    scores.push(base * 3)
                } else {
                    scores.push(base)
                }
            } else {
                // 输
                if (current_game_type == "blastLose") {
                    scores.push(-base * 3)
                } else if (current_game_type == "blastWin") {
                    scores.push(-base)
                } else {
                    scores.push(-base)
                }
            }
        }
        record["scores"] = scores
        game_records.push(record)
        this.setData ({
            hiddenCurGame: true,
            game_records: game_records
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
        let game_player = game_info.player;
        this.setData({
            game_info: game_info,
            game_record: game_record,
            game_players: game_player
        });
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
    }
})