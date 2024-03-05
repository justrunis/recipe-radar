CREATE TABLE recipes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    category VARCHAR(100),
    difficulty INTEGER,
    image BYTEA
);

CREATE TABLE ingredients (
    id SERIAL PRIMARY KEY,
    recipe_id INTEGER REFERENCES recipes(id),
    name VARCHAR(100),
    amount VARCHAR(20),
    type VARCHAR(50)
);

CREATE TABLE instructions (
    id SERIAL PRIMARY KEY,
    recipe_id INTEGER REFERENCES recipes(id),
    step_number INTEGER,
    instruction TEXT
);

CREATE TABLE IF NOT EXISTS images (
  id SERIAL PRIMARY KEY,
  recipe_id INTEGER REFERENCES recipes(id),
  filename VARCHAR(255) NOT NULL,
  filepath VARCHAR(255) NOT NULL,
  mimetype VARCHAR(100) NOT NULL,
  size INTEGER NOT NULL
);

INSERT INTO recipes (name, category, difficulty) 
VALUES ('Spaghetti Carbonara', 'Pasta', 1);

-- Assuming the returned id is 1 for the sake of this example
-- Inserting ingredients
INSERT INTO ingredients (recipe_id, name, amount, type)
VALUES (1, 'Spaghetti pasta', '200g', NULL),
       (1, 'Eggs', '2', NULL),
       (1, 'Pancetta or bacon', '150g', NULL),
       (1, 'Parmesan cheese', '100g', 'grated'),
       (1, 'Black pepper', '1/2 tsp', 'ground'),
       (1, 'Salt', 'to taste', NULL);

-- Inserting instructions
INSERT INTO instructions (recipe_id, step_number, instruction)
VALUES (1, 1, 'Cook spaghetti according to package instructions until al dente.'),
       (1, 2, 'In a bowl, whisk together eggs, grated Parmesan cheese, and black pepper.'),
       (1, 3, 'In a pan, cook diced pancetta or bacon until crispy.'),
       (1, 4, 'Drain spaghetti and immediately toss with the egg mixture until well coated.'),
       (1, 5, 'Add cooked pancetta or bacon and toss again.'),
       (1, 6, 'Serve immediately with additional grated Parmesan cheese and black pepper.');

-- Inserting recipe details
INSERT INTO recipes (name, category, difficulty) 
VALUES ('Cepelinai', 'Lithuanian', 5);

-- Assuming the returned id is 2 for the sake of this example
-- Inserting ingredients
INSERT INTO ingredients (recipe_id, name, amount, type)
VALUES (2, 'Potatoes', '1 kg', 'peeled and grated'),
       (2, 'Ground pork', '500g', NULL),
       (2, 'Onion', '1 large', 'finely chopped'),
       (2, 'Salt', '2 tsp', NULL),
       (2, 'Black pepper', '1/2 tsp', 'ground'),
       (2, 'All-purpose flour', '200g', NULL),
       (2, 'Sour cream', '250g', 'for serving'),
       (2, 'Bacon bits', 'as desired', 'for garnish'),
       (2, 'Butter', '2 tbsp', 'for garnish');

-- Inserting instructions
INSERT INTO instructions (recipe_id, step_number, instruction)
VALUES (2, 1, 'Place grated potatoes in a clean kitchen towel and squeeze out excess moisture.'),
       (2, 2, 'In a mixing bowl, combine grated potatoes with salt and let sit for 10 minutes.'),
       (2, 3, 'Meanwhile, prepare the filling by mixing ground pork, chopped onion, salt, and black pepper.'),
       (2, 4, 'Take a handful of grated potatoes and form a flat pancake in your hand. Place a spoonful of the meat mixture in the center and enclose it with the potato, forming a dumpling.'),
       (2, 5, 'Bring a large pot of salted water to a boil.'),
       (2, 6, 'Carefully add the dumplings to the boiling water. Reduce heat to medium-low and simmer for about 20-25 minutes, or until the dumplings float to the surface and are cooked through.'),
       (2, 7, 'Remove the dumplings with a slotted spoon and drain them on a plate lined with paper towels.'),
       (2, 8, 'Serve hot with sour cream, bacon bits, and a drizzle of melted butter on top.');

INSERT INTO recipes (name, category, difficulty)
VALUES ('Borscht', 'Soup', 3);

-- Assuming the returned id is 3 for the sake of this example
-- Inserting ingredients
INSERT INTO ingredients (recipe_id, name, amount, type)
VALUES (3, 'Beets', '3 large', 'peeled and grated'),
       (3, 'Onion', '1 large', 'finely chopped'),
       (3, 'Carrots', '2 medium', 'peeled and grated'),
       (3, 'Potatoes', '2 medium', 'peeled and diced'),
       (3, 'Cabbage', '1/2 small head', 'shredded'),
       (3, 'Beef or vegetable broth', '8 cups', NULL),
       (3, 'Tomato paste', '2 tbsp', NULL),
       (3, 'Bay leaves', '2', NULL),
       (3, 'Salt', 'to taste', NULL),
       (3, 'Black pepper', 'to taste', 'ground'),
       (3, 'Sour cream', 'for serving', NULL),
       (3, 'Fresh dill', 'for garnish', NULL);

-- Inserting instructions
INSERT INTO instructions (recipe_id, step_number, instruction)
VALUES (3, 1, 'In a large pot, heat oil over medium heat. Add onions and cook until softened.'),
       (3, 2, 'Add grated beets and carrots. Cook for about 10 minutes, stirring occasionally.'),
       (3, 3, 'Add diced potatoes, shredded cabbage, beef or vegetable broth, and tomato paste. Bring to a boil, then reduce heat and simmer for about 20-25 minutes, or until vegetables are tender.'),
       (3, 4, 'Season with salt, black pepper, and bay leaves. Simmer for an additional 10 minutes.'),
       (3, 5, 'Remove bay leaves and adjust seasoning if needed.'),
       (3, 6, 'Serve hot with a dollop of sour cream and a sprinkle of fresh dill.');