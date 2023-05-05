function calculateMean(arr) {
    const sum = arr.reduce((tot, num) => {
        return tot + num
    }, 0)
    const mean = sum==0? 0 : sum / arr.length;
    return {
      operation: "mean",
      value: mean,
    };
}

function calculateMedian(arr) {
  arr.sort((a, b) => a - b);

  const length = arr.length;
  const mid = Math.floor(length / 2);

  if (length % 2 === 0) {
    return {
      operation: "median",
      value: (arr[mid - 1] + arr[mid]) / 2,
    };
  } else {
    return {
      operation: "median",
      value: arr[mid],
    };
  }
}

function calculateMode(arr) {
    const counter = {}
    for (let el of arr){
      if (el in counter) {
        counter[el]++;
      } else {
        counter[el] = 1;
      } 
    }  
    let max = 0;
    let mostFrequent;
    for (let key in counter) {
      if (counter[key] > max) {
        max = counter[key];
        mostFrequent = key;
        
      }
    }
    return{
      operation: "mode",
      value: +mostFrequent,
    }
}

module.exports = {calculateMean, calculateMedian, calculateMode}