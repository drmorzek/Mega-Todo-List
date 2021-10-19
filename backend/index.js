const path = require("path")
global.__dirname = process.cwd()
global.requireRoot = file => require(path.join(__dirname, file))

const DbService = require("./services/DbService")();

const TodosModel = require("./models/Todos")

const { app } = require('./app');
const { PORT } = require("./config/config");

function serverStart() {
    DbService
        .connect()
        .then(() => {
            TodosModel()
        })
        .then(() => app.listen(PORT, () => {
            console.log(`server run on port ${PORT}`)
        })
        )
        .catch(console.error)
}
serverStart()

process.on('uncaughtException', function (err) {
    console.error(err)
    if (err.fatal) {
        setTimeout(() => {
            serverStart()
        }, 5000)
        console.log("Server restart");
    };
});

