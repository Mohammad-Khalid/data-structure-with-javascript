// Use stack method to reverse a string
function ReverseString(str) {
  var stack = [];
  for (var i = 0; i < str.length; i++) {
    stack.push(str[i]);
  }
  var reverse = "";
  while (stack.length) {
    reverse += stack.pop();
  }
  return reverse;
}

var reverseString = ReverseString("hello world");
console.log(reverseString);
