function setdata(name, data) {
  //设置一个localstorage；json格式
  localStorage.setItem(name, JSON.stringify(data));
}
function getdata(name) {
  //获得一个localstorage：jison格式
  return JSON.parse(localStorage.getItem(name));
}
export { setdata, getdata };
