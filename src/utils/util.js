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
  styleHandle(objectstyleAtt, style);
  let str = "";
  styleName.forEach((element) => {
    str += element + ":" + objectstyleAtt[element] + "px;";
  });
  return str;
}
function styleHandle(objectstyleAtt, style) {
  objectstyleAtt["top"] -= style.top;
  objectstyleAtt["top"] = objectstyleAtt["top"].toFixed(0);
  objectstyleAtt["left"] -= style.left;
  objectstyleAtt["left"] = objectstyleAtt["left"].toFixed(0);
}
export { getMousePos, returnStyle };
