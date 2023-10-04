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

    const fetchRecipes = () => {
        fetch("http://localhost:5000/recipes")
            .then(response => response.json())
            .then(data => setRecipes(data))
            .catch(error => console.error("Error fetching the recipes:", error));
    }

    useEffect(fetchRecipes, []);

    const addRecipe = (recipe) => {
        fetchRecipes();
    };

    const removeRecipe = (id) => {
        fetch(`http://localhost:5000/recipes/${id}`, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Recipe deleted!') {
                setRecipes(prevRecipes => prevRecipes.filter(recipe => recipe._id !== id));
            } else {
                console.error("Error deleting recipe:", data.message);
            }
        })
        .catch(error => console.error("Error deleting recipe:", error));
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
