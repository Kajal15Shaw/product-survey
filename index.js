const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/User');
require('./models/Survey');
require('./services/passport');

//console.log('Keys:', keys); // Add in index.js or passport.js

console.log('Connected to MongoDB URI:', keys.mongoURI);

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI)
.then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection failed:', err));

const app = express();

app.use(bodyParser.json());
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

if (process.env.NODE_ENV === 'production') {
    // express will serve up production assets like out main.js file or main.css file.
    app.use(express.static('client/build'));

    // express will serve up the the index.js file if it doesn't recognize the route.
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);