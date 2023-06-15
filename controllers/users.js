const mongodb =  require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req,res)=>{
    const result = await mongodb.getDatabase().db().collection('users').find();
    result.toArray().then((users)=>{
    res.setHeader('Content-Type','application/json');
    res.status(200).json(users);
});
};
const getSingle = async (req,res)=>{
    const userId = new ObjectId(req.params.id);
    console.log(userId);
    const result = await mongodb.getDatabase().db().collection('users').find({_id:userId});
    result.toArray().then((users)=>{
    res.setHeader('Content-Type','application/json');
    res.status(200).json(users[0]);    
    });

};

const newData =  async (req,res)=>{
    const added = {
        firstName: req.body.firstName,
        LastName: req.body.LastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday,
        ipadress:req.body.ipadress 
    };
    const result = await mongodb.getDatabase().db().collection('users').insertOne(added);
    if (result.acknowledged){
        res.status(201).json(result);
      }else{
        res.status(500).json(result.console.error('New Data was no created'));
      }
       
};

const updateData =  async (req,res)=>{
    const userId = new ObjectId(req.params.id);
    const added = {
        firstName: req.body.firstName,
        LastName: req.body.LastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday,
        ipadress:req.body.ipadress 
    };

    const result = await mongodb.getDatabase().db().collection('users').replaceOne({_id:userId},added);
    if (result.modifiedCount > 0){
        res.status(204).send();
      }else{
        res.status(500).json(result.console.error('New Data was no created'));
      }
       
};

const deleteData =  async (req,res)=>{
    const userId = new ObjectId(req.params.id);
 
    const result = await mongodb.getDatabase().db().collection('users').deleteOne({_id:userId},true);
    if (result.deletedCount > 0){
        res.status(200).send();
      }else{
        res.status(500).json(result.console.error('New Data was no created'));
      }
       
};


module.exports = {getAll,getSingle, newData,updateData,deleteData};