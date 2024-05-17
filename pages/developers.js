import Image from "next/image";
import Head from "next/head";
import Link from "next/link";

function MeetTheDevelopersPage() {
    
    return (
        <section className="text-gray-600 body-font">
            <Head>
                <title>Meet the minds behind!</title>
                <meta
                    name="description"
                    content="Meet the minds behind this open-source project!"
                />
            </Head>
            <div className="container px-5 py-24 mx-auto">
                <div className="flex items-center lg:w-3/5 mx-auto border-b pb-10 mb-10 border-gray-200 sm:flex-row flex-col">
                    <div className="sm:w-32 sm:h-32 h-20 w-20 sm:mr-10 inline-flex items-center justify-center rounded-full bg-pink-100 text-pink-500 flex-shrink-0">
                    
                        <Image
                            src={geoUrl}
                            className="rounded-full"
                            layout="intrinsic"
                            width="200"
                            height="200"
                            alt="Image"
                        />
                    </div>
                    <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
                        <h2 className="text-gray-900 text-lg title-font font-medium mb-2">
                            221070070 Varun S
                        </h2>
                        <p className="leading-relaxed text-base">
                            MERN-stack NextJS developer.
                        </p>
                        <Link href="https://github.com/vxyzs">
                            <div className="mt-3 text-pink-500 inline-flex items-center">
                                Learn More
                                <svg
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    className="w-4 h-4 ml-2"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                                </svg>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="flex items-center lg:w-3/5 mx-auto border-b pb-10 mb-10 border-gray-200 sm:flex-row flex-col">
                    <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
                        <h2 className="text-gray-900 text-lg title-font font-medium mb-2">
                            221070071 Denish Suhagiya
                        </h2>
                        <p className="leading-relaxed text-base">
                            An aspiring software developer. Currently pursuing
                            bachelor degree in Computer engineering.
                        </p>
                        <Link href="https://github.com/Denish004">
                            <div className="mt-3 text-pink-500 inline-flex items-center">
                                Learn More
                                <svg
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    className="w-4 h-4 ml-2"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                                </svg>
                            </div>
                        </Link>
                    </div>
                    <div className="sm:w-32 sm:order-none order-first sm:h-32 h-20 w-20 sm:ml-10 inline-flex items-center justify-center rounded-full bg-pink-100 text-pink-500 flex-shrink-0">
                        <Image
                            src={amishaUrl}
                            className="rounded-full"
                            layout="intrinsic"
                            width="200"
                            height="200"
                            alt="Image"
                        />
                    </div>
                </div>
                <div className="flex items-center lg:w-3/5 mx-auto sm:flex-row flex-col">
                    <div className="sm:w-32 sm:h-32 h-20 w-20 sm:mr-10 inline-flex items-center justify-center rounded-full bg-pink-100 text-pink-500 flex-shrink-0">
                        <Image
                            src={saifUrl}
                            className="rounded-full"
                            layout="intrinsic"
                            width="200"
                            height="200"
                            alt="Image"
                        />
                    </div>
                    <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
                        <h2 className="text-gray-900 text-lg title-font font-medium mb-2">
                            221070072 Purab Tamboli
                        </h2>
                        <p className="leading-relaxed text-base">
                            Computer Science student and aspiring software
                            developer.
                        </p>
                        <Link href="https://github.com/thisisPurab">
                            <div className="mt-3 text-pink-500 inline-flex items-center">
                                Learn More
                                <svg
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    className="w-4 h-4 ml-2"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                                </svg>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default MeetTheDevelopersPage;
