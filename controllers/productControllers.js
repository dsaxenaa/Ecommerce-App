import Category from "../models/category.js";
import Order from "../models/order.js";
import Product from "../models/product.js";
import braintree from 'braintree'
import dotenv from "dotenv";
import fs from "fs";
import slugify from "slugify";

dotenv.config();

var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});




export const CreateProduct = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    //validation
    switch (true) {
      case !name:
        return res
          .status(401)
          .send({ success: false, message: "Name is required!" });
      case !description:
        return res
          .status(401)
          .send({ success: false, message: "Description is required!" });
      case !price:
        return res
          .status(401)
          .send({ success: false, message: "Price is required!" });
      case !category:
        return res
          .status(401)
          .send({ success: false, message: "Category is required!" });
      case !quantity:
        return res
          .status(401)
          .send({ success: false, message: "Quantity is required!" });
      case !photo && photo.size > 10000:
        return res
          .status(401)
          .send({
            success: false,
            message: "Photo is required and size should be less than 1 Mb!",
          });
    }
    const product = new Product({...req.fields, slug:slugify(name)})
    if(photo){
        product.photo.data = fs.readFileSync(photo.path);
        product.photo.contentType = photo.type
    }
    await product.save();
    res.status(201).send({
        success:true,
        message:"Product created successfully!",
        product
    })
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: "Something went wrong!",
    });
  }
};


export const GetProduct=async(req,res)=>{
  try {
    const products = await Product.find({}).populate('category').select("-photo").limit(12).sort({createdAt:-1});
    res.status(200).send({
      success:true,
      message:"All Products",
      total:products.length,
      products,
    })
    
  } catch (error) {
    res.status(500).send({
      message:"Something went wrong!",
      success:false,
      error
    })
  }
}

export const GetSingleProduct = async(req,res)=>{
  try {
    const { id } = req.params;
    const product = await Product.findById(id).select("-photo").populate("category")
    res.status(200).send({
      success:true,
      message:"Single Product Fetched",
      product
    })
    
  } catch (error) {
    res.status(500).send({
      success:false,
      message:"Something went wrong!",
      error
    })
  }
}

export const PhotoController = async(req,res)=>{
  try {
    const product = await Product.findById(req.params.pid).select("photo")
    if(product.photo.data){
      res.set('Content-type',product.photo.contentType)
      res.status(200).send(product.photo.data)
    }
    
  } catch (error) {
    res.status(500).send({
      success:false,
      message:"Something went wromg!",
      error
    })
    
  }
}

export const DeleteProduct= async(req,res)=>{
  try {
    await Product.findByIdAndDelete(req.params.id).select("-photo")
    res.status(200).send({
      message:"Product Deleted",
      success:true
    })
    
  } catch (error) {
    res.status(500).send({
      message:"Something went wrong!",
      success:false,
      error
    })
    
  }
}

export const UpdateProduct =async(req,res)=>{
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    //validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }

    const products = await Product.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Updated Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Update product",
    });
  }
}


export const ProductFilters = async(req,res)=>{
 try {
  const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await Product.find(args);
    res.status(200).send({
      success: true,
      products,
    });
 } catch (error) {
  res.status(500).send({
    error,
    message:"Something went wrong!",
    success:false,
  })
 } 
}

export const ProductCount = async(req,res) =>{
  try {
    const total = await Product.find({}).estimatedDocumentCount();
    res.status(200).send({
      success:true,
      message:"New Products",
      total
    })
  } catch (error) {
    res.status(500).send({
      success:false,
      message:"Something went wrong!",
      error
    })
  }
}

export const ProductList = async(req,res) =>{
  try {
    const perPage = 3
    const page = req.params.page ? req.params.page:1
    const products = await Product.find({}).select("-photo").skip((page-1)*perPage).limit(perPage).sort({createdAt:-1}) 
    res.status(200).send({
      products,
      message:"Products per page",
      success:true
    })
    
  } catch (error) {
    res.status(500).send({
      error,
      message:"Error in page control",
      success:false
    })
    
  }
}

export const SearchProduct = async(req,res) =>{
  try {
    const {keyword} = req.params
    const result = await Product.find({
      $or:[
        {name:{$regex:keyword , $options:"i"}},
        {description:{$regex:keyword, $options:"i"}}
      ]
    }).select("-photo");
    res.json(result)
  } catch (error) {
    res.status(500).send({
      error,
      success:false,
      message:"Error in search Product API"
    })
  } 
}

export const RelatedProducts = async(req,res)=>{
  try {
    const {id,cid} = req.params
    const products = await Product.find({
      category:cid,
      _id:{$ne:id}
    }).select("-photo").limit(3).populate("category")
    res.status(200).send({
      products,
      success:true,
      message:"Related Products"
    })
  } catch (error) {
    res.status(500).send({
      success:false,
      error,
      message:"Something went wrong!"
    })
  }
}

export const CategoryProduct=async(req,res)=>{
  try {
    const category = await Category.findOne({slug:req.params.slug})
    const products = await Product.find({category}).populate('category')
    res.status(200).send({
      success:true,
      message:"Products",
      products,
      category
    })
    
  } catch (error) {
    res.status(500).send({
      success:true,
      message:"Something went wrong!",
      error
    })
  }
}

export const BrainTreeToken = async(req,res)=>{
  try {
    gateway.clientToken.generate({},function(err,response){
      if(err){
        res.status(500).send(err)
      }
      else{
        res.send(response)
      }
    })
    
  } catch (error) {
  console.log(error)
}  
}

export const BrainTreePayment = async(req,res)=>{
  try {
    const {cart,nonce} = req.body;
    let total  = 0;
    cart.map((c)=>{
      total=total+c.price;
    })
    let newTransaction = gateway.transaction.sale({
      amount:total,
      paymentMethodNonce:nonce,
      options:{
        submitForSettlement:true,
      }
    },
    function(error,result){
      if(result){
        const order = new Order({
          products:cart,
          payment:result,
          buyer: req.user.userId
        }).save()
        res.json({ok:true})
      }else{
        res.status(500).send(error)
      }
    }
    
    )
    
  } catch (error) {
    console.log(error)
  }
  
}