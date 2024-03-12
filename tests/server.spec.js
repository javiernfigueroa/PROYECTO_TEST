const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
    test("GET /cafes devuelve un status 200 y un arreglo no vacío", async () => {
        const response = await request(server).get("/cafes");
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body).not.toHaveLength(0);
    });

    test("DELETE /cafes/:id inexistente devuelve un status 404", async () => {
        const response = await request(server).delete("/cafes/IDnone").set("Authorization", "token");
        expect(response.status).toBe(404);
    });

    test("POST /cafes agrega un nuevo café y devuelve status 201", async () => {
        const response = await request(server).post("/cafes").send({ id: 5, nombre: "Latte" });
        expect(response.status).toBe(201);
        expect(response.body).toHaveLength(5);
    });

    test("PUT /cafes/:id con ID diferente en parámetros devuelve status 400", async () => {
        const response = await request(server).put("/cafes/5").send({ id: 100, nombre: "Espresso" });
        expect(response.status).toBe(400);
    });
});