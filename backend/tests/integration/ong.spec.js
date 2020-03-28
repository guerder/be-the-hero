const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.destroy();
    })

    let id;

    it('should be able to create a new ONG', async () => {
        const response = await request(app)
            .post('/ongs')
            .send({
                name: "APAD 4",
                email: "contato@apad.com.br",
                whatsapp: "4700000000",
                city: "Rio do sul",
                uf: "SC"
            });
        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });

    it('should be able to log into the application', async () => {
        const response = await request(app)
            .post('/ongs')
            .send({
                name: "APAD 4",
                email: "contato@apad.com.br",
                whatsapp: "4700000000",
                city: "Rio do sul",
                uf: "SC"
        });
        
        const responseLogon = await request(app)
            .post('/sessions')
            .send({
                id: response.body.id,
        });
        
        expect(responseLogon.body).toHaveProperty('name');
    });

});