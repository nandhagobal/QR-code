const express=require('express');
const multer=require('multer');
const startController=require('./controller/startController');

const app = express();
var storage= multer.diskStorage({
    destination:__dirname+"/images",
    filename : function(req,file,cb){
    cb(null,file.originalname + new Date().toUTCString()+".jpg");
    }
}) 
app.set('view engine','ejs')


app.use(multer({storage:storage}).single('file'));
app.use((req,res,next)=>{
    if(req.file){
    req.file.filename=req.file.filename;
    }
    next();
})

app.get('/',startController.startController);

app.get('/generate',startController.genreateQr);

app.get('/read',startController.readQr);

app.get('/getGenerate',startController.getGenerate)

app.post('/postRead',startController.postRead)

app.listen(8090);