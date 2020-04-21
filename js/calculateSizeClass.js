'use strict';

const calculateSizeClass = (value, minMaxPair, numberOfBuckets) => {
  const bucketSize = (minMaxPair['max'] - minMaxPair['min'] ) / (numberOfBuckets-1);
  return Math.floor((value - minMaxPair['min']) / bucketSize) + 1;
};
