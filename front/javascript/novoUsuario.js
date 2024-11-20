$(document).ready(function () {
    $(document).on('submit', '#formUsuario', async function (event) {
        event.preventDefault();

        const formData = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value
        }

        axios.post(`${localStorage.getItem('ipApi')}novoUsuario`, formData)
            .then(response => {
                console.log(response);
                alert(`Usuario criado com sucesso`)
            }).catch(error => {
                console.log(error);
                alert(`Erro ao cadastrar usuario!`)
            })
    })
})