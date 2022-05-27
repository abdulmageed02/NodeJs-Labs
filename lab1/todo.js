const helpers = require('./helpers')

function main(cmdArgs) {
    helpers.checkDB()

    const [, , operation, ...options] = cmdArgs
    const parseOptions = helpers.parseArgs(options)

    ops = {
        'add': helpers.add,
        'edit': helpers.edit,
        'list': helpers.list,
        'remove': helpers.remove,
        'check': helpers.check,
        'uncheck': helpers.uncheck
    }

    try {
        ops[operation](parseOptions)
    } catch (error) {
        console.log('Not valid input');
    }
        
}

main(process.argv)