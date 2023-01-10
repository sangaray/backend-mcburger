const { Favorites } = require("../db");

const getAllUserFavs = async (userId) => {
  try {
    const favs = await Favorites.findAll({ where: { userId } });

    return favs;
  } catch (error) {
    return error.message;
  }
};

const addToFavs = async (userId, productId) => {
  try {
    const newFav = await Favorites.create({ userId, productId });
    return newFav;
  } catch (error) {
    return error.message;
  }
};

const deleteFromFavs = async (userId, productId) => {
  try {
    const deletedFav = await Favorites.destroy({
      where: { userId, productId },
    });
    return deletedFav;
  } catch (error) {
    return error.message;
  }
};

module.exports = { getAllUserFavs, addToFavs, deleteFromFavs };
