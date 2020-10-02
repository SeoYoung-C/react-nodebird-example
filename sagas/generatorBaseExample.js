// 중단점이 생김 

const get = function* () {
    console.log(1)
    yield
    console.log(2)
    yield
    console.log(3)
    yield 4
}

const generator = gen()

generator()
// ---> gen{<suspended>} 함수 실행 안됨

generator.next()
// 1 --> console.log(1)까지 실행되고 멈춤
// >{value: undefined, done: false}

generator.next()
// 2 --> console.log(2)까지 실행되고 멈춤
// >{value: undefined, done: false}

generator.next()
// 3 --> console.log(3)까지 실행되고 멈춤
// >{value: 4, done: false()}

generator.next()
// >{value: undefiend, done: true}

