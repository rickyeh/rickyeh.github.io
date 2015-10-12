// given an array of items, write function that reverses the array, without creating a new array

function reverse(arr) {
    var numLoops = Math.floor(arr.length / 2);
    
    for (var i = 0; i < numLoops; i++) {
        var temp = arr[i];
        var otherIndex = arr.length - 1 - i;
        
        arr[i] = arr[otherIndex];
        arr[otherIndex] = temp;
    }
}

var arr = [1, 2, 3, 4];
reverse(arr);
console.log(arr);
