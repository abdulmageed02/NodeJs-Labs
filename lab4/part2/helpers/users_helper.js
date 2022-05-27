const fs = require('fs')


function parseArgs(options) {
    const parseOptions = options.reduce((cum, elm) => {
        const [key, value] = elm.split('=')
        cum[key] = value
        return cum
    }, {})

    return parseOptions
}

function asyncExsists(path) {
    return new Promise((resolve, reject) => {
        fs.exists(path, exsists => {
            resolve(exsists)
        })
    })
}

function asyncWrite(path, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, data, err => {
            if (!err) return resolve()
            reject(err)
        })
    })
}

function asyncRead(path, encode) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, encode, (err, data) => {
            if(!err) return resolve(data)
            reject(err)
        })
    })
}

async function checkDB() {
    const path = './models/db.json'
    if (! await asyncExsists(path)) {
        await asyncWrite(path, JSON.stringify([]))
    }
}

async function getTodos(cb) {
    let todoParsed = null
    try {
        const todos = await asyncRead('./models/db.json', 'utf-8')
        todoParsed = JSON.parse(todos)
    } catch (error) {
        console.log(error)
    }
    return todoParsed
}

async function writeToDB(newTodos) {
    try {
        await asyncWrite('./models/db.json', JSON.stringify(newTodos))
    } catch (error) {
        console.log(error)
    }
}

async function todo(id) {
    let todoParsed = await getTodos().filter(elm => elm.id == id)
    return todoParsed
}

async function add(parseOptions) {
    let todoParsed = await getTodos()

    id = 1

    if (todoParsed.length > 0) {
        id = todoParsed[todoParsed.length - 1].id + 1
    }

    const todo = {
        id: id,
        title: parseOptions.title,
        body: parseOptions.body,
        checked: false
    }
    todoParsed.push(todo)

    await writeToDB(todoParsed)
}


async function list(parseOptions, q) {
    const todoParsed = await getTodos()
    let res
    if (q.type == 'unchecked') {
        res = todoParsed.filter((elm) => !elm.checked)
    }
    else if (q.type == 'checked') {
        res = todoParsed.filter((elm) => elm.checked)
    } else {
        res = todoParsed
    }
    return res
}

async function remove(id) {
    const todoParsed = await getTodos()

    const afterRemove = todoParsed.filter((elm) => elm.id != id)

    await writeToDB(afterRemove)
}


async function edit(id, body) {
    const todoParsed = await getTodos()

    const newTodos = todoParsed.map((elm) => {
        if (elm.id == id) {
            if (body.title) {
                elm.title = body.title
            }
            if (body.body) {
                elm.body = body.body
            }
        }
        return elm
    })
    await writeToDB(newTodos)

}

async function check(id) {
    const todoParsed = await getTodos()

    const newTodos = todoParsed.map((elm) => {
        if (elm.id == id) {
            elm.checked = true
        }
        return elm
    })
    await writeToDB(newTodos)
}

async function uncheck(id) {
    const todoParsed = await getTodos()

    const newTodos = todoParsed.map((elm) => {
        if (elm.id == id) {
            elm.checked = false
        }
        return elm
    })
    await writeToDB(newTodos)
}


module.exports = {
    parseArgs, add, list, remove, edit, check, uncheck, checkDB, todo

}