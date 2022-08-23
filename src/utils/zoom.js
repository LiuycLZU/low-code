let paint;
function mouse(optionDom,moveFun) {
  this.optionDom = optionDom;
  this.moveFun = moveFun;
  this.mouseDownFun = function(that) {
    console.log('down');
    console.log(paint);
    console.dir(that);
    paint.addEventListener("mousemove", this.mouseMoveFunBind);
    paint.addEventListener("mouseup", this.mouseUpFunBind);
    paint.addEventListener("mouseleave", this.mouseLeaveFunBind);
  }
  this.mouseMoveFun = function (e) {
    //鼠标移动事件
    console.log('move');
    this.moveFun(e, this.optionDom, paint);
  }
  this.mouseUpFun = function () {
    paint.removeEventListener("mousemove", this.mouseMoveFunBind);
    paint.removeEventListener("mouseup", this.mouseUpFunBind);
    paint.removeEventListener("mouseleave", this.mouseLeaveFunBind);
  }

  this.mouseLeaveFun = function (e) {
    paint.removeEventListener("mouseleave", this.mouseLeaveFunBind);
    paint.removeEventListener("mousemove", this.mouseMoveFunBind);
    paint.removeEventListener("mouseup", this.mouseUpFunBind);
  }
  this.initZoom =function() {
    this.mouseDownFunBind = this.mouseDownFun.bind(this);
    this.mouseMoveFunBind = this.mouseMoveFun.bind(this);
    this.mouseUpFunBind = this.mouseUpFun.bind(this);
    this.mouseLeaveFunBind = this.mouseLeaveFun.bind(this);
    this.optionDom.addEventListener("mousedown", this.mouseDownFunBind );
  }
}
function initmouse(paintDiv) {
  paint = paintDiv;
}
export { mouse, initmouse };
