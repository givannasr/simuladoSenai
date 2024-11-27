$(document).ready(async function () {
    const board = {
        "Não Iniciado": document.querySelector("#nao-iniciado"),
        "Em Desenvolvimento": document.querySelector("#em-desenvolvimento"),
        "Finalizado": document.querySelector("#finalizado")
    }

    const statusMapping = {
        "não iniciado": "Não Iniciado",
        "em desenvolvimento": "Em Desenvolvimento",
        "finalizado": "Finalizado"
    }

    async function buscarTarefas() {
        Object.values(board).forEach(column => {
            const cards = column.querySelectorAll('.card');
            cards.forEach(card => card.remove());
        })

        try {
            const response = await axios.get(`${localStorage.getItem('ipApi')}listarTarefas`)
            const tasks = response.data.tarefas;


            tasks.forEach(tarefas => {
                const mappedStatus = statusMapping[tarefas.status?.toLowerCase()];
                const column = board[mappedStatus];

                if (column) {
                    const card = document.createElement("div");
                    card.className = 'card';
                    card.innerHTML = `
                    <h4>Descrição: ${tarefas.descricao}</h4>
                    <p>Equipe: ${tarefas.equipe}</p>
                    <p>Prioridade: ${tarefas.prioridade}</p>
                    <p>Vinculado a: ${tarefas.nome}</p>

                    <div class="card-actions">
                        <button class="btn-edit" onclick="carregarPagina('novaTarefa')" href="#" data-id="${tarefas.id_tarefa}">Editar</button>
                        <button class="btn-delete"  data-id="${tarefas.id_tarefa}">Excluir</button>
                    </div>

                    <div>
                        <div class="card-status">
                            <select class="status-dropdown" data-id="${tarefas.id_tarefa}">
                            <option value="${tarefas.status}" selected>${tarefas.status}</option>
                            ${["não iniciado", "em desenvolvimento", "finalizado"]
                            .filter(status => status !== tarefas.status)
                            .map(status => `<option value="${status}">${status}</option>`)
                            .join("")} 
                            </select>
                            <button class="btn-save-status" data-id="${tarefas.id_tarefa}">Salvar</button>
                        </div>
                    </div>
                    `;
                    column.appendChild(card);
                } else {
                    console.warn("Status desconhecido ou coluna não encontrada", tarefas.status);

                }
            })
        } catch (error) {
            console.error("Erro ao buscar a tarefa", error);

        }
    }

    await buscarTarefas();

    $(document).off('click', '.btn-delete');
    $(document).on('click', '.btn-delete', async function (event) {
        const taskId = $(this).data('id');

        try {
            await axios.delete(`${localStorage.getItem('ipApi')}deletaTarefa/${taskId}`)
            await buscarTarefas();
        } catch (error) {
            console.log(error);
        }
    })

    $(document).off('click', '.btn-save-status');
    $(document).on('click', '.btn-save-status', async function (event) {
        const taskId = $(this).data('id');
        const newStatus = $(`.status-dropdown[data-id='${taskId}']`).val();

        try {
            await axios.put(`${localStorage.getItem('ipApi')}atualizarStatus/${taskId}`, { status: newStatus })
            await buscarTarefas();
        } catch (error) {
            console.log(error);
        }
    })


    axios.get(`${localStorage.getItem('ipApi')}listarUsuarios`)
        .then(response => {
            const usuarios = response.data.users;
            const selectUsers = $('#users');
            selectUsers.empty();
            selectUsers.append('<option value="">Selecione um usuario</option>')
            usuarios.forEach(user => {
                selectUsers.append(`<option value="${user.ID_USUARIO}">${user.NOME}</option>`)
            });

            console.log(response);
            alert(`Usuarios encontrados com sucesso`)
        }).catch(error => {
            console.log(error);
            alert(`Erro ao encontrar usuarios!`)
        })

    $(document).off('submit', '#formNovaTarefa');
    $(document).on('submit', '#formNovaTarefa', async function (event) {
        event.preventDefault();
        const formData = {
            id_usuario: document.getElementById("users").value,
            descricao: document.getElementById('descricao').value,
            equipe: document.getElementById('equipe').value,
            prioridade: document.getElementById('prioridade').value
        }

        axios.post(`${localStorage.getItem('ipApi')}novaTarefa`, formData)
            .then(response => {
                console.log(response);
                alert(`Tarefa cadastrada com sucesso`)
            }).catch(error => {
                console.log(error);
                alert(`Erro ao cadastrar Tarefa!`)
            })
    })
})