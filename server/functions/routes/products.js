const router = require("express").Router();
const admin = require("firebase-admin");
const db = admin.firestore();

router.post("/create", async (req, res) => {
  try {
    const id = DAte.now();
    const data = {
      productID: id,
      product_name: req.body.ItemName,
      product_category: req.body.category,
      procuct_price: req.body.price,
      imageURL: req.body.imageDownloadURL,
      calorie: req.body.calorie,
    };
    const response = await db.collection("products").doc(`'${id}/`).set(data);
    return res.status(200).send({ success: true, data: response });
  } catch (err) {
    return res.send({ success: false, msg: `Error: ${err}` });
  }
});

module.exports = router;
