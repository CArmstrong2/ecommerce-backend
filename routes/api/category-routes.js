const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  const allCategories = Category.findAll();
  const categories = allCategories.map((row) => row.get({plain:true}));
  res.json(categories)
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  const oneCategory = Category.findOne({
    where:{
      id:req.params.id,
    }
  })
  res.json(oneCategory);
});

router.post('/', (req, res) => {
  // create a new category
  const categoryBody = {
    category_name: req.body.name
  }
  const newCategory = Category.create(categoryBody)
  res.json(newCategory)
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  const updateCategory = {
    category_name: req.body.name
  }
  const updatedCategory = Category.update(updateCategory,{
    where:{
      id: req.params.id
    }
  })
  res.json(updatedCategory)
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  const deleteCategory = Category.destroy({
    where:{
      id: req.params.id
    }
  })
  res.json(deleteCategory)
});

module.exports = router;
