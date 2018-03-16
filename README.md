# Eze Feature Toggle for the front-end client
===================================================

This package handles the checking of feature toggles from the front-end javascript using LaunchDarkly (https://docs.launchdarkly.com/docs). Creation and updates of Feature toggles as well as rules settings and configurations are managed via LaunchDarkly dashboard. 





## To include feature toggle package to your app


```
npm i  https://github.com/yeongk/feature_toggle_js.git --save
```


This package exports the following methods:

```
    checkBooleanFeatureToggle()
    checkMultivalueFeatureToggle()
    identify()
    track()

```


ezeFeatureToggle is initialized as part of LDClient.initialize()
```
import ldClient from ("eze-feature-toggle-js");

(function getEzeFeatureToggle() {
    return init(clientSideId, null)
        .then(ezeFeatureToggle => {
            window.ezeFeatureToggle = ezeFeatureToggle;
        })
        .catch(err => {
            logger.error(err);
            throw err;
        })
})();
```

## checking toggles in your app

ezeFeatureToggle exposes boolean check and multi-value check methods
```
if (ezeFeatureToggle.checkBooleanFeatureToggle(
    user, feature_togge_name, def_value)) {
        ... // feature available
    } else {
        ... // feature unavailable
    }
        
result = ezeFeatureToggle.checkMultivalueFeatureToggle(
    user, feature_togge_name, def_value));
switch (result) {
    case: ... {
        
    }
    case: ... {
        
    }
    case: ... {
        
    }
    default: ... {
        
    }
        

```

When the user context changes, use identify() method, so that related feature toggles can be available for the new user

```
ezeFeatureToggle.identify(user)
```


NOTE: def_value is used as a fall-back option. It is used as the return value if an error is encountered, e.g., if the service is unavailable or the specified feature toggle key doesn't exist. def_value is also returned as the return value in the unauthenticated use case.

            





