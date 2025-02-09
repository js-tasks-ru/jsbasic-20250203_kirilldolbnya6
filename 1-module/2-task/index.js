/**
 * Эту функцию трогать не нужно
 */
function print(text) {
  console.log(text);
}

/**
 * Эту функцию нужно поменять так,
 * чтобы функция sayHello работала корректно
 */
function isValid(name) {
  let isValid = false;

  if (name && name.length >= 4) {
    for (let i = 0; i <= name.length; i++) {
      if (name[i] === " ") {
        return false;
      }else{
        isValid = true;
      }
    }
  }

  return isValid;
}

function sayHello() {
  let userName = prompt('Введите ваше имя');

  if (isValid(userName)) {
    print(`Welcome back, ${userName}!`);
  } else {
    print('Некорректное имя');
  }
}
