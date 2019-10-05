(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(function() {
            return (root.hideMyAss = factory());
        });
    } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals
        root.hideMyAss = factory();
    }
}(typeof self !== 'undefined' ? self : this, function() {
    /**
     * DO NOT MODIFY THIS FILE
     */
    var _ = BUILD_INFO;

    function HideMyAss() {
        // nodeJS overite the below line
        function _validate(deviceBuildInfo) {
            return Object.keys(_).reduce(function(accum, key) {
                if (_[key] !== deviceBuildInfo[key]) {
                    /**
                     * validate the buildDate
                     */
                    if (deviceBuildInfo[key] instanceof Date) {
                        var diff = (deviceBuildInfo[key].getTime() - _[key]) / 1000;
                        // maximum buildDate difference set to 1/2day
                        // 1800sec
                        if (diff <= (60 * 60 * 12)) {
                            return accum
                        }
                    }

                    accum.failedValidation.push(key);
                    accum.success = false;
                }

                return accum;
            }, {
                success: true,
                failedValidation: []
            });
        }

        this.helpMePlease = function(deviceBuildInfo, callBack) {
            callBack = callBack || writeMessage;
            if (!deviceBuildInfo || !_) {
                callBack(false);
            }

            var validationInfo = _validate(deviceBuildInfo);

            if (!validationInfo.success) {
                callBack(false);
            } else {
                callBack(true);
            }
        };
    }

    HideMyAss.prototype.showMessage = writeMessage;

    function writeMessage(message) {
        var defaultMessage = "/***************************** I SEE U!! *******************************/";
        defaultMessage += "HAHAHAHAHA GOTCHA";
        document.body.style.background = "#000000";
        document.body.style.color = "#ffffff";
        document.body.style.fontSize = "2em";
        document.body.style.textAlign = "center";
        document.body.style.paddingTop = "30%";
        document.body.innerHTML = message || defaultMessage;
    };

    return new HideMyAss();
}));