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
function returnStyle(styleName, objectstyleAtt, style) {
  //传入一个样式名，后面是对象，样式属性，最后返回一个拼接好的字符串
  console.log(objectstyleAtt);
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
  objectstyleAtt["top"] -= Number(paintStore.pageTop);
  objectstyleAtt["top"] = objectstyleAtt["top"];
  objectstyleAtt["top"] = objectstyleAtt["top"] / paintStore.scale;
  objectstyleAtt["left"] -= Number(paintStore.pageLeft);
  objectstyleAtt["left"] = objectstyleAtt["left"];
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
function arrToObject(arr) {
  try {
    let obj = {};
    arr.forEach(i => {
      obj[i.name] = i.value;
    });
    return arr;
  } catch (error) {
    return error;
  }
}
export {
  getMousePos,
  returnStyle,
  banZoom,
  deepClone,
  getElementLeft,
  getElementTop,
  arrToObject,
};
