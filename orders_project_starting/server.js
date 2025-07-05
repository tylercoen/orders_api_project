import { createPublicKey } from "node:crypto";
import * as fs from "node:fs/promises";

const express = require("express"),
  server = express(),
  fs = require("fs"),
  orderData = require("./orders");

server.set("port", process.env.PORT || 3000);

server.get("/", (request, response) => {
  response.send("Welcome to our simple online order managing web app!");
});

//Add the /orders code here!
server.get("/orders", (request, response) => {
  response.json(orderData);
});

//Add the /neworder code here!
server.post("/neworder", express.json(), (request, response) => {
  orderData.orders.push(request.body);
  fs.writeFileSync("orders.json", JSON.stringify(orderData));
  response.send("Success");
  console.log("Success");
});

//Add the /update/:id code here!

server.put(
  "/update/:id",
  express.text({ type: "*/*" }),
  (request, response) => {
    var items = orderData.orders;
    items.forEach(function (o) {
      console.log(o);
      if (o.id == request.params.id) {
        console.log("Modifying order!");
        o.state = request.body;
      }
    });
    fs.writeFileSync("orders.jdon", JSON.stringify(orderData));
    response.send("Success!");
    console.log("Success!");
  }
);

//Add the /delete/:id code here!
server.delete("/delete/:id", (request, response) => {
  var items = orderData.orders;
  var newData = { orders: [] };
  items.forEach(function (o) {
    console.log(o);
    if (o.id == request.params.id) {
      console.log("Deleting order!");
    } else {
      newData.orders.push(o);
    }
  });
  fs.writeFileSync("orders.json", JSON.stringify(orderData));
  response.send("Success!");
  console.log("Success!");
});

server.listen(3000, () => {
  console.log("Express server started at port 3000");
});
