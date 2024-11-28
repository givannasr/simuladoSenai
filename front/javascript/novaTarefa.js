$(document).ready(function () {
    axios.get(`${localStorage.getItem('ipApi')}listarUsuarios`)
        .then(response => {
            const usuarios = response.data.users;
            const selectUsers = $('#users');
            selectUsers.empty();
            selectUsers.append('<option value="">Selecione um usuario</option>')
            usuarios.forEach(user => {
                selectUsers.append(`<option value="${user.ID_USUARIO}">${user.NOME}</option>`)
            });
            carregarDadosTarefa();
        }).catch(error => {
            console.log(error);
            alert(`Erro ao encontrar usuarios!`)
        })

    const taskId = sessionStorage.getItem("taskId");
    console.log('Editar tarefa:', taskId);

    function carregarDadosTarefa() {
        if (taskId) {
            axios.get(`${localStorage.getItem('ipApi')}listarTarefa/${taskId}`)
                .then(response => {
                    const tarefa = response.data.tarefa[0];
                    document.getElementById("descricao").value = tarefa.descricao;
                    document.getElementById("equipe").value = tarefa.equipe;

                    const nomeUserSelect = document.getElementById("users");
                    nomeUserSelect.value = tarefa.id_usuario;

                    const prioridadeSelect = document.getElementById("prioridade");
                    prioridadeSelect.value = tarefa.prioridade;
                }).catch(error => {
                    console.log(error);
                })
        }
    }

    $(document).off('submit', '#formNovaTarefa');
    $(document).on('submit', '#formNovaTarefa', async function (event) {
        event.preventDefault();


        const formData = {
            id_usuario: document.getElementById("users").value,
            descricao: document.getElementById('descricao').value,
            equipe: document.getElementById('equipe').value,
            prioridade: document.getElementById('prioridade').value
        }

        if (!taskId) {
            axios.post(`${localStorage.getItem('ipApi')}novaTarefa`, formData)
                .then(response => {
                    console.log(response);
                    alert(`Tarefa cadastrada com sucesso`)
                }).catch(error => {
                    console.log(error);
                    alert(`Erro ao cadastrar Tarefa!`)
                })
        } else {
            axios.put(`${localStorage.getItem('ipApi')}atualizarTarefa/${taskId}`, formData)
                .then(response => {
                    console.log(response);
                    alert(`Tarefa alterada com sucesso`)
                    sessionStorage.removeItem('taskId');
                    carregarPagina('gerenciamentoTarefas');
                }).catch(error => {
                    console.log(error);
                    alert(`Erro ao alterar Tarefa!`)
                })

        }


    })
})