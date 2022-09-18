const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const queryGameInfo = () => {
    return wx.getStorageSync('cur_game')
}

const queryUserInfoList = () => {
    var user_info_list = wx.getStorageSync('user_info_list')
    console.log(user_info_list)
    if (user_info_list === "") {
        user_info_list = user_default_info_list()
        wx.setStorageSync('user_info_list', user_info_list)
    }
    return user_info_list;
}

const queryUserBlast = () => {
    var user_info_list = queryUserInfoList()
    for (let i=0; i<user_info_list.length - 1; i++) {
        for (let j= 0; j < user_info_list.length - 1 - i; j++) {
            if (user_info_list[j]["blastWinRate"] < user_info_list[j+1]["blastWinRate"]) {
                let temp = user_info_list[j]
                user_info_list[j] = user_info_list[j+1]
                user_info_list[j+1] = temp
            }
        }
    }
    return user_info_list
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

const queryGameRecords = () => {
    var game_records = wx.getStorageSync('game_records')
    if (game_records == null || game_records == "") {
        return [];
    }
    return game_records;
}

const queryScoreWinLose = (type, bombCnt) => {
    let game_rule = wx.getStorageSync('gameRule')

    let baseBombRule = game_rule["baseBombRule"]
    let baoBombRule = game_rule["baoBombRule"]
    let base;
    let bombRule = baseBombRule;
    console.log("bombRule is " + bombRule)
    if (type == "plain") {
        base = 1;
    } else if (type == "turnoff") {
        base = 2;
    } else {
        base = 3;
        bombRule = baoBombRule;
    }
    if (bombCnt == 0) {
        return base;
    }
    if (bombRule == "首炸翻番，其余加底") {
        return 2 * base + bombCnt - 1;
    } else if (bombRule == "炸弹翻番") {
        return base * bombCnt;
    } else {
        return base + bombCnt;
    }

}

const user_default_info_list = () => {
    var default_info_list = [
        {
            "name": "陈立祥",
            "total": 0,
            "win": 0,
            "winRate": 0,
            "blastTotal": 0,
            "blastWin": 0,
            "blastWinRate": 0
        },
        {
            "name": "金秋龙",
            "total": 0,
            "win": 0,
            "winRate": 0,
            "blastTotal": 0,
            "blastWin": 0,
            "blastWinRate": 0
        },
        {
            "name": "夏振新",
            "total": 0,
            "win": 0,
            "winRate": 0,
            "blastTotal": 0,
            "blastWin": 0,
            "blastWinRate": 0
        },
        {
            "name": "谭言仝",
            "total": 0,
            "win": 0,
            "winRate": 0,
            "blastTotal": 0,
            "blastWin": 0,
            "blastWinRate": 0
        },
        {
            "name": "施廷波",
            "total": 0,
            "win": 0,
            "winRate": 0,
            "blastTotal": 0,
            "blastWin": 0,
            "blastWinRate": 0
        },
        {
            "name": "黄鹏",
            "total": 0,
            "win": 0,
            "winRate": 0,
            "blastTotal": 0,
            "blastWin": 0,
            "blastWinRate": 0
        },
        {
            "name": "郭立恒",
            "total": 0,
            "win": 0,
            "winRate": 0,
            "blastTotal": 0,
            "blastWin": 0,
            "blastWinRate": 0
        },
        {
            "name": "石岩",
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

const addResult = () => {
    let game_player = wx.getStorageSync('cur_game')["player"]
    let game_records = queryGameRecords()
    let user_info_list = queryUserInfoList()
    for (let i=0;i<game_records.length;i++) {
        let game_record = game_records[i]
        for (let j=0;j<game_player.length;j++) {
            let score = game_record["scores"][j]
            let player = game_player[j]
            let player_name = player.label
            let type = game_record.type
            for (let user_index = 0; user_index < user_info_list.length; user_index ++) {
                let user_info = user_info_list[user_index]
                if (user_info["name"] != player_name) {
                    continue;
                }
                user_info["total"] = user_info["total"] + 1;
                if (score > 0) {
                    user_info["win"] = user_info["win"] + 1;
                }
                user_info["winRate"] =Math.floor(100 * user_info["win"] / user_info["total"]);
                if (type == "爆赢") {
                    if (score > 0) {
                        user_info["blastWin"] = user_info["blastWin"] + 1;
                        user_info["blastTotal"] = user_info["blastTotal"] + 1;
                        user_info["blastWinRate"] =Math.floor(100 * user_info["blastWin"] / user_info["blastTotal"]);
                    }
                }
                if (type == "爆输") {
                    if (score < 0) {
                        user_info["blastTotal"] = user_info["blastTotal"] + 1;
                        user_info["blastWinRate"] =Math.floor(100 * user_info["blastWin"] / user_info["blastTotal"]);
                    }
                }
            }
        }
    }
    wx.setStorageSync('user_info_list', user_info_list);
}

module.exports = {
  formatTime,
  queryUserRank,
  queryUserBlast,
  queryGameInfo,
  queryGameRecords,
  queryScoreWinLose,
  addResult
}
