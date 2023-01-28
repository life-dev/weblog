const User = require("../models/User");

exports.login = (req, res) => {
  res.render("login", { pageTitle: " Login ", path: "/login" });
};

exports.register = async (req, res) => {
  res.render("register", { pageTitle: " Register ", path: "/register" });
};

exports.createUser = async (req, res) => {
  const errors = [];
  try {
    await User.userValidation(req.body);
    const { fullname, password, email } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      errors.push({
        message: "This email is already associated with an account.",
      });
      return res.render("register", {
        pageTitle: "Register",
        path: "/register",
        errors,
      });
    }
    await User.create(req.body);
    res.redirect("/users/login");
  } catch (error) {
    error.inner.forEach((e) => {
      errors.push({
        name: e.path,
        message: e.message,
      });
    });
  }
};