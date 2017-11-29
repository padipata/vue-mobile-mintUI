/**
 * Created by IvanCai on 2017/5/16.
 */
var express=require('express')
var router=express.Router()


router.post('/getUserInfo',function (req,res) {
     res.send(req.body)
})


module.exports=router