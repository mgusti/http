const Butter = require("../butter");

const USERS = [
    { id: 1, name: "samsul", username: "samsul123", password: "password123" },
    { id: 2, name: "alia", username: "alia456", password: "password456" },
    { id: 3, name: "dina", username: "dina789", password: "password789" },
];

const POSTS = [
    { 
        id: 1, title: "This is a Post Title",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        userId: 1
    },
];

const PORT = 8000;

const server = new Butter();

//File Routes
server.route("get", "/", (req, res) => {
    res.sendFile("./public/index.html", "text/html");
});

server.route("get", "/login", (req, res) => {
    res.sendFile("./public/index.html", "text/html");
});

server.route("get", "/styles.css", (req, res) => {
    res.sendFile("./public/styles.css", "text/css");
});

server.route("get", "/scripts.js", (req, res) => {
    res.sendFile("./public/scripts.js", "application/javascript");
});

//JSON API Routes
server.route("post", "/api/login", (req, res) => {
    let body = "";
    req.on("data", (chunk) => {
        body += chunk.toString("utf-8");
    })

    req.on("end", () => {
        body = JSON.parse(body);
        const username = body.username;
        const password = body.password;

        //Check if user exists
        const user = USERS.find((user) => user.username === username);
        
        //Check the password if the user was found
        if (user && user.password === password) {
            res.status(200).json({ message: "Login successful", name: user.name });
        } else {
            res.status(401).json({ message: "Invalid username or password" });
        }
    })
})

server.route("get", "/api/posts", (req, res) => {
  const posts = POSTS.map((post) => {
    const user = USERS.find((user) => user.id === post.userId);
    post.author = user.name;
    return post;
  });

    res.status(200).json(posts);
});

server.listen(PORT, () => {
    console.log("Server has started on port", PORT);
})