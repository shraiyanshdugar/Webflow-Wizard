function plus(...args) {
    return args.reduce( (s,v) => s+v, 0 );
}

// function to string
let str = plus.toString();

// string to function
let copy = new Function('return ' + str)();

// tests
console.log(plus.name == 'plus');
console.assert(copy.name == 'plus');
console.assert(plus.constructor == Function);
console.assert(copy.constructor == Function);
console.assert(plus(1,2,3,4) === copy(1,2,3,4));
console.assert(plus.toString() === copy.toString());