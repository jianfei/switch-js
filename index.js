export default realValue => {
    let chain;
    let caseHandler;
    let map;
    let returnValue;
    let isLastCaseMatched = false;
    let hasMatch = false;

    caseHandler = (isMatched, matchedCallback, notMatchedCallback) => {
        isLastCaseMatched = false;

        if (!hasMatch && isMatched) {
            isLastCaseMatched = true;
            hasMatch = true;
            matchedCallback && matchCallback(realValue, isMatched);
        }
        else {
            notMatchedCallback && notMatchedCallback(realValue, isMatched);
        }

        return chain;
    },

    chain = {
        case: (caseValue, ...args) => caseHandler(_.isEqual(caseValue, realValue), ...args),

        cases: (caseValues, ...args) => caseHandler(_.includes(caseValues, realValue), ...args),

        caseWhen: (matcher, ...args) => caseHandler(matcher(realValue), ...args),

        default: (noMatchFoundCallback, matchFoundCallback) => {
            const callback = hasMatch ? matchFoundCallback : noMatchFoundCallback;

            callback && callback(realValue, hasMatch);
            isLastCaseMatched = true;

            return chain;
        },

        always: callback => {
            callback(realValue, hasMatch);

            return chain;
        },

        to: toValue => {
            if (_.isUndefined(returnValue) && isLastCaseMatched) {
                returnValue = toValue;
            }

            return chain;
        },

        mapTo: mapper => {
            if (_.isUndefined(returnValue) && isLastCaseMatched) {
                returnValue = _.isFunction(mapper) ? mapper(realValue) : _.get(realValue, mapper);
            }

            return chain;
        },

        value: defaultValue => returnValue || defaultValue,
    }

    return chain;
}
