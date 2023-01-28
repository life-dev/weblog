const { Router } = require("express");
const Yup = require("yup");
const router = new Router();



const schema = Yup.object().shape({
  fullname: Yup.string().required().min(4).max(255),
  email: Yup.string().email().required(),
  password: Yup.string().min(4).max(255).required(),
  confirmPassword: Yup.string()
    .required("Confirm password")
    .oneOf([Yup.ref("password"), null]),
});

// @desc Login page
// @route  GET /users/login

router.get("/login", (req, res) => {
  res.render("login", { pageTitle: " Login ", path: "/login" });
});

// @desc register page
// @route  GET /users/register

router.get("/register", (req, res) => {
  res.render("register", { pageTitle: " Register ", path: "/register" });
});

router.post("/register", (req, res) => {
  schema
    .validate(req.body)
    .then((result) => {
      console.log(result);
      res.redirect("/users/login");
    })
    .catch((err) => {
      console.log(err);
      res.render("register", {
        pageTitle: "Register",
        path: "/register",
        errors: err.errors,
      });
    });
});

module.exports = router;
