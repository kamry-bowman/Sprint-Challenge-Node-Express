function isIterable(obj) {
  // checks for null and undefined
  if (obj == null) {
    return false;
  }
  return typeof obj[Symbol.iterator] === 'function';
}

const stringToBooleanObject = (obj) => {
  let booleans = Object.entries(obj).filter(entry => ['true', 'false'].includes(entry[1]));
  booleans = booleans.map(entry => entry[0]);
  return booleans.reduce((accumObj, key) => ({...accumObj, ...{ [key]: ((accumObj[key]) === 'true') } }), obj);
}

const stringToBooleanGeneral = (item) => {
  if (['true', 'false'].includes(item)) {
    return (item === 'true');
  }
  if (typeof item === 'object') {
    // handle iterables
    if (typeof item[Symbol.iterator] === 'function') {
      return Array.from(item).map(item => stringToBooleanGeneral(item));
    }
    // handle objects
    return stringToBooleanObject(item);
  }
  return item;
};

module.exports = function stringToBoolean(obj) {
  return stringToBooleanGeneral(obj);
};
