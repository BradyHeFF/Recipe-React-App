import React, { useState } from 'react';

function SubmitRecipeForm({ onAddRecipe }) {
    const [formData, setFormData] = useState({
        name: '',
        ingredients: '',
        directions: '',
        description: '',
        image: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('name', formData.name);
        data.append('ingredients', formData.ingredients);
        data.append('directions', formData.directions);
        data.append('description', formData.description);
        data.append('recipeImage', formData.image);

        fetch("http://localhost:5000/submit", {
            method: 'POST',
            body: data
        })
        .then(response => response.json())
        .then(result => {
            console.log(result.message);
        })
        .catch(error => console.error('Error submitting recipe:', error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </label>
            <label>
                Ingredients (comma separated):
                <input type="text" name="ingredients" value={formData.ingredients} onChange={handleChange} required />
            </label>
            <label>
                Directions:
                <textarea name="directions" value={formData.directions} onChange={handleChange} required></textarea>
            </label>
            <label>
                Description:
                <textarea name="description" value={formData.description} onChange={handleChange} required></textarea>
            </label>
            <label>
                Image:
                <input type="file" name="recipeImage" onChange={e => setFormData({ ...formData, image: e.target.files[0] })} />
            </label>
            <button type="submit">Submit Recipe</button>
        </form>
    );
}

export default SubmitRecipeForm;
