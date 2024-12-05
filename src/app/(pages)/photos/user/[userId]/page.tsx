'use client'
import { useSearchParams } from "next/navigation";
const UserId = () => {
    const userId = useSearchParams().get('userId');
    const user = useSearchParams().get('user');
    return (<div>
        UserId {user} - {userId}
    </div>);
}

export default UserId;