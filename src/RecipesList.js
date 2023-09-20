import React from 'react';

function RecipesList({ recipes, onRemove }) {

    function getImageClass(imagePath) {
        switch (imagePath) {
            case "/images/cinnamon-buns.jpg": return "img-fluid cinnamon-bun-image";
            case "/images/coffee-cake.jpg": return "img-fluid coffee-cake-image";
            case "/images/chocolate-danish.jpg": return "img-fluid chocolate-danish-image";
            case "/images/chocolate-chip-cookies.jpg": return "img-fluid chocolate-chip-cookies-image";
            default: return "img-fluid";
        }
    }
    
    return (
        <div>
            {recipes.map((recipe) => (
                <div key={recipe.id}>
                    <h2>{recipe.name}</h2>
                    <img 
                        src={recipe.image} 
                        alt={recipe.name}
                        className={getImageClass(recipe.image)}
                    />
                    <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
                    <p><strong>Directions:</strong> {recipe.directions}</p>
                    <p><strong>Description:</strong> {recipe.description}</p>
                    <button onClick={() => onRemove(recipe.id)}>Remove</button>
                </div>
            ))}
        </div>
    );
}

export default RecipesList;
