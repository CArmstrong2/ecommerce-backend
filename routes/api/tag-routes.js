const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  const allTags = await Tag.findAll({
    include: [{model:Product}]
  });
  const tags = allTags.map((row) => row.get({plain:true}));
  res.status(200).json(tags)
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  const oneTag = await Tag.findByPk(req.params.id, {
    include:[{model:Product}]
  })
  res.status(200).json(oneTag);
});

router.post('/', async (req, res) => {
  // create a new tag
  const tagBody = {
    tag_name: req.body.tag_name
  }
  const newTag = await Tag.create(tagBody)
  res.status(200).json(newTag)
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  const updateTag = {
    tag_name: req.body.tag_name
  }
  const updatedTag = await Tag.update(updateTag,{
    where:{
      id: req.params.id
    }
  })
  res.status(200).json(updatedTag)
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  const deleteTag = await Tag.destroy({
    where:{
      id: req.params.id
    }
  })
  res.status(200).json(deleteTag)
});

module.exports = router;
