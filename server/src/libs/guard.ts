export class Guard {
  /**
   * Checks if value is empty. Accepts strings, numbers, booleans, objects and arrays.
   */
  static isEmpty(value: unknown): boolean {
    if (typeof value === 'number' || typeof value === 'boolean') {
      return false;
    }
    if (typeof value === 'undefined' || value === null) {
      return true;
    }
    if (value instanceof Date) {
      return false;
    }
    if (value instanceof Object && !Object.keys(value).length) {
      return true;
    }
    if (Array.isArray(value)) {
      if (value.length === 0) {
        return true;
      }
      if (value.every((item) => Guard.isEmpty(item))) {
        return true;
      }
    }
    if (value === '') {
      return true;
    }

    return false;
  }

  /**
   * Checks length range of a provided number/string/array
   */
  static lengthIsBetween(
    value: number | string | Array<unknown>,
    min: number,
    max: number,
  ): boolean {
    if (Guard.isEmpty(value)) {
      throw new Error(
        'Cannot check length of a value. Provided value is empty',
      );
    }
    const valueLength =
      typeof value === 'number'
        ? Number(value).toString().length
        : value.length;
    if (valueLength >= min && valueLength <= max) {
      return true;
    }
    return false;
  }

  static isBase64(str: string): boolean {
    if (str === '' || str.trim() === '') {
      return false;
    }

    try {
      const decodedBinaryData = Buffer.from(str, 'base64');
      const encoded = decodedBinaryData.toString('base64');
      return encoded === str;
      // const decoded = Buffer.from(base64Data, 'base64').toString('ascii');
      // const encoded = Buffer.from(decoded, 'ascii').toString('base64');
      // return encoded === base64Data;
    } catch (e) {
      return false;
    }
  }
  static isAllowedMimeType(mimeType: string): boolean {
    const allowedMimeTypes = ['image/png', 'image/jpeg'];
    return allowedMimeTypes.includes(mimeType);
  }

  static isInArray<T>(value: T, allowedValues: readonly T[]): boolean {
    return allowedValues.includes(value);
  }
}
