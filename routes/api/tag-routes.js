const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  const allTags = Tag.findAll({
    include: [{model:Product}]
  });
  const tags = allTags.map((row) => row.get({plain:true}));
  res.status(200).json(tags)
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  const oneTag = Tag.findByPk(req.params.id, {
    include:[{model:Product}]
  })
  res.status(200).json(oneTag);
});

router.post('/', (req, res) => {
  // create a new tag
  const tagBody = {
    tag_name: req.body.tag_name
  }
  const newTag = Tag.create(tagBody)
  res.status(200).json(newTag)
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  const updateTag = {
    tag_name: req.body.tag_name
  }
  const updatedTag = Tag.update(updateTag,{
    where:{
      id: req.params.id
    }
  })
  res.status(200).json(updatedTag)
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  const deleteTag = Tag.destroy({
    where:{
      id: req.params.id
    }
  })
  res.status(200).json(deleteTag)
});

module.exports = router;
