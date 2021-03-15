//模拟call()
Function.prototype.myCall = function (context, ...arg) {
  const _context = context || window;
  const fn = Symbol("临时属性");
  _context[fn] = this;
  _context[fn](...arg);
  delete context[fn];
};

//判断空对象
function emptyObject(data) {
  for (const item in data) {
    return false;
  }
  return true;
}

//判断对象
function isObject(data) {
  return Object.prototype.toString.call(data) === "[object Object]";
}

//判断数组
function isArray(data) {
  return Object.prototype.toString.call(data) === "[object Array]";
}

//判断set
function isSet(data) {
  return Object.prototype.toString.call(data) === "[object Set]";
}

//判断map
function isMap(data) {
  return Object.prototype.toString.call(data) === "[object Map]";
}

//判断Date
function isDate(data) {
  return Object.prototype.toString.call(data) === "[object Date]";
}

//浅拷贝
function ShallowClone(data) {
  if (typeof data === "object") {
    let cloneResult = isObject(data) ? {} : [];
    for (const key in data) {
      cloneResult[key] = data[key];
    }
    return cloneResult;
  } else {
    return data;
  }
}

//深拷贝(只考虑array,object)
function deepClone(data, map = new Map()) {
  if (typeof data === "object") {
    let cloneResult = isObject(data) ? {} : [];
    if (map.get(target)) {
      return map.get(target);
    }
    map.set(data, cloneResult);
    for (const key in data) {
      cloneResult[key] = deepClone(data[key], map);
    }
    return cloneResult;
  } else {
    return data;
  }
}

//深拷贝(考虑array,objec,set,map)
function deepClone(data, map = new Map()) {
  if (!isObject(data)) {
    return data;
  }
  let cloneResult;
  if (map.get(target)) {
    return map.get(target);
  }
  map.set(target, "");

  if (isSet(data)) {
    cloneResult = new Set();
    data.forEach((value) => {
      cloneResult.add(deepClone(value, map));
    });
    return cloneResult;
  }

  if (isMap()) {
    cloneResult = new Map();
    data.forEach((value, key) => {
      cloneResult.set(key, deepClone(value, map));
    });
    return cloneResult;
  }

  cloneResult = isObject(data) ? {} : [];
  for (const key in data) {
    cloneResult[key] = deepClone(data[key], map);
  }
  return cloneResult;
}

//判断手机
function judgeMobile() {
  const userAgent = navigator.userAgent;
  const reg = /(iPhone|iPad|iPod|iOS|Android)/i;
  return reg.test(userAgent);
}

//判断ipad
function judgeIpad() {
  let ua = navigator.userAgent.toLowerCase();
  return /ipad/i.test(ua);
}

//判断ios
function judgeIOS() {
  const userAgent = window.navigator.userAgent;
  return /iPhone|iPad|iPod|iOS/i.test(userAgent);
}

//判断android
function judgeAndroid() {
  const userAgent = window.navigator.userAgent;
  return /Android/i.test(userAgent);
}

//数字转中文(仅支持最大数字：99999)
function numberUpper(value) {
  if (typeof Number(value) !== "number" || String(value).length >= 6) {
    return value;
  }
  const smallNumChar = [
    "零",
    "一",
    "二",
    "三",
    "四",
    "五",
    "六",
    "七",
    "八",
    "九",
  ];
  const bigNumChar = ["", "十", "百", "千", "万"];
  let _value = parseInt(value);
  let numList = [],
    result = "";
  let strList = String(_value).split("").reverse();
  let len = strList.length;
  if (len > 1) {
    strList.forEach((ele, ind) => {
      if (ele == 0) {
        if (ind - 1 >= 0 && strList[ind - 1] !== "0") {
          console.log(ind, strList[ind - 1]);
          result = smallNumChar[0] + result;
        } else {
          result = "" + result;
        }
      } else {
        if (ind == 0) {
          result = smallNumChar[ele] + result;
        } else if (len == 2 && ele == "1") {
          result = bigNumChar[ind] + result;
        } else {
          result = smallNumChar[ele] + bigNumChar[ind] + result;
        }
      }
    });
    return result;
  } else {
    return smallNumChar[_value];
  }
}

