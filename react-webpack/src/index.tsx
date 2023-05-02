import { createRoot } from "react-dom/client";
import App from "./components/App";
import './global.less'

const root = createRoot(document.getElementById("root")!);

root.render(<App />);
