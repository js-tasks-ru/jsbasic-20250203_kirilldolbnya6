function camelize(str) {
  let strArr = str.split('');

  strArr.forEach((item, index) => {
    if (item === '-') {
      delete strArr[index];

      strArr[index + 1] = strArr[index + 1].toLocaleUpperCase();
    }
  });

  return strArr.join('');
}
