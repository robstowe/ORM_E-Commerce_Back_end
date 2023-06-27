const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const productData = await Tag.findAll();
    res.status(200).json(productData);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const productData = await Tag.findByPk(req.params.id);
    res.status(200).json(productData);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
  .then((createdCategory) => {
    res.json(createdCategory)
  })
  .catch ((e) => {
    res.json(e)
  })
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const productData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!productData[0]) {
      res.status(404).json({ message: 'No product with this id!' });
      return;
    }
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const productData = await Tag.destroy({
      where: {
        id: req.params.id
      },
    });
    if (!productData[0]) {
      res.status(200).json({ message: 'Category has been removed' });
      return;
    }
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
