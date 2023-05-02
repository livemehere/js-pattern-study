import Link from "../router/Link";

export default function Nav(){
    return  <nav>
        <Link to={'/'}>Home</Link>
        <Link to={'/about'}>About</Link>
    </nav>
}
