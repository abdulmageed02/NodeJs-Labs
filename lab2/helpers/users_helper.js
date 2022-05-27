const fs = require('fs')


function parseArgs(options) {
    const parseOptions = options.reduce((cum, elm) => {
        const [key, value] = elm.split('=')
        cum[key] = value
        return cum
    }, {})

    return parseOptions
}

function checkDB() {
    if (!fs.existsSync('./modules/db.json')) {
        fs.writeFileSync('./modules/db.json', JSON.stringify([]))
    }
}

function getTodos() {
    const todos = fs.readFileSync('./models/db.json', 'utf-8')
    const todoParsed = JSON.parse(todos)
    return todoParsed
}

function writeToDB(newTodos) {
    fs.writeFileSync('./models/db.json', JSON.stringify(newTodos))
}

function todo(id) {
    let todoParsed = getTodos().filter(elm=> elm.id == id)
    return todoParsed
}

function add(parseOptions) {
    let todoParsed = getTodos()
    
    id = 1

    if(todoParsed.length > 0) {
        id = todoParsed[todoParsed.length - 1].id + 1
    }

    const todo = {
        id: id,
        title: parseOptions.title,
        body: parseOptions.body,
        checked: false
    }
    todoParsed.push(todo)

    writeToDB(todoParsed)
}


function list(parseOptions) {
    const todoParsed = getTodos()
    let res
    if (parseOptions.type == 'unchecked') {
        res = todoParsed.filter((elm) => !elm.checked)
    }
    else if (parseOptions.type == 'checked') {
       res = todoParsed.filter((elm) => elm.checked)
    } else {
        res = todoParsed
    }
    return res
}

function remove(id) {
    const todoParsed = getTodos()

    const afterRemove = todoParsed.filter((elm) => elm.id != id)

    writeToDB(afterRemove)
}


function edit(id, body) {
    const todoParsed = getTodos()

    const newTodos = todoParsed.map((elm) => {
        if (elm.id == id) {
            if (body.title){
                elm.title = body.title
            }
            if (body.body){
                elm.body = body.body
            }
        }
        return elm
    })
    writeToDB(newTodos)

}

function check(id) {
    const todoParsed = getTodos()

    const newTodos = todoParsed.map((elm) => {
        if (elm.id == id) {
            elm.checked = true
        }
        return elm
    })
    writeToDB(newTodos)
}
function uncheck(id) {
    const todoParsed = getTodos()
    
    const newTodos = todoParsed.map((elm) => {
        if (elm.id == id) {
            elm.checked = false
        }
        return elm
    })
    writeToDB(newTodos)
}


module.exports = {
    parseArgs, add, list, remove, edit, check, uncheck, checkDB, todo

}