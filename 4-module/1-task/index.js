function makeFriendsList(friends) {
  const lists =  document.createElement('ul');

  friends.map(friend => {
    const listItem = document.createElement('li');
    listItem.append(friend.firstName + " " + friend.lastName);
    lists.append(listItem);
  });

  return lists;
}
