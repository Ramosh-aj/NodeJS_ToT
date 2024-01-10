const express = require("express");
const Joi= require("joi");


const router= express.Router();

const books =[
    {
        id: 1,
        title: "book1",
        auther: "auther1",
        discribtion: "discribtion1",
        price: 111,
        cover: "cover1"
    },
    {
        id: 2,
        title: "book2",
        auther: "auther2",
        discribtion: "discribtion2",
        price: 222,
        cover: "cover2"
    }]
/**
 * @desc    Get all Bokks
 * @route   /api/books
 * @method  GET
 * @access  pablic
 *
  */ 

router.get('/',(req,res) =>{
    res.json(books)
});

/**
 * @desc    Find book by Id 
 * @route   /api/books/:id
 * @method  GET
 * @access  pablic
 *
  */ 

router.get('/:id', (req,res) =>{
    const book= books.find(b => b.id == parseInt(req.params.id));
    if(book){
        res.status(200).json(book);
    }
    else{
        res.status(404).json({message: "book not found" });
    }
});


/**
 * @desc    Greate New Book 
 * @route   /api/books
 * @method  POST
 * @access  pablic
 *
  */ 
router.post('/',(req,res) =>{
    //requierd
    const {error} = validateGreateBooks(req.body)
    if (error){
        return res.status(400).json({message:"error.details[0].message"});   
    }
    //show in the console
    console.log(req.body);

    //full the new obj from the req body
    const book = {
        id: books.length+1,
        title: req.body.title,
        auther: req.body.auther,
        discribtion: req.body.discribtion,
        price: req.body.price,
        cover: req.body.cover
    }

    books.push(book);
    res.status(201).json(book);
});

/**
 * @desc    Update book 
 * @route   /api/books/:id
 * @method  PUT
 * @access  pablic
 *
  */ 

router.put("/:id",(req,res) => {
    const error = validateUpdateBooks(req.body);
    if (error){
       return res.status(404).json({message:error.details[0].message});
    }

    const book = books.find(p => p.id === parseInt(req.params.id));
    if(book){
        res.status(200).json("message: Book has been updated");
    }
    else{
        res.status(200).json("message: Book ID Not fundet");
    }

})

/**
 * @desc    Update book 
 * @route   /api/books/:id
 * @method  DELETE
 * @access  pablic
 *
  */ 

router.delete("/:id",(req,res) => {

    const book = books.find(p => p.id === parseInt(req.params.id));
    if(book){
        res.status(200).json("message: Book has been deletd");
    }
    else{
        res.status(200).json("message: Book ID Not fundet");
    }

})

function validateGreateBooks(obj){
    const schema = Joi.object({
        title: Joi.string().trim().min(3).max(100).required(),
        auther: Joi.string().trim().min(3).max(100).required(),
        discribtion: Joi.string().trim().min(3).max(100).required(),
        price: Joi.number().min(3).required(),
        cover: Joi.string().trim().min(3).max(100).required(),
    });
    return schema.validate(obj);
}

function validateUpdateBooks(obj){
    const schema = Joi.object({
        title: Joi.string().trim().min(3).max(100),
        auther: Joi.string().trim().min(3).max(100),
        discribtion: Joi.string().trim().min(3).max(100),
        price: Joi.number().min(3).max(100),
        cover: Joi.string().trim().min(3).max(100),
    });
    return schema.validate(obj);
}



module.exports = router;