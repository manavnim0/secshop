import mongoose, { mongo } from "mongoose";

interface ProductAttrs {
    email: string;
    password: string
}


interface ProductDoc extends mongoose.Document {
    title: string;
    price: number;
    description?: string;
    createdAt: Date;
    UpdatedAt: Date; 
}

interface ProductModel extends mongoose.Model<ProductDoc> {
  build(attrs: ProductAttrs): ProductDoc;
}

const procductSchema = new mongoose.Schema<ProductDoc>(
    {
        title: { type: String, requrired: true},
        price: { type: Number, requrired: true},
        description: String
    },
    { timestamps: true}
);

procductSchema.statics.build = (attrs: ProductAttrs) => new Product(attrs);

const Product = mongoose.model<ProductDoc, ProductModel>("Product",procductSchema)

export { Product }