"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zodResolver = void 0;
const react_hook_form_1 = require("react-hook-form");
const convertArrayToPathName_1 = require("./utils/convertArrayToPathName");
const parseErrorSchema = (zodError, validateAllFieldCriteria) => {
    if (zodError.isEmpty) {
        return {};
    }
    return zodError.errors.reduce((previous, { path, message, code: type }) => {
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
    }, {});
};
exports.zodResolver = (schema, options) => async (values, _, validateAllFieldCriteria = false) => {
    const result = schema.safeParse(values, options);
    if (result.success) {
        return { values: result.data, errors: {} };
    }
    return {
        values: {},
        errors: react_hook_form_1.transformToNestObject(parseErrorSchema(result.error, validateAllFieldCriteria)),
    };
};
//# sourceMappingURL=zod.js.map