const express = require('express');
const router = express.Router();

const Post = require('../models/post.model');

router.get('/posts', async (req, res) => {
  try {
    const result = await Post
      .find({status: 'published'})
      .select('author created title photo status id')
      .sort({created: -1});
    if(!result) res.status(404).json({ post: 'Not found' });
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.get('/posts/:id', async (req, res) => {
  try {
    const result = await Post
      .findById(req.params.id);
    if(!result) res.status(404).json({ post: 'Not found' });
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.post('/posts/add', async (req, res) => {
  try {
    const {
      created,
      updated,
      author,
      status,
      title,
      text,
      photo,
      price,
      phone,
      location,
    } = req.body;

    const emailValidate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailValidate.test(author) && title.length >= 10 && text.length >= 50) {
      const newPost = new Post({
        created: created,
        updated: updated,
        author: author,
        status: status,
        title: title,
        text: text,
        photo: photo,
        price: price,
        phone: phone,
        location: location,
      });
      await newPost.save();
      res.json({
        message: 'OK',
      });
    } else {
      throw new Error('Wrong input!');
    }
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
});

module.exports = router;
