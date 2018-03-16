const LDClient = require('ldclient-js');
const FIXED_KEY = 'cecf006d836e7099afd856f061d43904' // MD5 hash of 'ezesoft'

let ldClient = {};

const ezeFeatureToggle = {
    checkBooleanFeatureToggle: function (featureToggle, user, def) {
        let defValue = def ? def : false;

        if (!user) {
            return defValue;
        } else {
            return ldClient.variation(featureToggle, defValue);
        }

    },

    checkMultivalueFeatureToggle: function (featureToggle, user, def) {
        let defValue = def ? def : "";

        if (!user) {
            return defValue;
        } else {
            return ldClient.variation(featureToggle, defValue);
        }
    },

    identify: function (user, hash) {
        ldClient.identify(getKey(user), hash, () => {
            console.log('new user flags available')
        })
    },

    track: function (marker) {
        ldClient.track(marker);
    }
}

function init(clientSideId, user) {
    return new Promise((resolve, reject) => {
        ldClient = LDClient.initialize(clientSideId, getKey(user));

        ldClient.on('change', (settings) => {
            console.log(`feature toggles changed: ${JSON.stringify(settings)}`)
        })

        ldClient.on('ready', () => {
            console.log('ldClient is ready')
            resolve(ezeFeatureToggle)
        })

        ldClient.on('error', () => {
            console.log('ldClient error')
            reject(err)
        })
    })
}


function getKey(user) {

    if (!user) {
        return {
            key: FIXED_KEY
        }
    } else {
        return {
            key: (user.UserSession.FirmAuthToken + '-' + user.UserSession.UserName).toUpperCase(),
            custom: {
                firmAuthToken: user.UserSession.FirmAuthToken,
                environment: user.UserSession.EnvironmentName,
                firmColor: user.FirmColor
            }
        }
    }
}

module.exports = {
    init
}