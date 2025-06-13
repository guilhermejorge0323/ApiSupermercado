const Controller = require('./Controller');
const RoleService = require('../services/RoleService');

const roleService = new RoleService();

class RoleController extends Controller {
    constructor() {
        super(roleService);
    }

}

module.exports = RoleController;