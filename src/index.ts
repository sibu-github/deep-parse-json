function isNumString(str: string): boolean {
  return !Number.isNaN(Number(str));
}
/**
 * Recursively parses a stringified JSON
 * @param jsonString
 * @returns
 */
export function deepParseJson(jsonString: any): any {
  // if not stringified json rather a simple string value then JSON.parse will throw error
  // otherwise continue recursion
  if (typeof jsonString === 'string') {
    if (isNumString(jsonString)) {
      // if a numeric string is received, return itself
      // otherwise JSON.parse will convert it to a number
      return jsonString;
    }
    try {
      return deepParseJson(JSON.parse(jsonString));
    } catch (err) {
      return jsonString;
    }
  }

  // if an array is received, map over the array and deepParse each value
  if (Array.isArray(jsonString)) {
    return jsonString.map((val) => deepParseJson(val));
  }

  // if an object is received then deep parse each element in the object
  // typeof null returns 'object' too, so we have to eliminate that
  if (typeof jsonString === 'object' && jsonString !== null) {
    return Object.keys(jsonString).reduce(
      (obj, key) => Object.assign(obj, { [key]: deepParseJson(jsonString[key]) }),
      {}
    );
  }

  return jsonString;
}
