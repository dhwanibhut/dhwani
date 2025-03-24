-- User table
CREATE TABLE user (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Recipe table
CREATE TABLE recipe (
  recipe_id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  prep_time INT,
  servings INT
);

-- Ingredients table
CREATE TABLE ingredients (
  ingredient_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  category VARCHAR(50)
);

-- Recipe Ingredients table
CREATE TABLE recipe_ingredients (
  recipe_id INT,
  ingredient_id INT,
  quantity VARCHAR(50),
  unit VARCHAR(50),
  PRIMARY KEY (recipe_id, ingredient_id),
  FOREIGN KEY (recipe_id) REFERENCES recipe(recipe_id) ON DELETE CASCADE,
  FOREIGN KEY (ingredient_id) REFERENCES ingredients(ingredient_id) ON DELETE CASCADE
);

-- Nutrients table
CREATE TABLE nutrients (
  nutrient_id INT AUTO_INCREMENT PRIMARY KEY,
  recipe_id INT,
  total_cal INT,
  FOREIGN KEY (recipe_id) REFERENCES recipe(recipe_id) ON DELETE CASCADE
);

-- User Ingredient table
CREATE TABLE user_ingredient (
  ui_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  ingredient_id INT,
  FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE,
  FOREIGN KEY (ingredient_id) REFERENCES ingredients(ingredient_id) ON DELETE CASCADE
);

-- Recipe Categories table
CREATE TABLE recipe_categories (
  recipe_id INT,
  name VARCHAR(50),
  description TEXT,
  PRIMARY KEY (recipe_id, name),
  FOREIGN KEY (recipe_id) REFERENCES recipe(recipe_id) ON DELETE CASCADE
);

-- Cooking Step table
CREATE TABLE cooking_step (
  step_id INT AUTO_INCREMENT PRIMARY KEY,
  recipe_id INT,
  instruction TEXT,
  step_no INT,
  FOREIGN KEY (recipe_id) REFERENCES recipe(recipe_id) ON DELETE CASCADE
);

-- Saved Recipe table
CREATE TABLE saved_recipe (
  sr_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  recipe_id INT,
  saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE,
  FOREIGN KEY (recipe_id) REFERENCES recipe(recipe_id) ON DELETE CASCADE
);

-- Rating table
CREATE TABLE rating (
  user_id INT,
  recipe_id INT,
  rating INT CHECK (rating BETWEEN 1 AND 5),
  review TEXT,
  PRIMARY KEY (user_id, recipe_id),
  FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE,
  FOREIGN KEY (recipe_id) REFERENCES recipe(recipe_id) ON DELETE CASCADE
);

-- Insert sample data for ingredients
INSERT INTO ingredients (name, category) VALUES
('Chicken', 'Meat'),
('Beef', 'Meat'),
('Salmon', 'Seafood'),
('Pasta', 'Grains'),
('Rice', 'Grains'),
('Broccoli', 'Vegetables'),
('Carrots', 'Vegetables'),
('Bell Peppers', 'Vegetables'),
('Tomatoes', 'Vegetables'),
('Onions', 'Vegetables'),
('Garlic', 'Vegetables'),
('Milk', 'Dairy'),
('Cheese', 'Dairy'),
('Eggs', 'Dairy'),
('Olive Oil', 'Oils'),
('Soy Sauce', 'Condiments'),
('Flour', 'Baking'),
('Sugar', 'Baking'),
('Apples', 'Fruits'),
('Bananas', 'Fruits');

-- Insert sample recipes
INSERT INTO recipe (title, description, prep_time, servings) VALUES
('Pasta Primavera', 'A light and fresh pasta dish with seasonal vegetables', 25, 4),
('Chicken Stir Fry', 'Quick and easy chicken stir fry with vegetables', 30, 4),
('Beef Tacos', 'Delicious beef tacos with all the fixings', 20, 4),
('Vegetable Curry', 'Flavorful vegetable curry with rice', 40, 6),
('Salmon with Roasted Vegetables', 'Healthy salmon with roasted vegetables', 35, 2);

-- Insert sample recipe ingredients
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, unit) VALUES
(1, 4, '8', 'oz'),
(1, 6, '1', 'cup'),
(1, 8, '1', 'cup'),
(1, 9, '1', 'cup'),
(1, 15, '2', 'tbsp'),
(1, 11, '2', 'cloves'),
(1, 13, '1/4', 'cup'),
(2, 1, '1', 'lb'),
(2, 6, '2', 'cups'),
(2, 7, '1', 'cup'),
(2, 8, '1', 'cup'),
(2, 10, '1', 'medium'),
(2, 11, '3', 'cloves'),
(2, 16, '3', 'tbsp'),
(2, 15, '2', 'tbsp'),
(2, 5, '2', 'cups');

-- Insert sample cooking steps
INSERT INTO cooking_step (recipe_id, instruction, step_no) VALUES
(1, 'Bring a large pot of salted water to a boil. Add pasta and cook according to package directions.', 1),
(1, 'Meanwhile, heat olive oil in a large skillet over medium heat. Add garlic and cook until fragrant, about 30 seconds.', 2),
(1, 'Add broccoli and bell peppers to the skillet. Cook for 3-4 minutes until vegetables begin to soften.', 3),
(1, 'Add cherry tomatoes and cook for another 2 minutes.', 4),
(1, 'Drain pasta, reserving 1/2 cup of pasta water.', 5),
(1, 'Add pasta to the skillet with vegetables. Add reserved pasta water as needed to create a light sauce.', 6),
(1, 'Sprinkle with Parmesan cheese and serve immediately.', 7),
(2, 'Slice chicken into thin strips.', 1),
(2, 'Heat oil in a wok or large skillet over high heat.', 2),
(2, 'Add chicken and stir-fry until no longer pink, about 5-6 minutes.', 3),
(2, 'Remove chicken and set aside.', 4),
(2, 'Add more oil if needed, then add onions, garlic, and vegetables. Stir-fry for 4-5 minutes.', 5),
(2, 'Return chicken to the wok. Add soy sauce and stir to combine.', 6),
(2, 'Serve hot over cooked rice.', 7);

-- Insert sample nutrients
INSERT INTO nutrients (recipe_id, total_cal) VALUES
(1, 320),
(2, 450),
(3, 380),
(4, 300),
(5, 420);

-- Insert sample recipe categories
INSERT INTO recipe_categories (recipe_id, name, description) VALUES
(1, 'Italian', 'Italian cuisine'),
(1, 'Vegetarian', 'Vegetarian dishes'),
(2, 'Asian', 'Asian cuisine'),
(2, 'Quick Meals', 'Meals ready in under 30 minutes'),
(3, 'Mexican', 'Mexican cuisine'),
(4, 'Indian', 'Indian cuisine'),
(4, 'Vegetarian', 'Vegetarian dishes'),
(5, 'Seafood', 'Seafood dishes'),
(5, 'Healthy', 'Healthy meals');

