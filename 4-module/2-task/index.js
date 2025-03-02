function makeDiagonalRed(table) {
  let rows = table.rows.length;

  for (let i = 0; i < rows; ++i) {
    table.rows[i].cells[i].style.background = 'red';
  }
}
