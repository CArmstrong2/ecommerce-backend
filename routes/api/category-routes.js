const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  const allCategories = Category.findAll({
    include: [{model:Product}]
  });
  const categories = allCategories.map((row) => row.get({plain:true}));
  res.status(200).json(categories)
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  const oneCategory = Category.findByPk(req.params.id, {
    include:[{model:Product}]
  })
  res.status(200).json(oneCategory);
});

router.post('/', (req, res) => {
  // create a new category
  const categoryBody = {
    category_name: req.body.category_name
  }
  const newCategory = Category.create(categoryBody)
  res.status(200).json(newCategory)
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
  res.status(200).json(updatedCategory)
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  const deleteCategory = Category.destroy({
    where:{
      id: req.params.id
    }
  })
  res.status(200).json(deleteCategory)
});

module.exports = router;
