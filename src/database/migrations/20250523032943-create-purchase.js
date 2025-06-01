'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('purchases', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4
            },
            userId: {
                type: Sequelize.UUID,
                references: {
                    model: 'users',
                    key: 'id'
                },
                onDelete: 'CASCADE'
            },
            total: {
                type: Sequelize.DECIMAL
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('purchases');
    }
};