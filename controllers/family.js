const mongodb =  require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllFamily = async (req,res)=>{
    const result = await mongodb.getDatabase().db().collection('family').find();
    result.toArray().then((users)=>{
   try{
      res.setHeader('Content-Type','application/json');
    res.status(200).json(users);
   }catch(err){
    res.status(400).json(err.message)
}})};

const getSingleFamily = async (req,res)=>{
    const userId = new ObjectId(req.params.id);
    console.log(userId);
    const result = await mongodb.getDatabase().db().collection('family').find({_id:userId});
    result.toArray().then((users)=>{
    try{
    res.setHeader('Content-Type','application/json');
    res.status(200).json(users[0]);    
    }catch(err){
      res.status(400).json(err.message)
  }})};

const newMemberFamily =  async (req,res)=>{//POST
    const added = {
        
        Name: req.body.Name,
        Lastname: req.body.Lastname,
        birth: req.body.birth,
        marriage: req.body.marriage,
        children: req.body.children,
        career:req.body.career 
    };
    const result = await mongodb.getDatabase().db().collection('family').insertOne(added);
    if (result.acknowledged){
        res.status(201).json(result);
      }else{
        res.status(500).json(result.console.error('New member was no created'));
      }
       
};

const updateFamily =  async (req,res)=>{ //PUT
    const userId = new ObjectId(req.params.id);
    const added = {
      Name: req.body.Name,
      Capital: req.body.Capital,
      area: req.body.area,
      habitants: req.body.habitants,
      independence: req.body.independence,
      continent:req.body.continent 
    };

    const result = await mongodb.getDatabase().db().collection('family').replaceOne({_id:userId},added);
    if (result.modifiedCount > 0){
        res.status(204).send();
      }else{
        res.status(500).json(result.console.error('Record was not updated'));
      }
       
};

const deleteMember =  async (req,res)=>{ //DELETE
    const userId = new ObjectId(req.params.id);
 
    const result = await mongodb.getDatabase().db().collection('family').deleteOne({_id:userId},true);
    if (result.deletedCount > 0){
        res.status(200).send();
      }else{
        res.status(500).json(result.console.error('Record was not deleted'));
      }
       
};


module.exports = {getAllFamily,getSingleFamily, newMemberFamily,updateFamily,deleteMember};
