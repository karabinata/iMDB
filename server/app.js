require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const pgtools = require("pgtools");

const movieRouter = require('./routes/movies');
const authRouter = require('./routes/auth');
const favoriteRouter = require('./routes/favorites');
const noteRouter = require('./routes/notes');
const ratingRouter = require('./routes/ratings');

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const Favorite = require('./models/favorite');
const User = require('./models/user');
const Note = require('./models/note');
const Rating = require('./models/rating');
const sequelize = require('./utils/database');

const { swaggerOptions } = require('./utils/swagger');

const app = express();

const specs = swaggerJsDoc(swaggerOptions);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs))

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(movieRouter);
app.use(authRouter);
app.use(favoriteRouter);
app.use(noteRouter);
app.use(ratingRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

Favorite.belongsTo(User);
User.hasMany(Favorite);
Rating.belongsTo(User);
User.hasMany(Rating);
Note.belongsTo(User);
User.hasMany(Note);

(async () => {
  try {
    await sequelize.sync();
  } catch (error) {
    const config = {
      user: "postgres",
      host: "localhost",
      password: "",
      port: 5432
    };

    pgtools.createdb(config, "iMDB", function(err, res) {
      if (err) {
        console.error(err);
        process.exit(-1);
      }
      sequelize.sync()
        .then(() => console.log('success'));
    });
  }
})();

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
