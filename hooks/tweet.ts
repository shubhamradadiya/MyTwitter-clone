import { graphqlClient } from "@/client/api"
import { CreateTweetData } from "@/gql/graphql"
import { createTweetMutation } from "@/graphql/mutation/tweet"
import { getAllTweetsQuery } from "@/graphql/query/tweet"
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query"

import toast from "react-hot-toast"

export const useCreateTweet =() =>{
    const queryClient = new QueryClient()
    const  mutation =useMutation({
     
        mutationFn: (payload : CreateTweetData)=>   graphqlClient.request(createTweetMutation, {payload}),

        onSuccess:async ( )=> {
            await queryClient.invalidateQueries({queryKey:["all-tweets"]})
            toast.success('Created Success',{id:"1"})
        },
        onMutate:(payload)=> toast.loading("Creating Tweet",{id:'1'}),
    }); 

    return mutation;
}

export const useGetAllTweets =()=>{
    const query = useQuery({
        queryKey:['all-tweets'],
        queryFn: async ()=>await graphqlClient.request(getAllTweetsQuery)
    })
    return {...query,tweets: query.data?.getAllTweets}
};