import { usePaintStore } from "@/stores/paint.js";
//工具函数
function getMousePos() {
  //获得鼠标位置
  let e = window.event;
  let x = e.pageX;
  let y = e.pageY;
  let cx = e.clientX;
  let cy = e.clientY;
  return { x: x, y: y, cx: cx, cy: cy };
}
function returnStyle(objectstyleAtt, style) {
  //传入一个样式名，后面是对象，样式属性，最后返回一个拼接好的字符串
  if (styleHandle(objectstyleAtt, style)) {
    let arr = {};
    for (let i in objectstyleAtt) {
      let floatNum = Number(objectstyleAtt[i]);
      if (isNaN(floatNum)) {
        arr[i] = objectstyleAtt[i] + "";
      } else {
        arr[i] = floatNum + "px";
      }
    }
    return arr;
  } else {
    return false;
  }
}
function styleHandle(objectstyleAtt, style) {
  let paintStore = usePaintStore();
  objectstyleAtt["top"] = parseFloat(objectstyleAtt["top"]);
  objectstyleAtt["left"] = parseFloat(objectstyleAtt["left"]);
  if (objectstyleAtt["top"] - Number(paintStore.pageTop) < 0) {
    objectstyleAtt["top"] = objectstyleAtt["top"];
  } else {
    objectstyleAtt["top"] -= Number(paintStore.pageTop);
  }
  objectstyleAtt["top"] = objectstyleAtt["top"] / paintStore.scale;

  if (objectstyleAtt["left"] + Number(paintStore.pageLeft) < 0) {
    objectstyleAtt["left"] = objectstyleAtt["left"];
  } else {
    objectstyleAtt["left"] -= Number(paintStore.pageLeft);
  }
  objectstyleAtt["left"] = objectstyleAtt["left"] / paintStore.scale;
  if (
    objectstyleAtt["top"] < 0 ||
    objectstyleAtt["top"] > Number(style.width) ||
    objectstyleAtt["left"] < 0 ||
    objectstyleAtt["left"] > Number(style.length)
  ) {
    return false;
  }
  return true;
}
function banZoom() {
  //禁止页面缩放
  const keyCodeMap = {
    // 91: true, // command
    61: true,
    107: true, // 数字键盘 +
    109: true, // 数字键盘 -
    173: true, // 火狐 - 号
    187: true, // +
    189: true, // -
  };
  // 覆盖ctrl||command + ‘+’/‘-’
  document.onkeydown = function (event) {
    const e = event || window.event;
    const ctrlKey = e.ctrlKey || e.metaKey;
    if (ctrlKey && keyCodeMap[e.keyCode]) {
      e.preventDefault();
    } else if (e.detail) {
      // Firefox
      event.returnValue = false;
    }
  };
  // 覆盖鼠标滑动
  document.body.addEventListener(
    "wheel",
    (e) => {
      if (e.ctrlKey) {
        if (e.deltaY < 0) {
          e.preventDefault();
          return false;
        }
        if (e.deltaY > 0) {
          e.preventDefault();
          return false;
        }
      }
    },
    { passive: false }
  );
}
function deepClone(target, cache = new WeakMap()) {
  if (target === null || typeof target !== "object") {
    return target;
  }
  if (cache.get(target)) {
    // 避免循环引用
    return target;
  }
  const copy = Array.isArray(target) ? [] : {};
  cache.set(target, copy);
  Object.keys(target).forEach(
    (key) => (copy[key] = deepClone(target[key], cache))
  );
  return copy;
}
//获取element的x坐标
function getElementLeft(element) {
  var actualLeft = element.offsetLeft;
  var current = element.offsetParent;
  while (current !== null) {
    actualLeft += current.offsetLeft;
    current = current.offsetParent;
  }
  return actualLeft;
}
//获取element的y坐标
function getElementTop(element) {
  var actualTop = element.offsetTop;
  var current = element.offsetParent;
  while (current !== null) {
    actualTop += current.offsetTop;
    current = current.offsetParent;
  }
  return actualTop;
}
//数组转对象
function arrToObject(arr) {
  try {
    let obj = {};
    arr.forEach((i) => {
      obj[i.name] = i.value;
    });
    return obj;
  } catch (error) {
    return error;
  }
}
//判断是否溢出
function isOverflow(style) {
  //成功返回一个布尔值，失败返回一个（x,y）坐标
  let paintStore = usePaintStore();
  if (
    parseInt(style.left) + parseInt(style.width) >
      parseInt(paintStore.length) ||
    parseInt(style.left) < 0 ||
    parseInt(style.top) < 0 ||
    parseInt(style.top) + parseInt(style.height) > parseInt(paintStore.width)
  ) {
    let coor = [parseInt(style.left), parseInt(style.top)];
    if (parseInt(style.left) < 0) {
      coor[0] = 0;
    } else if (
      parseInt(style.left) + parseInt(style.width) >
      parseInt(paintStore.length)
    ) {
      //宽度设置在attrEdit里面，故不存在负数可能性
      coor[0] = parseInt(paintStore.length) - parseInt(style.width);
    }
    if (parseInt(style.top) < 0) {
      coor[1] = 0;
    } else if (
      parseInt(style.top) + parseInt(style.height) >
      parseInt(paintStore.width)
    ) {
      //宽度设置在attrEdit里面，故不存在负数可能性
      coor[1] = parseInt(paintStore.width) - parseInt(style.height);
    }
    return coor;
  }
  return true;
}
//判断是否溢出
function isOverflowFull(style) {
  //成功返回一个布尔值，失败返回一个（x,y）坐标
  let paintStore = usePaintStore();
  if (
    parseInt(style.left) + parseInt(style.width) >
      parseInt(paintStore.length) + parseInt(paintStore.pageLeft) ||
    parseInt(style.left) - parseInt(paintStore.pageLeft) < 0 ||
    parseInt(style.top) - parseInt(paintStore.pageTop) < 0 ||
    parseInt(style.top) + parseInt(style.height) >
      parseInt(paintStore.width) + parseInt(paintStore.pageTop)
  ) {
    let coor = [parseInt(style.left), parseInt(style.top)];
    console.log(parseInt(style.top));
    if (parseInt(style.left) - parseInt(paintStore.pageLeft) < 0) {
      coor[0] = parseInt(paintStore.pageLeft);
    } else if (
      parseInt(style.left) + parseInt(style.width) >
      parseInt(paintStore.length + paintStore.pageLeft)
    ) {
      //宽度设置在attrEdit里面，故不存在负数可能性
      coor[0] =
        parseInt(paintStore.length) -
        parseInt(style.width) +
        +parseInt(paintStore.pageLeft);
    }
    if (parseInt(style.top) - parseInt(paintStore.pageTop) < 0) {
      coor[1] = parseInt(paintStore.pageTop);
    } else if (
      parseInt(style.top) + parseInt(style.height) >
      parseInt(paintStore.width) + parseInt(paintStore.pageTop)
    ) {
      //宽度设置在attrEdit里面，故不存在负数可能性
      coor[1] =
        parseInt(paintStore.width) -
        parseInt(style.height) +
        parseInt(paintStore.pageTop);
    }
    console.log(coor[1]);
    return coor;
  }
  return true;
}
export {
  getMousePos,
  returnStyle,
  banZoom,
  deepClone,
  getElementLeft,
  getElementTop,
  arrToObject,
  isOverflow,
  isOverflowFull,
};
