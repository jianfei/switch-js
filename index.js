import _get from 'lodash/get';
import _isEqual from 'lodash/isEqual';

module.exports = realValue => {
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
            matchedCallback && matchedCallback(realValue, isMatched);
        }
        else {
            notMatchedCallback && notMatchedCallback(realValue, isMatched);
        }

        return chain;
    },

    chain = {
        case: (caseValue, ...args) => caseHandler(_isEqual(caseValue, realValue), ...args),

        cases: (caseValues, ...args) => caseHandler(caseValues.includes(realValue), ...args),

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

        do: callback => {
            if (isLastCaseMatched) {
                callback(realValue, hasMatch);
            }

            return chain;
        },

        otherwise: callback => {
            if (!isLastCaseMatched) {
                callback(realValue, hasMatch);
            }

            return chain;
        },

        to: toValue => {
            if (returnValue === undefined && isLastCaseMatched) {
                returnValue = toValue;
            }

            return chain;
        },

        mapTo: mapper => {
            if (returnValue === undefined && isLastCaseMatched) {
                returnValue = typeof mapper === 'function' ? mapper(realValue) : _get(realValue, mapper);
            }

            return chain;
        },

        value: defaultValue => returnValue || defaultValue,
    }

    return chain;
};
