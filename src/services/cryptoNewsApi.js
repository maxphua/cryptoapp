import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const crytoNewsHeaders = {
    'x-bingapis-sdk': 'true',
    'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
    'x-rapidapi-key': '0e9dbf76e8msh41b523eacf5a0ecp1da8cajsn42c72babb44d',
};

const baseUrl = 'https://bing-news-search1.p.rapidapi.com';

const createRequest = (url) => ({ url, headers: crytoNewsHeaders});

export const cryptoNewsApi = createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptoNews: builder.query({
            query: ({ newsCategory, count }) => createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`),
        }),
    }),
});

export const { useGetCryptoNewsQuery }= cryptoNewsApi;