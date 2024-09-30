const crypto = require('crypto');

exports.randomChars = (numChars) => {
    const chars = 'ABCDEFGHJKLMNPRSTUVWXYZ23456789';
    const rnd = crypto.randomBytes(numChars);

    let value = new Array(numChars);

    for (let i=0; i<numChars; i++) {
        value[i] = chars[rnd[i] % chars.length]
    };

    return value.join('');
}
