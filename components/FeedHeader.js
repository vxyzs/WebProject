import Link from 'next/link';
import Image from 'next/image';
import img from '../pages/dashboard/download.jpg'

function FeedHeader(props) {
  return (
    <section className="px-2 py-20 bg-white md:px-0">
        <div className="container items-center max-w-6xl px-8 mx-auto xl:px-5">
          <div className="flex flex-wrap items-center sm:-mx-3">
            <div className="w-full md:w-1/2 md:px-3">
              <div className="w-full pb-6 space-y-6 sm:max-w-md lg:max-w-lg md:space-y-4 lg:space-y-8 xl:space-y-9 sm:pr-5 lg:pr-0 md:pb-0">
                <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl">
                  <span className="block xl:inline">
                    {props.session.user.name || props.session.user.email}
                  </span>
                  <span className="block text-indigo-700 xl:inline m-2 font-bold">
                    {' '}
                    Adaalat
                  </span>
                </h1>
                <p className="mx-auto text-base text-gray-500 sm:max-w-md lg:text-xl md:max-w-3xl">
                  <strong>Add Cases In One Click:</strong> Our service provides an optimal way for adding and managing cases
                </p>
                <div className="relative flex flex-col sm:flex-row sm:space-x-4">
                <Link href="/dashboard/AddCases">
                  <div className="inline-flex items-center justify-center w-full px-5 py-4 mt-6 font-sans text-base leading-none text-white no-underline bg-blue-700 border border-blue-700 border-solid cursor-pointer md:w-auto lg:mt-0 hover:bg-blue-500 hover:border-blue-700 hover:text-black focus-within:bg-indigo-700 focus-within:border-indigo-700 focus-within:text-white sm:text-lg lg:ml-6 md:text-xl rounded-2xl">
                    Add Cases
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 ml-2"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </div>
                </Link>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <div className="w-full h-auto overflow-hidden shadow-xl rounded-2xl">
                <Image
                  src={img}
                  alt="HERO"
                  width="90"
                  height="50"
                  layout="responsive"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

  );
}

export default FeedHeader;
