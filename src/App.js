import React, { useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import RecipesList from './RecipesList';
import SubmitRecipeForm from './SubmitRecipeForm';
import './App.css';

function App() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch("/recipes.json")
      .then(response => response.json())
      .then(data => setRecipes(data))
      .catch(error => console.error("Error fetching the recipes:", error));
  }, []);
  
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
