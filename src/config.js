const fs = require('fs');
const YAML = require('yamljs');
const config = YAML.parse(fs.readFileSync('src/config.yml').toString());

module.exports = {
    bucket: process.env.BUCKET || config.bucket
}