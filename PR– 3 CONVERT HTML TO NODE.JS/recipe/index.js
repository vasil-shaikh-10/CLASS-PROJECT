const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

let initialRecipe = [
    {
      name: 'Spaghetti Carbonara',
      description: 'A classic Italian pasta dish.',
      preparationTime: '15 minutes',
      cookingTime: '15 minutes',
      imageUrl: 'https://hips.hearstapps.com/hmg-prod/images/carbonara-index-6476367f40c39.jpg?crop=0.888888888888889xw:1xh;center,top&resize=1200:*',
      country: "India",
      veg: true,
      id: 1,
    }
]

app.get('/recipe/all', (req, res) => {
  res.send(initialRecipe)
})

app.post('/recipe/all', (req, res) => {
  const newRecipe = { ...req.body, id: Date.now() }; 
  initialRecipe.push(newRecipe);
  res.send(initialRecipe);
})

app.patch('/recipe/:id', (req, res) => {
  const { id } = req.params;
  const updatedRecipe = req.body;
  initialRecipe = initialRecipe.map(recipe => recipe.id === Number(id) ? { ...recipe, ...updatedRecipe } : recipe);
  res.send(initialRecipe);
})

app.delete('/recipe/:id', (req, res) => {
  const { id } = req.params;
  initialRecipe = initialRecipe.filter(recipe => recipe.id !== Number(id));
  res.send(initialRecipe);
})

app.listen(8090, () => {
  console.log('Server is running on port 8090')
})
