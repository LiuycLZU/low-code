function saveData(list) {
  const dataValue = ref({});
  for (const i of list) {
    //遍历组件元素
    if (i.id) {
      //判断元素是否存在（可用UUID遍历）
      for (key in i) {
        //读取组件内容，感觉不需要
        console.log(key + ":" + i[key]);
      }
      //如果组件元素存在，将组件内容压缩为对象，其键为元素ID（可换为UUID）
      dataValue[i.id] = Object.freeze(i);
    } else {
      console.log(undefined);
      //如果组件元素不存在，设为null
      dataValue[i.id] = null;
    }
  }
  console.log(dataValue);
  console.log("保存成功");
  return dataValue;
}
export { saveData };
