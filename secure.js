module.exports =  {
    uuid:function() {
        var s = []; 
        var hexDigits = "0123456789abcdef"; 
        for (var i = 0; i < 36; i ++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1); 
        }
        s[14] = "4"; 
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); 
        s[8] = s[13] = s[18] = s[23] = "-"; 
        var uuid = s.join(""); 
        return uuid;
    },
    hashCode:function(str) {
        var hash = 0;
        if (str.length == 0) return hash;
        for (i = 0; i < str.length; i++) {
            char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash;
    }
};