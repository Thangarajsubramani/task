const express = require("express");
const app = express();
const port = 8080;
var bodyParser = require("body-parser");

const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");

const uri = "mongodb://admin:password@task-mongo:27017/";
//const uri = "mongodb://admin:password@localhost:27017/";
var ObjectId = require("mongodb").ObjectID;

const client = new MongoClient(uri);

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

async function listTodos(client) {
  db = await client.db("tododb");
  //await databasesList.collection('todos').insert({id : 100, title : 'Todo 2', description : 'This is description'});
  return await db.collection("todos").find({}).toArray();
}

async function addTodo(client, title) {
  db = await client.db("tododb");
  await db
    .collection("todos")
    .insert({ id: uuidv4(), title, description: "This is description" });
  return { done: true };
}

async function deleteTodo(client, id) {
  db = await client.db("tododb");
  await db.collection("todos").deleteOne({ _id: ObjectId(id) });
  return { done: true };
}

app.use("/", express.static("public"));

app.get("/todos", async (req, res) => {
  let response;
  try {
    await client.connect();
    response = await listTodos(client);
  } catch (e) {
    console.error(e);
    response = "Failed to fetch todos";
  }

  res.send(response);
});

app.get("/deletetodo/:id", async (req, res) => {
  console.log(req.params.id);
  let response;
  try {
    await client.connect();
    response = await deleteTodo(client, req.params.id);
  } catch (e) {
    console.error(e);
    response = "Failed to fetch todos";
  }

  res.send(response);
});

app.post("/addtodo", async (req, res) => {
  let response;
  const { title } = req.body;
  try {
    await client.connect();
    response = await addTodo(client, title);
  } catch (e) {
    console.error(e);
    response = "Failed to fetch todos";
  }

  res.send(response);
});

app.listen(port, () =>
  console.log(`app listening at http://localhost:${port}`)
);
