import connection from '../config/db.js';

class Tarefa {
    constructor(pTarefa) {
        this.id_usuario = pTarefa.id_usuario;
        this.descricao = pTarefa.descricao;
        this.equipe = pTarefa.equipe;
        this.prioridade = pTarefa.prioridade;
        this.status = pTarefa.status;
    }

    async insertTarefa() {
        try {
            const conn = await connection();
            const pSql = `INSERT INTO TAREFA (ID_USUARIO, DESCRICAO, EQUIPE, PRIORIDADE, STATUS) VALUE (?,?,?,?,?);`;
            const pValues = [this.id_usuario, this.descricao, this.equipe, this.prioridade, this.status];
            const [result] = await conn.query(pSql, pValues);
            return result;
        } catch (error) {
            throw error;
        } 
    }
    SELECT  ;
    static async listarTarefas() {
        try {
            const conn = await connection();
            const [rows] = await conn.query(`SELECT 
                                                T.id_tarefa,
                                                T.id_usuario,
                                                T.descricao, 
                                                T.equipe, 
                                                T.prioridade,
                                                T.data_cadastro,
                                                T.status,
                                                U.nome
                                                FROM Tarefa as T
                                                INNER JOIN usuario as U
                                                ON T.id_usuario = U.id_usuario;`);
            return rows
        } catch (error) {
            throw error;
        }
    }
    static async atualizarStatus(id, status) {
        try {     
            const conn = await connection();
            const pSql = `UPDATE TAREFA SET status=? WHERE id_tarefa=?;`;
            const pValues = [status, id];
            const [result] = await conn.query(pSql, pValues);
            return result;
        } catch (error) {
          console.log(error);
        } 
    }

    static async deletarTarefa(id) {
        try {     
            const conn = await connection();
            const pSql = `DELETE FROM TAREFA WHERE id_tarefa=?;`;
            const pValues = [id];
            const [result] = await conn.query(pSql, pValues);
            return result;
        } catch (error) {
          console.log(error);
        } 
    }

    static async listarTarefa(id_tarefa) {
        try {
            const conn = await connection();
            const [rows] = await conn.query(`SELECT 
                                                T.id_tarefa,
                                                T.id_usuario,
                                                T.descricao, 
                                                T.equipe, 
                                                T.prioridade,
                                                T.data_cadastro,
                                                T.status,
                                                U.nome
                                                FROM Tarefa as T
                                                INNER JOIN usuario as U
                                                ON T.id_usuario = U.id_usuario WHERE ID_TAREFA=?;`, [id_tarefa]);
            return rows
        } catch (error) {
            throw error;
        }
    }

    async atualizarTarefa(id_tarefa) {
        try {
            const conn = await connection();
            const pSql = `UPDATE TAREFA SET ID_USUARIO=?, DESCRICAO=?, EQUIPE=?, PRIORIDADE=? WHERE ID_TAREFA=?;`;
            const pValues = [this.id_usuario, this.descricao, this.equipe, this.prioridade, id_tarefa];
            const [result] = await conn.query(pSql, pValues);
            return result;
        } catch (error) {
            throw error;
        } 
    }
}

export default Tarefa;