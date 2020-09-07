/**
 * Leetcode 28
 * 
 * @param {string} haystacks
 * @param {string} needle
 * @return {number}
 */
var strStr = function(haystack, needle) {
    if (needle === "") {
        return 0;
    }
    // calcul the Partial match table (failure function)
    // The goal of the table is to allow the algorithm not to match any character of haystack more than once. 
    // each element in table represent the previous match INDEX.
    let table = new Array(needle.length + 1).fill(0);
    let pos = 1; // the current position we are computing in table
    let cnd = 0; // the zero-based index in needle of the next character of the current candidate substring
    table[0] = -1; // -1 means no match.

    while (pos < needle.length) {
        if (needle[pos] === needle[cnd]) {
            table[pos] = table[cnd];
        } else {
            table[pos] = cnd;
            // find previous match location
            cnd = table[cnd];
            while (cnd >= 0 && needle[pos] !== needle[cnd]) {
                cnd = table[cnd];
            }
        }
        pos++, cnd++;
    }
    // last element in table
    table[pos] = cnd;
    
    // KMP
    let j = 0; // the position of the current character in haystack
    let k = 0; // the position of the current character in needle

    while (j < haystack.length) {
        if (needle[k] === haystack[j]) {
            ++j, ++k;
            if (k === needle.length) {
                // find the first occurrence
                return j - k;
            }
        } else {
            k = table[k];
            if (k === -1) {
                ++j, ++k;
            }
        }       
    }
    // No occurence is found
    return -1
}

let res = strStr("", "");
console.log(res);

