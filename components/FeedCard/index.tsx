import { Tweet } from '@/gql/graphql';
import Link from 'next/link';
import React from 'react'
import { AiOutlineRetweet } from 'react-icons/ai';
import { BiMessageRounded } from 'react-icons/bi';
import { CiHeart } from 'react-icons/ci';
import { FiUpload } from 'react-icons/fi';

interface FeedCardProps {
  data: Tweet
}



const FeedCard: React.FC<FeedCardProps>=(props)=>{
  const {data}=props

    return (
    <div className=' border  border-r-0 border-l-0 border-b-0 border-gray-600 p-5  hover:bg-slate-900 transition-all cursor-pointer '>
        <div className='grid grid-cols-12 gap-2'>
            <div className=' col-span-1'>
              { data.author?.profileImageURL &&
                 <img className=' rounded-full' src={`${data.author?.profileImageURL}`}alt='avatar-img' height={50} width={50} />

              }
            </div>
            <div className=' col-span-11 pl-2'>
                <Link href={`/${data.author?.id}`}>{data.author?.firstName}</Link>
                <p>
                  {
                    data.content
                  }
                </p>

                <div className=' flex justify-between mt-5 text-xl w-[90%]'>
                    <div>
                       <BiMessageRounded />
                    </div>   
                    <div>
                      <AiOutlineRetweet />
                    </div>
                    <div>
                        <CiHeart />
                    </div>
                    <div>
                      <FiUpload />
                    </div>
                    </div>
            </div>
           
        </div>
    </div>
    )
}

export default  FeedCard ;