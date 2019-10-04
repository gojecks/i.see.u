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
 *      name: args['name']
 *  }
 */
function ArgsCollector() {
    return process.argv.slice(2).reduce((accum, key) => {
        const spltArgs = key.split("=");
        accum[spltArgs[0]] = spltArgs[1];
        return accum;
    }, {});
}

module.exports = function(outputPath, buildInfo, cleanFile) {
    const fs = require('fs');
    const arg = ArgsCollector();
    const { exec } = require('child_process');
    return new Promise(function(resolve, reject) {
        fs.readFile('./core/hidemyass.js', 'utf8', function(err, data) {
            if (err) {
                reject('Error:' + err);
                return console.log(err);
            }

            if (cleanFile) {
                exec('rm -rf ' + outputPath, err => {
                    if (err) {
                        return;
                    }

                    _replace();
                });
            } else {
                _replace();
            }

            function _replace() {
                var result = data.replace(/BUILD_INFO/, JSON.stringify(buildInfo));
                fs.writeFile(outputPath, result, 'utf8', function(err) {
                    if (err) return reject('Error:' + err);
                    resolve(true);
                });
            }

        });
    });
}