var Userdb = require('../model/model');

//create and save new user
exports.create = (req,res)=>{
    //validate request 
    if(!req.body){
        res.status(400).send({message : "Content can not be empty!"});
        return;
    }

    //new user 
    const user = new Userdb({
        name:req.body.name,
        email:req.body.email,
        gender:req.body.gender,
        status:req.body.status
    })

    //Save user inthe database 
    user
        .save(user)
        .then(data =>{
           // res.send(data)
           res.redirect('/add-user');
        })
        .catch(err=>{
            res.status(500).send({
                message : err.message || "Some error occured while creating a create operation"
            });
        });

}

//retrieve and return all user/ single user
exports.find = (req,res)=>{

    if(req.query.id){
        const id = req.query.id;

        Userdb.findById(id)
            .then(data=>{
                if(!data){
                    res.status(404).send({message : "Not found user with id"+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err=>{
                res.status(500).send({message: "Error retrieving the user id"+id})
            }
                )
    }else{
        Userdb.find()
        .then(user =>{
            res.send(user)
        })
        .catch(err=>{
            res.status(500).send({message: err.message || "Error occured while retriving user info"})
        })
    }
}



//update and save new user by user ID
exports.update = (req,res)=>{
    if(!req.body){
        return res
        .status(400)
        .send({message: "data to update cannot be empty"})
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id,req.body,{useFindAndModify: false})
       .then(data =>{ 
        if(!data){
            res.status(404).send({message: 'Cannot Update user ${id}. Maybe user not fount!'})    
        }else{
            res.send(data)
        }
        })
       .catch(err=>{
        res.status(500).send({message : "Error Update User infom"})
       }) 

}

//Delete a user with specified user ID in the request 
exports.delete = (req,res)=>{
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
        .then(data=>{
            if(!data){
                res.status(404).send({message: 'Cannot delete user ${id}. Maybe user not fount!'})    
            }else{
                res.send({message: "User successfully deleted"})
            }
            })
           .catch(err=>{
            res.status(500).send({message : "Could not delete user with id ="+id})
           }) 
}