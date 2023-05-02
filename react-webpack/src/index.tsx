import { createRoot } from "react-dom/client";
import './global.less'
import App from "./components/App";

const root = createRoot(document.getElementById("root")!);

root.render(<App />);
