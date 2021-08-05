import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/client";
import LoginIcon from "../../icons/LoginIcon";

const LoginPage = () => {
    const router = useRouter();
    const [session, loading] = useSession();

    // Redirect if logged in
    if (loading) return null;
    if (!loading && session) {
        router.replace("/home");
    }

    return (
        <div className="w-5/6 lg:w-2/3 mt-8 mx-auto">
            <div className="flex justify-center">
                <h1 className="text-2xl text-green-600 font-bold">
                    Login to Plearncard
                </h1>
            </div>
            <div className="flex justify-center text-center mt-6">
                <p className="leading-7">
                    <span className="mr-2 text-green-600 font-bold">
                        Hello!
                    </span>
                    We use OAuth for authentication and authorization here.{" "}
                    <br />
                    Click on the button below to choose your favourite provider.
                </p>
            </div>
            <div className="flex justify-center my-12">
                <span
                    className="flex justify-center items-center px-4 h-10 bg-green-200 text-gray-600 rounded-lg cursor-pointer hover:bg-green-300 hover:shadow-sm"
                    onClick={signIn}
                >
                    Proceed to Login
                    <LoginIcon className="w-5 h-5 ml-1" />
                </span>
            </div>
            <div className="flex justify-center text-center mt-8">
                <p>
                    <span className="mr-2 text-green-600 font-bold">
                        First time at Plearncard?
                    </span>
                    Just click login and select one of our login provider.
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
