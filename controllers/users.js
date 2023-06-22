const mongodb =  require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllCountries = async (req,res)=>{
    const result = await mongodb.getDatabase().db().collection('countries').find();
    result.toArray().then((users)=>{
    res.setHeader('Content-Type','application/json');
    res.status(200).json(users);
});
};
const getSingleCountry = async (req,res)=>{
    const userId = new ObjectId(req.params.id);
    console.log(userId);
    const result = await mongodb.getDatabase().db().collection('countries').find({_id:userId});
    result.toArray().then((users)=>{
    res.setHeader('Content-Type','application/json');
    res.status(200).json(users[0]);    
    });

};

const newData =  async (req,res)=>{//POST
    const added = {


        Name: req.body.Name,
        Capital: req.body.Capital,
        area: req.body.area,
        habitants: req.body.habitants,
        independence: req.body.independence,
        continent:req.body.continent 
    };
    const result = await mongodb.getDatabase().db().collection('countries').insertOne(added);
    if (result.acknowledged){
        res.status(201).json(result);
      }else{
        res.status(500).json(result.console.error('New Data was no created'));
      }
       
};

const updateData =  async (req,res)=>{ //PUT
    const userId = new ObjectId(req.params.id);
    const added = {
      Name: req.body.Name,
      Capital: req.body.Capital,
      area: req.body.area,
      habitants: req.body.habitants,
      independence: req.body.independence,
      continent:req.body.continent 
    };

    const result = await mongodb.getDatabase().db().collection('countries').replaceOne({_id:userId},added);
    if (result.modifiedCount > 0){
        res.status(204).send();
      }else{
        res.status(500).json(result.console.error('New Data was no created'));
      }
       
};

const deleteData =  async (req,res)=>{ //DELETE
    const userId = new ObjectId(req.params.id);
 
    const result = await mongodb.getDatabase().db().collection('countries').deleteOne({_id:userId},true);
    if (result.deletedCount > 0){
        res.status(200).send();
      }else{
        res.status(500).json(result.console.error('New Data was no created'));
      }
       
};


module.exports = {getAllCountries,getSingleCountry, newData,updateData,deleteData};