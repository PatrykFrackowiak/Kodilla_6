'use strict';

const calculateMinMaxPair = (allOccurences) => {
  let min = Number.MAX_VALUE, max = 0;
  for (let numberOfOccurences of Object.values(allOccurences)) {
    if (numberOfOccurences < min) {
      min = numberOfOccurences;
    }
    if (numberOfOccurences > max) {
      max = numberOfOccurences;
    }
  }
  return { 'min': min, 'max': max };
};
