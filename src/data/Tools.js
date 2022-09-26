export function removeWhiteSpaces(text) {
  if (text.includes(' ')) {
    text = text.split(' ').join('');
  }
  return text;
}

export function checkPassword(pass) {
  let flag = false;
  const checkNum = new RegExp('[0-9]');
  const checkCapLet = new RegExp('[A-Z]');

  ['!', '#', '@', '$', '%'].forEach((symbol) => {
    if (pass.includes(symbol)) flag = true;
  });

  return flag;
}
