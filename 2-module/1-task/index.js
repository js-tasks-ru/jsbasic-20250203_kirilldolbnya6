function sumSalary(salaries) {
  let price = 0;

  for(let key in salaries) {
    if (parseInt(salaries[key])) {
      price += salaries[key];
    }
  }

  return price;
}
