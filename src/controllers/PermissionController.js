const Controller = require('./Controller');
const PermissionService = require('../services/PermissionService');

const permissionService = new PermissionService();

class PermissionController extends Controller {
    constructor() {
        super(permissionService);
    }
}

module.exports = PermissionController;