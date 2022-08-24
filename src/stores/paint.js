import { defineStore } from "pinia";

export const usePaintStore = defineStore("paint", {
  state: () => ({
    width: 500,
    length: 500,
    isPlace: false,
    top: "",
    left: "",
    scale: 1,
  }), //isplace 是否可以放置，false，不能；true，可以。scale，缩放倍数
  actions: {},
});
