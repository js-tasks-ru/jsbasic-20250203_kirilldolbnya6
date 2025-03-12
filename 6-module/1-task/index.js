/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  #elem = null;

  constructor(rows) {
    this.rows = rows;
    this.#elem = this.#render();
  }

  #template() {
    return `
    <table>
      <thead>
        <tr>
          <th>Имя</th>
          <th>Возраст</th>
          <th>Зарплата</th>
          <th>Город</th>
          <th></th>
        </tr>
      </thead>
    <tbody>
    ${ this.rows.map(row => {
    return `
      <tr>
        <td>${row.name}</td>
        <td>${row.age}</td>
        <td>${row.salary}</td>
        <td>${row.city}</td>
        <td><button>X</button></td>
      </tr>
    `; }).join('')}
        </tbody>
    </table>
    `;
  }

  #render() {
    let div = document.createElement('div');

    div.innerHTML = this.#template();

    let table = div.firstElementChild;

    table.addEventListener('click', (event) => this.#onClick(event));

    return table;
  }

  #onClick(event) {
    if (event.target.closest('button')) {
      const btn = event.target.closest('button');

      btn.parentNode.parentElement.remove();
    }
  }

  get elem() {
    return this.#elem;
  }
}
