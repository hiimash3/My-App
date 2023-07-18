const { connectToDatabase } = require("./databse");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Getting products for the home page with the option of categories
const fetchProductPage = async (req, res) => {
  try {
    const connection = await connectToDatabase();
    const page = parseInt(req.query.page);
    const pageSize = parseInt(req.query.pageSize);
    const category = req.query.category;
    const offset = (page - 1) * pageSize;

    let sqlQueryProducts = `SELECT SQL_CALC_FOUND_ROWS * FROM products`;
    let sqlCountQuery = "SELECT FOUND_ROWS() AS count";
    let params = [];

    if (category !== "all") {
      sqlQueryProducts += ` WHERE type = ?`;
      params = [category];
    }

    sqlQueryProducts += ` LIMIT ${offset},${pageSize}`;

    const [products] = await connection.execute(sqlQueryProducts, params);
    const [rows] = await connection.execute(sqlCountQuery);
    const totalProductNumber = rows[0].count;
    const totalPageNumber = Math.ceil(totalProductNumber / pageSize);
    res.json({
      totalPageNumber: totalPageNumber,
      items: products,
    });
  } catch (error) {
    res.status(500).json({ message: `Error on product page fetching. Reason ${error}` });
  }
};

//Getting a single product for the item page
const getSingleProduct = async (req, res) => {
  try {
    const connection = await connectToDatabase();
    const productId = parseInt(req.query.productId);
    const sqlQuerrySProduct = "SELECT * FROM products WHERE productid=? ";
    const [product] = await connection.execute(sqlQuerrySProduct, [productId]);
    res.json({
      items: product,
    });
  } catch (error) {
    res.status(500).json({ message: `Error on single product page fetching. Reason ${error}` });
  }
};

//Check if username is available
const getUsers = async (req, res) => {
  try {
    const username = req.query.username;
    const connection = await connectToDatabase();
    const sqlGetUsers = `SELECT * FROM users WHERE username=?`;
    const [users] = await connection.execute(sqlGetUsers, [username]);
    res.json({ users });
  } catch (error) {
    res.status(500).json({ error: `Failed to retrieve users: ${error}` });
  }
};

//Inputing users into the users table
const registerNewUser = async (req, resp) => {
  try {
    const connection = await connectToDatabase();
    const { username, name, surname, password, email } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const sqlInsert = "INSERT INTO users (username,name,surname,password,email) VALUES (?,?,?,?,?)";
    await connection.execute(sqlInsert, [username, name, surname, hashedPassword, email]);

    resp.status(201).json({ message: "User succesfully added" });
  } catch (error) {
    resp.status(500).json({
      error: `There was an issue interacting with the DB ${error}`,
    });
  }
};

//Logging in
const logIn = async (req, res) => {
  try {
    const connection = await connectToDatabase();
    const { username, password } = req.body;
    const sqlSelectUser = "SELECT password, admin FROM users WHERE username = ?";
    const [results] = await connection.execute(sqlSelectUser, [username]);
    const user = results[0];

    if (!user) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const hashedPassword = user.password;
    const passwordMatch = await bcrypt.compare(password, hashedPassword);

    if (passwordMatch) {
      // Passwords match, user is authenticated
      const token = jwt.sign({ username }, "your-secret-key");
      const isAdmin = user.admin || false; // Check if the user is an admin
      res.status(200).json({ token, isAdmin });
    } else {
      // Passwords do not match, authentication failed
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: `Error at logIn: ${error}` });
  }
};

//Getting username on home page
const getUsernameFromToken = (token) => {
  try {
    const decodedToken = jwt.verify(token, "your-secret-key");
    return decodedToken.username;
  } catch (error) {
    throw new Error("Invalid token");
  }
};

const getUserByUsername = async (username) => {
  try {
    const connection = await connectToDatabase();
    const sqlSelectUser = "SELECT * FROM users WHERE username = ?";
    const [results] = await connection.execute(sqlSelectUser, [username]);
    const user = results[0];
    return user;
  } catch (error) {
    throw new Error(`Failed to retrieve user: ${error}`);
  }
};

const getUsername = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  try {
    const username = getUsernameFromToken(token);
    const user = await getUserByUsername(username);

    res.json(user);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

// Update user data
const updateUser = async (req, res) => {
  try {
    const { oldUsername, username, name, surname, email, phone, post, homeAddress, password, newPassword } = req.body;

    // Check if the password is correct before proceeding with the update
    const user = await getUserByUsername(oldUsername);
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (password && !passwordMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // Perform the update operation in your database
    // Use the username to identify the user and update their data
    // Example code using SQL query:
    const connection = await connectToDatabase();
    let sqlUpdateUser = `UPDATE users SET `;
    let updateValues = [];

    if (username) {
      sqlUpdateUser += `username=?, `;
      updateValues = [...updateValues, username];
    }

    if (name) {
      sqlUpdateUser += `name=?, `;
      updateValues = [...updateValues, name];
    }

    if (surname) {
      sqlUpdateUser += `surname=?, `;
      updateValues = [...updateValues, surname];
    }

    if (email) {
      sqlUpdateUser += `email=?, `;
      updateValues = [...updateValues, email];
    }

    if (phone) {
      sqlUpdateUser += `phone=?, `;
      updateValues = [...updateValues, phone];
    }

    if (post) {
      sqlUpdateUser += `post=?, `;
      updateValues = [...updateValues, post];
    }

    if (homeAddress) {
      sqlUpdateUser += `address=?, `;
      updateValues = [...updateValues, homeAddress];
    }

    if (newPassword) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      sqlUpdateUser += `password=?, `;
      updateValues = [...updateValues, hashedPassword];
    }

    // Remove the trailing comma and space from the query string
    sqlUpdateUser = sqlUpdateUser.slice(0, -2);

    sqlUpdateUser += ` WHERE username=?`;
    updateValues = [...updateValues, oldUsername];

    await connection.execute(sqlUpdateUser, updateValues);

    const newToken = jwt.sign({ username }, "your-secret-key");

    res.json({ message: "User data updated successfully", token: newToken });
  } catch (error) {
    res.status(500).json({ error: `Failed to update user data: ${error}` });
  }
};
//Update product as admin
const updateProduct = async (req, res) => {
  try {
    const connection = await connectToDatabase();
    const { productId, productName, description, price, productImage, type } = req.body;

    const sqlUpdateProduct = `UPDATE products SET productname=?, description=?, price=?, productimg=?, type=? WHERE productid=?`;
    await connection.execute(sqlUpdateProduct, [productName, description, price, productImage, type, productId]);

    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    res.status(500).json({ error: `Failed to update product: ${error}` });
  }
};
//Order
const createOrder = async (req, res) => {
  try {
    const connection = await connectToDatabase();
    const { productId, userFullName, address, postalCode } = req.body;

    const sqlInsertOrder = "INSERT INTO orders (productid, userfullname, address, postalcode) VALUES (?, ?, ?, ?)";
    await connection.execute(sqlInsertOrder, [productId, userFullName, address, postalCode]);

    res.status(200).json({ message: "Order successfull." });
  } catch (error) {
    res.status(500).json({ error: `Failed to add order: ${error}` });
  }
};

module.exports = { registerNewUser, fetchProductPage, getSingleProduct, getUsers, logIn, getUsername, updateUser, updateProduct, createOrder };
