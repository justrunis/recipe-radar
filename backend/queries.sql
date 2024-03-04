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
VALUES ('Spaghetti Carbonara', 'Italian', 1);

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