function UTF8_Encoding(string) {
    let res = [];
    for (let char of string) {
        // get Unicode code points
        // They are in hex, split by "%" into 2 - 4 parts
        // encodeURI does not encode alphabet
        let code = encodeURIComponent(char);
        let codeList = [];
        if (code.includes("%")) {
            codeList = code.split("%");
            codeList.shift(); // remove ""
            codeList = codeList.map(item => parseInt(item, 16));
        } else {
            codeList = [code.charCodeAt(0)];
        }

        res.push(...codeList);
    }
    return res;
}

let res = UTF8_Encoding("前端nice");
console.log(res);