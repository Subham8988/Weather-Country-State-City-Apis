const dotenv = require("dotenv");
dotenv.config();
const app= require('./src/index');


// server creation
const server = app.listen(process.env.PORT, (error) => {
    if (error) console.log('server creation issue') ;
    else console.log('server created and running on '+process.env.PORT); 
})