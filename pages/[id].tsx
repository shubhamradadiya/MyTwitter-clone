/* eslint-disable @next/next/no-img-element */

import { graphqlClient } from "@/client/api";
import FeedCard from "@/components/FeedCard";
import Twitterlayout from "@/components/Layout/TwitterLayout";
import { Tweet, User } from "@/gql/graphql";
import { getUserByIdQuery } from "@/graphql/query/user";
import { useCurrentUser, useGetUserById } from "@/hooks/user";
import type { GetServerSideProps, NextPage } from "next";
import { useParams, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";



interface ServerProps {
    userInfo?: User;
  }


  const UserProfilePage: NextPage= () => {
  
  const id =useParams()

  console.log(id)
  const {user} = useGetUserById(id.id as string);
  console.log(user)
  
 
    return ( 
        <div>
            <Twitterlayout>
                <div>
                    <nav className="flex items-center gap-4 py-3 px-3">
                        <FaArrowLeftLong className=" text-2xl"/>
                        <div>
                            <h1 className=" text-xl font-semibold">Shubham Radadiya</h1>
                            <h1 className=" text-md font-bold text-slate-500">100 Tweets</h1>
                        </div>
                    </nav>
                    <div className=" p-4 border-b border-slate-800">
                       {
                         user?.profileImageURL &&
                         <img className=" rounded-full" src={`${user?.profileImageURL}`} alt="user-image" width={100} height={100}/>
                       }
                           <h1 className=" text-xl font-semibold mt-4">Shubham Radadiya</h1>
                    </div>
          
                    <div>
                        {
                            user?.tweets?.map(tweet => <FeedCard data={tweet as Tweet } key={tweet?.id}/>)
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