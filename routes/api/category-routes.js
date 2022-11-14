const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  const allCategories = await Category.findAll({
    include: [{model:Product}]
  });
  const categories = allCategories.map((row) => row.get({plain:true}));
  res.status(200).json(categories)
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  const oneCategory = await Category.findByPk(req.params.id, {
    include:[{model:Product}]
  })
  res.status(200).json(oneCategory);
});

router.post('/', async (req, res) => {
  // create a new category
  const categoryBody = {
    category_name: req.body.category_name
  }
  const newCategory = await Category.create(categoryBody)
  res.status(200).json(newCategory)
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  const updateCategory = {
    category_name: req.body.category_name
  }
  const updatedCategory = await Category.update(updateCategory,{
    where:{
      id: req.params.id
    }
  })
  res.status(200).json(updatedCategory)
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  const deleteCategory = await Category.destroy({
    where:{
      id: req.params.id
    }
  })
  res.status(200).json(deleteCategory)
});

module.exports = router;
