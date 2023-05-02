import {FC, useEffect, useState} from "react";

type Props = {
    path: string;
    component: FC;
}

export default function Route({path, component}:Props){
    const [currentPath, setCurrentPath] = useState(window.location.pathname);

    useEffect(() => {
        const handler = ()=>{
            setCurrentPath(window.location.pathname)
        }
        window.addEventListener('navigate', handler);
        return ()=> window.removeEventListener('navigate', handler);
    }, []);

    return currentPath === path ? component(null) : null;
}
