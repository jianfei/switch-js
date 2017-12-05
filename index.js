export default realValue => {
    let chain;
    let callbackInvoker;
    let map;
    let toValue;
    let isMatchFound = false;

    callbackInvoker = (isMatch, matchCallback, noMatchCallback) => {
        if (!isMatchFound && isMatch) {
            isMatchFound = true;
            matchCallback && matchCallback(realValue, isMatch);
        }
        else {
            noMatchCallback && noMatchCallback(realValue, isMatch);
        }

        return chain;
    },

    map = mapper => _.isFunction(mapper) ? mapper(realValue) : _.get(realValue, mapper);

    chain = {
        case: (caseValue, ...args) => callbackInvoker(_.isEqual(caseValue, realValue), ...args),

        cases: (caseValues, ...args) => callbackInvoker(_.includes(caseValues, realValue), ...args),

        caseWhen: (matcher, ...args) => callbackInvoker(matcher(realValue), ...args),

        default: (noFoundCallback, foundCallback) => {
            const callback = isMatchFound ? foundCallback : noFoundCallback;

            callback && callback(realValue, isMatchFound);

            return chain;
        },

        always: callback => {
            callback(realValue, isMatchFound);

            return chain;
        },

        caseTo: (caseValue, newValue) => {
            if (_.isUndefined(toValue) && _.isEqual(caseValue, realValue)) {
                toValue = newValue;
            }

            return chain;
        },

        casesTo: (caseValues, newValue) => {
            if (_.isUndefined(toValue) && _.includes(caseValues, realValue)) {
                toValue = newValue;
            }

            return chain;
        },

        caseWhenTo: (matcher, newValue) => {
            if (_.isUndefined(toValue) && matcher(realValue)) {
                toValue = newValue;
            }

            return chain;
        },

        value: defaultValue => toValue || defaultValue,

        caseMap: (caseValue, mapper) => {
            if (_.isUndefined(toValue) && _.isEqual(caseValue, realValue)) {
                toValue = map(mapper);
            }

            return chain;
        },

        casesMap: (caseValues, mapper) => {
            if (_.isUndefined(toValue) && _.includes(caseValues, realValue)) {
                toValue = map(mapper);
            }
        },

        caseWhenMap: (matcher, mapper) => {
            if (_.isUndefined(toValue) && matcher(realValue)) {
                toValue = map(mapper);
            }

            return chain;
        },

        valueMap: mappper => toValue || map(mapper),
    }

    return chain;
}
