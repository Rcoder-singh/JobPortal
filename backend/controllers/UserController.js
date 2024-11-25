const registerUser = async (req, res) => {
  res.send("register function is running");
};

const loginUser = async (req, res) => {
  res.send("login function is running");
};

const updateUser = async (req, res) => {
  res.send("update function is running");
};

const deleteUser = async (req, res) => {
  res.send("delete function is running");
};

module.exports = {
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
};
