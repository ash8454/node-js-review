
const {Rental} = require('../../models/Rental')

describe('/api/returns', () => {
    let server;
    beforeEach(() => { server = require('../../index'); })
    afterEach(async () => { 
        server.close(); 
        await Genre.remove({});
    });
});