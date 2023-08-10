import Category from "../models/category.js";
import slugify from "slugify";

export const CreateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({ message: "Name is required" });
    }
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(200).send({
        success: false,
        message: "Category Already Exisits",
      });
    }
    // const category = await new Category({name,
    //   // slug: slugify(name), 
    // }).save();

    const category = await Category.create({
      name:name,
      slug:slugify(name)
    })
    
    res.status(201).send({
      success: true,
      message: "new category created",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Category",
    });
  }
};

export const UpdateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await Category.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: "Something went wrong!",
    });
  }
};

export const CategoryController = async(req,res)=>{
    try {
        const category = await Category.find({});
        res.status(200).send({
            success:true,
            message:"All Categories List",
            category
        })
        
    } catch (error) {
        res.status(500).send({
            success:false,
            error,
            message:"Something went wrong!"
        })
        
    }
    
}


export const SingleController = async (req,res)=>{
    try {
        const category = await Category.findOne({slug:req.params.slug})
        res.status(200).send({
            success:true,
            message:"Single Category",
            category
        })
        
    } catch (error) {
        res.status(500).send({
            success:false,
            error,
            message:"Something went wrong!"
        })   
    } 
}

export const DeleteController = async (req,res)=>{
    try {
        const {id} = req.params
        await Category.findByIdAndDelete(id)
        res.status(200).send({
            success:true,
            message:"Category Deleted Successfully!",
        })
        
    } catch (error) {
        res.status(500).send({
            success:false,
            error,
            message:"Something went wrong!"
        })   
    } 
}