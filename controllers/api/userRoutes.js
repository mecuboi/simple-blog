const router = require('express').Router();
const { User, Blog, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//get routes
router.get('/', withAuth, async (req, res) => {
    try {
        const userData = await User.findAll({
          attributes: { exclude: ['password'] },
          include: [
            { model: Blog},
          ]
        });

        const users = userData.map((user) => 
        user.get({ plain: true })
        );
        
            res.status(200).json(users)

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//add withauth to avoid hacker

router.get('/:id', withAuth, async (req, res) => {
  try {
    const userDataById = await User.findByPk(req.params.id, {
      attributes: { exclude: ['password'] },
      include: [
        { model: Blog },
      ]
    })

    res.status(200).json(userDataById)
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//post routes for signup
router.post('/', async (req, res) => {
  try {

    const postUser = await User.create({
      ...req.body
    });
    req.session.save(() => {
      req.session.user_id = postUser.id;
      req.session.logged_in = true;
      res.status(200).json(postUser);
    });
    console.log(req.session.logged_in);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }
    const validPassword = await userData.checkPassword(req.body.password);
    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }
    
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.json({ user: userData, message: 'You are now logged in!', test: req.session.user_id, see: req.session.logged_in});
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});



module.exports = router;