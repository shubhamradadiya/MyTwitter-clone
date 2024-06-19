import { graphqlClient } from "@/client/api"
import { CreateTweetData } from "@/gql/graphql"
import { createTweetMutation } from "@/graphql/mutation/tweet"
import { getAllTweetsQuery } from "@/graphql/query/tweet"
import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import toast from "react-hot-toast"

export const useCreateTweet =() =>{
    const queryClient = useQueryClient();
    const  mutation =useMutation({
     
        mutationFn: async(payload : CreateTweetData)=>  await graphqlClient.request(createTweetMutation, {payload}),
        onMutate:(payload)=> toast.loading("Creating Tweet",{id:"1"}),
        onSuccess:async ( payload)=> {
            toast.success('Created Success',{id:"1"})
         return await queryClient.invalidateQueries({queryKey:["all-tweets"]})
        
       
        },

    }); 

    return mutation;
}

export const useGetAllTweets =()=>{ 
    const query = useQuery({
        queryKey:["all-tweets"],
        queryFn: async()=> await graphqlClient.request(getAllTweetsQuery)
    })
    return {...query,tweets: query.data?.getAllTweets}
};