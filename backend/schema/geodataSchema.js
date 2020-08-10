const mongoose=require('mongoose')


const geoSchema=new mongoose.Schema({
    address:{
        building:{type:String},
        coord:[{type:Number
        }],
        street:{type:String},
        zipcode:{type:String}
    },
    borough:{type:String},
    cuisine:{type:String},
    grades:[{
        date:{type:Date},
        grade:{type:String},
        score:{type:Number}
    }],
    name:{
        type:String
    },
    restaurant_id:{type:String}
})

const restaurants=mongoose.model('restaurants',geoSchema)

module.exports=restaurants