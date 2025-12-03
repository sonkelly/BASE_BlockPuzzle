function forEach(e: any, t: Function): void {
    if (Array.isArray(e)) {
        e.forEach(t);
    } else {
        toArray(e).forEach((item: any, index: number) => {
            t(item.value, item.key, e);
        });
    }
}

function toArray(e: any): any[] {
    const t: any[] = [];
    for (const o in e) {
        if (e.hasOwnProperty(o)) {
            t.push(e[o]);
        }
    }
    return t;
}

function cloneDeep(t: any): any {
    if (t === null || typeof t !== "object") {
        return t;
    }
    
    let o: any = {};
    if (t.constructor === Array) {
        o = [];
    }
    
    for (const n in t) {
        if (t.hasOwnProperty(n)) {
            o[n] = cloneDeep(t[n]);
        }
    }
    return o;
}

function map(e: any, t: Function): any[] {
    if (!Array.isArray(e)) {
        e = toArray(e);
    }
    
    const n: any[] = [];
    e.forEach((e: any, o: number, a: any) => {
        n.push(t(e, o, a));
    });
    return n;
}

function random(e: number, t: number): number {
    const o: number = Math.random() * (t - e + 1) + e;
    return Math.floor(o);
}

function pullAllWith(e: any[], t: any[], o: Function): any[] {
    t.forEach((tItem: any) => {
        e.filter((eItem: any) => o(eItem, tItem)).forEach((matchItem: any) => {
            const index: number = e.indexOf(matchItem);
            if (index !== -1) {
                e.splice(index, 1);
            }
        });
    });
    return e;
}

function isEqual(t: any, o: any): boolean {
    const n: boolean = t instanceof Object;
    const a: boolean = o instanceof Object;
    
    if (!n || !a) {
        return t === o;
    }
    
    if (Object.keys(t).length !== Object.keys(o).length) {
        return false;
    }
    
    for (const i in t) {
        const r: boolean = t[i] instanceof Object;
        const s: boolean = o[i] instanceof Object;
        
        if (r && s) {
            return isEqual(t[i], o[i]);
        }
        
        if (t[i] !== o[i]) {
            return false;
        }
    }
    return true;
}

function now(): number {
    return Date.now();
}

function pullAll(e: any[], t: any[]): any[] {
    t.forEach((tItem: any) => {
        const index: number = e.indexOf(tItem);
        if (index !== -1) {
            e.splice(index, 1);
        }
    });
    return e;
}

function forEachRight(e: any, t: Function): void {
    if (!Array.isArray(e)) {
        e = toArray(e);
    }
    
    for (let n: number = e.length - 1; n >= 0 && t(e[n]); n--) {}
}

function startsWith(e: string, t: string, o?: number): boolean {
    return e.substr(o || 0).startsWith(t);
}

function endsWith(e: string, t: string, o?: number): boolean {
    return e.substr(o || 0).endsWith(t);
}

function remove(e: any[], t: Function): any[] {
    const o: any[] = [];
    const a: number[] = [];
    
    e.forEach((item: any, index: number) => {
        if (t(item)) {
            o.push(item);
            a.push(index);
        }
    });
    
    removeArray(e, a);
    return o;
}

function findIndex(e: any[], t: any, o?: number): number {
    let n: number;
    e = e.slice(o || 0);
    
    if (typeof t === "function") {
        for (n = 0; n < e.length; n++) {
            if (t(e[n])) {
                return n;
            }
        }
    } else if (Array.isArray(t)) {
        for (n = 0; n < e.length; n++) {
            const a: any = t[0];
            let i: boolean = true;
            
            if (t.length > 1) {
                i = t[1];
            }
            
            if (e[n][a] === i) {
                return n;
            }
        }
    } else {
        for (n = 0; n < e.length; n++) {
            if (e[n] === t) {
                return n;
            }
        }
    }
    return -1;
}

function concat(...args: any[]): any[] {
    const e: number = args.length;
    if (!e) {
        return [];
    }
    
    let t: any[] = args[0];
    for (let o: number = 1; o < e; o++) {
        t = t.concat(args[o]);
    }
    return t;
}

function isNumber(e: any): boolean {
    return typeof e === "number";
}

