const path = require('path');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const fs = require('fs');

exports.uploadProductImageLocal = async (req, res) => {
  if (!req.files) {
    throw new CustomError.BadRequestError('No File Uploaded');
  }
  //image is the name of the input field in the form
  const productImage = req.files.image;
  if (!productImage.mimetype.startsWith('image')) {
    throw new CustomError.BadRequestError('Please Upload Image');
  }
  const maxSize = 1024 * 1024;
  //mb*1024*1024 like for 5 mb 5*1024*1024
  if (productImage.size > maxSize) {
    throw new CustomError.BadRequestError('Please upload image smaller 1MB');
  }
  //uploaded image will be saved in the uploads folder with the name of the image
  const imagePath = path.join(
    __dirname,
    '../public/uploads/' + `${productImage.name}`
  );
  await productImage.mv(imagePath);
  return res
    .status(StatusCodes.OK)
    .json({ src: `/uploads/${productImage.name}`  });
};
