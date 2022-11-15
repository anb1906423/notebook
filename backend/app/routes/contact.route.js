const express = require("express");
const { verifyToken } = require("../middlewares");
const Contact = require("../controllers/contact.controller");

const router = express.Router();

router.use(verifyToken);

router
	.route("/")
	.get(Contact.findAll)
	.post(Contact.create)
	.delete(Contact.deleteAll);

router.route("/flag").get(Contact.findAllFavorite);

router
	.route("/:id")
	.get(Contact.findOne)
	.put(Contact.update)
	.delete(Contact.delete);

module.exports = router;
