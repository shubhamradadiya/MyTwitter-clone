/* eslint-disable @next/next/no-img-element */

import { graphqlClient } from "@/client/api";
import FeedCard from "@/components/FeedCard";
import Twitterlayout from "@/components/Layout/TwitterLayout";
import { Tweet, User } from "@/gql/graphql";
import { followUserMutation, unfollowUserMutation } from "@/graphql/mutation/user";
import { useCurrentUser, useGetUserById } from "@/hooks/user";
import { useQueryClient } from "@tanstack/react-query";
import type {  NextPage } from "next";
import { useRouter } from "next/router";
import {  useCallback, useMemo} from "react";
import { FaArrowLeftLong } from "react-icons/fa6";



interface ServerProps {
    userInfo?: User;
  }



  const UserProfilePage: NextPage= () => {
  const queryClienT = useQueryClient()
  const router = useRouter()
  const {user} = useGetUserById(router.query.id as string);
  
  const{user :current_user}= useCurrentUser();
  
// todo: follow & unFollow
  const amIFollowing = useMemo(()=>{
     if(!user) return false;
     return (current_user?.following?.findIndex((el)=>el?.id  ===user?.id)??-1 ) >= 0
  },[current_user?.following, user]);


  const handleFollowUser = useCallback(async()=>{
    if(!user?.id) return;

    await graphqlClient.request(followUserMutation,{to: user?.id})
    await queryClienT.invalidateQueries({queryKey:["current-user"]})
    await queryClienT.invalidateQueries({queryKey:["getUser-id"]})
    
  },[queryClienT, user?.id])


  const handleUnFollowUser = useCallback(async()=>{
    if(!user?.id) return;

    await graphqlClient.request(unfollowUserMutation,{to: user?.id})
    await queryClienT.invalidateQueries({queryKey:["current-user"]})
    await queryClienT.invalidateQueries({queryKey:["getUser-id"]})
    
  },[queryClienT, user?.id])
 
    return ( 
        <div>
            <Twitterlayout>
                <div>
                    <nav className="flex items-center gap-4 py-3 px-3">
                        <FaArrowLeftLong className=" text-2xl"/>
                        <div>
                            <h1 className=" text-xl font-semibold">{user?.firstName} </h1>
                            <h1 className=" text-md font-bold text-slate-500">{user?.tweets?.length} Tweets </h1>
                        </div>
                    </nav>
                    <div className=" p-4 border-b border-slate-800">
                       {
                         user?.profileImageURL &&
                         <img className=" rounded-full" src={`${user?.profileImageURL}`} alt="user-image" width={100} height={100}/>
                       }
                           <h1 className=" text-xl font-semibold mt-4">{user?.firstName} </h1>
                        <div className=" flex justify-between items-center ">
                            <div className=" flex gap-4 mt-2 text-sm text-gray-400">
                                    <span>{user?.followers?.length} followers</span>
                                    <span>{user?.following?.length} following</span>
                            </div>
                            {
                                current_user?.id !== user?.id &&
                                <>
                                    {amIFollowing ?(
                                       <button onClick={handleUnFollowUser}  className=" bg-white text-black px-3 py-1 text-sm  rounded-full font-bold">
                                             UnFollow
                                       </button>                             
                                    ):
                                    (
                                     <button onClick={handleFollowUser} className=" bg-white text-black px-3 py-1 text-sm  rounded-full font-bold">
                                            Follow
                                     </button>  
                                    )

                                    }
                                </>
                            }
                        </div>
                    </div>
          
                    <div>
                        {
                            user?.tweets?.slice().reverse().map(tweet => (
                                <FeedCard data={tweet as Tweet} key={tweet?.id} />
                              ))
                              
                        }
                    </div>
                </div>


            </Twitterlayout>
        </div>
    );
};

// export const getServerSideProps: GetServerSideProps<ServerProps> = async (
//     context
//   ) => {
//     const id = context.query.id as string | undefined;
  
//     if (!id) return { notFound: true, props: { userInfo: undefined } };
  
//     const userInfo = await graphqlClient.request(getUserByIdQuery , {id})
  
//     if (!userInfo?.getUserById) return { notFound: true };
  
//     return {
//       props: {
//         userInfo: userInfo.getUserById as User,
//       },
//     };
//   };
  
  export default UserProfilePage;