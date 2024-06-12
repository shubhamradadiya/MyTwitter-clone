import { graphqlClient } from "@/client/api"
import { getCurrentUserQuery, getUserByIdQuery } from "@/graphql/query/user"
import { useQuery } from "@tanstack/react-query"

export const useCurrentUser = ()=>{
    const query = useQuery ({
        queryKey:["current-user"],
        queryFn: ()=> graphqlClient.request(getCurrentUserQuery),
    })

    return {...query,user:query.data?.getCurrentUser}
};

export const useGetUserById = (id : string) =>{
    console.log(id)
    const query = useQuery({
        queryKey:["getUser-id"],
        queryFn:async ()=> {
        
               return await graphqlClient.request(getUserByIdQuery ,
                    {
                        id:id
                    }
        
                )
            
        }
    })
      console.log(query)
    return {...query,user:query.data?.getUserById}
}