import { Fragment } from "react";
import Link from "next/link";

const IndexPage = () => {
    return (
        <Fragment>
            <div className="flex flex-col justify-center items-center bg-gray-100">
                <img className="h-24 w-24 mt-14" src="/favicon.svg" />
                <p className="text-2xl text-green-600 font-bold">
                    Welcome to Plearncard!
                </p>
                <p className="text-xl text-center text-gray-600 mx-4 mt-2 mb-14">
                    Plearncard is a web application that helps you learn
                    anything through flashcards.
                </p>
            </div>
            <div className="flex flex-col items-center text-green-600 mt-8">
                <p className="text-xl font-bold">Are you ready?</p>
                <Link href="/login">
                    <span className="flex justify-center items-center px-4 h-10 mt-4 font-bold bg-green-200 text-gray-600 rounded-lg cursor-pointer hover:bg-green-300 hover:shadow-sm">
                        Get Started with Plearncard
                        <svg
                            className="w-6 h-6 ml-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 10V3L4 14h7v7l9-11h-7z"
                            />
                        </svg>
                    </span>
                </Link>
            </div>
        </Fragment>
    );
};

export default IndexPage;
