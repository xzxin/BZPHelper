// index.js
// 获取应用实例
const app = getApp()

Page({
    data: {
        roles: [
          {value: 'clx', path: "../../images/clx.png", reward: "", label: "陈立祥"},
          {value: 'jql', path: "../../images/jql.png", reward: "", label: "金秋龙"},
          {value: 'xzx', path: "../../images/xzx.png", reward: "", label: "夏振新"},
          {value: 'tyt', path: "../../images/tyt.png", reward: "", label: "谭言仝"},
          {value: 'stb', path: "../../images/stb.png", reward: "", label: "施廷波"},
          {value: 'hp', path: "../../images/hp.png", reward: "", label: "黄鹏"},
          {value: 'glh', path: "../../images/glh.png", reward: "", label: "郭立恒"},
          {value: 'sy', path: "../../images/sy.png", reward: "", label: "石岩"}
        ],
        baseBombRuleIndex: 0,
        baseBombRule:"首炸翻番，其余加底",
        allBombRules:["首炸翻番，其余加底", "炸弹翻番"],
        baoBombRule:"同普通情况",
        allBaoBombRules:["同普通情况", "加底"]
      },
      bindBaseBombRuleChange(e) {
        this.setData({
            baseBombRule: this.data.allBombRules[e.detail.value]
        }) 
      },
      press() {
        wx.setStorageSync("key","value");
        console.log(wx.getStorageSync('key'))
      },
      tapCheck(e) {
        const roles = this.data.roles
      },
      navigateToIndex() {
        wx.navigateTo({
          url: '/pages/index/index',
        })
    }
})
