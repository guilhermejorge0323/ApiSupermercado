const Service = require('./Service');
const db = require('../database/models');

class RoleService extends Service {
    constructor() {
        super('Role');
    }

}

module.exports = RoleService;