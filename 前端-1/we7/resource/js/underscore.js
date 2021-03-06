var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(n) {
        return typeof n
    } : function(n) {
        return n && "function" == typeof Symbol && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n
    };
(function() {
    var n = Array.prototype,
        t = Object.prototype,
        r = Function.prototype,
        e = n.push,
        u = n.slice,
        i = t.toString,
        o = t.hasOwnProperty,
        a = Array.isArray,
        c = Object.keys,
        f = r.bind,
        l = Object.create,
        s = function() {}, p = function n(t) {
            return t instanceof n ? t : this instanceof n ? void(this._wrapped = t) : new n(t)
        };
    module.exports = p, p.VERSION = "1.8.2";
    var h = function(n, t, r) {
        if (void 0 === t) return n;
        switch (null == r ? 3 : r) {
            case 1:
                return function(r) {
                    return n.call(t, r)
                };
            case 2:
                return function(r, e) {
                    return n.call(t, r, e)
                };
            case 3:
                return function(r, e, u) {
                    return n.call(t, r, e, u)
                };
            case 4:
                return function(r, e, u, i) {
                    return n.call(t, r, e, u, i)
                }
        }
        return function() {
            return n.apply(t, arguments)
        }
    }, v = function(n, t, r) {
        return null == n ? p.identity : p.isFunction(n) ? h(n, t, r) : p.isObject(n) ? p.matcher(n) : p.property(n)
    };
    p.iteratee = function(n, t) {
        return v(n, t, 1 / 0)
    };
    var y = function(n, t) {
        return function(r) {
            var e = arguments.length;
            if (e < 2 || null == r) return r;
            for (var u = 1; u < e; u++) for (var i = arguments[u], o = n(i), a = o.length, c = 0; c < a; c++) {
                var f = o[c];
                t && void 0 !== r[f] || (r[f] = i[f])
            }
            return r
        }
    }, d = function(n) {
        if (!p.isObject(n)) return {};
        if (l) return l(n);
        s.prototype = n;
        var t = new s;
        return s.prototype = null, t
    }, g = Math.pow(2, 53) - 1,
        m = function(n) {
            var t = null != n && n.length;
            return "number" == typeof t && t >= 0 && t <= g
        };

    function b(n) {
        return function(t, r, e, u) {
            r = h(r, u, 4);
            var i = !m(t) && p.keys(t),
                o = (i || t).length,
                a = n > 0 ? 0 : o - 1;
            return arguments.length < 3 && (e = t[i ? i[a] : a], a += n),
            function(t, r, e, u, i, o) {
                for (; i >= 0 && i < o; i += n) {
                    var a = u ? u[i] : i;
                    e = r(e, t[a], a, t)
                }
                return e
            }(t, r, e, i, a, o)
        }
    }
    p.each = p.forEach = function(n, t, r) {
        var e, u;
        if (t = h(t, r), m(n)) for (e = 0, u = n.length; e < u; e++) t(n[e], e, n);
        else {
            var i = p.keys(n);
            for (e = 0, u = i.length; e < u; e++) t(n[i[e]], i[e], n)
        }
        return n
    }, p.map = p.collect = function(n, t, r) {
        t = v(t, r);
        for (var e = !m(n) && p.keys(n), u = (e || n).length, i = Array(u), o = 0; o < u; o++) {
            var a = e ? e[o] : o;
            i[o] = t(n[a], a, n)
        }
        return i
    }, p.reduce = p.foldl = p.inject = b(1), p.reduceRight = p.foldr = b(-1), p.find = p.detect = function(n, t, r) {
        var e;
        if (void 0 !== (e = m(n) ? p.findIndex(n, t, r) : p.findKey(n, t, r)) && -1 !== e) return n[e]
    }, p.filter = p.select = function(n, t, r) {
        var e = [];
        return t = v(t, r), p.each(n, function(n, r, u) {
            t(n, r, u) && e.push(n)
        }), e
    }, p.reject = function(n, t, r) {
        return p.filter(n, p.negate(v(t)), r)
    }, p.every = p.all = function(n, t, r) {
        t = v(t, r);
        for (var e = !m(n) && p.keys(n), u = (e || n).length, i = 0; i < u; i++) {
            var o = e ? e[i] : i;
            if (!t(n[o], o, n)) return !1
        }
        return !0
    }, p.some = p.any = function(n, t, r) {
        t = v(t, r);
        for (var e = !m(n) && p.keys(n), u = (e || n).length, i = 0; i < u; i++) {
            var o = e ? e[i] : i;
            if (t(n[o], o, n)) return !0
        }
        return !1
    }, p.contains = p.includes = p.include = function(n, t, r) {
        return m(n) || (n = p.values(n)), p.indexOf(n, t, "number" == typeof r && r) >= 0
    }, p.invoke = function(n, t) {
        var r = u.call(arguments, 2),
            e = p.isFunction(t);
        return p.map(n, function(n) {
            var u = e ? t : n[t];
            return null == u ? u : u.apply(n, r)
        })
    }, p.pluck = function(n, t) {
        return p.map(n, p.property(t))
    }, p.where = function(n, t) {
        return p.filter(n, p.matcher(t))
    }, p.findWhere = function(n, t) {
        return p.find(n, p.matcher(t))
    }, p.max = function(n, t, r) {
        var e, u, i = -1 / 0,
            o = -1 / 0;
        if (null == t && null != n) for (var a = 0, c = (n = m(n) ? n : p.values(n)).length; a < c; a++)(e = n[a]) > i && (i = e);
        else t = v(t, r), p.each(n, function(n, r, e) {
            ((u = t(n, r, e)) > o || u === -1 / 0 && i === -1 / 0) && (i = n, o = u)
        });
        return i
    }, p.min = function(n, t, r) {
        var e, u, i = 1 / 0,
            o = 1 / 0;
        if (null == t && null != n) for (var a = 0, c = (n = m(n) ? n : p.values(n)).length; a < c; a++)(e = n[a]) < i && (i = e);
        else t = v(t, r), p.each(n, function(n, r, e) {
            ((u = t(n, r, e)) < o || u === 1 / 0 && i === 1 / 0) && (i = n, o = u)
        });
        return i
    }, p.shuffle = function(n) {
        for (var t, r = m(n) ? n : p.values(n), e = r.length, u = Array(e), i = 0; i < e; i++)(t = p.random(0, i)) !== i && (u[i] = u[t]), u[t] = r[i];
        return u
    }, p.sample = function(n, t, r) {
        return null == t || r ? (m(n) || (n = p.values(n)), n[p.random(n.length - 1)]) : p.shuffle(n).slice(0, Math.max(0, t))
    }, p.sortBy = function(n, t, r) {
        return t = v(t, r), p.pluck(p.map(n, function(n, r, e) {
            return {
                value: n,
                index: r,
                criteria: t(n, r, e)
            }
        }).sort(function(n, t) {
            var r = n.criteria,
                e = t.criteria;
            if (r !== e) {
                if (r > e || void 0 === r) return 1;
                if (r < e || void 0 === e) return -1
            }
            return n.index - t.index
        }), "value")
    };
    var _ = function(n) {
        return function(t, r, e) {
            var u = {};
            return r = v(r, e), p.each(t, function(e, i) {
                var o = r(e, i, t);
                n(u, e, o)
            }), u
        }
    };
    p.groupBy = _(function(n, t, r) {
        p.has(n, r) ? n[r].push(t) : n[r] = [t]
    }), p.indexBy = _(function(n, t, r) {
        n[r] = t
    }), p.countBy = _(function(n, t, r) {
        p.has(n, r) ? n[r]++ : n[r] = 1
    }), p.toArray = function(n) {
        return n ? p.isArray(n) ? u.call(n) : m(n) ? p.map(n, p.identity) : p.values(n) : []
    }, p.size = function(n) {
        return null == n ? 0 : m(n) ? n.length : p.keys(n).length
    }, p.partition = function(n, t, r) {
        t = v(t, r);
        var e = [],
            u = [];
        return p.each(n, function(n, r, i) {
            (t(n, r, i) ? e : u).push(n)
        }), [e, u]
    }, p.first = p.head = p.take = function(n, t, r) {
        if (null != n) return null == t || r ? n[0] : p.initial(n, n.length - t)
    }, p.initial = function(n, t, r) {
        return u.call(n, 0, Math.max(0, n.length - (null == t || r ? 1 : t)))
    }, p.last = function(n, t, r) {
        if (null != n) return null == t || r ? n[n.length - 1] : p.rest(n, Math.max(0, n.length - t))
    }, p.rest = p.tail = p.drop = function(n, t, r) {
        return u.call(n, null == t || r ? 1 : t)
    }, p.compact = function(n) {
        return p.filter(n, p.identity)
    };
    var j = function n(t, r, e, u) {
        for (var i = [], o = 0, a = u || 0, c = t && t.length; a < c; a++) {
            var f = t[a];
            if (m(f) && (p.isArray(f) || p.isArguments(f))) {
                r || (f = n(f, r, e));
                var l = 0,
                    s = f.length;
                for (i.length += s; l < s;) i[o++] = f[l++]
            } else e || (i[o++] = f)
        }
        return i
    };

    function x(n) {
        return function(t, r, e) {
            r = v(r, e);
            for (var u = null != t && t.length, i = n > 0 ? 0 : u - 1; i >= 0 && i < u; i += n) if (r(t[i], i, t)) return i;
            return -1
        }
    }
    p.flatten = function(n, t) {
        return j(n, t, !1)
    }, p.without = function(n) {
        return p.difference(n, u.call(arguments, 1))
    }, p.uniq = p.unique = function(n, t, r, e) {
        if (null == n) return [];
        p.isBoolean(t) || (e = r, r = t, t = !1), null != r && (r = v(r, e));
        for (var u = [], i = [], o = 0, a = n.length; o < a; o++) {
            var c = n[o],
                f = r ? r(c, o, n) : c;
            t ? (o && i === f || u.push(c), i = f) : r ? p.contains(i, f) || (i.push(f), u.push(c)) : p.contains(u, c) || u.push(c)
        }
        return u
    }, p.union = function() {
        return p.uniq(j(arguments, !0, !0))
    }, p.intersection = function(n) {
        if (null == n) return [];
        for (var t = [], r = arguments.length, e = 0, u = n.length; e < u; e++) {
            var i = n[e];
            if (!p.contains(t, i)) {
                for (var o = 1; o < r && p.contains(arguments[o], i); o++);
                o === r && t.push(i)
            }
        }
        return t
    }, p.difference = function(n) {
        var t = j(arguments, !0, !0, 1);
        return p.filter(n, function(n) {
            return !p.contains(t, n)
        })
    }, p.zip = function() {
        return p.unzip(arguments)
    }, p.unzip = function(n) {
        for (var t = n && p.max(n, "length").length || 0, r = Array(t), e = 0; e < t; e++) r[e] = p.pluck(n, e);
        return r
    }, p.object = function(n, t) {
        for (var r = {}, e = 0, u = n && n.length; e < u; e++) t ? r[n[e]] = t[e] : r[n[e][0]] = n[e][1];
        return r
    }, p.indexOf = function(n, t, r) {
        var e = 0,
            i = n && n.length;
        if ("number" == typeof r) e = r < 0 ? Math.max(0, i + r) : r;
        else if (r && i) return n[e = p.sortedIndex(n, t)] === t ? e : -1;
        if (t != t) return p.findIndex(u.call(n, e), p.isNaN);
        for (; e < i; e++) if (n[e] === t) return e;
        return -1
    }, p.lastIndexOf = function(n, t, r) {
        var e = n ? n.length : 0;
        if ("number" == typeof r && (e = r < 0 ? e + r + 1 : Math.min(e, r + 1)), t != t) return p.findLastIndex(u.call(n, 0, e), p.isNaN);
        for (; --e >= 0;) if (n[e] === t) return e;
        return -1
    }, p.findIndex = x(1), p.findLastIndex = x(-1), p.sortedIndex = function(n, t, r, e) {
        for (var u = (r = v(r, e, 1))(t), i = 0, o = n.length; i < o;) {
            var a = Math.floor((i + o) / 2);
            r(n[a]) < u ? i = a + 1 : o = a
        }
        return i
    }, p.range = function(n, t, r) {
        arguments.length <= 1 && (t = n || 0, n = 0), r = r || 1;
        for (var e = Math.max(Math.ceil((t - n) / r), 0), u = Array(e), i = 0; i < e; i++, n += r) u[i] = n;
        return u
    };
    var w = function(n, t, r, e, u) {
        if (!(e instanceof t)) return n.apply(r, u);
        var i = d(n.prototype),
            o = n.apply(i, u);
        return p.isObject(o) ? o : i
    };
    p.bind = function(n, t) {
        if (f && n.bind === f) return f.apply(n, u.call(arguments, 1));
        if (!p.isFunction(n)) throw new TypeError("Bind must be called on a function");
        var r = u.call(arguments, 2);
        return function e() {
            return w(n, e, t, this, r.concat(u.call(arguments)))
        }
    }, p.partial = function(n) {
        var t = u.call(arguments, 1);
        return function r() {
            for (var e = 0, u = t.length, i = Array(u), o = 0; o < u; o++) i[o] = t[o] === p ? arguments[e++] : t[o];
            for (; e < arguments.length;) i.push(arguments[e++]);
            return w(n, r, this, this, i)
        }
    }, p.bindAll = function(n) {
        var t, r, e = arguments.length;
        if (e <= 1) throw new Error("bindAll must be passed function names");
        for (t = 1; t < e; t++) n[r = arguments[t]] = p.bind(n[r], n);
        return n
    }, p.memoize = function(n, t) {
        var r = function r(e) {
            var u = r.cache,
                i = "" + (t ? t.apply(this, arguments) : e);
            return p.has(u, i) || (u[i] = n.apply(this, arguments)), u[i]
        };
        return r.cache = {}, r
    }, p.delay = function(n, t) {
        var r = u.call(arguments, 2);
        return setTimeout(function() {
            return n.apply(null, r)
        }, t)
    }, p.defer = p.partial(p.delay, p, 1), p.throttle = function(n, t, r) {
        var e, u, i, o = null,
            a = 0;
        r || (r = {});
        var c = function() {
            a = !1 === r.leading ? 0 : p.now(), o = null, i = n.apply(e, u), o || (e = u = null)
        };
        return function() {
            var f = p.now();
            a || !1 !== r.leading || (a = f);
            var l = t - (f - a);
            return e = this, u = arguments, l <= 0 || l > t ? (o && (clearTimeout(o), o = null), a = f, i = n.apply(e, u), o || (e = u = null)) : o || !1 === r.trailing || (o = setTimeout(c, l)), i
        }
    }, p.debounce = function(n, t, r) {
        var e, u, i, o, a, c = function c() {
            var f = p.now() - o;
            f < t && f >= 0 ? e = setTimeout(c, t - f) : (e = null, r || (a = n.apply(i, u), e || (i = u = null)))
        };
        return function() {
            i = this, u = arguments, o = p.now();
            var f = r && !e;
            return e || (e = setTimeout(c, t)), f && (a = n.apply(i, u), i = u = null), a
        }
    }, p.wrap = function(n, t) {
        return p.partial(t, n)
    }, p.negate = function(n) {
        return function() {
            return !n.apply(this, arguments)
        }
    }, p.compose = function() {
        var n = arguments,
            t = n.length - 1;
        return function() {
            for (var r = t, e = n[t].apply(this, arguments); r--;) e = n[r].call(this, e);
            return e
        }
    }, p.after = function(n, t) {
        return function() {
            if (--n < 1) return t.apply(this, arguments)
        }
    }, p.before = function(n, t) {
        var r;
        return function() {
            return --n > 0 && (r = t.apply(this, arguments)), n <= 1 && (t = null), r
        }
    }, p.once = p.partial(p.before, 2);
    var A = !{
        toString: null
    }.propertyIsEnumerable("toString"),
        O = ["valueOf", "isPrototypeOf", "toString", "propertyIsEnumerable", "hasOwnProperty", "toLocaleString"];

    function k(n, r) {
        var e = O.length,
            u = n.constructor,
            i = p.isFunction(u) && u.prototype || t,
            o = "constructor";
        for (p.has(n, o) && !p.contains(r, o) && r.push(o); e--;)(o = O[e]) in n && n[o] !== i[o] && !p.contains(r, o) && r.push(o)
    }
    p.keys = function(n) {
        if (!p.isObject(n)) return [];
        if (c) return c(n);
        var t = [];
        for (var r in n) p.has(n, r) && t.push(r);
        return A && k(n, t), t
    }, p.allKeys = function(n) {
        if (!p.isObject(n)) return [];
        var t = [];
        for (var r in n) t.push(r);
        return A && k(n, t), t
    }, p.values = function(n) {
        for (var t = p.keys(n), r = t.length, e = Array(r), u = 0; u < r; u++) e[u] = n[t[u]];
        return e
    }, p.mapObject = function(n, t, r) {
        t = v(t, r);
        for (var e, u = p.keys(n), i = u.length, o = {}, a = 0; a < i; a++) o[e = u[a]] = t(n[e], e, n);
        return o
    }, p.pairs = function(n) {
        for (var t = p.keys(n), r = t.length, e = Array(r), u = 0; u < r; u++) e[u] = [t[u], n[t[u]]];
        return e
    }, p.invert = function(n) {
        for (var t = {}, r = p.keys(n), e = 0, u = r.length; e < u; e++) t[n[r[e]]] = r[e];
        return t
    }, p.functions = p.methods = function(n) {
        var t = [];
        for (var r in n) p.isFunction(n[r]) && t.push(r);
        return t.sort()
    }, p.extend = y(p.allKeys), p.extendOwn = p.assign = y(p.keys), p.findKey = function(n, t, r) {
        t = v(t, r);
        for (var e, u = p.keys(n), i = 0, o = u.length; i < o; i++) if (t(n[e = u[i]], e, n)) return e
    }, p.pick = function(n, t, r) {
        var e, u, i = {}, o = n;
        if (null == o) return i;
        p.isFunction(t) ? (u = p.allKeys(o), e = h(t, r)) : (u = j(arguments, !1, !1, 1), e = function(n, t, r) {
            return t in r
        }, o = Object(o));
        for (var a = 0, c = u.length; a < c; a++) {
            var f = u[a],
                l = o[f];
            e(l, f, o) && (i[f] = l)
        }
        return i
    }, p.omit = function(n, t, r) {
        if (p.isFunction(t)) t = p.negate(t);
        else {
            var e = p.map(j(arguments, !1, !1, 1), String);
            t = function(n, t) {
                return !p.contains(e, t)
            }
        }
        return p.pick(n, t, r)
    }, p.defaults = y(p.allKeys, !0), p.create = function(n, t) {
        var r = d(n);
        return t && p.extendOwn(r, t), r
    }, p.clone = function(n) {
        return p.isObject(n) ? p.isArray(n) ? n.slice() : p.extend({}, n) : n
    }, p.tap = function(n, t) {
        return t(n), n
    }, p.isMatch = function(n, t) {
        var r = p.keys(t),
            e = r.length;
        if (null == n) return !e;
        for (var u = Object(n), i = 0; i < e; i++) {
            var o = r[i];
            if (t[o] !== u[o] || !(o in u)) return !1
        }
        return !0
    };
    p.isEqual = function(n, t) {
        return function n(t, r, e, u) {
            if (t === r) return 0 !== t || 1 / t == 1 / r;
            if (null == t || null == r) return t === r;
            t instanceof p && (t = t._wrapped), r instanceof p && (r = r._wrapped);
            var o = i.call(t);
            if (o !== i.call(r)) return !1;
            switch (o) {
                case "[object RegExp]":
                case "[object String]":
                    return "" + t == "" + r;
                case "[object Number]":
                    return +t != +t ? +r != +r : 0 == +t ? 1 / +t == 1 / r : +t == +r;
                case "[object Date]":
                case "[object Boolean]":
                    return +t == +r
            }
            var a = "[object Array]" === o;
            if (!a) {
                if ("object" != (void 0 === t ? "undefined" : _typeof(t)) || "object" != (void 0 === r ? "undefined" : _typeof(r))) return !1;
                var c = t.constructor,
                    f = r.constructor;
                if (c !== f && !(p.isFunction(c) && c instanceof c && p.isFunction(f) && f instanceof f) && "constructor" in t && "constructor" in r) return !1
            }
            e = e || [], u = u || [];
            for (var l = e.length; l--;) if (e[l] === t) return u[l] === r;
            if (e.push(t), u.push(r), a) {
                if ((l = t.length) !== r.length) return !1;
                for (; l--;) if (!n(t[l], r[l], e, u)) return !1
            } else {
                var s, h = p.keys(t);
                if (l = h.length, p.keys(r).length !== l) return !1;
                for (; l--;) if (s = h[l], !p.has(r, s) || !n(t[s], r[s], e, u)) return !1
            }
            return e.pop(), u.pop(), !0
        }(n, t)
    }, p.isEmpty = function(n) {
        return null == n || (m(n) && (p.isArray(n) || p.isString(n) || p.isArguments(n)) ? 0 === n.length : 0 === p.keys(n).length)
    }, p.isElement = function(n) {
        return !(!n || 1 !== n.nodeType)
    }, p.isArray = a || function(n) {
        return "[object Array]" === i.call(n)
    }, p.isObject = function(n) {
        var t = void 0 === n ? "undefined" : _typeof(n);
        return "function" === t || "object" === t && !! n
    }, p.each(["Arguments", "Function", "String", "Number", "Date", "RegExp", "Error"], function(n) {
        p["is" + n] = function(t) {
            return i.call(t) === "[object " + n + "]"
        }
    }), p.isArguments(arguments) || (p.isArguments = function(n) {
        return p.has(n, "callee")
    }), "function" != typeof / . / && "object" != ("undefined" == typeof Int8Array ? "undefined" : _typeof(Int8Array)) && (p.isFunction = function(n) {
        return "function" == typeof n || !1
    }), p.isFinite = function(n) {
        return isFinite(n) && !isNaN(parseFloat(n))
    }, p.isNaN = function(n) {
        return p.isNumber(n) && n !== +n
    }, p.isBoolean = function(n) {
        return !0 === n || !1 === n || "[object Boolean]" === i.call(n)
    }, p.isNull = function(n) {
        return null === n
    }, p.isUndefined = function(n) {
        return void 0 === n
    }, p.has = function(n, t) {
        return null != n && o.call(n, t)
    }, p.noConflict = function() {
        return root._ = previousUnderscore, this
    }, p.identity = function(n) {
        return n
    }, p.constant = function(n) {
        return function() {
            return n
        }
    }, p.noop = function() {}, p.property = function(n) {
        return function(t) {
            return null == t ? void 0 : t[n]
        }
    }, p.propertyOf = function(n) {
        return null == n ? function() {} : function(t) {
            return n[t]
        }
    }, p.matcher = p.matches = function(n) {
        return n = p.extendOwn({}, n),
        function(t) {
            return p.isMatch(t, n)
        }
    }, p.times = function(n, t, r) {
        var e = Array(Math.max(0, n));
        t = h(t, r, 1);
        for (var u = 0; u < n; u++) e[u] = t(u);
        return e
    }, p.random = function(n, t) {
        return null == t && (t = n, n = 0), n + Math.floor(Math.random() * (t - n + 1))
    }, p.now = Date.now || function() {
        return (new Date).getTime()
    };
    var S = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#x27;",
        "`": "&#x60;"
    }, F = p.invert(S),
        E = function(n) {
            var t = function(t) {
                return n[t]
            }, r = "(?:" + p.keys(n).join("|") + ")",
                e = RegExp(r),
                u = RegExp(r, "g");
            return function(n) {
                return n = null == n ? "" : "" + n, e.test(n) ? n.replace(u, t) : n
            }
        };
    p.escape = E(S), p.unescape = E(F), p.result = function(n, t, r) {
        var e = null == n ? void 0 : n[t];
        return void 0 === e && (e = r), p.isFunction(e) ? e.call(n) : e
    };
    var I = 0;
    p.uniqueId = function(n) {
        var t = ++I + "";
        return n ? n + t : t
    }, p.templateSettings = {
        evaluate: /<%([\s\S]+?)%>/g,
        interpolate: /<%=([\s\S]+?)%>/g,
        escape: /<%-([\s\S]+?)%>/g
    };
    var M = /(.)^/,
        N = {
            "'": "'",
            "\\": "\\",
            "\r": "r",
            "\n": "n",
            "\u2028": "u2028",
            "\u2029": "u2029"
        }, B = /\\|'|\r|\n|\u2028|\u2029/g,
        T = function(n) {
            return "\\" + N[n]
        };
    p.template = function(n, t, r) {
        !t && r && (t = r), t = p.defaults({}, t, p.templateSettings);
        var e = RegExp([(t.escape || M).source, (t.interpolate || M).source, (t.evaluate || M).source].join("|") + "|$", "g"),
            u = 0,
            i = "__p+='";
        n.replace(e, function(t, r, e, o, a) {
            return i += n.slice(u, a).replace(B, T), u = a + t.length, r ? i += "'+\n((__t=(" + r + "))==null?'':_.escape(__t))+\n'" : e ? i += "'+\n((__t=(" + e + "))==null?'':__t)+\n'" : o && (i += "';\n" + o + "\n__p+='"), t
        }), i += "';\n", t.variable || (i = "with(obj||{}){\n" + i + "}\n"), i = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + i + "return __p;\n";
        try {
            var o = new Function(t.variable || "obj", "_", i)
        } catch (n) {
            throw n.source = i, n
        }
        var a = function(n) {
            return o.call(this, n, p)
        }, c = t.variable || "obj";
        return a.source = "function(" + c + "){\n" + i + "}", a
    }, p.chain = function(n) {
        var t = p(n);
        return t._chain = !0, t
    };
    var R = function(n, t) {
        return n._chain ? p(t).chain() : t
    };
    p.mixin = function(n) {
        p.each(p.functions(n), function(t) {
            var r = p[t] = n[t];
            p.prototype[t] = function() {
                var n = [this._wrapped];
                return e.apply(n, arguments), R(this, r.apply(p, n))
            }
        })
    }, p.mixin(p), p.each(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(t) {
        var r = n[t];
        p.prototype[t] = function() {
            var n = this._wrapped;
            return r.apply(n, arguments), "shift" !== t && "splice" !== t || 0 !== n.length || delete n[0], R(this, n)
        }
    }), p.each(["concat", "join", "slice"], function(t) {
        var r = n[t];
        p.prototype[t] = function() {
            return R(this, r.apply(this._wrapped, arguments))
        }
    }), p.prototype.value = function() {
        return this._wrapped
    }, p.prototype.valueOf = p.prototype.toJSON = p.prototype.value, p.prototype.toString = function() {
        return "" + this._wrapped
    }
}).call(void 0);