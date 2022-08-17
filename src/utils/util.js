function getMousePos() {
  //获得鼠标位置
  let e = window.event;
  let x = e.pageX;
  let y = e.pageY;
  return { x: x, y: y };
}
function returnStyle(styleName, objectstyleAtt) {
  //传入一个样式名，后面是对象，样式属性，最后返回一个拼接好的字符串
  let style = '';
  styleName.forEach((element) => {
    style += element + ":" + objectstyleAtt[element] + "px;";
  });
  return style;
}
export { getMousePos, returnStyle };
