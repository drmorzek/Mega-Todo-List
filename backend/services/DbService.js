const knexConfig = requireRoot('config/knex')

const knex = require('knex')

class DbService {


    constructor(knex, config) {
        if (!!DbService.instance) {
            return DbService.instance;
        }
        DbService.instance = this;

        this.orm = knex(config)

        return this;
    }


    async connect() {

        try {
            let res = await this.orm.raw('select 1+1 as result')
            console.log("Connect to DB success")
            return res
        } catch (error) {
            console.log(error)
        }

    }
}

module.exports = () => new DbService(knex, {
                                        client: 'mysql',
                                        connection: knexConfig
                                    })

