const express = require('express');
const app = express();
const server = require("http").Server(app)
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
require('./db/index');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", req.get("Origin") || '*');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

app.use(require('./routes/routes')); //use routes in routes folder
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize())
app.use(passport.session())
require('./config/passport')(passport)


//////////////////////////////////////////////////
// app.get(
//     "/auth/google",
//     passport.authenticate(
//         "google",
//         {
//             scope : ["profile", "email"],
//             prompt : "select_account" // here: choose account google when login 
//         }
//     )
// )

// app.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/'}), async (req, res) => {
//     return res.redirect("http://localhost:3000/auth/google/callback/"+ "?token="+req.user.token)
    
//     // return res.redirect("http://192.168.1.22/auth/google/callback/"+ "?token="+req.user.token)
// });

// app.get("/categories/:id", function(req, res) {
// 	var image = req.params.id;
//     res.sendFile(__dirname + `/uploads/categories/${image}`);
// });

// app.get("/products/:id", function(req, res) {
//     var image = req.params.id;
//     res.sendFile(__dirname + `/uploads/products/${image}`);
// });

// app.get("/images/products/:id", function(req, res) {
// 	var image = req.params.id;
//     res.sendFile(__dirname + `/uploads/images/products/${image}`);
// });

// app.get("/banners/:id", function(req, res) {
// 	var image = req.params.id;
//     res.sendFile(__dirname + `/uploads/banners/${image}`);
// });

// app.get("/advertisements/:id", function(req, res) {
// 	var image = req.params.id;
//     res.sendFile(__dirname + `/uploads/advertisements/${image}`);
// });

// app.get("/contents/:id", function(req, res) {
// 	var image = req.params.id;
//     res.sendFile(__dirname + `/uploads/contents/${image}`);
// });

app.get("/download/registrations.xlsx", (req, res) => {
    res.sendFile(__dirname + `/download/registrations.xlsx`);
});

app.get("/:id", function(req, res) {
	var image = req.params.id;
    res.sendFile(__dirname + `/uploads/avatars/${image}`);
});

// const port = process.env.PORT || 8000; //set port 
// server.listen(port, () =>{
//     console.log("Server is up port: " + port);
// });

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});