import users from "../models/UserModel.js";

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
  try {
    await users.create(req.body);
    res.status(201).json({ msg: "User Created Successfully" });
  } catch (err) {
    console.log(err.message);
  }
};

export const updateUsers = async (req, res) => {
  try {
    await users.update(req.body, {
      where: { id: req.params.id },
    });
    res.status(200).json({ msg: "Update User Successfully" });
  } catch (err) {
    console.log(err.message);
  }
};

export const deleteUsers = async (req, res) => {
  try {
    await users.destroy({
      where: { id: req.params.id },
    });
    res.status(200).json({ msg: "Delete User Successfully" });
  } catch (error) {
    console.log(err.message);
  }
};
