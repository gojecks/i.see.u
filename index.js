/**
 * HIDE MY ASS
 * THIS FILE AUTOMATICALLY ADDS THE BUILD_INFO TO THE HIDEMYASS SCRIPT
 * Do not forget to run this script
 * 
 * CREATED WITH LOVE
 * 
 * {
 *      packageName: args['bundleIdentifier'],
 *      basePackageName: args['bundleIdentifier'],
 *      name: args['name'],
 *      buildDate: Date
 *  }
 */
function ArgsCollector() {
    return process.argv.slice(2).reduce((accum, key) => {
        const spltArgs = key.split("=");
        accum[spltArgs[0]] = spltArgs[1];
        return accum;
    }, {});
}

/**
 * @param outputPath
 * @param buildInfo
 * @param config
 */
module.exports = function(outputPath, buildInfo, config) {
    const fs = require('fs');
    const arg = ArgsCollector();
    const { exec } = require('child_process');
    const path = require('path');
    const UglifyJS = require("uglify-js");

    const options = Object.assign({}, {
        validate: false,
        uglifyCode: true,
        cleanFile: true
    }, config || {});

    return new Promise(function(resolve, reject) {
        fs.readFile(path.join(__dirname, '/core/hidemyass.js'), 'utf8', function(err, data) {
            if (err) {
                reject('Error:' + err);
                return console.log(err);
            }

            if (options.cleanFile) {
                exec('rm -rf ' + outputPath, err => {
                    if (err) {
                        return;
                    }

                    _replace();
                });
            } else {
                _replace();
            }

            function _validate() {
                return ['packageName', 'basePackageName', 'name', 'buildDate'].reduce((accum, key) => {
                    if (!buildInfo.hasOwnProperty(key)) {
                        accum = 0
                    }

                    return accum;
                }, 1);
            }

            function _replace() {
                if (options.validate) {
                    if (!_validate()) {
                        return reject('Error: Invalid Build Info');
                    }
                }


                var result = data.replace(/BUILD_INFO/, JSON.stringify(buildInfo));

                if (options.uglifyCode) {
                    const _result = UglifyJS.minify(result);
                    if (_result.error) {
                        return reject('Error: unable to uglify code');
                    }

                    result = _result.code;
                }


                fs.writeFile(outputPath, result, 'utf8', function(err) {
                    if (err) return reject('Error:' + err);
                    resolve(true);
                });
            }

        });
    });
}