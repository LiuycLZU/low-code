import { nextTick } from "vue";
import { getElementTop, getElementLeft, isOverflow } from "@/utils/util.js";
import { usePaintStore } from "@/stores/paint.js";
let paint;

function mouse(optionDom, id, styleDom = undefined) {
  this.optionDom = optionDom;
  this.id = id;
  this.styleDom = styleDom;
  this.time = Date.now();
  this.moveFun = function (e, optionDom, paint) {
    let paintStore = usePaintStore();
    if (Date.now() - this.time < 30) {
      //节流
      return;
    }
    this.time = Date.now();
    nextTick(() => {
      optionDom.style.top =
        (e.pageY - getElementTop(paint)) / paintStore.scale + "px";
      optionDom.style.left =
        (e.pageX - getElementLeft(paint)) / paintStore.scale + "px";
    });
  };
  this.moveFunPlus = function (optionDom) {
    let paintStore = usePaintStore();
    paintStore.domArr.forEach((e) => {
      if (e.id === this.id) {
        e.style.top = optionDom.style.top;
        e.style.left = optionDom.style.left;
        if (isOverflow(e.style) === true) {
        } else {
          let coor = isOverflow(e.style);
          e.style.left = coor[0] + "px";
          optionDom.style.left = coor[0] + "px";
          e.style.top = coor[1] + "px";
          optionDom.style.top = coor[1] + "px";
        }
      }
    });
  };
  this.mouseDownFun = function (that) {
    paint.addEventListener("mousemove", this.mouseMoveFunBind);
    paint.addEventListener("mouseup", this.mouseUpFunBind);
    paint.addEventListener("mouseleave", this.mouseLeaveFunBind);
  };
  this.mouseMoveFun = function (e) {
    //鼠标移动事件
    this.moveFun(e, this.styleDom, paint);
  };
  this.mouseUpFun = function (e) {
    this.moveFunPlus(this.styleDom);
    paint.removeEventListener("mousemove", this.mouseMoveFunBind);
    paint.removeEventListener("mouseup", this.mouseUpFunBind);
    paint.removeEventListener("mouseleave", this.mouseLeaveFunBind);
    this.optionDom.removeEventListener("mousedown", this.mouseDownFunBind);
  };

  this.mouseLeaveFun = function (e) {
    paint.removeEventListener("mouseleave", this.mouseLeaveFunBind);
    paint.removeEventListener("mousemove", this.mouseMoveFunBind);
    paint.removeEventListener("mouseup", this.mouseUpFunBind);
    this.optionDom.removeEventListener("mousedown", this.mouseDownFunBind);
  };
  this.initZoom = function () {
    if (paint === undefined) {
      return false;
    }
    this.mouseDownFunBind = this.mouseDownFun.bind(this);
    this.mouseMoveFunBind = this.mouseMoveFun.bind(this);
    this.mouseUpFunBind = this.mouseUpFun.bind(this);
    this.mouseLeaveFunBind = this.mouseLeaveFun.bind(this);
    this.optionDom.addEventListener("mousedown", this.mouseDownFunBind);
  };
}
function initmouse(paintDiv) {
  if (paintDiv === undefined) {
    return false;
  }
  paint = paintDiv;
}
export { mouse, initmouse };
