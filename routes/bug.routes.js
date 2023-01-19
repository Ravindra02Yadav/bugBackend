const express = require('express');
const {BugModel} = require('../modals/bug.modal')
const BugRouter = express.Router();

BugRouter.get('/', async (req, res)=> {
    let data = await BugModel.find({})
    console.log(data)
    res.send(data);
})
BugRouter.post('/create',(req,  res)=>{
    let bug = new BugModel(req.body)
    bug.save();
    res.send({msg:'Bug Created Successfull'});
})
BugRouter.delete('/delete' , async (req, res)=>{
    let { Id } = req.body;
    let bug = await BugModel.findOne({Id})
    console.log(bug);
    if(bug?._id){
        let updated = await BugModel.findByIdAndDelete(bug._id, (err, data) =>
        {
            if(err){
                console.log(err)
            }
            console.log("done : "+data);
            res.send("Bug deleted")
        });
    }else {
        res.status(404).send({err:"Bug Not Found"})
    }
})
BugRouter.patch("/update",async(req, res)=> {
    let { Id,type } = req.body;
    let isPresent = await BugModel.findOne({ Id })
    if(isPresent?._id){
       isPresent.type = req.type;
       isPresent.save();
       res.send("Updated");
    }else {
        res.send("Bug Not Available");
    }
})

module.exports = { BugRouter };