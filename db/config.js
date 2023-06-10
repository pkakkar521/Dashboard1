const mongoose=require('mongoose')
const DATABASE = process.env.DATABASE
mongoose.connect('${DATABASE}');