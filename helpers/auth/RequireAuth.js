import { useRouter } from "next/router";
import { useSession } from "next-auth/client";
import LoadingSpinner from "../../components/ui/LoadingSpinner/LoadingSpinner";

const RequireAuth = (props) => {
    const router = useRouter();
    const [authSession, authLoading] = useSession();

    if (authLoading) return null;
    if (!authLoading && !authSession) {
        router.replace("/login");
        return <LoadingSpinner />;
    } else {
        return props.children;
    }
};

export default RequireAuth;
