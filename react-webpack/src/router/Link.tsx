import React,{ReactNode} from "react";

export default function Link({to,children}:{to:string,children:ReactNode}){
    const handleClick= (e:React.MouseEvent<HTMLAnchorElement, MouseEvent>)=>{
        e.preventDefault();
        window.history.pushState({},'', to);
        const navEvent = new PopStateEvent('navigate');
        window.dispatchEvent(navEvent);
    }
    return <a href={to} onClick={handleClick}>{children}</a>
}
