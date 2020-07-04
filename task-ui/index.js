const express = require("express");
const app = express();
const port = 8080;

const { MongoClient } = require("mongodb");

const uri = "mongodb://admin:password@task-mongo:27017/";

const client = new MongoClient(uri);

async function listTodos(client) {
  db = await client.db("tododb");
  //await databasesList.collection('todos').insert({id : 100, title : 'Todo 2', description : 'This is description'});
  return await db.collection("todos").find({}).toArray();
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

// app.post("/addtodo", async (req, res) => {
//   let response;
//   try {
//     await client.connect();
//     response = await listDatabases(client);
//   } catch (e) {
//     console.error(e);
//     response = "Failed to fetch todos";
//   } finally {
//     await client.close();
//   }

//   res.send(response);
// });

app.listen(port, () =>
  console.log(`app listening at http://localhost:${port}`)
);
