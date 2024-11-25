import connection from '../config/db.js';

class Usuario {
    constructor(pUsuario) {
        this.nome = pUsuario.nome;
        this.email = pUsuario.email;
    }

    async insertUsuario() {
        try {
            const conn = await connection();
            const pSql = `INSERT INTO usuario (NOME, EMAIL) VALUE (?,?);`;
            const pValues = [this.nome, this.email];
            const [result] = await conn.query(pSql, pValues);
        } catch (error) {
            throw error;
        } finally {
            await conn.release();
        }
    }

    static async listarUsuarios() {
        try {
            const conn = await connection();
            const [rows] = await conn.query(`SELECT ID_USUARIO, NOME FROM USUARIO;`);
            return rows
        } catch (error) {
            throw error;
        }
    }
}

export default Usuario;
