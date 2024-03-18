CREATE TABLE recipes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    category VARCHAR(100),
    difficulty INTEGER,
    image BYTEA
);

-- ALTER TABLE recipes DROP COLUMN user_id;
ALTER TABLE recipes ADD COLUMN user_id INTEGER;

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

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  role VARCHAR(20) DEFAULT 'user',
  password VARCHAR(100) NOT NULL
);

-- Inserting recipe details
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

-- Inserting recipe details
INSERT INTO recipes (name, category, difficulty)
VALUES ('Tiramisu', 'Dessert', 2);

-- Assuming the returned id is 4 for the sake of this example
-- Inserting ingredients
INSERT INTO ingredients (recipe_id, name, amount, type)
VALUES (4, 'Eggs', '4', NULL),
       (4, 'Sugar', '1 cup', NULL),
       (4, 'Mascarpone cheese', '500g', NULL),
       (4, 'Ladyfingers', '24', NULL),
       (4, 'Espresso or strong coffee', '1 1/2 cups', NULL),
       (4, 'Cocoa powder', '2 tbsp', 'for dusting');

-- Inserting instructions
INSERT INTO instructions (recipe_id, step_number, instruction)
VALUES (4, 1, 'In a large bowl, beat egg yolks and sugar until thick and pale.'),
       (4, 2, 'Add mascarpone cheese and beat until smooth.'),
       (4, 3, 'In a separate bowl, beat egg whites until stiff peaks form.'),
       (4, 4, 'Gently fold the egg whites into the mascarpone mixture.'),
       (4, 5, 'Dip ladyfingers into espresso or coffee and layer them in the bottom of a serving dish.'),
       (4, 6, 'Spread half of the mascarpone mixture over the ladyfingers.'),
       (4, 7, 'Repeat the layers with the remaining ladyfingers and mascarpone mixture.'),
       (4, 8, 'Cover and refrigerate for at least 4 hours, or overnight.'),
       (4, 9, 'Before serving, dust the top with cocoa powder.');

-- Inserting recipe details
INSERT INTO recipes (name, category, difficulty)
VALUES ('Saltibarsciai', 'Soup', 1);

-- Assuming the returned id is 5 for the sake of this example
-- Inserting ingredients
INSERT INTO ingredients (recipe_id, name, amount, type)
VALUES (5, 'Beets', '3 large', 'cooked, peeled, and grated'),
       (5, 'Cucumber', '1 large', 'peeled and diced'),
       (5, 'Radishes', '4-5', 'sliced'),
       (5, 'Green onions', '3-4', 'chopped'),
       (5, 'Hard-boiled eggs', '2', 'chopped'),
       (5, 'Kefir or buttermilk', '4 cups', NULL),
       (5, 'Sour cream', 'for serving', NULL),
       (5, 'Fresh dill', 'for garnish', NULL),
       (5, 'Salt', 'to taste', NULL),
       (5, 'Black pepper', 'to taste', 'ground');

-- Inserting instructions
INSERT INTO instructions (recipe_id, step_number, instruction)
VALUES (5, 1, 'In a large bowl, combine grated beets, diced cucumber, sliced radishes, chopped green onions, and chopped hard-boiled eggs.'),
       (5, 2, 'Stir in kefir or buttermilk until well combined.'),
       (5, 3, 'Season with salt and black pepper, to taste.'),
       (5, 4, 'Chill in the refrigerator for at least 1 hour before serving.'),
       (5, 5, 'Serve cold with a dollop of sour cream and a sprinkle of fresh dill.');

-- Inserting recipe details
INSERT INTO recipes (name, category, difficulty)
VALUES ('Tonkotsu Ramen', 'Soup', 4);

-- Assuming the returned id is 6 for the sake of this example
-- Inserting ingredients
INSERT INTO ingredients (recipe_id, name, amount, type)
VALUES (6, 'Pork bones', '4 lbs', NULL),
       (6, 'Chicken carcasses', '2 lbs', NULL),
       (6, 'Ginger', '1 knob', 'sliced'),
       (6, 'Garlic', '1 head', 'halved'),
       (6, 'Onion', '1 large', 'halved'),
       (6, 'Green onions', '4-5', 'chopped'),
       (6, 'Soy sauce', '1/4 cup', NULL),
       (6, 'Mirin', '1/4 cup', NULL),
       (6, 'Salt', 'to taste', NULL),
       (6, 'Ramen noodles', 'as desired', NULL),
       (6, 'Soft-boiled eggs', 'for serving', NULL),
       (6, 'Bamboo shoots', 'for serving', NULL),
       (6, 'Nori', 'for serving', NULL),
       (6, 'Sesame seeds', 'for serving', NULL);

-- Inserting instructions
INSERT INTO instructions (recipe_id, step_number, instruction)
VALUES (6, 1, 'In a large pot, combine pork bones, chicken carcasses, ginger, garlic, and onion. Cover with water and bring to a boil.'),
       (6, 2, 'Reduce heat and simmer for about 12-14 hours, skimming off any impurities that rise to the surface.'),
       (6, 3, 'Strain the broth through a fine-mesh sieve and return to the pot.'),
       (6, 4, 'Stir in soy sauce, mirin, and salt. Keep warm over low heat.'),
       (6, 5, 'Cook ramen noodles according to package instructions.'),
       (6, 6, 'Divide the noodles among serving bowls and ladle the hot broth over the top.'),
       (6, 7, 'Top with soft-boiled eggs, bamboo shoots, nori, chopped green onions, and sesame seeds.');

