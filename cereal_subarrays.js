/* */

const findMin = (arr) => {
    let min = Infinity;
    let currMin = Infinity;
    for(let i in arr) {
      if(arr[i] < currMin) currMin = arr[i];
      if(min > currMin) min = currMin; 
    }
    return min;
  }
  
  const findMax = (arr) => {
    let max = -Infinity;
    let currMax = -Infinity;
    for(let i in arr) {
      if(arr[i] > currMax) currMax = arr[i]
      if(currMax > max) max = currMax;
    }
    return max;
  }
  
  const maxOfMinSubArr = (k, arr) => {
      let allMins = [];
      let windowEnd = k;
      let subArr = arr.slice(0, windowEnd);
      allMins.push(findMin(subArr));
      while(subArr.length === k && windowEnd !== arr.length) {
        subArr.shift();
        subArr.push(arr[windowEnd++]);
        allMins.push(findMin(subArr));
      }
      return findMax(allMins);
  }
