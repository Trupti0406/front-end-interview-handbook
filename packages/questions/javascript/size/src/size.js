/**
 * Gets the size of `collection` by returning its length for array-like values or the number of own enumerable string keyed properties for objects.
 *
 * @param {Array | Object | string | undefined} collection The collection to inspect.
 * @returns {number} Returns the collection size.
 */
export default function size(collection) {
  if (collection == null) {
    return 0;
  }

  if (Array.isArray(collection) || typeof collection === 'string') {
    return collection.length;
  }

  if (typeof collection === 'object') {
    return Object.keys(collection).length;
  }

  return 0;
}
