const express = require("express");
const app = express();
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const path = require("path");

let db = null;

const dbPath = path.join(__dirname, "goodreads.db");
const intializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server started");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};
intializeDBAndServer();

app.get("/books/", async (request, response) => {
  const getBooksQuery = `
    select 
    * 
    from
    book
    order by
    book_id;
    `;
  const booksArray = await db.all(getBooksQuery);
  response.send(booksArray);
});
