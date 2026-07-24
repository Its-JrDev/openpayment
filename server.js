import express from 'express';

const app = express();

app.use((req)=> {
    console.dir(req.query.interact_ref)
})

app.listen(3000, ()=>console.dir("Running at port 3000"))