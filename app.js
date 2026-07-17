const express = require("express");
const path = require("path");
const methodOverride = require("method-override");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let posts = [
  {
    id: "1a",
    username: "Zaduuu......",
    content: "Hey, how are you?",
  },
  {
    id: "2a",
    username: "Rohit",
    content: "Hey, I am Rohit.",
  },
  {
    id: "3a",
    username: "Virat",
    content: "Hey, I am Virat.",
  },
  {
    id: "4a",
    username: "MS Dhoni",
    content: "Hey, I am MS Dhoni.",
  },
];

app.get("/", (req, res) => {
  res.redirect("/posts");
});

app.get("/posts", (req, res) => {
  res.render("index", { posts });
});

app.get("/posts/new", (req, res) => {
  res.render("new");
});

app.post("/posts", (req, res) => {
  const { username, content } = req.body;

  const newPost = {
    id: String(posts.length + 1) + "a",
    username,
    content,
  };

  posts.push(newPost);

  res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
  const { id } = req.params;

  const post = posts.find((p) => p.id === id);

  if (!post) {
    return res.send("Post not found");
  }

  res.render("show", { post });
});

app.get("/posts/:id/edit", (req, res) => {
  const { id } = req.params;

  const post = posts.find((p) => p.id === id);

  if (!post) {
    return res.send("Post not found");
  }

  res.render("edit", { post });
});

app.delete("/posts/:id", (req, res) => {
  const { id } = req.params;

  posts = posts.filter((p) => p.id !== id);

  res.redirect("/posts");
});

app.get("/posts/:id/delete", (req, res) => {
  const { id } = req.params;

  const post = posts.find((p) => p.id === id);

  if (!post) {
    return res.send("Post not found");
  }

  res.render("delete", { post });
});

app.patch("/posts/:id", (req, res) => {
  const { id } = req.params;
  const { username, content } = req.body;

  const post = posts.find((p) => p.id === id);

  if (!post) {
    return res.send("Post not found");
  }

  post.username = username;
  post.content = content;

  res.redirect("/posts");
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});