const Controller = require('./Controller');
const SecurityService = require('../services/SecurityService');

const securityService = new SecurityService();

class SecurityController extends Controller {
    constructor() {
        super(securityService);
    }

    async getPermissionRole(req,res,next) {
        const { roleId } = req.params;
        try {
            const permissions = await securityService.getPermissionsRole(roleId);
            res.status(200).json(permissions);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error getting' });
        }
    }

    async registerAcl(req,res,next) {
        const { roles, permissions } = req.body;
        const { userId } = req;

        try {
            const acl = await securityService.registerAcl({roles, permissions, userId});
            res.status(201).send(acl);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error registering ACL' });
        }
    }

    async registerPermissionRole(req,res,next) {
        const { role, permissions } = req.body;

        try {
            const permissionRole = await securityService.registerPermissionRole({role, permissions});
            res.status(200).json(permissionRole);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error adicionar permissao role' });
        }
    }

    async removePermissionRole(req,res,next) {
        const { roleId } = req.params;
        console.log(roleId);
        
        const { permissions } = req.body;

        try {
            await securityService.removePermissionRole(roleId, {permissions});
            res.status(200).json({ message: 'removido com sucesso'});
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: `Error remover permissao role ${error.message}` });
        }
    }
}

module.exports = SecurityController;