const db = require('../database/models');

const permissions = (listPermissions) => {
    return async (req,res,next) => {
        const { userId } = req;

        const user = await db.User.findOne({
            where: {
                id: userId
            },
            include: {
                model: db.Permission,
                as: 'user_permission',
                attributes: ['id','name']
            }
        });

        if(!user) {
            return res.status(404).send({ message: 'Usuario nao encontrado' });
        }

        const registeredPermissions = user.user_permission.map(permission => permission.name).some(permission => listPermissions.includes(permission));

        if(!registeredPermissions) {
            return res.status(500).json({ message: 'Sem permissao para acessar a rota' });
        }

        return next();
    };
};

module.exports = permissions;