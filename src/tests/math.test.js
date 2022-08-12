const {add} = require('../math');
test('Testing Jest Init', () => {

});

test ('Async fn with done', (done) => {
    setTimeout(() => {
        expect(1).toBe(2);
        done(); // without this line, this test case succeed, which is undesirable
    }, 2000);
})
test ('Async fn with promise', (done) => {
   add(2,3).then(sum => {
    expect(sum).toBe(5);
    done();
   })
})
test ('Async fn with async/await', async () => {
    const sum = await add(2,3);
    expect(sum).toBe(5);
})