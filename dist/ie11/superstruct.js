"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.superstructResolver = void 0;
var react_hook_form_1 = require("react-hook-form");
var superstruct_1 = require("superstruct");
var convertArrayToPathName_1 = require("./utils/convertArrayToPathName");
function getParseReducer(validateAllFieldCriteria) {
    return function blah(previous, _a) {
        var _b, _c, _d;
        var path = _a.path, _e = _a.message, message = _e === void 0 ? '' : _e, type = _a.type;
        var currentPath = convertArrayToPathName_1.default(path);
        return __assign(__assign({}, previous), (path
            ? previous[currentPath] && validateAllFieldCriteria
                ? (_b = {},
                    _b[currentPath] = react_hook_form_1.appendErrors(currentPath, validateAllFieldCriteria, previous, type || '', message),
                    _b) : (_c = {},
                _c[currentPath] = previous[currentPath] || __assign({ message: message,
                    type: type }, (validateAllFieldCriteria
                    ? {
                        types: (_d = {}, _d[type || ''] = message || true, _d),
                    }
                    : {})),
                _c)
            : {}));
    };
}
var parseErrorSchema = function (error, validateAllFieldCriteria) {
    var failures = error.failures();
    var reified = Array.from(failures);
    return reified.length
        ? reified.reduce(getParseReducer(validateAllFieldCriteria), {})
        : [];
};
exports.superstructResolver = function (schema) { return function (values, _, validateAllFieldCriteria) {
    if (validateAllFieldCriteria === void 0) { validateAllFieldCriteria = true; }
    return __awaiter(void 0, void 0, void 0, function () {
        var _a, error, out;
        return __generator(this, function (_b) {
            try {
                _a = __read(superstruct_1.validate(values, schema), 1), error = _a[0];
                if (!error) {
                    return [2 /*return*/, {
                            values: values,
                            errors: {},
                        }];
                }
                else {
                    throw error;
                }
            }
            catch (e) {
                out = parseErrorSchema(e, validateAllFieldCriteria);
                return [2 /*return*/, {
                        values: {},
                        errors: react_hook_form_1.transformToNestObject(out),
                    }];
            }
            return [2 /*return*/];
        });
    });
}; };
//# sourceMappingURL=superstruct.js.map