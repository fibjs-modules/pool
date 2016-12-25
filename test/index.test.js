require("test").setup();

describe("pool", () => {
    const Pool = require("../");

    it("run", () => {
        const p = Pool(() => 10);
        assert.equal(p(v => v + 1), 11);
    });

    it("pool", () => {
        let n = 0;
        const p = Pool(() => ++n);
        assert.equal(p(v => v + 1), 2);
    });

    it("throw", () => {
        let n = 0;
        const p = Pool(() => ++n);
        assert.equal(p(v => v + 1), 2);
        assert.throws(() => p(v => { throw "error" }));
        assert.equal(p(v => v + 1), 3);
    });
});

require("test").run(console.DEBUG);
