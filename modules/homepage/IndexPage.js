import Link from "next/link";
import FlashIcon from "../../icons/FlashIcon";

const IndexPage = () => {
    return (
        <>
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
                        <span className="mr-1">
                            Get Started with Plearncard
                        </span>
                        <FlashIcon />
                    </span>
                </Link>
            </div>
        </>
    );
};

export default IndexPage;
