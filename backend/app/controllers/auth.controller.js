const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config");
const ApiError = require("../api-error");
const MongoDB = require("../utils/mongodb.util");
const User = require("../services/user.service");

exports.signup = async (req, res, next) => {
	if (!req.body?.password) {
		throw new ApiError(400, "Password is required");
	}

	try {
		const password = await bcrypt.hash(req.body.password, 8);
		const userService = new User(MongoDB.client);
		await userService.create({
			username: req.body.username,
			email: req.body.email,
			password,
		});

		return res.send({ message: "User was successfully registered" });
	} catch (error) {
		let statusCode = 400;
		let { username = {}, email = {}, password = {} } = error.errors;

		const errorMessage =
			username.message ||
			email.message ||
			password.message ||
			error.message;
		if (!errorMessage) {
			statusCode = 500;
		}

		throw new ApiError(statusCode, errorMessage);
	}
};

exports.signin = async (req, res, next) => {
	try {
		const userService = new User(MongoDB.client);
		const user = await userService.findOne({
			username: req.body.username,
		});

		if (!user) {
			res.status(401).send({statusCode: 401, message: "text or userId can be not empty" });
			return;

		}

		const passwordIsValid = await bcrypt.compare(
			req.body.password,
			user.password
		);

		if (!passwordIsValid) {
			res.status(401).send({statusCode: 401, message: "text or userId can be not empty" });
			return;
		}

		// Don't need to persist token in the database
		// as the jwt tokens are self-validated
		const token = jwt.sign({ id: user._id }, config.jwt.secret, {
			expiresIn: 86400, // 24 hours
		});

		return res.status(200).send({
			_id: user._id,
			username: user.username,
			email: user.email,
			accessToken: token,
		});
	} catch (error) {
		console.log(error);
		throw new ApiError(500);
	}
};

exports.findOne = async (req, res, next) => {
	try {
		const userService = new User(MongoDB.client);
		const document = await userService.findById(req.params.id);
		if (!document) {
			return next(new ApiError(404, "Account not found"));
		}
		return res.send(document);
	} catch (error) {
		console.log(error);
		return next(
			new ApiError(
				500,
				`Error retrieving contact with id=${req.params.id}`
			)
		);
	}
};

exports.findAll = async (req, res, next) => {
	let documents = [];

	try {
		const userService = new User(MongoDB.client);
		const { username } = req.query;
		if (username) {
			documents = await userService.findByName(username);
		} else {
			documents = await userService.find({});
		}
	} catch (error) {
		console.log(error);
		return next(
			new ApiError(500, "Có lỗi xảy ra khi truy xuất toàn bộ tài khoản!")
		);
	}

	return res.send(documents);
};
