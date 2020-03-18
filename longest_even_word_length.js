/* Given a string of words separated by spaces, find the first maximum even length word from the string. */

const longestEven = (str) => {
    let longest = '';
    let currLongest = '';
    let strArr = str.split(" ");
    for(let i in strArr) {
        if(strArr[i].length % 2 === 0 && strArr[i].length > currLongest.length) currLongest = strArr[i];
        if(currLongest.length > longest.length) longest = currLongest;
    }
    return longest;
}
