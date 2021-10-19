const { orm } = requireRoot("services/DbService")();

module.exports.getTodos = async (req, res) => {
    try {
        const find = await orm('todo').select('*')

        if (find.length > 0) {

            res.status(200).json({
                data: find
            })


        } else {
            res.status(404).json({
                error: `Todos not fount`
            })
        }

    } catch (e) {
        res.status(500).json({
            error: error.message ? error.message : error.toString(),
        })
    }
}

module.exports.getTodoById = async (req, res) => {
    try {
        const find = await orm('todo').select('*').where({
            id: req.params.id
        })

        if (find.length > 0) {

            res.status(200).json({
                data: find
            })


        } else {
            res.status(404).json({
                error: `Todo with ${req.params.id} not fount`
            })
        }

    } catch (error) {
        res.status(500).json({
            error: error.message ? error.message : error.toString(),
        })
    }
}



module.exports.addTodo = async (req, res) => {
    try {

        let { content } = req.body

        if (!content) {
            res.status(404).json({
                error: `Key "content" not found`
            })
            return
        }

        const find = await orm('todo').insert({ content, done: 0 })


        res.status(200).json({
            data: find
        })


    } catch (error) {
        res.status(500).json({
            error: error.message ? error.message : error.toString(),
        })
    }
}


module.exports.updateTodo = async (req, res) => {
    try {

        const find = await orm('todo').select('*').where({
            id: req.params.id
        })

        if (find.length > 0) {

            let { content, done } = req.body

            if (content == undefined && done == undefined) {
                res.status(404).json({
                    error: `Key "content" and "done" not found`
                })
                return
            }

            let update = await orm('todo')
                .where({ id: req.params.id })
                .update({ content, done })

            res.status(200).json({
                data: update
            })


        } else {
            res.status(404).json({
                error: `Todo with ${req.params.id} not fount`
            })
        }


    } catch (error) {
        res.status(500).json({
            error: error.message ? error.message : error.toString(),
        })
    }
}

module.exports.deleteTodoById = async (req, res) => {
    try {
        const find = await orm('todo').select('*').where({
            id: req.params.id
        })

        if (find.length > 0) {

            let del = await orm('todo')
                .where('id', req.params.id)
                .del()

            res.status(200).json({
                data: del
        })

        } else {
            res.status(404).json({
                error: `Todo with ${req.params.id} not fount`
            })
        }

    } catch (error) {
        res.status(500).json({
            error: error.message ? error.message : error.toString(),
        })
    }
}

