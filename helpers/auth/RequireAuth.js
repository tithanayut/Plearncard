import { useRouter } from "next/router";
import { useSession } from "next-auth/client";

const RequireAuth = (props) => {
    const router = useRouter();
    const [authSession, authLoading] = useSession();

    if (authLoading) return null;
    if (!authLoading && !authSession) {
        router.replace("/login");
        return <p>Redirecting to Login...</p>;
    } else {
        return props.children;
    }
};

export default RequireAuth;
