// higher order func - array.map,
// func called suqare, passed in an array, return new array of every item squared

function square(arr) {
    return arr.map(x => x * x);
}

var a = [1, 2, 3, 4];
console.log(square(a));

