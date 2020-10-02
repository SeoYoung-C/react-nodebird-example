let i = 1
const gen = function* () {
    while (true) {
        yield i++;
    }
}

const g = gen()

g.next()
// > {value: 1, done: false}


g.next()
// > {value: 2, done: false}


g.next()
// > {value: 3, done: false}


g.next()
// > {value: 4, done: false}


g.next()
// > {value: 5, done: false}


g.next()
// > {value: 6, done: false}
