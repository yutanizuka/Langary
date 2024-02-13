import { j as e, a } from "./app-CdPiUioM.js";
import { A as r } from "./AuthenticatedLayout-CR2HEwVS.js";
import "./ApplicationLogo-D04TTpEw.js";
import "./transition-D3ppS8ZK.js";
function o({ auth: s }) {
    return e.jsxs(r, {
        user: s.user,
        header: e.jsx("h2", {
            className: "font-semibold text-xl text-gray-800 leading-tight",
            children: "Dashboard",
        }),
        children: [
            e.jsx(a, { title: "Dashboard" }),
            e.jsx("div", {
                className: "py-12",
                children: e.jsx("div", {
                    className: "max-w-7xl mx-auto sm:px-6 lg:px-8",
                    children: e.jsx("div", {
                        className:
                            "bg-white overflow-hidden shadow-sm sm:rounded-lg",
                        children: e.jsx("div", {
                            className: "p-6 text-gray-900",
                            children: "You're logged in!aaa",
                        }),
                    }),
                }),
            }),
        ],
    });
}
export { o as default };
