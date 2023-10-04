const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const Recipe = require('./recipeModel');


const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../front-end/build')));

app.use('/uploads', express.static('uploads'));

mongoose.connect('mongodb://127.0.0.1:27017/recipesDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(error => console.error('Could not connect to MongoDB', error));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
});

const upload = multer({ storage: storage });

app.post('/submit', upload.single('recipeImage'), (req, res) => {
    const recipe = new Recipe({
        name: req.body.name,
        ingredients: req.body.ingredients,
        directions: req.body.directions,
        description: req.body.description,
        imagePath: req.file.path
    });
    
    recipe.save()
          .then(() => res.json({ message: 'Recipe submitted!' }))
          .catch(error => {
              console.error('Error saving recipe:', error);
              res.status(500).json({ message: 'Internal server error' });
          });
});


app.get('/recipes', (req, res) => {
    Recipe.find()
          .then(recipes => res.json(recipes))
          .catch(error => {
              console.error('Error fetching recipes:', error);
              res.status(500).json({ message: 'Internal server error' });
          });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.delete('/recipes/:id', (req, res) => {
    const recipeId = req.params.id;
    Recipe.findByIdAndDelete(recipeId)
          .then(() => res.json({ message: 'Recipe deleted!' }))
          .catch(error => {
              console.error('Error deleting recipe:', error);
              res.status(500).json({ message: 'Internal server error' });
          });
});


