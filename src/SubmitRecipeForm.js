import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

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
        <div className="container mt-5">
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Name:</Form.Label>
                    <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Ingredients (comma separated):</Form.Label>
                    <Form.Control type="text" name="ingredients" value={formData.ingredients} onChange={handleChange} required />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Directions:</Form.Label>
                    <Form.Control as="textarea" name="directions" value={formData.directions} onChange={handleChange} required />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Description:</Form.Label>
                    <Form.Control as="textarea" name="description" value={formData.description} onChange={handleChange} required />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Image:</Form.Label>
                    <Form.Select name="image" value={formData.image} onChange={handleChange}>
                        <option value="/images/cinnamon-buns.jpg">Cinnamon Buns</option>
                        <option value="/images/coffee-cake.jpg">Coffee Cake</option>
                        <option value="/images/chocolate-danish.jpg">Chocolate Danish</option>
                        <option value="/images/chocolate-chip-cookies.jpg">Chocolate Chip Cookies</option>
                    </Form.Select>
                </Form.Group>

                <Button variant="primary" type="submit">Submit Recipe</Button>
            </Form>
        </div>
    );
}

export default SubmitRecipeForm;

