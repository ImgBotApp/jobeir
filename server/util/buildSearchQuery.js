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
  const searchQuery: {
    location?: {},
    'role.value'?: {},
    featured?: boolean,
    'equity.offer'?: string,
    remote?: string,
    distance?: number,
    employmentType?: string,
    salary?: number,
    state?: string
  } = {};

  if (query.lng && query.lat) {
    const coordinates = [query.lng, query.lat].map(parseFloat);
    const distance = parseFloat(query.d) * 1000 || 10000;

    searchQuery.location = {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates
        },
        $maxDistance: distance
      }
    };
  }

  if (query.q && query.q !== 'any') {
    searchQuery['role.value'] = query.q;
  }

  if (query.eq) {
    searchQuery['equity.offer'] = query.eq;
  }

  if (query.et) {
    searchQuery.employmentType = query.et;
  }

  if (query.r) {
    searchQuery.remote = query.r;
  }

  // only want active job postings
  searchQuery.state = 'active';

  return searchQuery;
}
