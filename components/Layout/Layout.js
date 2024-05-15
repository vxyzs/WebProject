import { signOut, useSession } from 'next-auth/react';
import { Fragment } from 'react';
import Link from 'next/link';

function Layout(props) {
  const {data: session} = useSession();
  return (
    <Fragment>
      <nav className="bg-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between">
            <div className="flex space-x-4">
              {/* logo  */}
              <div>
                <div className="flex flex-col w-16 h-16 items-center py-0 px-2 text-gray-700 hover:text-gray-900">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTQfNV3i-VpkQCL2hNGHDOs3ZpBTuRIoci9A&usqp=CAU" alt="W3Schools.com"/>
                  <Link href="/" passHref>
                    <span className=" cursor-pointer font-bold">Adaalat</span>
                  </Link>
                </div>
              </div>

              {/* primary nav  */}
              {session && (
                <div className="hidden md:flex items-center space-x-1">
                  <Link href="/dashboard">
                    <div className="py-5 px-3 text-gray-700 hover:text-gray-900">
                      Dashboard
                    </div>
                  </Link>
                  <Link href="/dashboard/AddCases">
                    <div className="py-5 px-3 text-gray-700 hover:text-gray-900">
                      Add cases
                    </div>
                  </Link>
                  <Link href="/lawyers">
                    <div className="py-5 px-3 text-gray-700 hover:text-gray-900">
                      Lawyers List
                    </div>
                  </Link>
                  <Link href="/Judge">
                    <div className="py-5 px-3 text-gray-700 hover:text-gray-900">
                      Lawyers List
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* secondary nav  */}
            {/* {session && (
              <div className="hidden md:flex items-center space-x-1">
                <Link href="/dashboard/Userprofile">
                  <a className="py-2 px-3 bg-blue-700 hover:bg-blue-500 text-white hover:text-black rounded transition duration-300">
                    Profile
                  </a>
                </Link>
              </div>
            )} */}

            {session && (
              <div
                onClick={signOut}
                className="hidden cursor-pointer md:flex items-center space-x-1"
              >
                <div className="py-2 px-3 bg-blue-700 hover:bg-blue-500 text-white hover:text-black rounded transition duration-300">
                  SignOut
                </div>
              </div>
            )}
            {!session && (
              <div className="hidden md:flex items-center space-x-1">
                <Link href="/auth">
                  <div className="py-2 px-3 bg-blue-700 hover:bg-blue-500 text-white hover:text-black rounded transition duration-300">
                    SignUp
                  </div>
                </Link>
              </div>
            )}

            {/* mobile button goes here  */}
            <div className="md:hidden flex items-center">
              <button className="mobile-menu-button">
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* mobile menu  */}
        {session && (
          <div className="mobile-menu hidden md:hidden">
            <Link href="/dashboard">
              <div className="block py-2 px-4 text-sm hover:bg-gray-200">
                Dashboard
              </div>
            </Link>
            <Link href="/AddCases">
              <div className="block py-2 px-4 text-sm hover:bg-gray-200">
                Add cases
              </div>
            </Link>

            {!session && (
              <Link href="/auth">
                <div className="block py-2 px-4 text-sm hover:bg-gray-200">
                  Signup
                </div>
              </Link>
            )}
          </div>
        )}
      </nav>
      {props.children}
    </Fragment>
  );
}

export default Layout;
