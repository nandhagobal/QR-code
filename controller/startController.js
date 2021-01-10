const request=require('request')
const f=require('fs')
exports.startController=(req,res)=>{
    res.status(200).render('start');
}

exports.genreateQr=(req,res)=>{
    res.render('generate',{text:''})
}

exports.readQr=(req,res)=>{
    res.render('read',{text:''})
}

exports.getGenerate=(req,res)=>{
    var query=req.query.text;
     console.log(query)
    res.render('generate',{text:query})
}

exports.postRead=(req,res)=>{
    console.log(req.file);
    try{
    request({
       method:'post',
       url:'https://api.qrserver.com/v1/read-qr-code/',
       Headers:{
           "Content-Type":"multipart/form-data"
       } ,
       formData:{
           "file":f.createReadStream(req.file.path)
       }
       },(err,reqe,body)=>{
        if(!err){
       var detail=JSON.parse(body);
       console.log(detail[0].symbol[0].data)
       res.render('read',{text:detail[0].symbol[0].data})
       }});
    }
    catch(err){
        res.render('read',{text:''})
    }
}