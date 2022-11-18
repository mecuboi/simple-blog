const router = require('express').Router();
const { User, Blog, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ['first_name']
        },
        {
          model: Comment
        }
      ],
    });

    if (!blogData) {
      res.status(404).json({ message: 'No blog found' });
      return;
    }

    const blog = blogData.map((data) =>
      data.get({ plain: true })
    );

    res.status(200).json(blog)
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['first_name']
        },
        {
          model: Comment
        }
      ],
    });

    if (!blogData) {
      res.status(404).json({ message: 'No blog found with this id' });
      return;
    }

    res.status(200).json(blogData)
  } catch (err) {
    console.log(err)
    res.status(400).json(err);
  }
});

//create Blog
router.post('/', async (req, res) => {
  try {
    const blogData = await Blog.create({
      ...req.body,
      user_id: req.session.user_id
    });

    res.status(200).json(blogData)
  } catch (err) {
    res.status(400).json(err);
  }
});

//update Blog
//add withAuth
router.put('/:id', async (req, res) => {
  try {
    const updateBlog = await Blog.update({
      ...req.body
    },
    {
      where: {
        id: req.params.id
      },
    });

    if (!updateBlog) {
      return res.status(404).json({ message: 'No such blog found!' });
    } else {
      res.status(200).json(updateBlog);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete Blog
//add withauth
router.delete('/:id', async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!blogData) {
      res.status(404).json({ message: 'No blog found with this id!' });
      return;
    }

    res.status(200).json(blogData);
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

module.exports = router;
