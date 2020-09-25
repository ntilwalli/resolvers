import {
  appendErrors,
  transformToNestObject,
  Resolver,
  FieldValues,
} from 'react-hook-form';
import { validate, StructFailure, StructError } from 'superstruct';
import convertArrayToPathName from './utils/convertArrayToPathName';

function getParseReducer(validateAllFieldCriteria: boolean) {
  return function blah(
    previous: Record<string, any>,
    { path, message = '', type }: StructFailure,
  ) {
    const currentPath = convertArrayToPathName(path);

    return {
      ...previous,
      ...(path
        ? previous[currentPath] && validateAllFieldCriteria
          ? {
              [currentPath]: appendErrors(
                currentPath,
                validateAllFieldCriteria,
                previous,
                type || '',
                message,
              ),
            }
          : {
              [currentPath]: previous[currentPath] || {
                message,
                type,
                ...(validateAllFieldCriteria
                  ? {
                      types: { [type || '']: message || true },
                    }
                  : {}),
              },
            }
        : {}),
    };
  };
}

const parseErrorSchema = (
  error: StructError,
  validateAllFieldCriteria: boolean,
) => {
  const failures: Iterable<StructFailure> = error.failures();
  const reified: StructFailure[] = Array.from(failures);
  return reified.length
    ? reified.reduce(getParseReducer(validateAllFieldCriteria), {})
    : [];
};

export const superstructResolver = <TFieldValues extends FieldValues>(
  schema: any,
): Resolver<TFieldValues> => async (
  values,
  _,
  validateAllFieldCriteria = true,
) => {
  try {
    const [error] = validate(values, schema);
    if (!error) {
      return {
        values: values,
        errors: {},
      };
    } else {
      throw error;
    }
  } catch (e) {
    const out = parseErrorSchema(e, validateAllFieldCriteria);
    return {
      values: {},
      errors: transformToNestObject(out),
    };
  }
};
