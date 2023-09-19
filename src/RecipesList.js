import React from 'react';

function RecipesList({ recipes, removeRecipe }) {
    return (
        <div>
            {recipes.map((recipe) => (
                <div key={recipe.id}>
                    <h2>{recipe.name}</h2>
                    <img 
                        src={recipe.image} 
                        alt={recipe.name}
                        className={
                            recipe.name === "Cinnamon Buns" ? "img-fluid cinnamon-bun-image" :
                            recipe.name === "Coffee Cake" ? "img-fluid coffee-cake-image" :
                            recipe.name === "Chocolate Danish" ? "img-fluid chocolate-danish-image" : "img-fluid"
                        } 
                    />
                    <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
                    <p><strong>Directions:</strong> {recipe.directions}</p>
                    <p><strong>Description:</strong> {recipe.description}</p>
                    <button onClick={() => removeRecipe(recipe.id)}>Remove</button>
                </div>
            ))}
        </div>
    );
}

export default RecipesList;
