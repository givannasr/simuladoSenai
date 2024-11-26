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
            const tarefas = await Tarefa.listarTarefas();
            res.json({ tarefas });
        } catch (error) {
            res.json({ message: error });
        }
    },

    atualizarStatus: async (req, res) => {
        try {
            const {id} = req.params;
            const {status} = req.body;
            const newStatus = status.toUpperCase();
            const tarefas = await Tarefa.atualizarStatus(id, newStatus);
            res.json({ tarefas });
        } catch (error) {
            res.json({ message: error });
        }
    }
}