const idGenerator = (num) => {
  const chars =
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$%?+*-_.:';
  let result = '';
  for (let i = 0; i < num; i++) {
    const at = Math.floor(Math.random() * (chars.length + 1));
    result += chars[at];
  }

  return result;
};


module.exports = idGenerator;
