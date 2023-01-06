const { Comment, User, Products } = require("../db.js");

const getComment = async (req, res) => {
  let commentTable = await Comment.findAll();
  res.send(commentTable);
};

const postComment = async (req, res) => {
  try {
    const { comment, rating, idUser, idProduct } = req.body;
    if (!comment || !rating || !idUser || !idProduct) {
      return res.status(422).send("Missing data");
    }

    const newComment = await Comment.create({
      comment,
      rating,
    });

    const searchUser = await User.findOne({
      where: { id: idUser },
    });

    const searchProduct = await Products.findOne({
      where: { id: idProduct },
      include: {
        model: Comment,
        attributes: ["id", "rating", "comment"],
        through: {
          attributes: [],
        },
        include: {
          model: User,
          attributes: ["id", "name"],
          through: {
            attributes: [],
          },
        },
      },
    });

    await newComment.addUser(searchUser);
    await searchProduct.addComment(newComment);

    let newRating = 0;
    let newComments = [...searchProduct.comments, newComment];

    for (const c of newComments) {
      newRating += c.rating;
    }

    searchProduct.rating = (newRating / newComments.length).toFixed(1);

    await searchProduct.save();

    await searchProduct.save();

    res.status(201);
  } catch (error) {
    res.sendStatus(404);
  }
};

const putComment = async (req, res) => {
  let { idUser, idProduct } = req.body;

  let product = await Products.findOne({
    where: { id: idProduct },
    include: {
      model: Comment,
      attributes: ["id", "rating", "comment"],
      through: {
        attributes: [],
      },
      include: {
        model: User,
        attributes: ["id", "name"],
        through: {
          attributes: [],
        },
      },
    },
  });

  let selected = product.comments.filter(
    (c) => c.users[0].id === Number(idUser)
  );

  selected = selected[0];
  if (selected) {
    let { comment, rating } = req.body;
    let data = { comment, rating };

    let keys = Object.keys(data);

    keys.forEach((k) => {
      selected[k] = data[k];
    });

    await selected.save();
    await product.save();

    product = await Products.findOne({
      where: { id: idProduct },
      include: {
        model: Comment,
        attributes: ["id", "rating", "comment"],
        through: {
          attributes: [],
        },
        include: {
          model: User,
          attributes: ["id", "name"],
          through: {
            attributes: [],
          },
        },
      },
    });

    let newRating = 0;
    for (const c of product.comments) {
      newRating += c.rating;
    }

    product.rating = (newRating / product.comments.length).toFixed(1);

    await product.save();

    res.send(product.comments);
  } else {
    res.status(404);
  }
};

const deleteComment = async (req, res) => {
  const { idProduct, idUser } = req.params;
  try {
    let product = await Products.findOne({
      where: { id: idProduct },
      include: {
        model: Comment,
        attributes: ["id", "rating", "comment"],
        through: {
          attributes: [],
        },
        include: {
          model: User,
          attributes: ["id", "name"],
          through: {
            attributes: [],
          },
        },
      },
    });

    let newComm = product.comments.filter(
      (c) => c.users[0].id !== Number(idUser)
    );
    let deleted = product.comments.filter(
      (c) => c.users[0].id === Number(idUser)
    );
    Comment.destroy({ where: { id: deleted[0].id } });
    product.removeComments(deleted);

    let newRating = 0;
    for (const c of newComm) {
      newRating += c.rating;
    }

    product.rating = (newRating / newComm.length).toFixed(1);

    await product.save();

    return res.send(newComm);
  } catch (err) {
    return res.status(500).send(`Comment could not be deleted (${err})`);
  }
};

module.exports = {
  getComment,
  postComment,
  putComment,
  deleteComment,
};
