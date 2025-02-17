function filterRange(arr, a, b) {
  let filterArr = [];

  arr.forEach(item => {
    if (item >= a && item <= b) {
      filterArr.push(item);
    }
  });

  return filterArr;
}