function indexOf(e: any[], t: any, o?: number): number {
    return e.slice(o || 0).indexOf(t);
}

function join(e: any[], t: string): string {
    if (e === null) {
        return "";
    }
    
    let o: string = "";
    e.forEach((item: any) => {
        o += item + t;
    });
    return o.substr(0, o.length - 1);
}

function split(e: string, t: string, o?: number): string[] {
    return e.split(t, o);
}

function max(e: number[]): number | undefined {
    if (e && e.length) {
        let t: number;
        for (let o: number = 0; o < e.length; o++) {
            if (o === 0) {
                t = e[0];
            } else if (t! < e[o]) {
                t = e[o];
            }
        }
        return t;
    }
}

function drop(e: any[], t: number): any[] {
    return e !== null && e.length ? e.slice(t) : [];
}

function flattenDeep(t: any[]): any[] {
    return t.reduce((acc: any[], val: any) => {
        return acc.concat(Array.isArray(val) ? flattenDeep(val) : val);
    }, []);
}

function uniq(e: any[]): any[] {
    const t: any[] = [];
    e.forEach((item: any) => {
        if (t.indexOf(item) === -1) {
            t.push(item);
        }
    });
    return t;
}

function isNaN(e: any): boolean {
    return isNumber(e) && e !== +e;
}

function chunk(e: any[], t: number): any[] {
    if (e === null || !e.length || t < 1) {
        return [];
    }
    
    const o: any[] = [];
    while (e.length > t) {
        o.push(e.slice(0, t));
        e = e.slice(t);
    }
    o.push(e);
    return o;
}

function maxBy(e: any[], t: Function): any {
    if (e && e.length) {
        let o: any;
        let n: any;
        for (let a: number = 0; a < e.length; a++) {
            if (a === 0) {
                o = t(e[0]);
                n = e[0];
            } else if (o < e[a]) {
                o = e[a];
                n = e[a];
            }
        }
        return n;
    }
}

function minBy(e: any[], t: Function): any {
    if (e && e.length) {
        let o: any;
        let n: any;
        for (let a: number = 0; a < e.length; a++) {
            if (a === 0) {
                o = t(e[0]);
                n = e[0];
            } else if (o > e[a]) {
                o = t(e[a]);
                n = e[a];
            }
        }
        return n;
    }
}

function range(e: number, t?: number, o?: number): number[] {
    if (o && typeof o !== "number") {
        t = o;
        o = undefined;
    }
    
    e = Number(e);
    if (t === undefined) {
        t = e;
        e = 0;
    } else {
        t = Number(t);
    }
    
    o = o === undefined ? (e < t ? 1 : -1) : Number(o);
    
    const step: number = o;
    const length: number = Math.max(Math.ceil((t - e) / (step || 1)), 0);
    const result: number[] = Array(length);
    
    for (let i: number = 0; i < length; i++) {
        result[i] = e;
        e += step;
    }
    return result;
}

function sumBy(e: any, t: Function): number {
    let o: number = 0;
    for (const n in e) {
        o += t(e[n]);
    }
    return o;
}

function countBy(e: any): { [key: string]: number } {
    const t: { [key: string]: number } = {};
    for (const o in e) {
        const n: any = e[o];
        if (t.hasOwnProperty(n)) {
            t[n] += 1;
        } else {
            t[n] = 1;
        }
    }
    return t;
}

function removeArray(e: any[], t: any): any[] {
    for (let o: number = e.length, n: number = 0; n < o; n++) {
        if (e[n] == t) {
            if (n == 0) {
                e.shift();
                return e;
            } else if (n == o - 1) {
                e.pop();
                return e;
            } else {
                e.splice(n, 1);
                return e;
            }
        }
    }
    return e;
}

const _: any = {};

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
_.filter = function(e: any, t: Function): any[] {
    if (!Array.isArray(e)) {
        e = toArray(e);
    }
    return e.filter(t);
};

_.find = function(e: any, t: Function): any {
    let n: any[];
    if (!Array.isArray(e)) {
        e = toArray(e);
    }
    n = e.filter(t);
    if (n.length) {
        return n[0];
    }
};

export default _;