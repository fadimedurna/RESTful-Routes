const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const { v4: uuid } = require("uuid");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

/* 
Difference between const and let:
Turns out, const is almost exactly the same as let . ... However, the only difference is that once you've assigned a value to a variable using const , you can't reassign it to a new value. */
let comments = [
  {
    id: uuid(),
    username: "Todd",
    comment: "lol that is so funny!",
  },
  {
    id: uuid(),
    username: "Skyler",
    comment: "I like to go birdwatching with my dog",
  },
  {
    id: uuid(),
    username: "Sk8erBoi",
    comment: "Plz delete your account, Todd",
  },
  {
    id: uuid(),
    username: "onlysaywoof",
    comment: "woof woof woff",
  },
];

//index
app.get("/comments", (req, res) => {
  res.render("comments/index", { comments });
});
//new
app.get("/comments/new", (req, res) => {
  res.render("comments/new");
});
//create
app.post("/comments", (req, res) => {
  const { username, comment } = req.body;
  comments.push({ username, comment, id: uuid() });
  res.redirect("/comments"); //IMPORTANTTTT!!!!!!!
});
//show
app.get("/comments/:id", (req, res) => {
  const { id } = req.params;
  const comment = comments.find((c) => c.id === id);
  res.render("comments/show", { comment }); /* show.ejs yi renderlar */
});
//edit
app.get("/comments/:id/edit", (req, res) => {
  const { id } = req.params;
  const comment = comments.find((c) => c.id === id);
  res.render("comments/edit", { comment }); /* edit.ejs yi renderlar */
});
//update
app.patch("/comments/:id", (req, res) => {
  const { id } = req.params;
  const newCommentText = req.body.comment;
  const findComment = comments.find((c) => c.id === id);
  findComment.comment = newCommentText;
  res.redirect("/comments");
});
//destroy
app.delete("/comments/:id", (req, res) => {
  const { id } = req.params;
  comments = comments.filter((c) => c.id !== id);
  res.redirect("/comments");
});

app.listen(3000, () => {
  console.log("ON PORT 3000!");
});
