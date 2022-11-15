const express = require("express");
const auth = require("../controllers/auth.controller");
const { checkDuplicateUsernameOrEmail } = require("../middlewares");

const router = express.Router();

router.post("/signup", [checkDuplicateUsernameOrEmail], auth.signup);
router.post("/signin", auth.signin);
router.get('/findAll', auth.findAll)
router.get('/:id', auth.findOne)

module.exports = router;
