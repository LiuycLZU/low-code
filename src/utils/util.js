//工具函数
function getMousePos() {
  //获得鼠标位置
  let e = window.event;
  let x = e.pageX;
  let y = e.pageY;
  return { x: x, y: y };
}
function returnStyle(styleName, objectstyleAtt, style) {
  //传入一个样式名，后面是对象，样式属性，最后返回一个拼接好的字符串
  if (styleHandle(objectstyleAtt, style)) {
    let str = "";
    styleName.forEach((element) => {
      str += element + ":" + objectstyleAtt[element] + "px;";
    });
    return str;
  } else {
    return false;
  }
}
function styleHandle(objectstyleAtt, style) {
  objectstyleAtt["top"] -= style.top;
  objectstyleAtt["top"] = objectstyleAtt["top"].toFixed(0);
  objectstyleAtt["left"] -= style.left;
  objectstyleAtt["left"] = objectstyleAtt["left"].toFixed(0);
  if (
    objectstyleAtt["top"] < 0 ||
    objectstyleAtt["top"] > Number(style.width) ||
    objectstyleAtt["left"] < 0 ||
    objectstyleAtt["left"] > Number(style.length)
  ) {
    console.log(objectstyleAtt["top"], objectstyleAtt["left"]);
    console.log(style.width, style.length);
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
export { getMousePos, returnStyle, banZoom };
