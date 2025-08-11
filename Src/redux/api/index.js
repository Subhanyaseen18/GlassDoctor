import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
import { link } from '../../Constants';

const customBaseQuery = fetchBaseQuery({
  baseUrl: link?.baseUrl,
  prepareHeaders: (headers, { getState }) => {
    const token = getState()?.user?.token;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    headers.set('Accept', 'application/json, text/plain');
    headers.set('Content-Type', 'application/json');
    return headers;
  },
  responseHandler: async response => {
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return response.json();
    } else {
      const text = await response.text();
      return { text, status: response.status };
    }
  },
});

export const apiHandler = createApi({
  reducerPath: 'apiHandler',
  baseQuery: async (args, api, extraOptions) => {
    try {
      const result = await customBaseQuery(args, api, extraOptions);
      return result;
    } catch (error) {
      console.error('API Error:', error);
      return { error: { data: error.message || 'Unknown error' } };
    }
  },
  endpoints: builder => ({
    postApi: builder.mutation({
      query: ({ url, method, data }) => {
        console.log('🔹 POST:', url, data);
        return {
          url,
          method: method ?? 'POST',
          body: data,
        };
      },
    }),
    getApi: builder.mutation({
      query: ({ url, data }) => {
        const queryParams = data
          ? '?' +
            Object.entries(data)
              .map(
                ([key, value]) =>
                  `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
              )
              .join('&')
          : '';
        console.log('🔹 GET:', `${url}${queryParams}`);
        return {
          url: `${url}${queryParams}`,
          method: 'GET',
        };
      },
    }),
  }),
});

export const { usePostApiMutation, useGetApiMutation } = apiHandler;
