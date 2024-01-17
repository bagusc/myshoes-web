module.exports = (mongoose) => {
  //desain dari field / schema
  const schema = mongoose.Schema(
    {
      title: String,
      description: String,
      published: Boolean,
    },
    {
      timestamps: true,
    }
  );

  //mengubah _id menjadi id
  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Post = mongoose.model("posts", schema);
  return Post;
};
