const request = require('supertest');

describe('auth middleware', () => {
    beforeEach(() => { server = require('../../index'); })
    afterEach(async () => { 
        server.close(); 
        await Genre.remove({});
    });
    
    const exec = () => {

    }
    it('should return 401 if no token is provided.', () => {

    });
})