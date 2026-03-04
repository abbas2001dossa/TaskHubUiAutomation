require('dotenv').config();

class EnvUtil {
    static get(key) {
        return process.env[key];
    }
}

module.exports = EnvUtil;