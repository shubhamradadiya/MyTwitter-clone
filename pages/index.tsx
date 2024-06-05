
import { title } from "process";
import { FaTwitter } from "react-icons/fa";
import { MdOutlineHome } from "react-icons/md";
import { FaHashtag } from "react-icons/fa6";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdMailOutline } from "react-icons/md";
import { FaRegBookmark } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { Inter } from 'next/font/google'
import FeedCard from "@/components/FeedCard";
import { CredentialResponse, GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useCallback } from "react";
import toast from "react-hot-toast";
import { graphqlClient } from "@/client/api";
import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";




const inter = Inter({ subsets: ['latin'] })

interface TwitterSidebarButton {
 title : string;
 icon: React.ReactNode
}

const SidebarMenuItem : TwitterSidebarButton[]=[
  {
    title:"Home",
    icon: <MdOutlineHome/>,
  },
  {
    title :"Explore",
    icon:<FaHashtag/>
  },
  {
    title:"Notifications",
    icon:<IoMdNotificationsOutline/>
  },
  {
    title:"Messages",
    icon:<MdMailOutline/>
  },
  {
    title:"Bookmarks",
    icon:<FaRegBookmark/>
  },
  {
    title:"Profile",
    icon:<FaRegUser/>
  }
]

export default function Home() {

const handleLoginWithGoogle = useCallback( async(cred:CredentialResponse)=>{
  const googleToken =  cred.credential
  if(!googleToken){
    return toast.error("Google token not found")
  }

  const {verifyGoogleToken}=await graphqlClient.request(
    verifyUserGoogleTokenQuery,
    {
      token:googleToken
    }
  )

  toast.success("Verified Success");
  console.log(verifyGoogleToken)

  if(verifyGoogleToken){
    window.localStorage.setItem('__twitter_token',verifyGoogleToken)
  }

},[]);

  return (
    <div className={inter.className}>
       <div className=" grid grid-cols-12 h-screen w-screen px-56 ml-16">
          <div className=" pt-1 col-span-3   ">
            {/* logo */}
            <div className="text-2xl h-fit w-fit hover:bg-gray-800 rounded-full p-2 ml-4 cursor-pointer transition-all ">
            <FaTwitter />
            </div>
            {/* list */}
            <div className="mt-2 text-xl  pr-4 font-bold   ">
              <ul className=" ">
                {
                  SidebarMenuItem.map((item) =>( 
                  <li 
                    className="flex justify-start m-3 items-center gap-3   hover:bg-gray-800 rounded-full px-4 py-1 w-fit cursor-pointer"
                  key={item.title}>
                    <span className=" text-2xl">{item.icon}</span>
                    <span>{item.title}</span>
                  </li>) )
                }
              </ul>
              <div className=" mt-5 ml-2">
                  <button className="bg-[#1d9bf0] py-2 px-5 items-center rounded-full w-full text-lg ">Tweet</button>
              </div>
            </div>
             
          </div> 
          <div className=" col-span-5 border-r-[1px] border-l-[1px] h-full overflow-scroll border-gray-600">
            <FeedCard/>
            <FeedCard/>
            <FeedCard/>
            <FeedCard/>
            <FeedCard/>
            <FeedCard/>
          </div>

          <div className=" col-span-3 p-5">
             <div className=" p-5 bg-slate-700 rounded-lg  ">
                  <h1 className="my-2 text-2xl">New to Twitter?</h1>
                 <GoogleLogin onSuccess={handleLoginWithGoogle}/>
   
             </div>
          </div>
       </div>
    </div>
  )
} 
