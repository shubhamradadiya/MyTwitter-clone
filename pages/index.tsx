
import { FaRegImage } from "react-icons/fa6";
import { Inter } from 'next/font/google'
import FeedCard from "@/components/FeedCard";
import { useCallback, useState } from "react";
import { useCurrentUser } from "@/hooks/user";
import { useCreateTweet, useGetAllTweets } from "@/hooks/tweet";
import { Tweet } from "@/gql/graphql";
import Twitterlayout from "@/components/Layout/TwitterLayout";
import { useQuery } from "@tanstack/react-query";
import { graphqlClient } from "@/client/api";
import { getAllTweetsQuery } from "@/graphql/query/tweet";




const inter = Inter({ subsets: ['latin'] });




export default function Home() {

  const { user } = useCurrentUser();
  const { tweets = [] } = useGetAllTweets()
  const { mutateAsync } = useCreateTweet()



  const [content, setContent] = useState<string>("");

  const handleSelectImage = useCallback(() => {
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.click();
  }, [])

  const handleCreateTweet = useCallback(async () => {
    mutateAsync({
      content,
    }),
        await graphqlClient.request(getAllTweetsQuery)
    
     
  
  }, [content])



  return (
    <div className={`${inter.className} overflow-hidden`}>
      <Twitterlayout>
        <div>
          <div className=' border  border-r-0 border-l-0 border-b-0 border-gray-600 p-5  hover:bg-slate-900 transition-all cursor-pointer '>
            <div className='grid grid-cols-12 gap-2'>
              <div className=' col-span-1'>
                {user?.profileImageURL &&
                  <img className=" rounded-full" src={`${user?.profileImageURL}`} alt='avatar-img' height={50} width={50} />}
              </div>
              <div className=" col-span-11 ">
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className=" w-full scrollbar-hide bg-transparent text-xl px-3 border-b border-slate-700"
                  rows={3}
                  placeholder="What's happening?"
                >
                </textarea>
                <div className=" mt-0 flex items-center justify-between  ">
                  <FaRegImage onClick={handleSelectImage} className=" text-xl mt-5" />
                  <div className=" mt-5 ml-2 " >
                    <button onClick={handleCreateTweet} className="bg-[#1d9bf0] py-2 px-4 items-center rounded-full  text-sm mt-0 ">
                      Tweet
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        {
          tweets?.map(tweet =>
            <FeedCard key={tweet?.id} data={tweet as Tweet} />)
        }
      </Twitterlayout>
    </div>
  )
} 
