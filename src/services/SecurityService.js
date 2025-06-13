const db = require('../database/models');
const sequelize = require('sequelize');

class SecurityService  {

    async getPermissionsRole(roleId) {
        const role = await db.Role.findOne({
            where: {
                id: roleId
            },
            include: [
                {
                    model: db.Permission,
                    as: 'role_permission',
                    attributes: ['id','name','desc']
                }
            ]
        });

        if (!role) {
            throw new Error('Role nao encontrada');
        }

        return role;
    }

    async registerAcl(data) {
        const user = await db.User.findAll({
            where: {
                id: data.userId
            },
            include: [
                {
                    model: db.Role,
                    as: 'user_role',
                    attributes: ['id','name','desc']
                },
                {
                    model: db.Permission,
                    as: 'user_permission',
                    attributes: ['id','name','desc']
                }
            ]
        });

        if (!user) {
            throw new Error('Usuario inexistente');
        }

        const rolesRegistered = await db.Role.findAll({
            where: { id: { [sequelize.Op.in]: data.roles }}
        });

        const permissionRegistered = await db.Permission.findAll({
            where: { id: { [sequelize.Op.in]: data.permissions }}
        });


        await user.setUser_role(rolesRegistered);
        await user.setUser_permission(permissionRegistered);

        const newUser = await  db.User.findOne({
            where: {
                id: data.userId
            },
            include: [
                {
                    model: db.Role,
                    as: 'user_role',
                    attributes: ['id','name','desc']
                },
                {
                    model: db.Permission,
                    as: 'user_permission',
                    attributes: ['id','name','desc']
                }
            ]
        });

        return newUser;
    }

    async registerPermissionRole(data) {
        const role = await db.Role.findOne({
            where: { id: data.role},
            include: [
                {
                    model: db.Permission,
                    as: 'role_permission',
                    attributes: ['id','name','desc']
                }
            ]
        });

        if (!role) {
            throw new Error('Role nao existe');
        }

        const permissionsToAdd = await db.Permission.findAll({
            where: { id: { [sequelize.Op.in]: data.permissions }}
        });

        const currentPermissionsIds = role.role_permission.map(p => p.id);
        const newPermissionsFiltered = permissionsToAdd.filter( (perm) => !currentPermissionsIds.includes(perm.id));

        if(newPermissionsFiltered.length > 0) {
            await role.addRole_permission(newPermissionsFiltered);
        }

        const newRole = await db.Role.findOne({
            where: { id: data.role},
            include: [
                {
                    model: db.Permission,
                    as: 'role_permission',
                    attributes: ['id','name','desc']
                }
            ]
        });

        return newRole;
    }

    async removePermissionRole(roleId,data) {
        const role = await db.Role.findOne({
            where: { id: roleId},
            include: [
                {
                    model: db.Permission,
                    as: 'role_permission',
                    attributes: ['id','name','desc']
                }
            ]
        });


        if (!role) {
            throw new Error('Role nao existe');
        }

        const permissionsToRemove = await db.Permission.findAll({
            where: { id: { [sequelize.Op.in]: data.permissions }}
        });

        if(!permissionsToRemove || permissionsToRemove.length === 0) {
            throw new Error('Sem permissoes para remover');
        }

        const currentPermissionsIds = role.role_permission.map(p => p.id);
        const permissionsFiltered = permissionsToRemove.filter( (perm) => currentPermissionsIds.includes(perm.id));

        if(permissionsFiltered.length > 0) {
            await role.removeRole_permission(permissionsFiltered);
        }else {
            throw new Error('As permissoes solicitadas para remocao nao estam associadas a essa role ou nao existem');
        }

        const newRole = await db.Role.findOne({
            where: { id: roleId},
            include: [
                {
                    model: db.Permission,
                    as: 'role_permission',
                    attributes: ['id','name','desc']
                }
            ]
        });

        return newRole;


    }

}


module.exports = SecurityService;