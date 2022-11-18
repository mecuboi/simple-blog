const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const multer = require('multer');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const { PetAds } = require('./models/');


const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers });

//currently stores image on local repo
const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, './public/images/pets')
  },
  filename: (req, file, cb) => {
      cb(null, file.originalname)
  }
});

const upload = multer({storage: fileStorageEngine});

const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 1000*60*60*2,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/images')));


app.use(routes);

//for uploading a single image.  Use upload.array('name', int(limit))
app.post('/api/upload', upload.single("image"), async (req, res) => {
  try {
    const path = `${req.file.destination}/${req.file.originalname}`;
    const newPath = path.slice(9); //to remove 'public' from string
    const imageUrl = `../${newPath}`;

    
    // console.log(req.session)
    // updates petAd to include uploaded image based on req.session.pet_id 
    // created when a POST is made to '/api/petAds/
    const updatePetAdsImage = await PetAds.update({
      image: imageUrl,
     },
      {
         where:  {
           id: req.session.pet_id
         }
      });
      //Once updated redirect to homepage
    res.redirect('/')
    
  } catch (err) {
    res.status(500).json(err);
  }
});



sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening at http://localhost:${PORT}`));
});
