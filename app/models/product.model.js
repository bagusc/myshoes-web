module.exports = (mongoose) => {
  const productSchema = mongoose.Schema(
    {
      name: {
        type: String,
        // required: true,
      },
      brand: {
        type: String,
        // required: true,
      },
      price: {
        type: Number,
        // required: true,
      },
      description: {
        type: String,
        // required: true,
      },
      stock: {
        type: Number,
        // required: true,
      },
      rating: {
        type: Number,
        // required: true,
      },
      image: {
        type: String,
        // required: false,
      },
    },
    {
      timestamps: true,
    }
  );

  const Product = mongoose.model("Product", productSchema);
  return Product;
};
