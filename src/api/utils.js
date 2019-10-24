const isEmpty = (value) => {
  return value === null || value === undefined || value === '';
};

const isObject = (obj) => {
  const type = typeof obj;
  return (type === 'function' || type === 'object') && !!obj;
};

module.exports = {
  isEmpty,
  isObject
};