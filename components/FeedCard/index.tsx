import React from 'react'
import { AiOutlineRetweet } from 'react-icons/ai';
import { BiMessageRounded } from 'react-icons/bi';
import { CiHeart } from 'react-icons/ci';
import { FiUpload } from 'react-icons/fi';

const FeedCard: React.FC =()=>{
    return (
    <div className=' border  border-r-0 border-l-0 border-b-0 border-gray-600 p-5  hover:bg-slate-900 transition-all cursor-pointer '>
        <div className='grid grid-cols-12 gap-2'>
            <div className=' col-span-1'>
                <img src="https://avatars.githubusercontent.com/u/111222286?v=4" alt='avatar-img' height={50} width={50} />
            </div>
            <div className=' col-span-11 pl-2'>
                <h1>Shubham</h1> 
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci asperiores, minima error ipsa quo quam id reprehenderit, blanditiis, voluptatum ut saepe molestias dolores libero praesentium dolore accusamus veniam deserunt repudiandae.
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