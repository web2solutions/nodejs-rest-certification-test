const Products = require('../models/products');

exports.list = async function (req, res) {
  console.log('xcxcxcxcxcxcxcxcxcxcxcxcxcxcxcxcxcxcxcxcxcxc')
  const products = await Products.findAll();
  console.log('=============================>',products)
  return res.json(products)
};

exports.post = async function (req, res) {
  //console.log(req.body)
  const record = await Products.create({
    name: req.body.name,
    price: req.body.price,
    mrp: req.body.mrp,
    stock: req.body.stock,
    isPublished: false
  })
  return res.status(201).json(record)
  res.send('NOT IMPLEMENTED: Author list');
};


exports.patch = function (req, res) {
  (async function () {
    //console.log('>>>>>>>>>>>', req.body)
    const id = req.params.id
    //console.log('>>>>>>>>>>>', req.params.id)
    const product = await Products.findByPk(id);
    
    let failed = false
    const errors = []
    if (product) {
      if (product.mrp >= product.price) {
        if (product.stock > 0) {
          console.log(product)
          product.isPublished = true
          const r = await product.save()
          // console.log('====================>', r)
          console.log(product)
          return res.status(204).send()
        }
        else {
          failed = true
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
};

exports.delete = async function (req, res) {
  res.status(405).send('NOT ALLOWED');
};
