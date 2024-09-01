// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const apiURL = process.env.REACT_APP_API_URL;

// Define a service using a base URL and expected endpoints
export const userApi = createApi({
    reducerPath: 'user',
    baseQuery: fetchBaseQuery({ baseUrl: apiURL }),
    endpoints: (builder) => ({
        Register: builder.mutation({
            query: (data) => ({
                url: '/user/register',
                method: 'POST',
                body: data,
            }),
        }),
        Login: builder.mutation({
            query: (data) => ({
                url: '/user/login',
                method: 'POST',
                body: data,
            }),
        }),
        Service: builder.mutation({
            query: (data) => ({
                url: '/task',
                method: 'POST',
                body: data,
                headers: {
                    // Assuming you have a way to get the token, you can add it here
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }),
        }),      
        updateTask: builder.mutation({
            query: ({id , data}) => ({
                url: `/task/${id}`,
                method: 'PUT',
                body: data,
                headers: {
                    // Assuming you have a way to get the token, you can add it here
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }),
        }),    
        getRequestTask: builder.query({
            query: () => ({
                url: '/task',
                method: 'GET',
                headers: {
                    // Assuming you have a way to get the localStorage.getItem("token"), you can add it here
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }),
        }),
        getOneTask: builder.query({
            query: (id) => ({
                url: '/task/' + id,
                method: 'GET',
                headers: {
                    // Assuming you have a way to get the localStorage.getItem("token"), you can add it here
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }),
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
    useRegisterMutation,
    useLoginMutation,
    useServiceMutation,
    useGetRequestTaskQuery,
    useGetOneTaskQuery,
    useUpdateTaskMutation
} = userApi