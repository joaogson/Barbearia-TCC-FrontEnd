(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/services/feedBackAPI.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createFeedback",
    ()=>createFeedback,
    "deleteFeedback",
    ()=>deleteFeedback,
    "getFeedbacksForBarber",
    ()=>getFeedbacksForBarber,
    "getMyFeedbacks",
    ()=>getMyFeedbacks
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/api.ts [app-client] (ecmascript)");
;
const createFeedback = (data)=>{
    return __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].post("/feedback", data);
};
const getFeedbacksForBarber = async (barberId)=>{
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].get("/barbers/".concat(barberId, "/feedback"));
    return response.data;
};
const getMyFeedbacks = async ()=>{
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].get("/feedback/me"); // Rota protegida
    return response.data;
};
const deleteFeedback = (feedbackId)=>{
    return __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].delete("/feedback/".concat(feedbackId));
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/FeedBacks/BarberFeedBacksList/barberFeedBackList.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BarberFeedbackList
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$feedBackAPI$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/feedBackAPI.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function BarberFeedbackList(param) {
    let { barberId } = param;
    _s();
    const [feedbacks, setFeedbacks] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BarberFeedbackList.useEffect": ()=>{
            const loadFeedbacks = {
                "BarberFeedbackList.useEffect.loadFeedbacks": async ()=>{
                    try {
                        setIsLoading(true);
                        const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$feedBackAPI$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFeedbacksForBarber"])(barberId);
                        setFeedbacks(data);
                    } catch (error) {
                        console.error("Falha ao carregar feedbacks", error);
                    } finally{
                        setIsLoading(false);
                    }
                }
            }["BarberFeedbackList.useEffect.loadFeedbacks"];
            loadFeedbacks();
        }
    }["BarberFeedbackList.useEffect"], [
        barberId
    ]);
    if (isLoading) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        children: "Carregando avaliações..."
    }, void 0, false, {
        fileName: "[project]/components/FeedBacks/BarberFeedBacksList/barberFeedBackList.tsx",
        lineNumber: 30,
        columnNumber: 25
    }, this);
    if (feedbacks.length === 0) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        children: "Este profissional ainda não tem avaliações."
    }, void 0, false, {
        fileName: "[project]/components/FeedBacks/BarberFeedBacksList/barberFeedBackList.tsx",
        lineNumber: 31,
        columnNumber: 38
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "feedBack-list-container",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                children: "O que os clientes dizem"
            }, void 0, false, {
                fileName: "[project]/components/FeedBacks/BarberFeedBacksList/barberFeedBackList.tsx",
                lineNumber: 35,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                className: "feedBack-list",
                children: feedbacks.map((fb)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        className: "feedBack-card",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "feedBack-header",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: fb.client.user.name
                                    }, void 0, false, {
                                        fileName: "[project]/components/FeedBacks/BarberFeedBacksList/barberFeedBackList.tsx",
                                        lineNumber: 40,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            fb.rating,
                                            " Estrelas"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/FeedBacks/BarberFeedBacksList/barberFeedBackList.tsx",
                                        lineNumber: 41,
                                        columnNumber: 15
                                    }, this),
                                    " "
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/FeedBacks/BarberFeedBacksList/barberFeedBackList.tsx",
                                lineNumber: 39,
                                columnNumber: 13
                            }, this),
                            fb.comment && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "comment",
                                children: fb.comment
                            }, void 0, false, {
                                fileName: "[project]/components/FeedBacks/BarberFeedBacksList/barberFeedBackList.tsx",
                                lineNumber: 44,
                                columnNumber: 28
                            }, this)
                        ]
                    }, fb.id, true, {
                        fileName: "[project]/components/FeedBacks/BarberFeedBacksList/barberFeedBackList.tsx",
                        lineNumber: 38,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/FeedBacks/BarberFeedBacksList/barberFeedBackList.tsx",
                lineNumber: 36,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/FeedBacks/BarberFeedBacksList/barberFeedBackList.tsx",
        lineNumber: 34,
        columnNumber: 5
    }, this);
}
_s(BarberFeedbackList, "Q6cwizZJjmhsU/8/P1GohCuOo8k=");
_c = BarberFeedbackList;
var _c;
__turbopack_context__.k.register(_c, "BarberFeedbackList");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/FeedBacks/FeedBackForm/ClientFeedBackList/clientFeedBackList.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ClientFeedbackList
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$feedBackAPI$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/feedBackAPI.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function ClientFeedbackList() {
    _s();
    const [myFeedbacks, setMyFeedbacks] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ClientFeedbackList.useEffect": ()=>{
            loadMyFeedbacks();
        }
    }["ClientFeedbackList.useEffect"], []);
    const loadMyFeedbacks = async ()=>{
        try {
            setIsLoading(true);
            const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$feedBackAPI$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getMyFeedbacks"])();
            setMyFeedbacks(data);
        } catch (error) {
            console.error("Falha ao carregar meus feedbacks", error);
        } finally{
            setIsLoading(false);
        }
    };
    const handleDelete = async (feedbackId)=>{
        if (!window.confirm("Tem certeza que deseja excluir esta avaliação?")) {
            return;
        }
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$feedBackAPI$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deleteFeedback"])(feedbackId);
            // Remove o feedback da lista localmente (melhor UX)
            setMyFeedbacks((prev)=>prev.filter((fb)=>fb.id !== feedbackId));
        } catch (error) {
            alert("Falha ao excluir. Tente novamente.");
        }
    };
    if (isLoading) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        children: "Carregando suas avaliações..."
    }, void 0, false, {
        fileName: "[project]/components/FeedBacks/FeedBackForm/ClientFeedBackList/clientFeedBackList.tsx",
        lineNumber: 40,
        columnNumber: 25
    }, this);
    if (myFeedbacks.length === 0) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        children: "Você ainda não fez nenhuma avaliação."
    }, void 0, false, {
        fileName: "[project]/components/FeedBacks/FeedBackForm/ClientFeedBackList/clientFeedBackList.tsx",
        lineNumber: 41,
        columnNumber: 40
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "feedBack-list-container",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                children: "Minhas Avaliações"
            }, void 0, false, {
                fileName: "[project]/components/FeedBacks/FeedBackForm/ClientFeedBackList/clientFeedBackList.tsx",
                lineNumber: 45,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                className: "feedBack-list",
                children: myFeedbacks.map((fb)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        className: "feedBack-card",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "feedBack-header",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: fb.barber.user.name
                                    }, void 0, false, {
                                        fileName: "[project]/components/FeedBacks/FeedBackForm/ClientFeedBackList/clientFeedBackList.tsx",
                                        lineNumber: 51,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            fb.rating,
                                            " Estrelas"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/FeedBacks/FeedBackForm/ClientFeedBackList/clientFeedBackList.tsx",
                                        lineNumber: 52,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/FeedBacks/FeedBackForm/ClientFeedBackList/clientFeedBackList.tsx",
                                lineNumber: 49,
                                columnNumber: 13
                            }, this),
                            fb.comment && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "comment",
                                children: fb.comment
                            }, void 0, false, {
                                fileName: "[project]/components/FeedBacks/FeedBackForm/ClientFeedBackList/clientFeedBackList.tsx",
                                lineNumber: 54,
                                columnNumber: 28
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "feedBack-actions",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>alert("TODO: Editar"),
                                        children: "Editar"
                                    }, void 0, false, {
                                        fileName: "[project]/components/FeedBacks/FeedBackForm/ClientFeedBackList/clientFeedBackList.tsx",
                                        lineNumber: 58,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>handleDelete(fb.id),
                                        className: "feedBack-delete-button",
                                        children: "Excluir"
                                    }, void 0, false, {
                                        fileName: "[project]/components/FeedBacks/FeedBackForm/ClientFeedBackList/clientFeedBackList.tsx",
                                        lineNumber: 59,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/FeedBacks/FeedBackForm/ClientFeedBackList/clientFeedBackList.tsx",
                                lineNumber: 56,
                                columnNumber: 13
                            }, this)
                        ]
                    }, fb.id, true, {
                        fileName: "[project]/components/FeedBacks/FeedBackForm/ClientFeedBackList/clientFeedBackList.tsx",
                        lineNumber: 48,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/FeedBacks/FeedBackForm/ClientFeedBackList/clientFeedBackList.tsx",
                lineNumber: 46,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/FeedBacks/FeedBackForm/ClientFeedBackList/clientFeedBackList.tsx",
        lineNumber: 44,
        columnNumber: 5
    }, this);
}
_s(ClientFeedbackList, "j+8WuOEr9KVtI19Eb+noKI8tRuk=");
_c = ClientFeedbackList;
var _c;
__turbopack_context__.k.register(_c, "ClientFeedbackList");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/FeedBacks/FeedBackForm/feedBackForm.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FeedbackForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$feedBackAPI$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/feedBackAPI.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function FeedbackForm(param) {
    let { clientId, barberId } = param;
    _s();
    const [rating, setRating] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(5);
    const [comment, setComment] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if (rating < 1 || rating > 5) {
            setError("Por favor, selecione uma nota.");
            return;
        }
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$feedBackAPI$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createFeedback"])({
                rating,
                comment,
                barberId,
                clientId
            });
            //  onSuccess(); // Avisa o componente pai que um novo feedback foi criado
            setComment("");
            setRating(5);
            setError("");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Ocorreu um erro ao enviar o feedBack");
            console.error(err);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
        onSubmit: handleSubmit,
        className: "feedback-form",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                children: "Deixe sua avaliação"
            }, void 0, false, {
                fileName: "[project]/components/FeedBacks/FeedBackForm/feedBackForm.tsx",
                lineNumber: 41,
                columnNumber: 7
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "error-message",
                children: error
            }, void 0, false, {
                fileName: "[project]/components/FeedBacks/FeedBackForm/feedBackForm.tsx",
                lineNumber: 42,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "form-group",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        children: "Nota (de 1 a 5)"
                    }, void 0, false, {
                        fileName: "[project]/components/FeedBacks/FeedBackForm/feedBackForm.tsx",
                        lineNumber: 45,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        value: rating,
                        onChange: (e)=>setRating(Number(e.target.value)),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: 5,
                                children: "5 Estrelas"
                            }, void 0, false, {
                                fileName: "[project]/components/FeedBacks/FeedBackForm/feedBackForm.tsx",
                                lineNumber: 48,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: 4,
                                children: "4 Estrelas"
                            }, void 0, false, {
                                fileName: "[project]/components/FeedBacks/FeedBackForm/feedBackForm.tsx",
                                lineNumber: 49,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: 3,
                                children: "3 Estrelas"
                            }, void 0, false, {
                                fileName: "[project]/components/FeedBacks/FeedBackForm/feedBackForm.tsx",
                                lineNumber: 50,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: 2,
                                children: "2 Estrelas"
                            }, void 0, false, {
                                fileName: "[project]/components/FeedBacks/FeedBackForm/feedBackForm.tsx",
                                lineNumber: 51,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: 1,
                                children: "1 Estrela"
                            }, void 0, false, {
                                fileName: "[project]/components/FeedBacks/FeedBackForm/feedBackForm.tsx",
                                lineNumber: 52,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/FeedBacks/FeedBackForm/feedBackForm.tsx",
                        lineNumber: 47,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/FeedBacks/FeedBackForm/feedBackForm.tsx",
                lineNumber: 44,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "form-group",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        children: "Comentário (Opcional)"
                    }, void 0, false, {
                        fileName: "[project]/components/FeedBacks/FeedBackForm/feedBackForm.tsx",
                        lineNumber: 57,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                        value: comment,
                        onChange: (e)=>setComment(e.target.value),
                        placeholder: "Como foi sua experiência?"
                    }, void 0, false, {
                        fileName: "[project]/components/FeedBacks/FeedBackForm/feedBackForm.tsx",
                        lineNumber: 58,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/FeedBacks/FeedBackForm/feedBackForm.tsx",
                lineNumber: 56,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "submit",
                children: "Enviar Avaliação"
            }, void 0, false, {
                fileName: "[project]/components/FeedBacks/FeedBackForm/feedBackForm.tsx",
                lineNumber: 60,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/FeedBacks/FeedBackForm/feedBackForm.tsx",
        lineNumber: 40,
        columnNumber: 5
    }, this);
}
_s(FeedbackForm, "kBeP0I5HzywuzGJ5dRopqUWKk5c=");
_c = FeedbackForm;
var _c;
__turbopack_context__.k.register(_c, "FeedbackForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_35a72456._.js.map