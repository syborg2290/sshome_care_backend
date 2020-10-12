const express = require("express");
const router = express.Router();
const connection = require("../database");

router.post("/addItem", async (req, res) => {
  try {
    var sql =
      "INSERT INTO item " +
      "(item_id,item_name , photo , brand ,model_no ,chassis_no ,color ,qty ,cash_price ,sale_price ,down_payment ,no_of_installments ,amount_per_installment ,guarantee_months_years ,guarantee_period ,discount ,description ,company_invoice_no ,guarantee_card_no ) " +
      "VALUES ? ";
    var values = [
      [
        0,
        req.body["itemName"],
        req.body["itemDownImageUrl"],
        req.body["brand"],
        req.body["modelNo"],
        req.body["chassisNo"],
        req.body["color"],
        req.body["qty"],
        req.body["cashPrice"],
        req.body["salePrice"],
        req.body["downPayment"],
        req.body["noOfInstallments"],
        req.body["amountPerInstallment"],
        req.body["guarantee"]["value"],
        req.body["guaranteePeriod"],
        req.body["discount"],
        req.body["description"],
        req.body["cInvoiceNo"],
        req.body["GCardNo"],
      ],
    ];
    await connection.query(sql, [values], function (err, results) {
      if (err) {
        throw err;
      }
      // connection.end();
      res.status(200).send("Success");
    });
  } catch (e) {
    console.log(e);
    res.status(500).send("Server Error");
  }
});

router.get("/getAllItems", async (req, res) => {
  try {
    var sql = "SELECT * FROM item ";
    await connection.query(sql, function (err, results) {
      if (err) {
        throw err;
      }
      
      res.header('X-XSS-Protection' , 0 );
      res.status(200).send(results);
    });
  } catch (e) {
    console.log(e);
    res.status(500).send("Server Error");
  }
});

router.post("/updateItem", async (req, res) => {
  try {
    var sql =
      "UPDATE item SET item_name = '" +
      req.body["itemName"] +
      "',photo = '" +
      req.body["itemDownImageUrl"] +
      "',brand = '" +
      req.body["brand"] +
      "',model_no = '" +
      req.body["modelNo"] +
      "',chassis_no = '" +
      req.body["chassisNo"] +
      "',color = '" +
      req.body["color"] +
      "',qty = '" +
      req.body["qty"] +
      "',cash_price = '" +
      req.body["cashPrice"] +
      "',sale_price = '" +
      req.body["salePrice"] +
      "',down_payment = '" +
      req.body["downPayment"] +
      "',no_of_installments = '" +
      req.body["noOfInstallments"] +
      "',amount_per_installment = '" +
      req.body["amountPerInstallment"] +
      "',guarantee_months_years = '" +
      req.body["guarantee"]["value"] +
      "',guarantee_period ='" +
      req.body["guaranteePeriod"] +
      "',discount ='" +
      req.body["discount"] +
      "',description ='" +
      req.body["description"] +
      "',company_invoice_no = '" +
      req.body["cInvoiceNo"] +
      "',guarantee_card_no = '" +
      req.body["GCardNo"] +
      "' WHERE item_id = '" +
      req.body["item_id"] +
      "'";

    await connection.query(sql, function (err, results) {
      if (err) {
        throw err;
      }
      // connection.end();
      res.status(200).send("Success");
    });
  } catch (e) {
    console.log(e);
    res.status(500).send("Server Error");
  }
});

router.post("/deleteItem", async (req, res) => {
  try {
    var sql = `DELETE FROM item` + ` WHERE item_id = ${req.body["item_id"]}`;
    await connection.query(sql, function (err, results) {
      if (err) {
        throw err;
      }

      res.status(200).send("Success");
    });
  } catch (e) {
    console.log(e);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
