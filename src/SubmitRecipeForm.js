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

        onAddRecipe(formData);

        setFormData({
            name: '',
            ingredients: '',
            directions: '',
            description: '',
            image: ''
        });
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
                <select name="image" value={formData.image} onChange={handleChange}>
                    <option value="/images/cinnamon-buns.jpg">Cinnamon Buns</option>
                    <option value="/images/coffee-cake.jpg">Coffee Cake</option>
                    <option value="/images/chocolate-danish.jpg">Chocolate Danish</option>
                    <option value="/images/chocolate-chip-cookies.jpg">Chocolate Chip Cookies</option>
                </select>
            </label>
            <button type="submit">Submit Recipe</button>
        </form>
    );
}

export default SubmitRecipeForm;
