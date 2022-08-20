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
        ]
      },
      press() {
        wx.setStorageSync("key","value");
        console.log(wx.getStorageSync('key'))
      },
      tapCheck(e) {
        const roles = this.data.roles
      }
})
