const express = require("express");
const app = express();
//To Read The Contents of the Body

app.use(express.json());

const port = 3000;

function isUnderflow(parameter) {
  if (parameter < -1000000) {
    return true;
  }
  return false;
}

function isOverflow(parameter) {
  if (parameter > 1000000) {
    return true;
  }
  return false;
}

function validateRequest(num1, num2, result) {
  if (typeof num1 === "string" || typeof num2 === "string") {
    return {
      status: "error",
      message: "Invalid data types",
    };
  } else if (isOverflow(num1) || isOverflow(num2) || isOverflow(result)) {
    return {
      status: "error",
      message: "Overflow",
    };
  } else if (isUnderflow(num1) || isUnderflow(num2) || isUnderflow(result)) {
    return {
      status: "error",
      message: "Underflow",
    };
  } else {
    return null;
  }
}
app.get("/", function (req, res) {
  res.send("Hello world!");
});
app.post("/add", function (req, res) {
  //We need Two Numbers to Add
  //In Post Request The Data is Sent in the Body
  //Request Magic
  //Read The request Body Data

  //1. Understand the Request
  const { num1, num2 } = req.body;
  const sum = num1 + num2;
  const requestNotValidated = validateRequest(num1, num2, sum);
  if (requestNotValidated) {
    res.send(requestNotValidated);
  } else {
    //Create A Response
    const response = {
      status: "success",
      message: `the sum of given two numbers`,
      sum: sum,
    };
    res.send(response);
  }
  //3. Send the Response
});

app.post("/sub", function (req, res) {
  //We need Two Numbers to Add
  //In Post Request The Data is Sent in the Body
  //Request Magic
  //Read The request Body Data

  //1. Understand the Request
  const { num1, num2 } = req.body;
  const difference = num1 - num2;
  const requestNotValidated = validateRequest(num1, num2, difference);
  if (requestNotValidated) {
    res.send(requestNotValidated);
  } else {
    //Create A Response
    const response = {
      status: "success",
      message: `the difference of given two numbers`,
      difference: difference,
    };
    //3. Send the Response
    res.send(response);
  }
});

app.post("/multiply", function (req, res) {
  //We need Two Numbers to Add
  //In Post Request The Data is Sent in the Body
  //Request Magic
  //Read The request Body Data

  //1. Understand the Request
  const { num1, num2 } = req.body;
  const result = num1 * num2;
  const requestNotValidated = validateRequest(num1, num2, result);
  if (requestNotValidated) {
    res.send(requestNotValidated);
  } else {
    //Create A Response
    const response = {
      status: "success",
      message: `The product of given numbers`,
      result: result,
    };
    //3. Send the Response
    res.send(response);
  }
});

app.post("/divide", function (req, res) {
  //We need Two Numbers to Add
  //In Post Request The Data is Sent in the Body
  //Request Magic
  //Read The request Body Data

  //1. Understand the Request
  const { num1, num2 } = req.body;
  const result = num1 / num2;
  const requestNotValidated = validateRequest(num1, num2, result);

  if (num2 === 0) {
    res.send({
      status: "error",
      message: "Cannot divide by zero",
    });
  } else if (requestNotValidated) {
    res.send(requestNotValidated);
  } else {
    //Create A Response
    const response = {
      status: "success",
      message: `The division of given numbers`,
      result: result,
    };
    //3. Send the Response
    res.send(response);
  }
});

app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;
