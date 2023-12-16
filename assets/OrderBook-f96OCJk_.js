import {
    a as N
} from "./orderbook-mNNl4-Dt.js";
import {
    _ as O,
    f as v,
    g as T,
    h as E,
    r,
    o as l,
    c as o,
    a as e,
    b as s,
    w as n,
    F as k,
    d as B,
    u as S,
    t as a,
    p as C,
    e as F
} from "./index-hypwxGr7.js";
const d = u => (C("data-v-bafdc898"), u = u(), F(), u),
    P = d(() => e("h2", null, "Книга ордеров", -1)),
    Q = {
        key: 0,
        class: "orders"
    },
    z = d(() => e("h4", null, "Аски", -1)),
    D = d(() => e("thead", null, [e("tr", null, [e("th", {
        class: "text-center"
    }, " Price "), e("th", {
        class: "text-center hidden-xs"
    }, " Quantity "), e("th", {
        class: "text-center"
    }, " Total ")])], -1)),
    H = {
        class: "text-center"
    },
    M = {
        class: "text-center hidden-xs"
    },
    U = {
        class: "text-center"
    },
    j = d(() => e("h4", null, "Биды", -1)),
    q = d(() => e("thead", null, [e("tr", null, [e("th", {
        class: "text-center"
    }, " Price "), e("th", {
        class: "text-center hidden-xs"
    }, " Quantity "), e("th", {
        class: "text-center"
    }, " Total ")])], -1)),
    A = {
        class: "text-center"
    },
    G = {
        class: "text-center hidden-xs"
    },
    J = {
        class: "text-center"
    },
    K = {
        key: 1
    },
    R = {
        __name: "OrderBook",
        setup(u) {
            const f = N(),
                i = v(100),
                m = v(),
                _ = v();

            function b(c, h) {
                return Number(c) * Number(h)
            }

            function I(c) {
                f.tableLimit = c
            }
            window.addEventListener("resize", () => {
                _.value = window.screen.height
            }), T(() => {
                _.value = window.screen.height
            }), E(() => _.value, c => {
                m.value = (_.value - 250) / 2
            });
            const p = v();
            return localStorage.getItem("orders") ? p.value = !0 : p.value = !1, (c, h) => {
                const g = r("v-table"),
                    w = r("v-col"),
                    y = r("v-row"),
                    L = r("v-select"),
                    V = r("v-container");
                return l(), o("main", null, [e("article", null, [s(V, {
                    class: "content"
                }, {
                    default: n(() => [P, p.value ? (l(), o("article", Q, [s(y, {
                        class: "d-flex ma-2"
                    }, {
                        default: n(() => [s(w, null, {
                            default: n(() => [z, s(g, {
                                ref: "firstTable",
                                "fixed-header": "",
                                height: m.value
                            }, {
                                default: n(() => [D, e("tbody", null, [(l(!0), o(k, null, B(S(f).asks.slice(0, i.value), (t, x) => (l(), o("tr", {
                                    key: x
                                }, [e("td", H, a(t[0]), 1), e("td", M, a(t[1]), 1), e("td", U, a(b(t[0], t[1])), 1)]))), 128))])]),
                                _: 1
                            }, 8, ["height"])]),
                            _: 1
                        }), s(w, null, {
                            default: n(() => [j, s(g, {
                                "fixed-header": "",
                                height: m.value
                            }, {
                                default: n(() => [q, e("tbody", null, [(l(!0), o(k, null, B(S(f).bids.slice(0, i.value), (t, x) => (l(), o("tr", {
                                    key: x
                                }, [e("td", A, a(t[0]), 1), e("td", G, a(t[1]), 1), e("td", J, a(b(t[0], t[1])), 1)]))), 128))])]),
                                _: 1
                            }, 8, ["height"])]),
                            _: 1
                        })]),
                        _: 1
                    }), s(y, null, {
                        default: n(() => [s(L, {
                            label: "Количество элементов в таблице",
                            modelValue: i.value,
                            "onUpdate:modelValue": [h[0] || (h[0] = t => i.value = t), I],
                            items: [100, 500, 1e3],
                            variant: "outlined"
                        }, null, 8, ["modelValue"])]),
                        _: 1
                    })])) : (l(), o("p", K, "Ордеров не найдено"))]),
                    _: 1
                })])])
            }
        }
    },
    Y = O(R, [
        ["__scopeId", "data-v-bafdc898"]
    ]);
export {
    Y as
    default
};