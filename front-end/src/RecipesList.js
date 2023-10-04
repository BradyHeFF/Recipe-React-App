import React from 'react';

function RecipesList({ recipes, onRemove }) {

    function getImageClass(imagePath) {
        if (typeof imagePath !== 'string') {
            return "img-fluid";
        }
        
        switch (imagePath) {
            case "/images/cinnamon-buns.jpg": return "img-fluid cinnamon-bun-image";
            case "/images/coffee-cake.jpg": return "img-fluid coffee-cake-image";
            case "/images/chocolate-danish.jpg": return "img-fluid chocolate-danish-image";
            case "/images/chocolate-chip-cookies.jpg": return "img-fluid chocolate-chip-cookies-image";
            default: return imagePath.startsWith('/uploads/') ? "img-fluid" : "img-fluid unknown-image";
        }
    }

    return (
        <div>
            {recipes.map((recipe) => {
                const adjustedImagePath = recipe.imagePath ? recipe.imagePath.replace(/\\/g, '/') : null;
                const imageUrl = adjustedImagePath && adjustedImagePath.startsWith('uploads/') ? `http://localhost:5000/${adjustedImagePath}` : adjustedImagePath;
                
                return (
                    <div key={recipe._id}>
                        <h2>{recipe.name}</h2>
                        <img 
                            src={imageUrl}
                            alt={recipe.name}
                            className={`recipe-image ${getImageClass(recipe.imagePath)}`}

                        />
                        <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
                        <p><strong>Directions:</strong> {recipe.directions}</p>
                        <p><strong>Description:</strong> {recipe.description}</p>
                        <button onClick={() => onRemove(recipe._id)}>Remove</button>
                    </div>
                );
            })}
        </div>
    );
}

export default RecipesList;
