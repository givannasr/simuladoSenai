import {Router} from 'express';
import {UsuarioController} from '../controllers/UsuarioController.js';
import {TarefaController} from '../controllers/TarefaController.js'

const router = Router();

router.post('/novoUsuario', UsuarioController.novoUsuario);
router.get('/listarUsuarios', UsuarioController.ListarUsuarios);
router.post('/novaTarefa', TarefaController.insertTarefa);

export default router;