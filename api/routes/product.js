const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const Product = require("../models/product.js");

router.get("/", (req, res, next) => {
  Product.find()
  .select('name price _id')
  .exec()
  .then(docs => {
    const response = {
      count: docs.length,
      products: docs.map(doc => {
        return {
          name: doc.name,
          price: doc.price,
          _id: doc._id,
          request: {
            type: "GET",
            url: "http://localhost:3000/products/" + doc._id
          }
        };
      })
    }
    res.status(200).json(response);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
        error: err,
    });
  });
});

router.post("/", (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
  });
  product
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Product created succesfully",
        createdProduct: {
          name: result.name,
          price: result.price,
          _id: result._id,
          request: {
            type: "POST",
            url: "http://localhost:3000/products/" + result._id
          }
        }
      });
    })
    .catch((err) => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    });
});

router.get("/:productId", (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id)
    .select('name price _id')
    .exec()
    .then((doc) => {
      console.log(doc);
      if (doc) {
        res.status(200).json({
          product: doc,
          request: {
            type: "GET",
            url: "http://localhost:3000/products/" + doc._id
          }
        });
      } else {
        res.status(404).json({ message: "Not found" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
}),
  router.put("/:productId", (req, res, next) => {
    const id = req.params.productId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Product.findByIdAndUpdate({ _id: id}, { $set: updateOps})
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'Product updated succesfully',
        request: {
          type: "PUT",
          url: "http://localhost:3000/products/" + id
        }
      });
    })
    .catch(err => { 
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
  });

router.delete("/:productId", (req, res, next) => {
  const id = req.params.productId;
  Product.findByIdAndDelete({ _id: id })
  .exec()
  .then(result => {
    res.status(200).json({
      message: 'Product deleted',
      request: {
        type: 'POST',
        url: 'http://localhost:3000/products',
        body: { name: 'String', price: 'String' }
      }
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
        error: err
    });
  });
});

module.exports = router;
