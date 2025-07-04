import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react'; // ✅ FIXED HERE
import { link } from '../../Constants';

export const apiHandler = createApi({
  reducerPath: 'apiHandler',
  baseQuery: fetchBaseQuery({
    baseUrl: link?.baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = getState()?.user?.token;
      console.log('token for rtk: ', token);

      headers.set('Accept', 'application/json');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: builder => ({
    postApi: builder.mutation({
      query: ({ url, method, data }) => {
        console.log('url post: ', url);
        console.log('data post: ', data);
        return {
          url,
          method: method ?? 'POST',
          body: data,
        };
      },
    }),
    getApi: builder.mutation({
      query: ({ url, data }) => {
        console.log('url get: ', url);
        console.log('data get: ', data);
        return {
          url: data ? `${url}?${data}` : url,
        };
      },
    }),
  }),
});

export const { usePostApiMutation, useGetApiMutation } = apiHandler;
