"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.superstructResolver = void 0;
const react_hook_form_1 = require("react-hook-form");
const superstruct_1 = require("superstruct");
const convertArrayToPathName_1 = require("./utils/convertArrayToPathName");
function getParseReducer(validateAllFieldCriteria) {
    return function blah(previous, { path, message = '', type }) {
        const currentPath = convertArrayToPathName_1.default(path);
        return Object.assign(Object.assign({}, previous), (path
            ? previous[currentPath] && validateAllFieldCriteria
                ? {
                    [currentPath]: react_hook_form_1.appendErrors(currentPath, validateAllFieldCriteria, previous, type || '', message),
                }
                : {
                    [currentPath]: previous[currentPath] || Object.assign({ message,
                        type }, (validateAllFieldCriteria
                        ? {
                            types: { [type || '']: message || true },
                        }
                        : {})),
                }
            : {}));
    };
}
const parseErrorSchema = (error, validateAllFieldCriteria) => {
    const failures = error.failures();
    const reified = Array.from(failures);
    return reified.length
        ? reified.reduce(getParseReducer(validateAllFieldCriteria), {})
        : [];
};
exports.superstructResolver = (schema) => async (values, _, validateAllFieldCriteria = true) => {
    try {
        const [error] = superstruct_1.validate(values, schema);
        if (!error) {
            return {
                values: values,
                errors: {},
            };
        }
        else {
            throw error;
        }
    }
    catch (e) {
        const out = parseErrorSchema(e, validateAllFieldCriteria);
        return {
            values: {},
            errors: react_hook_form_1.transformToNestObject(out),
        };
    }
};
//# sourceMappingURL=superstruct.js.map