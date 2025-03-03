function highlight(table) {
  let arrIndex = {};
  const thead = table.querySelectorAll("thead td");
  const tbody = table.querySelectorAll("tbody tr");

  thead.forEach((row, index) => {
    arrIndex[row.textContent] = index;
  });

  tbody.forEach(row => {
    const cells = row.getElementsByTagName("td");

    if (arrIndex['Age'] !== undefined) {
      if (parseInt(cells[arrIndex['Age']].textContent) < 18) {
        cells[arrIndex['Age']].parentElement.style.textDecoration = "line-through";
      }
    }

    if (arrIndex['Gender'] !== undefined) {
      if (cells[arrIndex['Gender']].textContent === 'm') {
        cells[arrIndex['Gender']].parentElement.classList.add("male");
      }else{
        cells[arrIndex['Gender']].parentElement.classList.add("female");
      }
    }

    if (arrIndex['Status'] !== undefined) {
      if (cells[arrIndex['Status']].dataset.available !== undefined) {
        cells[arrIndex['Status']].parentElement.classList.add(cells[arrIndex['Status']].dataset.available === "true" ? "available" : "unavailable");
      }else{
        cells[arrIndex['Status']].parentElement.setAttribute('hidden', '');
      }
    }
  });
}
