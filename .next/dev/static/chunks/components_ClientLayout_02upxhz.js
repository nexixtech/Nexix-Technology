(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/ClientLayout.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ClientLayout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
function ClientLayout({ children }) {
    _s();
    const dotRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const ringRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const rippleRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const mousePos = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        x: -100,
        y: -100
    });
    const ringPos = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        x: -100,
        y: -100
    });
    const raf = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const animateRing = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ClientLayout.useCallback[animateRing]": ()=>{
            ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.15;
            ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.15;
            if (ringRef.current) {
                ringRef.current.style.left = ringPos.current.x + 'px';
                ringRef.current.style.top = ringPos.current.y + 'px';
            }
            raf.current = requestAnimationFrame(animateRing);
        }
    }["ClientLayout.useCallback[animateRing]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ClientLayout.useEffect": ()=>{
            const dot = dotRef.current;
            const ring = ringRef.current;
            if (!dot || !ring) return;
            const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
            if (isTouch) {
                dot.style.display = 'none';
                ring.style.display = 'none';
                document.body.style.cursor = 'auto';
                return;
            }
            const onMouseMove = {
                "ClientLayout.useEffect.onMouseMove": (e)=>{
                    mousePos.current.x = e.clientX;
                    mousePos.current.y = e.clientY;
                    dot.style.left = e.clientX + 'px';
                    dot.style.top = e.clientY + 'px';
                }
            }["ClientLayout.useEffect.onMouseMove"];
            const onMouseLeave = {
                "ClientLayout.useEffect.onMouseLeave": ()=>{
                    dot.style.opacity = '0';
                    ring.style.opacity = '0';
                }
            }["ClientLayout.useEffect.onMouseLeave"];
            const onMouseEnter = {
                "ClientLayout.useEffect.onMouseEnter": ()=>{
                    dot.style.opacity = '1';
                    ring.style.opacity = '1';
                }
            }["ClientLayout.useEffect.onMouseEnter"];
            const onHoverIn = {
                "ClientLayout.useEffect.onHoverIn": ()=>ring.classList.add('hovered')
            }["ClientLayout.useEffect.onHoverIn"];
            const onHoverOut = {
                "ClientLayout.useEffect.onHoverOut": ()=>ring.classList.remove('hovered')
            }["ClientLayout.useEffect.onHoverOut"];
            const interactives = document.querySelectorAll('a, button, .btn, .nav-link, input, textarea, .menu-toggle');
            interactives.forEach({
                "ClientLayout.useEffect": (el)=>{
                    el.addEventListener('mouseenter', onHoverIn);
                    el.addEventListener('mouseleave', onHoverOut);
                }
            }["ClientLayout.useEffect"]);
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseleave', onMouseLeave);
            document.addEventListener('mouseenter', onMouseEnter);
            raf.current = requestAnimationFrame(animateRing);
            return ({
                "ClientLayout.useEffect": ()=>{
                    document.removeEventListener('mousemove', onMouseMove);
                    document.removeEventListener('mouseleave', onMouseLeave);
                    document.removeEventListener('mouseenter', onMouseEnter);
                    interactives.forEach({
                        "ClientLayout.useEffect": (el)=>{
                            el.removeEventListener('mouseenter', onHoverIn);
                            el.removeEventListener('mouseleave', onHoverOut);
                        }
                    }["ClientLayout.useEffect"]);
                    if (raf.current) cancelAnimationFrame(raf.current);
                }
            })["ClientLayout.useEffect"];
        }
    }["ClientLayout.useEffect"], [
        animateRing
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ClientLayout.useEffect": ()=>{
            const container = rippleRef.current;
            if (!container) return;
            const onTactileClick = {
                "ClientLayout.useEffect.onTactileClick": (e)=>{
                    const btn = e.currentTarget;
                    const rect = btn.getBoundingClientRect();
                    const size = Math.max(rect.width, rect.height) * 1.2;
                    const ripple = document.createElement('span');
                    ripple.className = 'ripple';
                    ripple.style.width = ripple.style.height = size + 'px';
                    ripple.style.left = e.clientX + 'px';
                    ripple.style.top = e.clientY + 'px';
                    container.appendChild(ripple);
                    ripple.addEventListener('animationend', {
                        "ClientLayout.useEffect.onTactileClick": ()=>ripple.remove()
                    }["ClientLayout.useEffect.onTactileClick"]);
                }
            }["ClientLayout.useEffect.onTactileClick"];
            const tactileButtons = document.querySelectorAll('.tactile');
            tactileButtons.forEach({
                "ClientLayout.useEffect": (btn)=>btn.addEventListener('click', onTactileClick)
            }["ClientLayout.useEffect"]);
            return ({
                "ClientLayout.useEffect": ()=>{
                    tactileButtons.forEach({
                        "ClientLayout.useEffect": (btn)=>btn.removeEventListener('click', onTactileClick)
                    }["ClientLayout.useEffect"]);
                }
            })["ClientLayout.useEffect"];
        }
    }["ClientLayout.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ClientLayout.useEffect": ()=>{
            const revealEls = document.querySelectorAll('.reveal');
            const observer = new IntersectionObserver({
                "ClientLayout.useEffect": (entries)=>{
                    entries.forEach({
                        "ClientLayout.useEffect": (entry)=>{
                            if (entry.isIntersecting) {
                                entry.target.classList.add('visible');
                                observer.unobserve(entry.target);
                            }
                        }
                    }["ClientLayout.useEffect"]);
                }
            }["ClientLayout.useEffect"], {
                threshold: 0.1,
                rootMargin: '0px 0px -40px 0px'
            });
            revealEls.forEach({
                "ClientLayout.useEffect": (el)=>observer.observe(el)
            }["ClientLayout.useEffect"]);
            return ({
                "ClientLayout.useEffect": ()=>observer.disconnect()
            })["ClientLayout.useEffect"];
        }
    }["ClientLayout.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "gradient-bg",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "gradient-sphere g1"
                    }, void 0, false, {
                        fileName: "[project]/components/ClientLayout.js",
                        lineNumber: 122,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "gradient-sphere g2"
                    }, void 0, false, {
                        fileName: "[project]/components/ClientLayout.js",
                        lineNumber: 123,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "gradient-sphere g3"
                    }, void 0, false, {
                        fileName: "[project]/components/ClientLayout.js",
                        lineNumber: 124,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "gradient-sphere g4"
                    }, void 0, false, {
                        fileName: "[project]/components/ClientLayout.js",
                        lineNumber: 125,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "gradient-sphere g5"
                    }, void 0, false, {
                        fileName: "[project]/components/ClientLayout.js",
                        lineNumber: 126,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ClientLayout.js",
                lineNumber: 121,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "cursor-dot",
                ref: dotRef
            }, void 0, false, {
                fileName: "[project]/components/ClientLayout.js",
                lineNumber: 129,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "cursor-ring",
                ref: ringRef
            }, void 0, false, {
                fileName: "[project]/components/ClientLayout.js",
                lineNumber: 130,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "ripple-container",
                ref: rippleRef
            }, void 0, false, {
                fileName: "[project]/components/ClientLayout.js",
                lineNumber: 132,
                columnNumber: 7
            }, this),
            children
        ]
    }, void 0, true);
}
_s(ClientLayout, "sUV7v3V2mxiTprC4nFf7+PagmF4=");
_c = ClientLayout;
var _c;
__turbopack_context__.k.register(_c, "ClientLayout");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=components_ClientLayout_02upxhz.js.map