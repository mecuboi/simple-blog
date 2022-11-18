const router = require('express').Router();
const { User, Blog, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
  try {
    const commentData = await Comment.findAll({
      include: [
        {
          model: User,
          attributes: ['first_name']
        },
        {
          model: Blog
        }
      ],
    });

    if (!commentData) {
      res.status(404).json({ message: 'No comment found' });
      return;
    }

    const comment = commentData.map((data) =>
      data.get({ plain: true })
    );

    res.status(200).json(comment)
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const commentData = await Comment.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['first_name']
        },
        {
          model: Blog
        }
      ],
    });

    if (!commentData) {
      res.status(404).json({ message: 'No comment found with this id' });
      return;
    }

    const comment = commentData.map((data) =>
      data.get({ plain: true })
    );

    res.status(200).json(comment)
  } catch (err) {
    res.status(400).json(err);
  }
});

//create comment
router.post('/', async (req, res) => {
  try {
    const commentData = await Comment.create({
      ...req.body,
      user_id: req.session.user_id
    });

    res.status(200).json(commentData)
  } catch (err) {
    console.log(err);
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

//delete Comment
//add withauth
router.delete('/:id', async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;