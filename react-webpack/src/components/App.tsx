import Link from "../router/Link";
import Router from "../router/Router";

export default function App(){
    return <div>
        <h1>Router</h1>
        <nav>
            <Link to={'/'}>Home</Link>
            <Link to={'/about'}>About</Link>
        </nav>
        <Router/>
    </div>
}
