import Tarefa from '../models/TarefaModel.js';

export const TarefaController = {
    insertTarefa: async (req, res) => {
        try {
            const { id_usuario, descricao, equipe, prioridade } = req.body;
            const status = "não iniciado";
            const tarefa = new Tarefa({ id_usuario, descricao, equipe, prioridade , status });
            const result = await tarefa.insertTarefa();
            res.json({ result });
        } catch (error) {
            res.json({ message: error });
        }
    },

    ListarTarefas: async (req, res) => {
        try {
            const tarefa = await Tarefa.listarTarefas();
            res.json({ tarefa });
        } catch (error) {
            res.json({ message: error });
        }
    }
}