function showSalary(users, age) {
  let result = ``;

  let filterUsers = users.filter(user => user.age <= age);

  filterUsers.forEach((user, index) => {
    if (index + 1 === filterUsers.length) {
      result += `${user.name}, ${user.balance}`;
    }else{
      result += `${user.name}, ${user.balance}\n`;
    }
  });

  return result;
}
