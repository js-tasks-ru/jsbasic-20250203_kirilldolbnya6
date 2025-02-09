function checkSpam(str) {
  if (str.length === 0) {
    return false;
  }

  str = str.toLowerCase();

  if (str.includes('1xbet') || str.includes('xxxxx')) {
    return true;
  }

  return false;
}
