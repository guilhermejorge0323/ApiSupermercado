class Controller {
    constructor(service) {
        this.service = service;
    }

    async getAllRegisters(req, res, next) {
        try {
            const registers = await this.service.getAll();
            res.status(200).json(registers);
        } catch (error) {
            console.log(error);
            res.status(500).json(error.message);
        }
    }

    async getOneRegister(req, res, next) {
        try {
            const where = req.params;
            const register = await this.service.getOne({
                where: {...where}
            });
            res.status(200).json(register);
        } catch (error) {
            console.log(error);
            res.status(500).json(error.message);
        }
    }

    async createRegister(req, res, next) {
        const data = req.body;
        try {
            await this.service.create(data);
            res.status(201).json({msg: 'criado com sucesso'});
        } catch (error) {
            console.log(error);
            res.status(500).json(error.message);
        }
    }

    async updateRegister(req, res, next) {
        const id = req.params.id;
        const data = req.body;

        try {
            await this.service.update(data, { where: { id } });
            res.status(200).json({ msg: 'Atualizado com sucesso' });
        } catch (error) {
            console.log(error);
            res.status(400).json({ error: error.message });
        }
    }


    async deleteRegister(req, res, next) {
        const id = req.params.id;
        try {
            await this.service.delete({
                where: {
                    id: id
                }
            });
            res.status(200).json({msg: 'Apagado com sucesso'});
        }catch(error) {
            console.log(error);
            res.status(500).json(error.message);
        }
    }
}

module.exports = Controller;