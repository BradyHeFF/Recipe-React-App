import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RecipesList from './RecipesList';
import SubmitRecipeForm from './SubmitRecipeForm';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

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
                <Navbar bg="dark" variant="dark" expand="lg">
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <LinkContainer to="/">
                                <Nav.Link>All Recipes</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/submit">
                                <Nav.Link>Submit Recipe</Nav.Link>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <div className="padding">
                <Routes>
                    <Route path="/" element={<RecipesList recipes={recipes} onRemove={removeRecipe} />} />
                    <Route path="/submit" element={<SubmitRecipeForm onAddRecipe={addRecipe} />} />
                </Routes>
            </div>
        </div>
        </Router>
    );
}

export default App;
