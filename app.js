const express = require('express');
const path = require("path");
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded());
 const userRouter = require('./routes/userRoutes');
 const {hostRouter} = require('./routes/hostRoutes');

app.use(userRouter);
app.use('/host',hostRouter);

app.use((req, res, next) => {
  
 res.status(404).sendFile(path.join(__dirname, 'views','404.html'));
})


const PORT = 3001;
app.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});