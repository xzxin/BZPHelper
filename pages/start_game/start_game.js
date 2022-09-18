// index.js
// 获取应用实例
const app = getApp()

Page({
    data: {
        roles: [
          {value: 'clx', path: "../../images/clx.png", reward: "", label: "陈立祥", score: 0, isPaoKing: false, isBaoKing: false},
          {value: 'jql', path: "../../images/jql.png", reward: "", label: "金秋龙", score: 0, isPaoKing: false, isBaoKing: false},
          {value: 'xzx', path: "../../images/xzx.png", reward: "", label: "夏振新", score: 0, isPaoKing: false, isBaoKing: false},
          {value: 'tyt', path: "../../images/tyt.png", reward: "", label: "谭言仝", score: 0, isPaoKing: false, isBaoKing: false},
          {value: 'stb', path: "../../images/stb.png", reward: "", label: "施廷波", score: 0, isPaoKing: false, isBaoKing: false},
          {value: 'hp', path: "../../images/hp.png", reward: "", label: "黄鹏", score: 0, isPaoKing: false, isBaoKing: false},
          {value: 'glh', path: "../../images/glh.png", reward: "", label: "郭立恒", score: 0, isPaoKing: false, isBaoKing: false},
          {value: 'sy', path: "../../images/sy.png", reward: "", label: "石岩", score: 0, isPaoKing: false, isBaoKing: false}
        ],
        baseBombRuleIndex: 0,
        baseBombRule:"炸弹翻番",
        allBombRules:["首炸翻番，其余加底", "炸弹翻番", "炸弹加底"],
        baoBombRule:"首炸翻番，其余加底",
        allBaoBombRules:["首炸翻番，其余加底", "炸弹翻番", "炸弹加底"],
        game_info: {},
        game_name: "炮王争霸",
        baoKing: "",
        paoKing: ""
      },
      bindBaseBombRuleChange(e) {
        this.setData({
            baseBombRule: this.data.allBombRules[e.detail.value]
        }) 
      },
      bindBaoBombRuleChange(e) {
        this.setData({
            baoBombRule: this.data.allBaoBombRules[e.detail.value]
        }) 
      },
      press() {
        wx.setStorageSync("key","value");
        console.log(wx.getStorageSync('key'))
      },
      navigateToIndex() {
        wx.navigateTo({
          url: '/pages/index/index',
        })
      },
      onShow() {
        let roles = this.data.roles;
        let baoKing = wx.getStorageSync('baoKing')
        let paoKing = wx.getStorageSync('paoKing')
        console.log(paoKing)
        for (let i=0;i<roles.length;i++) {
            let role = roles[i]
            if (role.label == baoKing) {
                role.isBaoKing = true
            }
            if (role.label == paoKing) {
                role.isPaoKing = true
            }
        }
        this.setData({
            roles: roles,
            baoKing: baoKing,
            paoKing: paoKing,
        })
        console.log(roles)
    },
    game_name_change(res) {
        this.setData ({
            game_name: res.detail.value
        })
    },
    navigateToGameRecord() {
        wx.navigateTo({
          url: '/pages/game_record/game_record',
        })
      },

      checkboxChange(e) {
        let checkedNames = e.detail.value
        this.data.game_info["player"] = []
        let roles = this.data.roles
        for (let i=0; i<roles.length; i++) {
            if (checkedNames.indexOf(roles[i].value) != -1) {
                this.data.game_info["player"].push(roles[i]);
            }
        }
      },


    onConfirm() {
        if (this.data.game_info.player.length < 4) {
            wx.showToast({
              title: '选手不足4人',
              icon: 'error',
              duration: 2000
            })
            return;
        }
        this.data.game_info["name"] = this.data.game_name
        this.data.game_info["gameRule"] = {
        "baseBombRule": this.data.baseBombRule,
        "baoBombRule": this.data.baoBombRule
        }
        wx.setStorageSync('cur_game', this.data.game_info)
        wx.setStorageSync('gameRule', this.data.game_info["gameRule"])
        this.navigateToGameRecord()
    }
})
