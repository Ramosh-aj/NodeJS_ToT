const express = require("express");

const router = express.Router();

const Joi = require("joi");

const { Author  } = require("../models/Author");



   
/**
 * @desc    get all authers 
 * @route   /api/auther/
 * @method  GET
 * @access  pablic
 *
  */ 

router.get("/",async (req,res) =>{
    try {
        const authorList = await Author.find();
        res.status(200).json(authorList);

    } catch (error) {
        res.status(500).json({message:"Something went wrong"});
    }
    
    
    //order by asch
    //const authorList = await Author.find().sort({firstName: 1});

    //order by desch
    //const authorList = await Author.find().sort({firstName: -1});

    //show the first name & last name
    //const authorList = await Author.find().select("firstName lastName");

    //show the first name & last name without the id
    //const authorList = await Author.find().select("firstName lastName -_id");
    
})

/**
 * @desc    get the authers by Id 
 * @route   /api/auther/:id
 * @method  GET
 * @access  pablic
 *
  */ 

router.get("/:id", async(req,res) => {
    try {
        const author = await Author.findById(req.params.id);
        if (auther){
            res.status(200).json(auther );
        }
        else{
            res.status(400).json("the auther id not found");
        }
        
    } catch (error) {
        res.status(500).json({message:"Something went wrong"});
        
    }
});



/**
 * @desc    Add New Auther 
 * @route   /api/books/
 * @method  Post
 * @access  pablic
 *
  */ 

router.post("/",async(req,res) =>{
    const{error} = validateCreateAuther(req.obj);
    if (error){
        res.status(404).json({message:error.details[0].message});
    }

try{
    const auther=new Author({
        firstName: req.body.FirstName,
        lastName: req.body.LastName,
        nationality :req.body.nathonality,
        image: req.body.image,
    });
    const result =  await Author.Save();
    res.status(200).json(result);

}catch(error){
console.log.apply(error);
res.status(500).json({message:"Something went wrong"});
}
    
})

/**
 * @desc    Update auther 
 * @route   /api/auther/:id
 * @method  PUT
 * @access  pablic
 *
  */ 
 router.put("/",async(req,res)=>{
    const { error } = validateUpdateAuther(req.body);
    if(error){
        return res.status(400).json({message: error.details[0].message} );
    }
    try {
        const author = await Author.findByIdAndUpdate(
            //parameters 1
            req.params.id,
            //parameters 2
            {
                $set:{
                firstName :req.body.firstName,
                lastName: req.body.lastName,
                nationality: req.body.nathonality,
                image:req.body.image
                },  
            },
            //parameters 3
            //to return the updated value in the post man not just in the data base 
            {
                new: true
            }
        );
        res.status(200).json(author);
      
    } catch (error) {
        console.log.apply(error);
        res.status(500).json({message:"Something went wrong"});
    }    

 })


/**
 * @desc     delete Auther 
 * @route   /api/authers/
 * @method  DELETE
 * @access  pablic
 *
  */ 
router.delete("/:id",async(req,res) =>{

try {
    const auther= await Author.findById(req.params.id);
    if(auther){
        const author = await Author.findByIdAndDelete(req.params.id);
        res.status(200).json("the author Deleted sucssesfuly")

    }else{
        res.status(200).json("message: auther Id Not been founded");
    }
} catch (error) {
    log.console(error);
    res.status(500).json({message:"SomeThing went wrong"});
    
}

 
})

function validateCreateAuther(obj){
    const schema = Joi.object({
        FirstName : Joi.string().trim().min(3).max(100).required(),
        LastName : Joi.string().trim().min(3).max(100).required(),
        nathonality : Joi.string().trim().min(3).max(100).required(),
        image : Joi.string().trim().min(3).max(100).required(),
    })

    return schema.validate(obj)
}




function validateUpdateAuther (obj){
    const schema =Joi.object({
        FirstName : Joi.string().trim().min(3).max(100),
        LastName : Joi.string().trim().min(3).max(100),
        nationality : Joi.string().trim().min(3).max(100),
        image : Joi.string().trim().min(3).max(100),
    })
    return schema.validate(obj);
}

module.exports = router;