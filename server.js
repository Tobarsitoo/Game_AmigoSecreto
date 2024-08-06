require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const preferencesRoutes = require('./routes/preferencesRoutes');

const PORT = process.env.SERVER_PORT;

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: false
}));

app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'src/img')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', authRoutes);
app.use('/preferences', preferencesRoutes);

app.listen(PORT, () => {
  console.log(`Servidor funcionando y corriendo en: http://localhost:${PORT}`);
});