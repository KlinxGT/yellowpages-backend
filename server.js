const express = require("express");
const cors = require("cors");
const app = express();
const Joi = require("joi");
const multer = require("multer");
const mongoose = require("mongoose");

app.use(express.static("public"));
app.use(cors());
app.use(express.json())
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/images/");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({storage:storage});

mongoose
  .connect("mongodb+srv://xl26:wvVE5g5FRwv7HSNX@mongobongo.r0e3dod.mongodb.net/?retryWrites=true&w=majority&appName=MongoBongo")
  .then(() => console.log("Connected to mongodb..."))
  .catch((err) => console.error("could not connect ot mongodb...", err));


const postSchema = new mongoose.Schema({
    image: String,
    caption: String,
    likeCount: Number,
    extraInfo: String, 
    tags: String
});

const Posts = mongoose.model("Post", postSchema);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.get("/api/posts", async (req, res) => {
    const posts = await Posts.find();
    res.send(posts);
});

app.post("/api/posts", upload.single("img"), async(req, res) => {

    const result = validatePost(req.body);
    
    if(result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const post = new Posts({
        image: req.file!= null? "images/" + req.file.filename : "" ,
        caption: req.body.caption,
        likeCount: 0,
        extraInfo:req.body.extraInfo,
        tags:req.body.tags  
    });
    /*
    if(req.file) {
        post.image = "images/" +req.file.filename;
    }
    */
    
    const newPost = await post.save();
    res.send(newPost);

    console.log("valid");
});

app.put("/api/posts/:id", upload.single("img"), async(req, res) => {
    const result = validatePost(req.body);
   
    if (result.error) {
      res.status(400).send(result.error.details[0].message);
      return;
    }

    let fieldsToUpdate = {
        caption: req.body.caption,
        extraInfo: req.body.extraInfo,
        tags: req.body.tags,
        image: req.file!=null?"images/" + req.file.filename : ""
    }

    
    console.log("made it");
  
   const wentThrough = await Posts.updateOne(
    {_id: req.params.id},
    fieldsToUpdate
   );

   const updatedHouse = await Posts.findOne({_id: req.params.id});
   res.send(updatedHouse);
  });

app.delete("/api/posts/:id", async(req, res) => {
    const post = await Posts.findByIdAndDelete(req.params.id);
    res.send(post);   
    console.log("delete");
});

const validatePost = (post) => {
    const schema = Joi.object({
        _id: Joi.allow(""),
        caption: Joi.string().required(),
        extraInfo: Joi.string().required(),
        tags: Joi.string().required()
    });

    return schema.validate(post);
}

app.listen(3001, ()=> {
    console.log("Server Starting")
});
