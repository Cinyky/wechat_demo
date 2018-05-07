var startTag = /^<([-A-Za-z0-9_]+)((?:\s+[a-zA-Z_:][-a-zA-Z0-9_:.]*(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/,
    endTag = /^<\/([-A-Za-z0-9_]+)[^>]*>/,
    attr = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g,
    empty = makeMap("area,base,basefont,br,col,frame,hr,img,input,link,meta,param,embed,command,keygen,source,track,wbr"),
    block = makeMap("a,address,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video"),
    inline = makeMap("abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,code,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var"),
    closeSelf = makeMap("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr"),
    fillAttrs = makeMap("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected"),
    special = makeMap("script,style"),
    HTMLParser = function(e, t) {
        var a, r, i, n = [],
            s = e;
        for (n.last = function() {
            return this[this.length - 1]
        }; e;) {
            if (r = !0, n.last() && special[n.last()]) e = e.replace(new RegExp("([\\s\\S]*?)</" + n.last() + "[^>]*>"), function(e, a) {
                return a = a.replace(/<!--([\s\S]*?)-->|<!\[CDATA\[([\s\S]*?)]]>/g, "$1$2"), t.chars && t.chars(a), ""
            }), c("", n.last());
            else if (0 == e.indexOf("\x3c!--") ? (a = e.indexOf("--\x3e")) >= 0 && (t.comment && t.comment(e.substring(4, a)), e = e.substring(a + 3), r = !1) : 0 == e.indexOf("</") ? (i = e.match(endTag)) && (e = e.substring(i[0].length), i[0].replace(endTag, c), r = !1) : 0 == e.indexOf("<") && (i = e.match(startTag)) && (e = e.substring(i[0].length), i[0].replace(startTag, o), r = !1), r) {
                var l = (a = e.indexOf("<")) < 0 ? e : e.substring(0, a);
                e = a < 0 ? "" : e.substring(a), t.chars && t.chars(l)
            }
            if (e == s) throw "Parse Error: " + e;
            s = e
        }
        function o(e, a, r, i) {
            if (a = a.toLowerCase(), block[a]) for (; n.last() && inline[n.last()];) c("", n.last());
            if (closeSelf[a] && n.last() == a && c("", a), (i = empty[a] || !! i) || n.push(a), t.start) {
                var s = [];
                r.replace(attr, function(e, t) {
                    var a = arguments[2] ? arguments[2] : arguments[3] ? arguments[3] : arguments[4] ? arguments[4] : fillAttrs[t] ? t : "";
                    s.push({
                        name: t,
                        value: a,
                        escaped: a.replace(/(^|[^\\])"/g, '$1\\"')
                    })
                }), t.start && t.start(a, s, i)
            }
        }
        function c(e, a) {
            if (a) for (r = n.length - 1; r >= 0 && n[r] != a; r--);
            else var r = 0;
            if (r >= 0) {
                for (var i = n.length - 1; i >= r; i--) t.end && t.end(n[i]);
                n.length = r
            }
        }
        c()
    };

function makeMap(e) {
    for (var t = {}, a = e.split(","), r = 0; r < a.length; r++) t[a[r]] = !0;
    return t
}
var global = {}, debug = function() {};

function q(e) {
    return '"' + e + '"'
}
function removeDOCTYPE(e) {
    return e.replace(/<\?xml.*\?>\n/, "").replace(/<!doctype.*\>\n/, "").replace(/<!DOCTYPE.*\>\n/, "")
}
global.html2json = function(e) {
    e = removeDOCTYPE(e);
    var t = [],
        a = {
            node: "root",
            child: []
        };
    return HTMLParser(e, {
        start: function(e, r, i) {
            debug(e, r, i);
            var n = {
                node: "element",
                tag: e
            };
            if (0 !== r.length && (n.attr = r.reduce(function(e, t) {
                var a = t.name,
                    r = t.value;
                return r.match(/ /) && (r = r.split(" ")), e[a] ? Array.isArray(e[a]) ? e[a].push(r) : e[a] = [e[a], r] : e[a] = r, e
            }, {})), i) {
                var s = t[0] || a;
                void 0 === s.child && (s.child = []), s.child.push(n)
            } else t.unshift(n)
        },
        end: function(e) {
            debug(e);
            var r = t.shift();
            if (r.tag !== e && console.error("invalid state: mismatch end tag"), 0 === t.length) a.child.push(r);
            else {
                var i = t[0];
                void 0 === i.child && (i.child = []), i.child.push(r)
            }
        },
        chars: function(e) {
            debug(e);
            var r = {
                node: "text",
                text: e
            };
            if (0 === t.length) a.child.push(r);
            else {
                var i = t[0];
                void 0 === i.child && (i.child = []), i.child.push(r)
            }
        },
        comment: function(e) {
            debug(e);
            var a = {
                node: "comment",
                text: e
            }, r = t[0];
            void 0 === r.child && (r.child = []), r.child.push(a)
        }
    }), a
}, global.json2html = function e(t) {
    var a = "";
    t.child && (a = t.child.map(function(t) {
        return e(t)
    }).join(""));
    var r = "";
    if (t.attr && "" !== (r = Object.keys(t.attr).map(function(e) {
        var a = t.attr[e];
        return Array.isArray(a) && (a = a.join(" ")), e + "=" + q(a)
    }).join(" ")) && (r = " " + r), "element" === t.node) {
        var i = t.tag;
        return ["area", "base", "basefont", "br", "col", "frame", "hr", "img", "input", "isindex", "link", "meta", "param", "embed"].indexOf(i) > -1 ? "<" + t.tag + r + "/>" : "<" + t.tag + r + ">" + a + ("</" + t.tag + ">")
    }
    return "text" === t.node ? t.text : "comment" === t.node ? "\x3c!--" + t.text + "--\x3e" : "root" === t.node ? a : void 0
};
var html2wxwebview = function(e) {
    var t = global.html2json(e);
    return t = parseHtmlNode(t), t = arrangeNode(t)
}, arrangeNode = function(e) {
    for (var t = [], a = [], r = 0, i = e.length; r < i; r++) if (0 == r) {
        if ("view" == e[r].type) continue;
        t.push(e[r])
    } else if ("view" == e[r].type) {
        if (t.length > 0) {
            var n = {
                type: "view",
                child: t
            };
            a.push(n)
        }
        t = []
    } else if ("img" == e[r].type) {
        if (t.length > 0) {
            n = {
                type: "view",
                child: t
            };
            a.push(n)
        }
        var s = e[r].attr;
        e[r].attr.width && -1 === e[r].attr.width.indexOf("%") && -1 === e[r].attr.width.indexOf("px") && (e[r].attr.width = e[r].attr.width + "px"), e[r].attr.height && -1 === e[r].attr.height.indexOf("%") && -1 === e[r].attr.height.indexOf("px") && (e[r].attr.height = e[r].attr.height + "px");
        n = {
            type: "img",
            attr: s
        };
        a.push(n), t = []
    } else if (t.push(e[r]), r == i - 1) {
        n = {
            type: "view",
            child: t
        };
        a.push(n)
    }
    return a
}, parseHtmlNode = function(e) {
    var t = [];
    return function e(a) {
        var r = {};
        if ("root" == a.node);
        else if ("element" == a.node) switch (a.tag) {
            case "a":
                r = {
                    type: "a",
                    text: a.child[0].text
                };
                break;
            case "img":
                r = {
                    type: "img",
                    text: a.text
                };
                break;
            case "p":
            case "div":
                r = {
                    type: "view",
                    text: a.text
                }
        } else "text" == a.node && (r = {
            type: "text",
            text: a.text
        });
        if (a.attr && (r.attr = a.attr), 0 != Object.keys(r).length && t.push(r), "a" != a.tag) {
            var i = a.child;
            if (i) for (var n in i) e(i[n])
        }
    }(e), t
};
module.exports = {
    html2json: html2wxwebview
};