
import { title } from "process";
import { FaTwitter } from "react-icons/fa";
import { FaRegImage } from "react-icons/fa6";
import { MdOutlineHome } from "react-icons/md";
import { FaHashtag } from "react-icons/fa6";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdMailOutline } from "react-icons/md";
import { FaRegBookmark } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { Inter } from 'next/font/google'
import FeedCard from "@/components/FeedCard";
import { CredentialResponse, GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { graphqlClient } from "@/client/api";
import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";
import { useCurrentUser } from "@/hooks/user";
import { useQueryClient } from "@tanstack/react-query";
import { useCreateTweet, useGetAllTweets } from "@/hooks/tweet";
import { Tweet } from "@/gql/graphql";




const inter = Inter({ subsets: ['latin'] });

interface TwitterSidebarButton {
  title: string;
  icon: React.ReactNode
}

const SidebarMenuItem: TwitterSidebarButton[] = [
  {
    title: "Home",
    icon: <MdOutlineHome />,
  },
  {
    title: "Explore",
    icon: <FaHashtag />
  },
  {
    title: "Notifications",
    icon: <IoMdNotificationsOutline />
  },
  {
    title: "Messages",
    icon: <MdMailOutline />
  },
  {
    title: "Bookmarks",
    icon: <FaRegBookmark />
  },
  {
    title: "Profile",
    icon: <FaRegUser />
  }
]

export default function Home() {

  const { user } = useCurrentUser();
  const { tweets = [] } = useGetAllTweets()
  const {mutateAsync} = useCreateTweet( )

  const queryClient = useQueryClient();

  const [content, setContent] = useState<string>("");

  const handleSelectImage = useCallback(() => {
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.click();
  }, [])

  const handleCreateTweet =useCallback(async()=>{
    mutateAsync({
      content,  
    })
  },[content])

  const handleLoginWithGoogle = useCallback(async (cred: CredentialResponse) => {
    const googleToken = cred.credential
    if (!googleToken) {
      return toast.error("Google token not found")
    }

    const { verifyGoogleToken } = await graphqlClient.request(
      verifyUserGoogleTokenQuery,
      {
        token: googleToken
      }
    )

    toast.success("Verified Success");
    console.log(verifyGoogleToken)

    if (verifyGoogleToken) {
      window.localStorage.setItem('__twitter_token', verifyGoogleToken)
    }

    await queryClient.invalidateQueries({ queryKey: ["current-user"] })

  }, [queryClient]);

  return (
    <div className={`${inter.className} overflow-hidden`}>
      <div className=" grid grid-cols-12 h-screen w-screen px-56 ml-16 ">
        <div className=" pt-1 col-span-3 relative  ">
          {/* logo */}
          <div className="text-2xl h-fit w-fit hover:bg-gray-800 rounded-full p-2 ml-4 cursor-pointer transition-all ">
            <FaTwitter />
          </div>
          {/* list */}
          <div className="mt-2 text-xl  pr-4 font-bold   ">
            <ul className=" ">
              {
                SidebarMenuItem.map((item) => (
                  <li
                    className="flex justify-start m-3 items-center gap-3   hover:bg-gray-800 rounded-full px-4 py-1 w-fit cursor-pointer"
                    key={item.title}>
                    <span className=" text-2xl">{item.icon}</span>
                    <span>{item.title}</span>
                  </li>))
              }
            </ul>
            <div className=" mt-5 ml-2 " >
              <button className="bg-[#1d9bf0] py-2 px-5 items-center rounded-full w-full text-lg ">
                Tweet
              </button>
            </div>
          </div>

          {user &&
            <div className=" absolute bottom-5 flex gap-2 items-center bg-slate-800 px-3 py-2 rounded-full ">
              {
                user && user.profileImageURL &&
                <img src={`${user?.profileImageURL}`} alt="user-image" height={50} width={50} className=" rounded-full" />
              }
              <div>
                <h3 className=" text-xl">{user.firstName}</h3>
              </div>
            </div>
          }

        </div>
        <div className="col-span-5 border-r-[1px] border-l-[1px] h-full overflow-scroll border-gray-600 scrollbar-hide">
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
                    onChange= {(e) =>  setContent(e.target.value)}
                    className=" w-full bg-transparent text-xl px-3 border-b border-slate-700"
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

        </div>


        <div className=" col-span-3 p-5">
          {
            !user &&
            <div className=" p-5 bg-slate-700 rounded-lg  ">
              <h1 className="my-2 text-2xl">New to Twitter?</h1>
              <GoogleLogin onSuccess={handleLoginWithGoogle} />
            </div>
          }
        </div>
      </div>
    </div>
  )
} 
