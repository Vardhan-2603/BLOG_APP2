import exp from 'express'
import { register } from '../Services/auth_service.js'
import { UserTypeModel } from '../Models/user_model.js';
import { ArticleTypeModel } from '../Models/article_model.js'
import { checkAuthor } from '../Middlewares/check_author.js'
import { authenticate } from '../Services/auth_service.js';
import { verifyToken } from '../Middlewares/verify_token.js';
export const authorRoute=exp.Router();

//Register autho(public)
authorRoute.post('/users',async(req,res)=>{
     //get user obj from req
     let userObj =req.body;
     //call register
     const newUserObj= await register({...userObj,role:"AUTHOR"});
     //send res
     res.status(201).json({message:"User Created",payloadd:newUserObj});
})
//create artical (protected)
authorRoute.post('/article',verifyToken,checkAuthor,async(req,res)=>{
     //get artical from req
     let artical = req.body;
     //create artical document
     let newArticalDoc = new ArticleTypeModel(artical)
     //save
     let createArticalDoc = await newArticalDoc.save()
     //send res
     return res.status(401).json({messang:"artical created"})
})
//read articals of author(protected)
authorRoute.get("/articles/:authorId",verifyToken,checkAuthor,async(req,res)=>{
     //get authorID
     let authorId= req.params.authorId;
     //read artical by the author
     let article = await ArticleTypeModel.find({author:authorId,isArticalActive:true}).populate('author','firstName email')
     //send res
     return res.status(400).json({message:"article",payload:article})
})
//edit aritcal (protected)
authorRoute.put("/articles",verifyToken,checkAuthor,async(req,res)=>{
     //get modified artical from request
     let {author,articleId,title,category,content}=req.body;
     //find the article
     let article= await ArticleTypeModel.findById({_id:articleId,author:author});
     //if artical not found
     if(!article){
          return res.status(400).json({message:"article not found"});
     }
     
     //update the article
     let updatedArticle=await ArticleTypeModel.findByIdAndUpdate(articleId,{
          $set:{title,category,content}}
     ,{
          new:true
     })
     //send res
     return res.status(400).json({message:'artical updated',payload:updatedArticle})
})

//delect(soft copy) aritical (protected)
authorRoute.put('/articles',verifyToken,checkAuthor,async(req,res)=>{
     let { author, articleId }= req.body;
     //check article
     let article=await ArticleTypeModel.findById(articleId)
     if(!article){
          return res.status(400).json({message:"article not found"});
     }
     //update statues to in active
     let updatedArticle=await ArticleTypeModel.findByIdAndUpdate(articleId,{
          $set:{isArticalActive:false}
     },{
          new:true
     })
     //return res
     return res.status(400).json({message:"changed to inactive",payload:updatedArticle})
})