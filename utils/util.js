const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const queryUserInfoList = () => {
    var user_info_list = wx.getStorageSync('user_info_list')
    if (user_info_list === "") {
        user_info_list = user_default_info_list()
        wx.setStorageSync('user_info_list', user_info_list)
    }
    return user_info_list;
}

const queryUserRank = () => {
    var user_info_list = queryUserInfoList()
    for (let i=0; i<user_info_list.length - 1; i++) {
        for (let j= 0; j < user_info_list.length - 1 - i; j++) {
            if (user_info_list[j]["winRate"] < user_info_list[j+1]["winRate"]) {
                let temp = user_info_list[j]
                user_info_list[j] = user_info_list[j+1]
                user_info_list[j+1] = temp
            }
        }
    }
    return user_info_list
}

const user_default_info_list = () => {
    var default_info_list = [
        {
            "name": "clx",
            "total": 0,
            "win": 0,
            "winRate": 80,
            "blastTotal": 0,
            "blastWin": 0,
            "blastWinRate": 0
        },
        {
            "name": "jql",
            "total": 0,
            "win": 0,
            "winRate": 70,
            "blastTotal": 0,
            "blastWin": 0,
            "blastWinRate": 0
        },
        {
            "name": "xzx",
            "total": 0,
            "win": 0,
            "winRate": 100,
            "blastTotal": 0,
            "blastWin": 0,
            "blastWinRate": 0
        },
        {
            "name": "tyt",
            "total": 0,
            "win": 92,
            "winRate": 0,
            "blastTotal": 0,
            "blastWin": 0,
            "blastWinRate": 0
        },
        {
            "name": "stb",
            "total": 42,
            "win": 0,
            "winRate": 0,
            "blastTotal": 0,
            "blastWin": 0,
            "blastWinRate": 0
        },
        {
            "name": "hp",
            "total": 79,
            "win": 0,
            "winRate": 0,
            "blastTotal": 0,
            "blastWin": 0,
            "blastWinRate": 0
        },
        {
            "name": "glh",
            "total": 0,
            "win": 0,
            "winRate": 0,
            "blastTotal": 0,
            "blastWin": 0,
            "blastWinRate": 0
        },
        {
            "name": "sy",
            "total": 0,
            "win": 0,
            "winRate": 0,
            "blastTotal": 0,
            "blastWin": 0,
            "blastWinRate": 0
        }
    ]
    return default_info_list;
  }

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

module.exports = {
  formatTime,
  queryUserRank
}
