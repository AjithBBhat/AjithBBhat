const axios = require('axios');

exports.homeRoutes = (req,res) => {
    //make a get request to api/user
    axios.get('http://localhost:8080/api/users')
        .then(function(response){
            res.render('index',{users : response.data});
       //     console.log(response)
            
        })
        .catch(err=>{
            res.send(err);
        })
  //  res.render('index',{users :"New Data"});
}

exports.add_user = (req,res) => {
    res.render('add_user');
}

exports.update_user = (req,res) => {
    res.render('update_user');
}