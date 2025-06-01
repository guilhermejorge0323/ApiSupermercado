const db = require('../database/models');

class Service {
    constructor(model) {
        this.model = model;
    }

    async getAll() {
        return db[this.model].findAll();
    }

    async getOne(obj = {}) {
        return db[this.model].findOne(obj);
    }

    async create(data) {
        return db[this.model].create(data);
    }

    async update(data, obj = {}) {
        const instance = await db[this.model].findOne(obj);
        if (!instance) {
            throw new Error(`${this.model} não encontrado`);
        }

        instance.set(data);

        return instance.save();
    }

    async delete(obj = {}) {
        return db[this.model].destroy(obj);
    }
}

module.exports = Service;