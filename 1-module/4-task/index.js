function checkSpam(str) {
  if (str.length === 0) {
    return false;
  }

  str = str.toLowerCase();

  return str.includes('1xbet') || str.includes('xxxxx');
}