-- Inserting recipe details
INSERT INTO recipes (name, category, difficulty)
VALUES ('Scrambled Eggs', 'Breakfast', 1);

-- Assuming the returned id is 7 for the sake of this example
-- Inserting ingredients
INSERT INTO ingredients (recipe_id, name, amount, type)
VALUES (7, 'Eggs', '4', NULL),
       (7, 'Milk', '2 tbsp', NULL),
       (7, 'Butter', '1 tbsp', NULL),
       (7, 'Salt', 'to taste', NULL),
       (7, 'Black pepper', 'to taste', 'ground');

-- Inserting instructions
INSERT INTO instructions (recipe_id, step_number, instruction)
VALUES (7, 1, 'In a bowl, whisk together eggs and milk until well combined.'),
       (7, 2, 'In a non-stick skillet, melt butter over medium heat.'),
       (7, 3, 'Pour in the egg mixture and let it sit for a few seconds.'),
       (7, 4, 'Using a spatula, gently push the eggs from the edges towards the center, allowing the uncooked eggs to flow to the edges.'),
       (7, 5, 'Continue to cook and gently stir until the eggs are just set.'),
       (7, 6, 'Season with salt and black pepper, to taste.');

-- Inserting recipe details
INSERT INTO recipes (name, category, difficulty)
VALUES ('Ceasar Salad', 'Salad', 1);

-- Assuming the returned id is 8 for the sake of this example
-- Inserting ingredients
INSERT INTO ingredients (recipe_id, name, amount, type)
VALUES (8, 'Romaine lettuce', '1 head', 'chopped'),
       (8, 'Croutons', 'as desired', NULL),
       (8, 'Parmesan cheese', '1/2 cup', 'grated'),
       (8, 'Anchovy fillets', '2-3', 'minced'),
       (8, 'Garlic', '1 clove', 'minced'),
       (8, 'Dijon mustard', '1 tsp', NULL),
       (8, 'Lemon juice', '2 tbsp', NULL),
       (8, 'Worcestershire sauce', '1 tsp', NULL),
       (8, 'Egg yolk', '1', NULL),
       (8, 'Olive oil', '1/4 cup', NULL),
       (8, 'Salt', 'to taste', NULL),
       (8, 'Black pepper', 'to taste', 'ground');

-- Inserting instructions
INSERT INTO instructions (recipe_id, step_number, instruction)
VALUES (8, 1, 'In a large salad bowl, combine chopped romaine lettuce and croutons.'),
       (8, 2, 'In a small bowl, whisk together minced anchovy fillets, minced garlic, Dijon mustard, lemon juice, Worcestershire sauce, and egg yolk.'),
       (8, 3, 'Gradually whisk in olive oil until well combined.'),
       (8, 4, 'Season with salt and black pepper, to taste.'),
       (8, 5, 'Toss the dressing with the romaine lettuce and croutons until well coated.'),
       (8, 6, 'Sprinkle grated Parmesan cheese over the top and serve.');

-- Inserting recipe details
INSERT INTO recipes (name, category, difficulty)
VALUES ('Quasadilla', 'Beef', 2);

-- Assuming the returned id is 9 for the sake of this example
-- Inserting ingredients
INSERT INTO ingredients (recipe_id, name, amount, type)
VALUES (9, 'Flour tortillas', '4', NULL),
       (9, 'Ground beef', '1/2 lb', NULL),
       (9, 'Onion', '1/2', 'chopped'),
       (9, 'Bell pepper', '1/2', 'chopped'),
       (9, 'Chili powder', '1 tsp', NULL),
       (9, 'Cumin', '1/2 tsp', NULL),
       (9, 'Salt', 'to taste', NULL),
       (9, 'Black pepper', 'to taste', 'ground'),
       (9, 'Shredded cheese', '1 cup', NULL),
       (9, 'Sour cream', 'for serving', NULL),
       (9, 'Salsa', 'for serving', NULL);

-- Inserting instructions
INSERT INTO instructions (recipe_id, step_number, instruction)
VALUES (9, 1, 'In a skillet, cook ground beef, chopped onion, and chopped bell pepper over medium heat until beef is browned and vegetables are tender.'),
       (9, 2, 'Season with chili powder, cumin, salt, and black pepper.'),
       (9, 3, 'Place a flour tortilla in the skillet and sprinkle with shredded cheese.'),
       (9, 4, 'Spoon the beef mixture over the cheese and top with another tortilla.'),
       (9, 5, 'Cook until the bottom tortilla is golden brown, then carefully flip and cook the other side.'),
       (9, 6, 'Repeat with the remaining tortillas and beef mixture.'),
       (9, 7, 'Cut the quesadillas into wedges and serve with sour cream and salsa.');

