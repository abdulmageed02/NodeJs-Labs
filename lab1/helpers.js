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
    if (!fs.existsSync('./db.json')) {
        fs.writeFileSync('./db.json', JSON.stringify([]))
    }
}

function getTodos() {
    const todos = fs.readFileSync('./db.json', 'utf-8')
    const todoParsed = JSON.parse(todos)
    return todoParsed
}

function writeToDB(newTodos) {
    fs.writeFileSync('./db.json', JSON.stringify(newTodos))
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
    
    if (parseOptions.type == 'unchecked') {
        const unchecked = todoParsed.filter((elm) => !elm.checked)
        console.log(unchecked)
    }
    else if (parseOptions.type == 'checked') {
        const checked = todoParsed.filter((elm) => elm.checked)
        console.log(checked)
    } else {
        console.log(todoParsed)
    }
}

function remove(parseOptions) {
    const todoParsed = getTodos()

    const afterRemove = todoParsed.filter((elm) => elm.id != parseOptions.id)

    writeToDB(afterRemove)
}


function edit(parseOptions) {
    const todoParsed = getTodos()

    const newTodos = todoParsed.map((elm) => {
        if (elm.id == parseOptions.id) {
            if (parseOptions.title){
                elm.title = parseOptions.title
            }
            if (parseOptions.body){
                elm.body = parseOptions.body
            }
        }
        return elm
    })
    writeToDB(newTodos)

}

function check(parseOptions) {
    const todoParsed = getTodos()

    const newTodos = todoParsed.map((elm) => {
        if (elm.id == parseOptions.id) {
            elm.checked = true
        }
        return elm
    })
    writeToDB(newTodos)
}
function uncheck(parseOptions) {
    const todoParsed = getTodos()
    
    const newTodos = todoParsed.map((elm) => {
        if (elm.id == parseOptions.id) {
            elm.checked = false
        }
        return elm
    })
    writeToDB(newTodos)
}


module.exports = {
    parseArgs, add, list, remove, edit, check, uncheck, checkDB

}