//判断是否为纯空格/制表符/或换行符
function emptyStr(str) {
  const reg = /(^\s*)|(\s*$)/g;
  str = str.replace(reg, "");
  return str.length === 0;
}

//转换Date为日期格式
function formatDate(time = new Date()) {
  if (!isDate(time)) {
    return time;
  }
  let result = "";
  const year = time.getFullYear();
  let month = time.getMonth() + 1;
  let day = time.getDate();
  let hour = time.getHours();
  let minute = time.getMinutes();
  let second = time.getSeconds();
  month = month < 10 ? "0" + month : month;
  day = day < 10 ? "0" + day : day;
  hour = hour < 10 ? "0" + hour : hour;
  minute = minute < 10 ? "0" + minute : minute;
  second = second < 10 ? "0" + second : second;
  result =
    year +
    "-" +
    month +
    "-" +
    day +
    " " +
    hour +
    ":" +
    minute +
    ":" +
    second;
  return result;
}

//截取时间
function cutTime(value, type) {
  const datelist = value.split(" ");
  let result = "";
  if (type == "年月日时分") {
    result = value.substring(0, 16);
  } else if (type == "月日时分") {
    result =
      datelist[0].substring(5, 10) + " " + datelist[1].substring(0, 5);
  } else if (type == "年月日") {
    result = value.substring(0, 10);
  } else {
    result = value;
  }
  return result;
}

//距离当前时间
function timeBefore(value) {
  let timeBefore = "几秒前";
  let t = 1000 * 60 * 60 * 24 * 30;
  let nowTimer = new Date().getTime();
  let timer = new Date(value.replace(/-/g, "/")).getTime();
  let cha = nowTimer - timer;
  let month = 0,
    day = 0,
    hour = 0,
    minute = 0,
    second = 0;
  if (cha >= 0) {
    month = Math.floor(cha / t);
    day = Math.floor((cha / t - month) * 30);
    hour = Math.floor(((cha / t - month) * 30 - day) * 24);
    minute = Math.floor(
      (((cha / t - month) * 30 - day) * 24 - hour) * 60
    );
    second = Math.floor(
      ((((cha / t - month) * 30 - day) * 24 - hour) * 60 - minute) * 60
    );
    if (cha < 1000 * 60) {
      timeBefore = second + "秒前";
    } else if (cha < 1000 * 60 * 60) {
      timeBefore = minute + "分钟前";
    } else if (cha < 1000 * 60 * 60 * 24) {
      timeBefore = hour + "小时前";
    } else if (cha < 1000 * 60 * 60 * 24 * 30) {
      timeBefore = day + "天前";
    } else if (cha < 1000 * 60 * 60 * 24 * 30 * 12) {
      timeBefore = month + "个月前";
    } else {
      timeBefore = value.slice(0, 10);
    }
  }
  return timeBefore;
}

/**
 * 计算年龄/工作年限
 * @param {string} value
 * @param {number} type 0 计算年龄 1 计算工作年限
 * @param {number} num  type为1时使用。向上取整粒度，单位为月。
 */
function computedAge(value, type = 0, num = 0) {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  let nowTimer = date.getTime();
  let timer = new Date(value.replace(/-/g, "/")).getTime();
  let valueArr = value.split("-");
  let result = year - valueArr[0];
  let condition = type
    ? parseInt(valueArr[1]) <= month + num
    : month > valueArr[1] || (month == valueArr[1] && day >= valueArr[2]);
  if (timer > nowTimer) {
    return 0;
  }
  if (condition) {
    return result;
  } else {
    return type ? (result - 1 > 0 ? result - 1 : "半年") : result - 1;
  }
}
