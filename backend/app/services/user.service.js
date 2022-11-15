const { ObjectId } = require("mongodb");

class UserService {
	constructor(client) {
		this.User = client.db().collection("users");
	}

	async create(payload) {
		const result = await this.User.findOneAndUpdate(
			payload,
			{ $set: payload },
			{ returnDocument: "after", upsert: true }
		);
		const { password, ...user } = result.value;
		return user;
	}

	async find(filter) {
		const cursor = await this.User.find({
			...filter,
			ownerId: this.ownerId,
		});
		return await cursor.toArray();
	}

    async findOne(filter) {
        return await this.User.findOne(filter)
    }

    async findById(id) {
        return await this.User.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null, 
        })
    }

    async findByName(username) {
		return await this.find({
			username: { $regex: new RegExp(username), $options: "i" },
			ownerId: this.ownerId,
		});
	}

    async findById(id) {
		return await this.User.findOne({
			_id: ObjectId.isValid(id) ? new ObjectId(id) : null,
		});
	}
}

module.exports = UserService;
