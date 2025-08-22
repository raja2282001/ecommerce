const ProductSchema = require("../Schema/ProductSchema");

const createproduct = (req, res) => {
    const { name, price, description } = req.body;
    const img = req.file ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}` : null;

    const product = new ProductSchema({
        name,
        price,
        description,
        img, // Use 'img' to match your schema
    });

    product.save((error, data) => {
        if (error) {
            res.status(400).json({ message: "Error adding product", error });
        } else {
            res.status(201).json({ message: "Product added", data });
        }
    });
};

const listallproduct=(req,res)=>{
    ProductSchema.find((error,data)=>{
        if(error){
            res.status(404).json({
                message:"error for listing products"
            })
        }else{
            if(data == undefined || data == null || data.length == 0){
                res.status(404).json({
                    message:"no products found"
                })
            }else{
                res.status(200).json({
                    message:"products found",
                    data
                })
            }
        }
    })
}

const productdetail=(req,res)=>{
    const id = req.params.id;

    ProductSchema.findById(id, (error, data) => {
        if (error) {
            res.status(404).json({
                message:"error for getting product details"
            })
        } else {
            if (data == undefined || data == null) {
                res.status(404).json({
                    message:"product not found"
                })
            } else {
                res.status(200).json({
                    message:"product found",
                    data
                })
            }
        }
    })
}

module.exports = {
    createproduct,
    listallproduct,
    productdetail
}