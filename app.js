const mongoose = require('mongoose');
var postman = require('postman');
const bcrypt = require('bcrypt');
const app = express();
const PORT = 3000;

mongoose.connect('mongodb://localhost:27017/lab');
const userSchema = mongoose.Schema({
    name:String,
    password: {
        type:String,
        required:true
    }
});
const UserModel = mongoose.model('user',userSchema);
app.use(express.json());
app.get('/',(req,res)=>{
    UserModel.find({}).then(data=>res.json(data));
});
app.post('/user/create',(req,res)=>{
    bcrypt.hash(req.body.password,function(err, hash) {
        UserModel.create({
            name:req.body.name,
            password:hash
        })
        .then(()=>res.json({"msg":"user created"}));
    });
});
app.delete('/user/delete/:id',(req,res)=>{
    UserModel.deleteOne({_id:req.params.id})
    .then(()=>res.json({"msg":"user deleted"}));
});
app.listen(PORT,()=>console.log(`running on port: ${PORT}`));