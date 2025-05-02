import Connect from "@/lib/mongoose";
import Product from "@/models/product";

export default async function handler (req,res) {
    await Connect()
    const ids = req.body.ids
    res.json(await Product.find({_id:ids}))
}



