const saveRecipes = (allRecipes) => {
        const recipesStringified = JSON.stringify(allRecipes)
        localStorage.setItem('Recipes', recipesStringified)
    }
    //Retrieve recipes from local storage
const getAllRecipes = () => {
    const recipesJSON = localStorage.getItem('Recipes')
    if (recipesJSON === null) {
        return []
    } else {
        const recipesJSON = localStorage.getItem('Recipes')
        return recipesAll = JSON.parse(recipesJSON)
    }
}

const findRecipe = (allRecipes, recipeId) => {
    const recipe = allRecipes.find(function(element) {
        return element.id === recipeId
    })
    return recipe
}

const findIngredient = () => {

}

const addIngredient = (e, recipeIngredients) => {
    const ingredientID = uuidv4()
    recipeIngredients.push({ id: ingredientID, name: e.target.elements[0].value, completionStatus: false })
}

const renderIngredients = (ingredients) => {
    const ingredientSection = document.querySelector('#ingredients-section')
    ingredientSection.textContent = ''

    ingredients.forEach((element) => {
        const ingredientItem = document.createElement('p')
        const checkBox = document.createElement('input')
        checkBox.setAttribute('type', 'checkbox')
        checkBox.checked = element.completionStatus
        checkBox.classList.add('checkbox')
        checkBox.addEventListener('change', (e) => {
            element.completionStatus = e.target.checked
            saveRecipes(allRecipes)
        })

        ingredientItem.appendChild(checkBox)
        let itemName = document.createElement('span')
        if (element.name.length === 0) {
            itemName.textContent = 'unNamed Recipe'
        } else {
            itemName.textContent = element.name
        }
        itemName.classList.add('text-element')
        ingredientItem.appendChild(itemName)
        const removeButton = document.createElement('button')
        removeButton.innerHTML = '<i class="fa fa-times" aria-hidden="true"></i>'
        removeButton.classList.add('remove-element')

        removeButton.addEventListener('click', function() {
            deleteIngredient(ingredients, element)
            renderIngredients(ingredients)
        })
        ingredientItem.appendChild(removeButton)
        ingredientSection.appendChild(ingredientItem)
    })
}

const deleteIngredient = (ingredients, element) => {
    const ingredientIndex = ingredients.findIndex((ingredient) => ingredient.id === element.id)
    ingredients.splice(ingredientIndex, 1)
}


const renderRecipe = (recipe) => {
    const recipeName = document.querySelector('#recipe-name')
    const recipeDescription = document.querySelector('#recipe-description')
    recipe.id = window.location.hash.substr(1)
    recipeName.value = recipe.name
    recipeDescription.value = recipe.description
    renderIngredients(recipe.ingredients)
}

const calculateCompletionStatus = (recipe) => {
    let count = 0
    let numberOfIngredients = recipe.ingredients.length
    console.log(numberOfIngredients)
    recipe.ingredients.forEach((ingredient) => {
        if (ingredient.completionStatus === true) {
            count++
        }
    })

    if (count === 0) {
        return 'Edit'
    } else if (count === numberOfIngredients) {
        return 'You have all the ingredients'
    } else {
        return 'You have some of the ingredients'
    }
}


const loadMainPage = () => {
    const recipesFromStorage = getAllRecipes();
    if (recipesFromStorage.length === 0) {
        let recipesDIV = document.querySelector('#recipes-div')
        let titleParagraph = document.createElement('h2')
        titleParagraph.innerHTML = 'Add recipes to be added here'
        recipesDIV.appendChild(titleParagraph)
    } else {
        recipesFromStorage.forEach(renderMainPageRecipes)
    }

}

const filterRecipes = (allRecipes, filter) => {
    return filteredArray = allRecipes.filter((recipe) => recipe.name.toLowerCase().includes(filter))
}

const renderFilteredRecipes = (filteredRecipes) => {
    let recipesDIV = document.querySelector('#recipes-div')
    recipesDIV.textContent = ''
    filteredRecipes.forEach(renderMainPageRecipes)
}

const renderMainPageRecipes = (recipe) => {
    let recipesDIV = document.querySelector('#recipes-div')
    let titleParagraph = document.createElement('h4')
    let summaryParagraph = document.createElement('h5')
    let recipeBox = document.createElement('a')


    titleParagraph.textContent = recipe.name
    titleParagraph.classList.add('list-item')

    let completionString = calculateCompletionStatus(recipe)
    summaryParagraph.classList.add('list-item__title')
    summaryParagraph.innerHTML = completionString

    recipeBox.appendChild(titleParagraph)
    recipeBox.appendChild(summaryParagraph)
    recipeBox.setAttribute('href', `./edit-recipe.html#${recipe.id}`)
    recipeBox.style.textDecoration = 'none'

    recipesDIV.appendChild(recipeBox)
}

const deleteRecipe = (allRecipes, recipeId) => {
    const recipeIndex = allRecipes.findIndex((recipe) => recipe.id === recipeId)

    allRecipes.splice(recipeIndex, 1)
}