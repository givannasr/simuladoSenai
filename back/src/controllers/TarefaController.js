import Tarefa from '../models/TarefaModel.js';

export const TarefaController = {
    insertTarefa: async (req, res) => {
        try {
            const { id_usuario, descricao, equipe, prioridade } = req.body;
            const status = "não iniciado";
            const tarefa = new Tarefa({ id_usuario, descricao, equipe, prioridade, status });
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
            const { id } = req.params;
            const { status } = req.body;
            const tarefas = await Tarefa.atualizarStatus(id, status);
            res.json({ tarefas });

        } catch (error) {
            res.json({ message: error });
        }
    },

    deletaTarefa: async (req, res) => {
        try {
            const { id } = req.params;
            const deletTarefas = await Tarefa.deletarTarefa(id);
            res.json({ deletTarefas });

        } catch (error) {
            res.json({ message: error });
        }
    },

    ListarTarefa: async (req, res) => {
        try {
            const { id } = req.params;
            const tarefa = await Tarefa.listarTarefa(id);
            res.json({ tarefa });
        } catch (error) {
            res.json({ message: error });
        }
    },

    atualizarTarefa: async (req, res) => {
        try {
            const { id } = req.params;
            const { id_usuario, descricao, equipe, prioridade } = req.body;
            const tarefa = new Tarefa({ id_usuario, descricao, equipe, prioridade });
            const result = await tarefa.atualizarTarefa(id);
            res.json({ result });
        } catch (error) {
            res.json({ message: error });
        }
    },
}