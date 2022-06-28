import { useMemo } from 'react';
import queryString from 'query-string';

export default function useGetQueryParams(locationSearch) {
  const queryParams = useMemo(() => {
    const params = queryString.parse(locationSearch);
    return {
      ...params,
      page: Number(params.page) || 1,
      limit: Number(params.limit) || 12,
    };
  }, [locationSearch]);
  return queryParams;
}
