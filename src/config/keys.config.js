process.env.NODE_ENV === 'production' ?
    module.exports = require('./prod_keys.config') :
    module.exports = require('./dev_keys.config')