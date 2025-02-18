function getMinMax(str) {
  let strArr = str.split(' ');
  let obj = {
    min: 0,
    max: 0
  };
  console.log(strArr)

  for (let i = 0; i < strArr.length; i++) {
    if (Number(strArr[i])) {
      if(obj.min > Number(strArr[i])){
        obj.min = Number(strArr[i]);
      }else if(obj.max < Number(strArr[i])){
        obj.max = Number(strArr[i]);
      }
    }
  }

  return obj;
}
