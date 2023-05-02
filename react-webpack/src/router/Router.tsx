import Route from "./Route";
import {router} from "./index";
export default function Router(){
    return <div>
        {router.map(r=>{
            return <Route key={r.path} path={r.path} component={r.component}/>
        })}
    </div>
}
