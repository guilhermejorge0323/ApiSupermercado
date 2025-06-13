const db = require('../database/models');

const roles = (listRoles) => {
    return async (req,res,next) => {
        const { userId } = req;

        const user = await db.User.findOne({
            where: {
                id: userId
            },
            include: [
                {
                    model: db.Role,
                    as: 'user_role',
                    attributes: ['id','name']
                }
            ]
        });

        if(!user) {
            return res.status(404).json({ message: 'Usuario nao encontrado' });
        }

        const registeredRoles = user.user_role.map(role => role.name).some(role => listRoles.includes(role));

        if(!registeredRoles) {
            return res.json({ message: 'Sem permissao para acessar essa rota' });
        }

        return next();
    };
};

module.exports = roles;