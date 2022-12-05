const axios = require('axios').default;
const { Recipe, DietType } = require('../db');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { YOUR_API_KEY } = process.env;

const getApiInfo = async () => {
    const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&addRecipeInformation=true&number=100`);

    const apiInfo = apiUrl.data.results.map(obj => {
        return {
            ID: obj.id,
            name: obj.title,
            resume: obj.summary,
            score: obj.spoonacularScore,
            healthylevel: obj.healthScore,
            stepbystep: obj.analyzedInstructions.map(obj => obj.steps.map(obj2 => obj2.step)),
            image: obj.image,
            createdInDB: obj.createdInDB,
            diets: obj.diets.map((diet) => diet),
        }
    })
    return apiInfo;
}

const getDBInfo = async () => {
    return await Recipe.findAll({
        include: {
            model: DietType,
            attributes: ["name"],
            through: {
                attributes: []
            }
        }
    })
};

const getAllRecipes = async () => {
    const apiInfo = await getApiInfo();
    const DBInfo = await getDBInfo();

    return apiInfo.concat(DBInfo);
};

async function showAllRecipes(req, res) {
    const name = req.query.name;
    const info = await getAllRecipes();

    if (name) {
        let recipeName = await info.filter(recipe => recipe.name.includes(name))
        if (recipeName.length > 0) res.status(200).send(recipeName)
        else res.status(404).json({ message: "No recipes with that name." })
    }
    else res.status(200).json(info);
}

async function showRecipesById(req, res) {
    const id = req.params.id.trim();
    const info = await getAllRecipes();

    if (id) {
        let recipeId = await info.filter(recipe => recipe.ID.toString() === id.toString());
        if (recipeId.length > 0) res.status(200).send(recipeId)
        else res.status(404).json({ message: "No recipes with that ID." })
    }
};

async function showDietTypes(req, res) {
    const allData = await axios.get(`https://api.spoonacular.com/recipes/complexSearch/?apiKey=${YOUR_API_KEY}&addRecipeInformation=true&number=100`);

    const diet = allData.data.results.map(elemento => elemento.diets)
    const diet2 = []
    diet.map(d2 => {
        for (var i = 0; i < d2.length; i++) {
            diet2.push(d2[i]);
        }
    })
    diet2.forEach(element => {
        if (element) {
            DietType.findAll({
                where: { name: element }
            })
        }
    });
    const allDiet = await DietType.findAll();
    res.json(allDiet);

};

async function postRecipe (req, res) {
    let {
        name,
        resume,
        score,
        healthylevel,
        stepbystep,
        image
    } = req.body

    try {
        let diets = req.body.diets;

        const newRecipe = await Recipe.create({
            name,
            resume,
            score,
            healthylevel,
            stepbystep,
            image
        });

        // let array = Array.isArray(diets) ? diets : [diets]
        let dietDB = await DietType.findAll({
            where: {
                name: {
                    [Op.in]: diets,
                }


            }
        })
        // newRecipe.addDietType(dietDB);
        dietDB.map((element) => newRecipe.addDietType(element))
        res.send('Recipe successfully uploaded');
    } catch (error) {
        console.log(error)
    }
};

module.exports = {showAllRecipes, showDietTypes, showRecipesById, postRecipe};



