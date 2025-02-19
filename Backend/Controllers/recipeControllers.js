const Recipe = require('../Models/Recipe')
const cloudinary = require('cloudinary').v2

const CreateNewRecipe = async (req , res) =>{

    try {
        

        const {title , description, ingredients , steps , recipeImage} = req.body
       
        if (!title || !description || !ingredients || !steps) {
            return res.status(400).json({
                success: false,
                message: 'Missing required recipe fields'
            })
        }

        const result = await cloudinary.uploader.upload(recipeImage,{
            folder:'recipes'
        })

        const recipe = await Recipe.create({
            title,
            description,
            ingredients,
            steps,
            recipeImage:{
                public_id: result.public_id,
                url: result.secure_url
            },
            createdBy:req.user._id
        })

        res.status(201).json({
            success: true,
            recipe
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:'Internal Server Error',
            success:false
        })
    }
}




// agar formdata use karke bhjna ho to

// const Recipe = require('../Models/Recipe');
// const cloudinary = require('cloudinary').v2;
// const fs = require('fs');

// const CreateNewRecipe = async (req, res) => {
//     try {
//         const { title, description, ingredients, steps } = req.body;

//         if (!title || !description || !ingredients || !steps || !req.files || !req.files.recipeImage) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Missing required fields or image'
//             });
//         }

//         const recipeImage = req.files.recipeImage; // File receive ho rahi hai

//         // File ko temporary store karke Cloudinary me bhejna
//         const result = await cloudinary.uploader.upload(recipeImage.tempFilePath, {
//             folder: 'recipes'
//         });

//         // Recipe ko database me save karna
//         const recipe = await Recipe.create({
//             title,
//             description,
//             ingredients,
//             steps,
//             recipeImage: {
//                 public_id: result.public_id,
//                 url: result.secure_url
//             },
//             createdBy: req.user._id
//         });

//         res.status(201).json({
//             success: true,
//             recipe
//         });

//     } catch (error) {
//         console.log(error);
//         res.status(500).json({
//             message: 'Internal Server Error',
//             success: false
//         });
//     }
// };

// module.exports = { CreateNewRecipe };



const getAllRecipes = async (req ,res)=>{
    try {
        
        const recipes = await Recipe.find().populate({
            path: 'createdBy',
            select: '-password'
        })

        res.status(200).json({
            success:true,
            recipes
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:error.message,
            success:false
        })
    }
}


const getRecipe = async (req , res) =>{
    try {
       
        const recipe = await Recipe.findById(req.params.recipeId).populate({
            path: 'createdBy',
            select: '-password'
        })

        if(!recipe){
            return res.status(401).json({
                success:false,
                message:'Recipe Not Found'
            })
        }


        res.status(200).json({
            recipe,
            success:true
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:'Internal Server Error',
            success:false
        })
    }
}


const getAllRecipesOfUser = async (req , res) =>{

    try {
       
        const recipe = await Recipe.find({createdBy:req.user._id})

        res.status(200).json({
            success:true,
            recipe
        })


    } catch (error) {
         res.status(500).json({
            success: false,
            message: error.message
        });
    }
    }


    // const updateRecipe = async (req ,res) =>{
    //     try {
           
    //         const recipe = await Recipe.findById(req.params.recipeId)

    //         if (!recipe) {
    //             return res.status(404).json({
    //                 success: false,
    //                 message: 'Recipe not found'
    //             });
    //         }

           
    //         //wahi user update hoga jo recipe ka owner hoga
    //         if(recipe.createdBy.toString() !== req.user._id.toString()){
    //             return res.status(404).json({
    //                 success: false,
    //                 message: 'Not access to change'
    //             });
    //         }

    //         await cloudinary.uploader.destroy(recipe.recipeImage.public_id);

    //         const result = await cloudinary.uploader.upload(req.body.recipeImage,{
    //             folder: 'recipes'
    //         })

    //         recipe.title = req.body.title
    //         recipe.description = req.body.description
    //         recipe.ingredients = req.body.ingredients
    //         recipe.steps = req.body.steps
            
    //         recipe.recipeImage = {
    //             public_id: result.public_id,
    //             url: result.secure_url
    //         }

    //         await recipe.save()

    //         res.status(200).json({
    //             success: true,
    //             recipe
    //         });
    //     } catch (error) {
    //         res.status(500).json({
    //             success: false,
    //             message: error.message
    //         });
    //     }
    //     }
    

    const updateRecipe = async (req, res) => {
        try {
            const recipe = await Recipe.findById(req.params.recipeId);
            if (!recipe) {
                return res.status(404).json({
                    success: false,
                    message: 'Recipe not found'
                });
            }
    
            if (recipe.createdBy.toString() !== req.user._id.toString()) {
                return res.status(404).json({
                    success: false,
                    message: 'Not access to change'
                });
            }
    
            // Only handle image if a new one is uploaded
            if (req.files && req.files.recipeImage) {
                // Delete old image
                await cloudinary.uploader.destroy(recipe.recipeImage.public_id);
                
                // Upload new image
                const result = await cloudinary.uploader.upload(req.files.recipeImage.tempFilePath, {
                    folder: 'recipes'
                });
    
                recipe.recipeImage = {
                    public_id: result.public_id,
                    url: result.secure_url
                };
            }
    
            // Update other fields
            if (req.body.title) recipe.title = req.body.title;
            if (req.body.description) recipe.description = req.body.description;
            if (req.body.ingredients) recipe.ingredients = req.body.ingredients;
            if (req.body.steps) recipe.steps = req.body.steps;
    
            await recipe.save();
    
            res.status(200).json({
                success: true,
                recipe
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    };


     const deleteRecipe = async (req, res) => {
        try {
            
            const recipe = await Recipe.findById(req.params.recipeId)

            if(recipe.createdBy.toString() !== req.user._id.toString()){
                return res.status(404).json({
                    success: false,
                    message: 'Not access to delete'
                });
            }

            await cloudinary.uploader.destroy(recipe.recipeImage.public_id)

            const deleteRecipe = await Recipe.findByIdAndDelete(req.params.recipeId)

            res.status(200).json({
                success: true,
                message: 'Recipe deleted successfully',
                deleteRecipe
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
     }
module.exports = {CreateNewRecipe , getAllRecipes,getRecipe,getAllRecipesOfUser,updateRecipe,deleteRecipe}