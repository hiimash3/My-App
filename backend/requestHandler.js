const { connectToDatabase } = require("./databse");

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
    console.log(products);
    const [rows] = await connection.execute(sqlCountQuery);
    const totalProductNumber = rows[0].count;
    const totalPageNumber = Math.ceil(totalProductNumber / pageSize);
    res.json({
      totalPageNumber: totalPageNumber,
      items: products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Error on product page fetching. Reason ${error}` });
  }
};
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

module.exports = { fetchProductPage, getSingleProduct };
