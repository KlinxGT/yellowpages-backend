const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.static("public"));
app.use(cors());
app.listen(3001, ()=> {
    console.log("I'm listening");
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

let posts = [
    {
        "_id":"1",
        "image":"images/abook.jpg",
        "caption":"Just read 1984 by George Orwell. God what a read; it quite literally blew my mind. Just the sheer depth of the story and the message behind it. I'm sure most people wouldn't understanding the subtleties to it but it really struck me to the core. Blah blah blah I'm so smart, look at me yall I read a book that's deep, I'm deep and wise and better than everyone. Please please please give me the validation and approval I never got from the friends I never had.",
        "like-count":"-400"
    },
    {
        "_id":"2",
        "image":"images/angel.jpg",
        "caption":"Stumbled across a mural, beautiful. A mind in pain is just a soul longing to return to heaven. *insert pinterest quote and hashtags*",
        "like-count":"5"
    },
    {
        "_id":"3",
        "image":"images/coffee.jpg",
        "caption":"Cute cafe I went to that I'll deliberately not say the name of and when asked, will gatekeep and reply: Honestly it's a really low key place and a sanctuary to me. Also the coffee in question is 16 dollar plus the 40% tip that was somehow the lowest option on the ipad they spun around for you to choose your tip.",
        "like-count":"20"
    },
    {
        "_id":"4",
        "image":"images/trustfund.jpg",
        "caption":"Our parents work for lockheed martin and we have trust funds.",
        "like-count":"70"
    },
    {
        "_id":"5",
        "image":"images/dreams.jpg",
        "caption":"I bought a rock off of ebay for 400$ and now I claim I'm in touch with the spirits in nature and can cure liver cancer through sound waves and vibrations. Buy my 50$ essential oil kit and I'll throw in a juice cleanse that's basically laxatives",
        "like-count":"4"
    },
    {
        "_id":"6",
        "image":"images/couple.jpg",
        "caption":"Something something love something something he's my king she's my queen.",
        "like-count":"07149874"
    },
    {
        "_id":"7",
        "image":"images/manbun.jpg",
        "caption":"Manbun, enough said",
        "like-count":"-00.00"
    },
    {
        "_id":"8",
        "image":"images/coffee.jpg",
        "caption":"I don't even like coffee, more of a tea guy tbh",
        "like-count":"40"
    }, 
    {
        "_id":"9",
        "image":"images/stones.jpg",
        "caption":"Pretty neat since it takes effor, but also why bother taking a pic of it aren't you supposed to be zen and self reflective, the opposite of social media?",
        "like-count":"4"
    }
];

app.get("/api/posts", (req, res) => {
    res.send(posts);
});

