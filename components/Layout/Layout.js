import { signOut, useSession } from 'next-auth/react';
import { Fragment,useState } from 'react';
import Link from 'next/link';
import { TiThMenu } from "react-icons/ti";

export default function Layout(props) {
  const {data: session} = useSession();
  const [toggledropdown, settoggledropdown] = useState(false);
  return (
    <Fragment>
      <nav className="bg-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between">
            <div className="flex space-x-4">
              <div>
                <div className="flex flex-col w-16 h-16 items-center py-0 px-2 text-gray-700 hover:text-gray-900">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTQfNV3i-VpkQCL2hNGHDOs3ZpBTuRIoci9A&usqp=CAU" alt="W3Schools.com"/>
                  <Link href="/" passHref>
                    <span className=" cursor-pointer font-bold">Adaalat</span>
                  </Link>
                </div>
              </div>

              {session && (
                <div className="hidden md:flex items-center space-x-1">
                  <Link href="/dashboard">
                    <div className="block py-2 px-4 text-sm hover:bg-gray-200 rounded-md">
                      Dashboard
                    </div>
                  </Link>
                  <Link href="/dashboard/AddCases">
                    <div className="block py-2 px-4 text-sm hover:bg-gray-200 rounded-md">
                      Add cases
                    </div>
                  </Link>
                  <Link href="/lawyers">
                    <div className="block py-2 px-4 text-sm hover:bg-gray-200 rounded-md">
                      Lawyers List
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {session && (
              <div
                onClick={signOut}
                className="hidden cursor-pointer md:flex items-center space-x-1"
              >
                <div className="py-2 px-3 bg-blue-700 hover:bg-blue-500 text-white hover:text-black rounded-full transition duration-300">
                  SignOut
                </div>
              </div>
            )}
            {!session && (
              <div className="hidden md:flex items-center space-x-1">
                <Link href="/auth">
                  <div className="py-2 px-3 bg-blue-700 hover:bg-blue-500 text-white hover:text-black rounded-full transition duration-300">
                    SignUp
                  </div>
                </Link>
              </div>
            )}

            {session && (
          <div className="sm:hidden flex relative">
              <button width={37} height={37} className='rounded-full m-4' onClick={() => settoggledropdown((prev) => !prev)}><TiThMenu width={37} height={37}/></button>
              { toggledropdown && (
                <div className='dropdown bg-gray-100'>
                <Link href="/dashboard">
                    Dashboard
                </Link>
                <Link href="/lawyers">
                    Lawyers List               
                </Link>
                <Link href="/AddCases">
                    Add cases
                </Link>
                <div
                  onClick={signOut}
                  className="hidden cursor-pointer md:flex items-center space-x-1"
                >
                  <div className="py-2 px-3 bg-blue-700 hover:bg-blue-500 text-white hover:text-black rounded-full transition duration-300">
                    SignOut
                  </div>
                </div>
                </div>
              )}
            <div className='sm:hidden flex relative'>
              {!session && (
              <Link href="/auth">
                <div className="block py-2 px-4 text-sm hover:bg-gray-200">
                  Signup
                </div>
              </Link>
            )}
            </div>
          </div>
        )}
          </div>
        </div>


        
        
      </nav>
      {props.children}
    </Fragment>
  );
}

