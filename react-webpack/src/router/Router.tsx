import Route from "./Route";
import About from "../pages/About";
import Home from "../pages/Home";


export default function Router(){
    return <div>
        <Route path={'/'} component={Home}/>
        <Route path={'/about'} component={About}/>
    </div>
}
