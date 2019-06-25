export function deepCopy(data) {
  const t = typeOf(data);
  let o;

  if (t === 'array') {
    o = [];
  } else if (t === 'object') {
    o = {};
  } else {
    return data;
  }

  if (t === 'array') {
    for (let i = 0; i < data.length; i++) {
      o.push(deepCopy(data[i]));
    }
  } else if (t === 'object') {
    for (let i in data) {
      o[i] = deepCopy(data[i]);
    }
  }
  return o;
}

export function descartes(list) {
  var point = {};
  var result = [];
  var pIndex = null;
  var tempCount = 0;
  var temp = [];

  for (var index in list) {
    if (typeof list[index] == 'object') {
      point[index] = {
        'parent': pIndex,
        'count': 0
      }
      pIndex = index;
    }
  }

  if (pIndex == null) {
    return list;
  }

  while (true) {
    for (var index in list) {
      tempCount = point[index]['count'];
      temp.push(list[index][tempCount]);
    }
    result.push(temp);
    temp = [];
    while (true) {
      if (point[index]['count'] + 1 >= list[index].length) {
        point[index]['count'] = 0;
        pIndex = point[index]['parent'];
        if (pIndex == null) {
          return result;
        }
        index = pIndex;
      } else {
        point[index]['count']++;
        break;
      }
    }
  }
}
