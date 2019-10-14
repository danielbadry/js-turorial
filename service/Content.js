let Database = require('./database');
let db = new Database();

module.exports = class Content {

    content() {
        return db.connect().define('content', {
            idContent: {
                type: db.Sequelize().INTEGER,
                allowNull: false,
                primaryKey: true
            },
            title: {
                type: db.Sequelize().STRING
            },
            body: {
                type: db.Sequelize().STRING
            },
            createDate: {
                type: db.Sequelize().STRING
            }
        }, {
            freezeTableName: true, // Model tableName will be the same as the model name
            timestamps: false
        });
    } ;

    saveContent(data){

       return this.content().build({title: data.title, body: data.body}).save()
            .then(() => {
                return 'saved successfully';
            })
            .catch(error => {
                return 'Ooops.problem in save content';
            })
    }
};