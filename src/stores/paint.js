import { defineStore } from "pinia";

export const usePaintStore = defineStore("paint", {
  state: () => ({
    width: 500,
    length: 500,
    isPlace: false,
    top: "",
    left: "",
    scale: 1,
    pageTop: "145",
    pageLeft: "510",
    domArr: [],
  }), //isplace 是否可以放置，false，不能；true，可以。scale，缩放倍数,pageTop 相对于文档的,domArr,存储画布里面的dom
  actions: {},
  getters: {
    domArrButton: (state) => state.domArr.filter((item) => item.type === "zButton"),
    domArrInput: (state) => state.domArr.filter((item) => item.type === "zInput"),
  },
});
