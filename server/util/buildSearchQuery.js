// @flow

/**
 * buildJobSearchQuery()
 * responsible for building the dynamic job query based on the query
 * params received from the GET jobs request.
 * 
 * Support querying based on:
 * - location (geometry)
 * - role (title)
 */
export function buildJobSearchQuery(query: {}): {} {
  const searchQuery: { location?: {}, 'role.value'?: {} } = {};

  if (query.lng && query.lat) {
    const coordinates = [query.lng, query.lat].map(parseFloat);

    searchQuery.location = {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates
        },
        $maxDistance: 10000
      }
    };
  }

  if (query.q) {
    searchQuery['role.value'] = query.q;
  }

  return searchQuery;
}
