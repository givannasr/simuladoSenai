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