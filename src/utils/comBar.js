// 组件栏
// 组件按钮拖拽到画布
// 拖拽类
import { nextTick } from "vue";
import { getMousePos } from "@/utils/util.js";
import emitter from "@/utils/mitt.js";
import { usePaintStore } from "@/stores/paint.js";

class ComZoom {
  //按钮类
  constructor(
    type,
    height,
    width,
    dom,
    top = getMousePos().y,
    left = getMousePos().x
  ) {
    this.type = type;
    this.height = height;
    this.width = width;
    this.top = top;
    this.left = left;
    this.dom = dom;
  }
  moveFun() {
    //移动按钮，见第四行
    if (Date.now() - this.time < 50) {
      //节流
      return;
    }
    this.time = Date.now();
    nextTick(() => {
      this.top = getMousePos().y;
      this.left = getMousePos().x;
      let style = this.dom.style;
      style.display = "inline-flex";
      style.top = this.top + "px";
      style.left = this.left + "px";
      style.height = this.height + "px";
      style.width = this.width + "px";
    });
  }
  moveFunPlus() {
    //没有节流的移动方法
    nextTick(() => {
      console.log("movepl");
      this.top = getMousePos().y;
      this.left = getMousePos().x;
      let style = this.dom.style;
      style.display = "inline-flex";
      style.top = this.top + "px";
      style.left = this.left + "px";
      style.height = this.height + "px";
      style.width = this.width + "px";
      console.log(style);
    });
  }
  reset() {
    nextTick(() => {
      let style = this.dom.style;
      style.display = "none";
      style.top = 0 + "px";
      style.left = 0 + "px";
      style.height = 20 + "px";
      style.width = 40 + "px";
    });
  }
  componentMove() {
    //监听鼠标移动事件
    this.moveFunBind = this.moveFun.bind(this);
    document.addEventListener("mousemove", this.moveFunBind);
  }
  async componentStop() {
    //取绑鼠标监听事件
    let paintStore = usePaintStore();
    document.removeEventListener("mousemove", this.moveFunBind);
    await this.moveFunPlus();
    this.moveFunBind = null;
    if (paintStore.isPlace) {
      //可不可以移动
      paintStore.isPlace = false;
      console.log("dom", this.dom.style, Object.keys(this.dom.style).length);
      if (Number(Object.keys(this.dom.style).length) < 30) {
        console.log("@@@@");
        emitter.emit("receiveComponents", this.dom.style);
      } else {
        emitter.emit("receiveComponents", {
          type: this.type,
          width: this.width,
          height: this.height,
          top: this.top,
          left: this.left,
        });
      }
    }
    this.reset();
    this.componentReleaseOver();
  }
  componentRelease() {
    //监听鼠标抬起事件
    this.onmouseup = this.componentStop.bind(this);
    document.addEventListener("mouseup", this.onmouseup);
  }
  componentReleaseOver() {
    //取绑鼠标抬起事件
    document.removeEventListener("mouseup", this.onmouseup);
  }
}
export { ComZoom };
