import { AuthMiddleware, IsAdmin } from '../middlewares/authorization.js';
import { BrainTreePayment, BrainTreeToken, CategoryProduct, CreateProduct, DeleteProduct, GetProduct, GetSingleProduct, PhotoController, ProductCount, ProductFilters, ProductList, RelatedProducts, SearchProduct, UpdateProduct } from '../controllers/productControllers.js';

import express from 'express'
import formidable from 'express-formidable'

const router = express.Router();


router.post('/create-product', AuthMiddleware, IsAdmin, formidable(), CreateProduct)
router.put(
    "/update-product/:pid",
    AuthMiddleware,
    IsAdmin,
    formidable(),
    UpdateProduct
  );
  
router.get('/get-product', GetProduct)
router.get('/get-product/:id', GetSingleProduct)
router.get('/product-photo/:pid', PhotoController)
router.delete('/delete-product/:id', DeleteProduct)
router.post('/product-filters', ProductFilters)
router.get('/product-count', ProductCount)
router.get('/product-list/:page', ProductList)
router.get('/product-search/:keyword' , SearchProduct)
router.get('/product-related/:id/:cid', RelatedProducts)
router.get('/category-product/:slug', CategoryProduct)
router.get('/braintree/token', BrainTreeToken)
router.post('/braintree/payment',AuthMiddleware, BrainTreePayment)



export default router