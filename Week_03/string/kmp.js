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
    let table = new Array(needle.length).fill(0);
    table[0] = -1; // -1 means no match.
    let pos = 1; // the current position we are computing in table
    let cnd = 0; // the zero-based index in needle of the next character of the current candidate substring

    while (pos < needle.length) {
        if (needle[pos] === needle[cnd]) {
            table[pos] = table[cnd];
            // candidate substring increase.
            cnd ++;
        } else {
            table[pos] = cnd;
            // find candidate substring，again
            cnd = table[cnd];
            while (cnd >= 0 && needle[pos] !== needle[cnd]) {
                cnd = table[cnd];
            }
            // candidate substring increase.
            cnd++;
        }
        pos++;
    }
    
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

