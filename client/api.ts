import { GraphQLClient } from "graphql-request";

const isClient = typeof window !== undefined;

 export const graphqlClient = new GraphQLClient("https://twitter-clone-server-jj64.onrender.com/graphql",
    {
        headers: ()=>({
            Authorization: isClient ? `Bearer ${window.localStorage.getItem("__twitter_token")}`
            :""
        })
    }
 );