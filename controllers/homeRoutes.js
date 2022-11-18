const router = require('express').Router();
const { User, Blog, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ['first_name']
        }
      ]
    });
    const blog = blogData.map((data) => data.get({ plain: true }));

    var activeUser

    if (req.session.user_id) {
      const userData = await User.findByPk(req.session.user_id)

      const user = userData.get({ plain: true })

      activeUser = user
    }


    res.render('homepage', {
      blog,
      activeUser,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

//add withauth
router.get('/dashboard', async (req, res) => {
  try {
    const dashboardData = await Blog.findAll({
      include: [
        { model: User }
      ],
      where: {
        user_id: req.session.user_id
      }

    });

    // Serialize data so the template can read it
    const dashboard = dashboardData.map((pets) => pets.get({ plain: true }));

    res.render('dashboard', {
      dashboard,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//add withauth
router.get('/blogs/:id', async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        { model: User,
        attributes: ["first_name"] },
        { model: Comment }
      ],

    });

    const commentData = await Comment.findAll({
      include: {model: User},
      where: {
        blog_id: req.params.id
      }
    })

    const blog = blogData.get({ plain: true });
    const comments = commentData.map( data => data.get({ plain: true }));

    const blogUserId = blog.user_id;
    var correctUser = false;


    if (req.session.user_id == blogUserId) {
      correctUser = true
    };

  // res.json(comments)

    res.render('blogs', {
      blog,
      comments,
      correctUser,
      logged_in: req.session.logged_in
    });

  } catch (err) {
    res.status(500).json(err);
    console.log(err)
  }
});

//add withauth
router.get('/postblog', async (req, res) => {
  try {
    res.render('postblog', {
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
  }
  res.render('login');
});

router.get('/404', (req, res) => {
  res.render('404')
});


module.exports = router;
