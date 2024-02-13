// resources/js/app.js

import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App"; // あなたのメインAppコンポーネントへのパス

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// function AppRouter() {
//     return (
//         <Router>
//             <Routes>
//                 <Route path="/" element={<App />} />
//             </Routes>
//         </Router>
//     );
// }
// DOMにAppコンポーネントをマウント
if (document.getElementById("root")) {
    ReactDOM.render(<AppRouter />, document.getElementById("root"));
}
