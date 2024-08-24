const { text } = require('body-parser');
var express = require('express');
var router = express.Router();


const messages = [
  {
  name: "Timothy",
  text: "Hello mate",
  sent_time: new Date()
  },
  {
  name: "Andrew",
  text: "Hello world wow!",
  sent_time: new Date()
  }
]

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render("index", { title: 'chat me.', data: messages});
});


router.get("/form", (req, res) =>{
  res.render("form");
});

router.post("/form", (req, res) => {
  const username = req.body.name;
  const message = req.body.text;

  messages.push({
    name: username,
    text: message,
    sent_time: new Date()
  });

  res.redirect("/");
});

module.exports = router;
