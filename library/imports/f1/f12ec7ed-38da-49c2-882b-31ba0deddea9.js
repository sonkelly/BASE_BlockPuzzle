"use strict";
cc._RF.push(module, 'f12ecftONpJwogrMboN7d6p', 'lodash');
// Scripts/lodash.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function forEach(e, t) {
    if (Array.isArray(e)) {
        e.forEach(t);
    }
    else {
        toArray(e).forEach(function (item, index) {
            t(item.value, item.key, e);
        });
    }
}
function toArray(e) {
    var t = [];
    for (var o in e) {
        if (e.hasOwnProperty(o)) {
            t.push(e[o]);
        }
    }
    return t;
}
function cloneDeep(t) {
    if (t === null || typeof t !== "object") {
        return t;
    }
    var o = {};
    if (t.constructor === Array) {
        o = [];
    }
    for (var n in t) {
        if (t.hasOwnProperty(n)) {
            o[n] = cloneDeep(t[n]);
        }
    }
    return o;
}
function map(e, t) {
    if (!Array.isArray(e)) {
        e = toArray(e);
    }
    var n = [];
    e.forEach(function (e, o, a) {
        n.push(t(e, o, a));
    });
    return n;
}
function random(e, t) {
    var o = Math.random() * (t - e + 1) + e;
    return Math.floor(o);
}
function pullAllWith(e, t, o) {
    t.forEach(function (tItem) {
        e.filter(function (eItem) { return o(eItem, tItem); }).forEach(function (matchItem) {
            var index = e.indexOf(matchItem);
            if (index !== -1) {
                e.splice(index, 1);
            }
        });
    });
    return e;
}
function isEqual(t, o) {
    var n = t instanceof Object;
    var a = o instanceof Object;
    if (!n || !a) {
        return t === o;
    }
    if (Object.keys(t).length !== Object.keys(o).length) {
        return false;
    }
    for (var i in t) {
        var r = t[i] instanceof Object;
        var s = o[i] instanceof Object;
        if (r && s) {
            return isEqual(t[i], o[i]);
        }
        if (t[i] !== o[i]) {
            return false;
        }
    }
    return true;
}
function now() {
    return Date.now();
}
function pullAll(e, t) {
    t.forEach(function (tItem) {
        var index = e.indexOf(tItem);
        if (index !== -1) {
            e.splice(index, 1);
        }
    });
    return e;
}
function forEachRight(e, t) {
    if (!Array.isArray(e)) {
        e = toArray(e);
    }
    for (var n = e.length - 1; n >= 0 && t(e[n]); n--) { }
}
function startsWith(e, t, o) {
    return e.substr(o || 0).startsWith(t);
}
function endsWith(e, t, o) {
    return e.substr(o || 0).endsWith(t);
}
function remove(e, t) {
    var o = [];
    var a = [];
    e.forEach(function (item, index) {
        if (t(item)) {
            o.push(item);
            a.push(index);
        }
    });
    removeArray(e, a);
    return o;
}
function findIndex(e, t, o) {
    var n;
    e = e.slice(o || 0);
    if (typeof t === "function") {
        for (n = 0; n < e.length; n++) {
            if (t(e[n])) {
                return n;
            }
        }
    }
    else if (Array.isArray(t)) {
        for (n = 0; n < e.length; n++) {
            var a = t[0];
            var i = true;
            if (t.length > 1) {
                i = t[1];
            }
            if (e[n][a] === i) {
                return n;
            }
        }
    }
    else {
        for (n = 0; n < e.length; n++) {
            if (e[n] === t) {
                return n;
            }
        }
    }
    return -1;
}
function concat() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var e = args.length;
    if (!e) {
        return [];
    }
    var t = args[0];
    for (var o = 1; o < e; o++) {
        t = t.concat(args[o]);
    }
    return t;
}
function isNumber(e) {
    return typeof e === "number";
}
function indexOf(e, t, o) {
    return e.slice(o || 0).indexOf(t);
}
function join(e, t) {
    if (e === null) {
        return "";
    }
    var o = "";
    e.forEach(function (item) {
        o += item + t;
    });
    return o.substr(0, o.length - 1);
}
function split(e, t, o) {
    return e.split(t, o);
}
function max(e) {
    if (e && e.length) {
        var t = void 0;
        for (var o = 0; o < e.length; o++) {
            if (o === 0) {
                t = e[0];
            }
            else if (t < e[o]) {
                t = e[o];
            }
        }
        return t;
    }
}
function drop(e, t) {
    return e !== null && e.length ? e.slice(t) : [];
}
function flattenDeep(t) {
    return t.reduce(function (acc, val) {
        return acc.concat(Array.isArray(val) ? flattenDeep(val) : val);
    }, []);
}
function uniq(e) {
    var t = [];
    e.forEach(function (item) {
        if (t.indexOf(item) === -1) {
            t.push(item);
        }
    });
    return t;
}
function isNaN(e) {
    return isNumber(e) && e !== +e;
}
function chunk(e, t) {
    if (e === null || !e.length || t < 1) {
        return [];
    }
    var o = [];
    while (e.length > t) {
        o.push(e.slice(0, t));
        e = e.slice(t);
    }
    o.push(e);
    return o;
}
function maxBy(e, t) {
    if (e && e.length) {
        var o = void 0;
        var n = void 0;
        for (var a = 0; a < e.length; a++) {
            if (a === 0) {
                o = t(e[0]);
                n = e[0];
            }
            else if (o < e[a]) {
                o = e[a];
                n = e[a];
            }
        }
        return n;
    }
}
function minBy(e, t) {
    if (e && e.length) {
        var o = void 0;
        var n = void 0;
        for (var a = 0; a < e.length; a++) {
            if (a === 0) {
                o = t(e[0]);
                n = e[0];
            }
            else if (o > e[a]) {
                o = t(e[a]);
                n = e[a];
            }
        }
        return n;
    }
}
function range(e, t, o) {
    if (o && typeof o !== "number") {
        t = o;
        o = undefined;
    }
    e = Number(e);
    if (t === undefined) {
        t = e;
        e = 0;
    }
    else {
        t = Number(t);
    }
    o = o === undefined ? (e < t ? 1 : -1) : Number(o);
    var step = o;
    var length = Math.max(Math.ceil((t - e) / (step || 1)), 0);
    var result = Array(length);
    for (var i = 0; i < length; i++) {
        result[i] = e;
        e += step;
    }
    return result;
}
function sumBy(e, t) {
    var o = 0;
    for (var n in e) {
        o += t(e[n]);
    }
    return o;
}
function countBy(e) {
    var t = {};
    for (var o in e) {
        var n = e[o];
        if (t.hasOwnProperty(n)) {
            t[n] += 1;
        }
        else {
            t[n] = 1;
        }
    }
    return t;
}
function removeArray(e, t) {
    for (var o = e.length, n = 0; n < o; n++) {
        if (e[n] == t) {
            if (n == 0) {
                e.shift();
                return e;
            }
            else if (n == o - 1) {
                e.pop();
                return e;
            }
            else {
                e.splice(n, 1);
                return e;
            }
        }
    }
    return e;
}
var _ = {};
// Assign functions to lodash object
_.forEach = forEach;
_.each = forEach;
_.cloneDeep = cloneDeep;
_.map = map;
_.random = random;
_.toArray = toArray;
_.pullAllWith = pullAllWith;
_.isEqual = isEqual;
_.now = now;
_.pullAll = pullAll;
_.forEachRight = forEachRight;
_.startsWith = startsWith;
_.endsWith = endsWith;
_.remove = remove;
_.findIndex = findIndex;
_.concat = concat;
_.isNumber = isNumber;
_.indexOf = indexOf;
_.join = join;
_.split = split;
_.max = max;
_.drop = drop;
_.flattenDeep = flattenDeep;
_.uniq = uniq;
_.isNaN = isNaN;
_.chunk = chunk;
_.maxBy = maxBy;
_.minBy = minBy;
_.range = range;
_.sumBy = sumBy;
_.countBy = countBy;
_.removeArray = removeArray;
// Add filter and find functions
_.filter = function (e, t) {
    if (!Array.isArray(e)) {
        e = toArray(e);
    }
    return e.filter(t);
};
_.find = function (e, t) {
    var n;
    if (!Array.isArray(e)) {
        e = toArray(e);
    }
    n = e.filter(t);
    if (n.length) {
        return n[0];
    }
};
exports.default = _;

cc._RF.pop();