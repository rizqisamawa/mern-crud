import users from "../models/UserModel.js";
import path from "path";
import fs from "fs";

export const getUsers = async (req, res) => {
  try {
    const response = await users.findAll(); // get all data users
    res.status(200).json(response);
  } catch (err) {
    console.log(err.message);
  }
};

export const getUsersById = async (req, res) => {
  try {
    const response = await users.findOne({
      // find id data users
      where: {
        id: req.params.id,
      },
    }); // get all data users
    res.status(200).json(response);
  } catch (err) {
    console.log(err.message);
  }
};

export const createUsers = async (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "No File Uploaded" });
  } else {
    const name = req.body.name;
    const email = req.body.email;
    const gender = req.body.gender;
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = [".png", ".jpg", ",jpeg"];

    if (!allowedType.includes(ext.toLowerCase())) {
      return res.status(422).json({ msg: "Invalid Image" });
    }

    if (fileSize > 5000000) {
      return res.status(422).json({ msg: "Image Must Be Less than 5MB" });
    }

    file.mv(`./public/images/${fileName}`, async (err) => {
      if (err) {
        return res.status(500).json({ msg: err.message });
      }
      try {
        await users.create({
          name: name,
          email: email,
          gender: gender,
          image: fileName,
          url: url,
        });
        res.status(201).json({ msg: "User Created Successfully" });
      } catch (err) {
        console.log(err.message);
      }
    });
  }
};

export const updateUsers = async (req, res) => {
  const user = await users.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!user) return res.status(404).json({ msg: "Data Not Found" });

  let fileName = "";

  if (req.files === null) {
    fileName = user.image;
  } else {
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    fileName = file.md5 + ext;
    const allowedType = [".png", ".jpg", ",jpeg"];

    if (!allowedType.includes(ext.toLowerCase()))
      return res.status(422).json({ msg: "Invalid Image" });

    if (fileSize > 5000000)
      return res.status(422).json({ msg: "Image Must Be Less than 5MB" });

    const filepath = `./public/images/${user.image}`; //select id image
    fs.unlinkSync(filepath); // delete file in path

    file.mv(`./public/images/${fileName}`, (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });
  }

  const name = req.body.name;
  const email = req.body.email;
  const gender = req.body.gender;
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;

  try {
    await users.update(
      {
        name: name,
        email: email,
        gender: gender,
        image: fileName,
        url: url,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({ msg: "Update Users Successfully" });
  } catch (err) {
    console.log(err.message);
  }
};

export const deleteUsers = async (req, res) => {
  const user = await users.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!user) {
    return res.status(404).json({ msg: "Data Not Found" });
  } else {
    try {
      const filepath = `./public/images/${user.image}`; //select id image
      fs.unlinkSync(filepath); // delete file in path
      await users.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json({ msg: "Delete User Successfully" });
    } catch (err) {
      console.log(err.message);
    }
  }
};
