import { createRoot } from "react-dom/client";
import './global.less'
import Router from "./router/Router";

const root = createRoot(document.getElementById("root")!);

root.render(<Router/>);
