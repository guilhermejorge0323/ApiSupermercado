const db = require('../database/models');
const { Op } = require('sequelize');

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
        const existig = await db[this.model].findOne({
            where: {
                name: data.name,
            }
        });

        if(existig) {
            throw new Error(`Ja existe um ${this.model} com o nome ${data.name}`);
        }
        return db[this.model].create(data);
    }

    async update(data, obj = {}) {
        const instance = await db[this.model].findOne(obj);
        if (!instance) {
            throw new Error(`${this.model} não encontrado`);
        }

        if(data.name) {
            const existing = await db[this.model].findOne({
                where: {
                    name: data.name,
                    id: { [Op.ne]: instance.id }
                }
            });

            if (existing) {
                throw new Error(`Ja existe um ${this.model} com esse nome`);
            }
        }

        instance.set(data);

        return instance.save();
    }

    async delete(obj = {}) {
        return db[this.model].destroy(obj);
    }
}

module.exports = Service;