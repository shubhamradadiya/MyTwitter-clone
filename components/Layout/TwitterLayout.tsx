import { useGetAllTweets } from "@/hooks/tweet";
import { useCurrentUser } from "@/hooks/user";
import React, { useCallback, useMemo } from "react";
import { FaHashtag, FaRegBookmark, FaRegUser, FaTwitter } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdMailOutline, MdOutlineHome } from "react-icons/md";
import { CredentialResponse, GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import toast from "react-hot-toast";
import { graphqlClient } from "@/client/api";
import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";



interface TwitterlayoutProps {
    children: React.ReactNode
}

interface TwitterSidebarButton {
    title: string;
    icon: React.ReactNode
    link : string
  }

  

const Twitterlayout: React.FC<TwitterlayoutProps> = (props) => {
    const { user } = useCurrentUser();    
    const queryClient = useQueryClient();
    const SidebarMenuItem: TwitterSidebarButton[] = useMemo(()=>[
      {
        title: "Home",
        icon: <MdOutlineHome />,
        link:"/"
      },
      {
        title: "Explore",
        icon: <FaHashtag />,
         link:"/"
      },
      {
        title: "Notifications",
        icon: <IoMdNotificationsOutline />,
         link:"/"
      },
      {
        title: "Messages",
        icon: <MdMailOutline />,
         link:"/"
      },
      {
        title: "Bookmarks",
        icon: <FaRegBookmark />,
         link:"/"
      },
      {
        title: "Profile",
        icon: <FaRegUser />,
         link:`/${user?.id}`
      }
    ] ,[user?.id])

    
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
        <div>
            <div className=" grid grid-cols-12 h-screen w-screen sm:px-56 ">
                <div className="col-span-2 sm:col-span-3 pt-1 flex sm:justify-end pr-4 relative  ">
                    <div>
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
                                        
                                        key={item.title}>
                                          <Link href={item.link} className="flex justify-start m-3 items-center gap-3   hover:bg-gray-800 rounded-full px-3 py-1 w-fit cursor-pointer">
                                          <span className="  text-2xl">{item.icon}</span>
                                          <span className="hidden sm:inline ">{item.title}</span>
                                          </Link>
                                    </li>))
                            }
                        </ul>
                        <div className=" mt-5 ml-2 " >
                            <button className=" hidden sm:block bg-[#1d9bf0] ml-2 py-2 px-11 items-center rounded-full text-lg ">
                                Tweet
                            </button>
                            <button className=" block sm:hidden  bg-[#1d9bf0] ml-2 py-2 px-3 items-center rounded-full text-lg ">
                                <FaTwitter/>
                            </button>
                        </div>
                    </div>
                    </div>

                    {user &&
                        <div className=" absolute bottom-5 flex gap-2 items-center bg-slate-800 px-2 py-2 rounded-full ">
                            {
                                user && user.profileImageURL &&
                                <img src={`${user?.profileImageURL}`} alt="user-image" height={50} width={50} className=" rounded-full" />
                            }
                            <div className=" hidden sm:block">
                                <h3 className=" text-xl">
                                    {user.firstName}
                                </h3>
                            </div>
                        </div>
                    }

                </div>
                <div className=" col-span-10 sm:col-span-5 border-r-[1px] border-l-[1px] h-full overflow-scroll border-gray-600 scrollbar-hide">
                    {
                        props.children
                    }

                </div>
 

                <div className=" col-span-0  sm:col-span-3 p-5">
                    {
                        !user &&
                        <div className=" p-5 bg-slate-700 rounded-lg  ">
                            <h1 className="my-1 text-2xl">New to Twitter?</h1>
                            <GoogleLogin onSuccess={handleLoginWithGoogle} />
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Twitterlayout;