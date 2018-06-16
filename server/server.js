const express = require('express'),
  userRouter = require('./api/user/router'),
  mg = require('mongoose'),
  port = process.env.PORT || 3000,
  bodyParser = require('body-parser');


mg.connect('mongodb://localhost:27017/tsnode')
  .then(() => {

    const app = express();
    app.use(bodyParser.json());
    app.use('/api/users', userRouter);

    app.use((req, res, next) => {
      res.send({message: 'not found'});
      console.log('not found:', req.url);
    });

    app.use((err, req, res, next) => {
      res.status(500).send({
        message: err.message,
        data: err
      });
      console.error(err);
    })

    app.listen(port, () => console.log(`listening on port ${port}`))
  })









