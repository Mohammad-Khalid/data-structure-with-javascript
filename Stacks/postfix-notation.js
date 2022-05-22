/**
 * DSA - Postfix Notation using Stack
 * Algorithm:
 * 1. Create an empty stack called stack.
 * 2. Scan the given expression from left to right.
 * 3. If the scanned character is an operand, add it to the output.
 * 4. If the scanned character is an ‘(‘, push it to the stack.
 * 5. If the scanned character is an ‘)’, pop and output from the stack until an ‘(‘ is encountered.
 * 6. If the scanned character is an operator, *, /, +, or -, push it to the stack.
 * 7. If the scanned character is a space, ignore it.
 * 8. After the expression has been completely read, pop and output from the stack until it is empty.
 * 10. Return the output.
 */

function PostNotation(input) {
  var stack = [];
  var output = [];

  // Check if the input is an operator
  var operators = {
    "+": function (a, b) {
      return a + b;
    },
    "-": function (a, b) {
      return a - b;
    },
    "*": function (a, b) {
      return a * b;
    },
    "/": function (a, b) {
      return a / b;
    },
  };

  // Push the operators and symbols to the stack
  function pushOnStack(value) {
    stack.push(value);
  }

  // Pop the operators and symbols from the stack
  function popFromStack() {
    if (stack.length > 0) {
      return stack.pop();
    }
    return 0;
  }

  // Return operator precedence value
  function priority(operator) {
    if (operator == "+" || operator == "-") {
      return 1;
    } else if (operator == "*" || operator == "/") {
      return 2;
    }
    return 0;
  }

  // Loop through the input string
  for (var i = 0; i < input.length; i++) {
    // If the input is a open parenthesis, push it to the stack
    if (input[i] == "(") {
      pushOnStack(input[i]);
    } else if (input[i] == ")") {
      // If the input is a close parenthesis, pop the stack until the open parenthesis is found
      while (stack[stack.length - 1] != "(") {
        output.push(stack.pop());
      }
      stack.pop();
    } else if (input[i] in operators) {
      // If the input is an operator
      if (stack.length >= 0) {
        // Pop last element from the stack
        var opr = popFromStack();

        // Loop until the last operator precedence is greater than or equal to the current operator
        while (priority(opr) >= priority(input[i])) {
          output.push(opr);
          opr = popFromStack();
        }
        if (opr != 0) {
          pushOnStack(opr);
        }
        pushOnStack(input[i]);
      } else {
        pushOnStack(input[i]);
      }
    } else {
      output.push(input[i]); // If the input is an operand, push it to the output
    }
  }

  // Pop the remaining operators from the stack
  while (stack.length > 0) {
    output.push(stack.pop());
  }
  return output;
}

// Input expressions, expected output, and resulting output
var expression = [
  {
    input: "A+B*C",
    expectedOutput: "ABC*+",
    output: "",
  },
  {
    input: "A+B-C",
    expectedOutput: "AB+C-",
    output: "",
  },
  {
    input: "A*B+C/D",
    expectedOutput: "AB*CD/+",
    output: "",
  },
  {
    input: "A*B+C",
    expectedOutput: "AB*C+",
    output: "",
  },
  {
    input: "A+B/C-D",
    expectedOutput: "ABC/+D-",
    output: "",
  },
  {
    input: "(A+B)/(C-D)",
    expectedOutput: "AB+CD-/",
    output: "",
  },
  {
    input: "(A+B)*C/D",
    expectedOutput: "AB+C*D/",
    output: "",
  },
];

for (var i = 0; i <= expression.length - 1; i++) {
  if (expression[i] != "") {
    // Call
    var postNotation = PostNotation(expression[i].input);
    expression[i] = {
      ...expression[i],
      output: postNotation.join(""),
    };
  }
}

console.table(expression);
