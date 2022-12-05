const { Router } = require('express');

const {
    showAllRecipes,
    showRecipesById,
    showDietTypes,
    postRecipe
} = require('../controller/controller')

const router = Router();


router.get('/recipes', showAllRecipes)
router.get('/recipes/:id', showRecipesById)
router.get('/types', showDietTypes)
router.post('/recipe', postRecipe)

module.exports = router;

