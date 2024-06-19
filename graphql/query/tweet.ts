import { graphql } from "@/gql";

export const getAllTweetsQuery = graphql(`#graphql
    
    query GetAllTweets{
        getAllTweets {
            id
            content
            imageURL
            author {
                id
                firstName
                lastName
                profileImageURL
            }

        }
    }
    `);


export const getSignedUrlForTweetQuery = graphql(`#graphql

            query GetSignUrl($imageName: String!, $imageType: String!) {
                    getSignedURLForTweet(imageName: $imageName, imageType: $imageType)
             }
    `)