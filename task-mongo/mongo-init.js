let error = true;

let res = [
  db.todos.drop(),
  db.todos.createIndex({ id: 1 }, { unique: true }),
  db.todos.createIndex({ title: 1 }),
  db.todos.createIndex({ description: 1 }),
  db.todos.insert({ title: "Go Shopping", description: "Do All the shopping" }),
];

printjson(res);

if (error) {
  print("Error, exiting");
  quit(1);
}
