import {FC, useEffect} from "react";


const NotFound: FC = () => {
    useEffect(() => {
        window.location.replace('/');
    }, []);

    return <div>Redirecting...</div>
}

export default NotFound
