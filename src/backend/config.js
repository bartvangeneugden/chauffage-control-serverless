const fs = require('fs');
const YAML = require('yamljs');
const config = YAML.parse(fs.readFileSync(__dirname + '/config.yml').toString());

module.exports = {
    bucket: process.env.BUCKET || config.bucket
}
