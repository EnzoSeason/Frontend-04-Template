/**
 * Leetcode 28
 * 
 * addition: pattern includes "?"
 * "?" matches a single char.
 * 
 * @param {string} source
 * @param {string} pattern
 * @return {number}
 */
var KMP = function(source, pattern) {
    if (pattern === "") {
        return 0;
    }
    // calcul the Partial match table (failure function)
    let table = new Array(pattern.length).fill(0);
    table[0] = -1; // -1 means no match.
    let pos = 1; // the current position we are computing in table
    let cnd = 0; // the zero-based index in pattern of the next character of the current candidate substring

    while (pos < pattern.length) {
        if (pattern[pos] === pattern[cnd]) {
            table[pos] = table[cnd];
            // candidate substring increase.
            cnd ++;
        } else {
            table[pos] = cnd;
            // find candidate substring，again
            cnd = table[cnd];
            while (cnd >= 0 && 
                (pattern[pos] !== pattern[cnd] || pattern[pos] === "?")) {
                cnd = table[cnd];
            }
            // candidate substring increase.
            cnd++;
        }
        pos++;
    }
    
    // KMP
    let j = 0; // the position of the current character in source
    let k = 0; // the position of the current character in pattern

    while (j < source.length) {
        if (pattern[k] === source[j] || pattern[k] === "?") {
            ++j, ++k;
            if (k === pattern.length) {
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

// test cases
// hello, ll
// abcdabcdabcex, abcdabce
// aabaabaaac, aabaaac

// let res = KMP("abcabcabxaac".toLowerCase(), "b?x".toLowerCase());
// console.log(res);

// console.log("end");