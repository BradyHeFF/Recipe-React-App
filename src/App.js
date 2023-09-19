import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import RecipesList from './RecipesList';
import SubmitRecipeForm from './SubmitRecipeForm';
import './App.css';

function App() {
  const initialRecipes = [
    {
      "id": 1,
      "name": "Cinnamon Buns",
      "ingredients": "Dough, Brown sugar, Cinnamon, Butter, Cream cheese for frosting",
      "directions": "Mix dough ingredients and let rise. Roll out, spread with butter, sprinkle with brown sugar and cinnamon. Roll, cut into slices, and bake. Top with cream cheese frosting once cooled.",
      "description": "Sweet and fluffy buns with cinnamon swirl, topped with frosting.",
      "image": "/images/cinnamon-buns.jpg"
    },
    {
      "id": 2,
      "name": "Coffee Cake",
      "ingredients": "Flour, Sugar, Butter, Baking powder, Salt, Eggs, Vanilla, Brown sugar, Cinnamon for topping",
      "directions": "Mix dry and wet ingredients separately, then combine. Pour into a baking dish. Combine brown sugar and cinnamon and sprinkle over top. Bake until a toothpick comes out clean.",
      "description": "A tender cake with a crumble topping. Shoutout to mom for the recipe",
      "image": "/images/coffee-cake.jpg"
    },
    {
      "id": 3,
      "name": "Chocolate Danish",
      "ingredients": "Pastry dough, Chocolate chips, Cream cheese, Sugar, Egg for egg wash",
      "directions": "Roll out pastry dough, place chocolate chips and a dollop of cream cheese in the center. Fold dough over filling and seal edges. Brush with beaten egg. Bake until golden brown.",
      "description": "A buttery pastry filled with a creamy chocolate and creamy filling.",
      "image": "/images/chocolate-danish.jpg"
    }
  ];
  

    const [recipes, setRecipes] = useState(initialRecipes);

    const addRecipe = (recipe) => {
        setRecipes(prevRecipes => [...prevRecipes, { ...recipe, id: prevRecipes.length + 1 }]);
    };

    const removeRecipe = (id) => {
        setRecipes(prevRecipes => prevRecipes.filter(recipe => recipe.id !== id));
    };

    return (
        <Router>
            <div className="App">
                <nav>
                    <Link to="/">All Recipes</Link>
                    <Link to="/submit">Submit Recipe</Link>
                </nav>

                <Routes>
                    <Route path="/" element={<RecipesList recipes={recipes} onRemove={removeRecipe} />} />
                    <Route path="/submit" element={<SubmitRecipeForm onAddRecipe={addRecipe} />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
