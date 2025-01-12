"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.joiResolver = void 0;
const react_hook_form_1 = require("react-hook-form");
const convertArrayToPathName_1 = require("./utils/convertArrayToPathName");
const parseErrorSchema = (error, validateAllFieldCriteria) => Array.isArray(error.details)
    ? error.details.reduce((previous, { path, message = '', type }) => {
        const currentPath = convertArrayToPathName_1.default(path);
        return Object.assign(Object.assign({}, previous), (path
            ? previous[currentPath] && validateAllFieldCriteria
                ? {
                    [currentPath]: react_hook_form_1.appendErrors(currentPath, validateAllFieldCriteria, previous, type, message),
                }
                : {
                    [currentPath]: previous[currentPath] || Object.assign({ message,
                        type }, (validateAllFieldCriteria
                        ? {
                            types: { [type]: message || true },
                        }
                        : {})),
                }
            : {}));
    }, {})
    : [];
exports.joiResolver = (schema, options = {
    abortEarly: false,
}) => async (values, _, validateAllFieldCriteria = false) => {
    try {
        return {
            values: await schema.validateAsync(values, Object.assign({}, options)),
            errors: {},
        };
    }
    catch (e) {
        return {
            values: {},
            errors: react_hook_form_1.transformToNestObject(parseErrorSchema(e, validateAllFieldCriteria)),
        };
    }
};
//# sourceMappingURL=joi.js.map