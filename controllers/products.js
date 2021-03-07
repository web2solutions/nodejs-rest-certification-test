const Products = require('../models/products')

exports.list = async function (req, res) {
  const products = await Products.findAll()
  return res.json(products)
}

exports.post = async function (req, res) {
  const record = await Products.create({
    name: req.body.name,
    price: req.body.price,
    mrp: req.body.mrp,
    stock: req.body.stock,
    isPublished: false
  })
  return res.status(201).json(record)
}


exports.patch = function (req, res) {
  ;(async function () {
    const id = req.params.id
    const product = await Products.findByPk(id)
    if (product) {
      if (product.mrp >= product.price) {
        if (product.stock > 0) {
          product.isPublished = true
          const r = await product.save()
          return res.status(204).send()
        }
        else {
          return res.status(422).json(['Stock count is 0'])
        }
      }
      else {
        if (! (product.stock > 0)) {
          return res.status(422).json(['MRP should be less than equal to the Price', 'Stock count is 0'])
        }
        return res.status(422).json(['MRP should be less than equal to the Price'])
      }
    }
    return res.status(204)
  })()
}

exports.delete = async function (req, res) {
  res.status(405).send('NOT ALLOWED')
}
