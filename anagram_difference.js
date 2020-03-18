/* Two words are anagrams of one another if their letters can be rearranged to form the other word.
Given two strings, return the number of manipulations it would take to make them anagrams of each other. If it isn't possible to make them anagrams, return -1. */

const toAnagrams = function(s, t) {
    if(s.length !== t.length) return -1;
    let frequencies = {};
    let steps = 0;
    for(let i = 0; i < s.length; i++) {
        frequencies[s.charAt(i)] = frequencies[s.charAt(i)] || 0;
        frequencies[t.charAt(i)] = frequencies[t.charAt(i)] || 0;
        frequencies[s.charAt(i)]++;
        frequencies[t.charAt(i)]--;
    }
    for(let char in frequencies) {
        if(frequencies[char] > 0) {
            steps += frequencies[char]
        }
    }
    return steps;
};
