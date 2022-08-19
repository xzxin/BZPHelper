// index.js
// 获取应用实例
const app = getApp()

Page({
    data: {
        items: [
          {value: 'clx', name: '陈立祥'},
          {value: 'jql', name: '金秋龙'},
          {value: 'xzx', name: '夏振新'},
          {value: 'tyt', name: '谭言仝'},
          {value: 'stb', name: '施廷波'},
          {value: 'hp', name: '黄鹏'},
          {value: 'glh', name: '郭立恒'},
          {value: 'sy', name: '石岩'}
        ]
      },
      press() {
        wx.setStorageSync("key","value");
        console.log(wx.getStorageSync('key'))
      },
      checkboxChange(e) {
        console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    
        const items = this.data.items
        const values = e.detail.value
        for (let i = 0, lenI = items.length; i < lenI; ++i) {
          items[i].checked = false
    
          for (let j = 0, lenJ = values.length; j < lenJ; ++j) {
            if (items[i].value === values[j]) {
              items[i].checked = true
              break
            }
          }
        }
    
        this.setData({
          items
        })
      }
})
