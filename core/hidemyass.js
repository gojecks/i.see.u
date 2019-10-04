(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(function() {
            return (root.returnExportsGlobal = factory());
        });
    } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals
        root.returnExportsGlobal = factory();
    }
}(typeof self !== 'undefined' ? self : this, function() {
    /**
     * DO NOT MODIFY THIS FILE
     */
    var _ = BUILD_INFO;

    function HideMyAss() {
        // nodeJS overite the below line
        this._validate = function(deviceBuildInfo) {
            return Object.keys(_).reduce(function(accum, key) {
                if (_[key] !== deviceBuildInfo[key]) {
                    accum.failedValidation.push(key);
                    accum.success = false;
                }

                return accum;
            }, {
                success: true,
                failedValidation: []
            });
        }
    }

    HideMyAss.prototype.checkMyDevice = function(deviceBuildInfo, message) {
        if (!deviceBuildInfo || !_) {
            this.writeMessage(message);
            throw new Error("[[HideMyAss]]: Unable to validate your Application");
        }

        var validationInfo = this._validate(deviceBuildInfo);

        if (!validationInfo.success) {
            this.writeMessage(message);
            throw new Error("[[HideMyAss]]: Who are you? What do you intend to do?");
        }
    };

    HideMyAss.prototype.writeMessage = function(message) {
        var defaultMessage = "<h5>/***************************** I SEE U!! *******************************/</h5>";
        defaultMessage += "HAHAHAHAHA GOTCHA";
        document.body.style.background = "#000000";
        document.body.style.color = "#ffffff";
        document.body.style.fontSize = "2em";
        document.body.style.textAlign = "center";
        document.body.style.marginTop = "25%";
        document.body.innerHTML = message || defaultMessage;
    };

    return new HideMyAss();
}));