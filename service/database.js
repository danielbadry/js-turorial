'use strict';

const Sequelize = require('sequelize');

module.exports = class Database {
    constructor() {

        this.sequelize = new Sequelize('weblog', 'root', '110110', {
            host: 'localhost',
            dialect: 'mysql'
        });
    } ;

    connect(){

        this.sequelize
            .authenticate()
            .then(() => {
                console.log('Connection has been established successfully.');
            })
            .catch(err => {
                console.error('Unable to connect to the database:', err);
            });

        return this.sequelize;
    } ;

    Sequelize() {
        return Sequelize;
    }
} ;