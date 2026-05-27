function entrar() {
    var emailVar = ipt_email.value;
    var senhaVar = ipt_senha.value;

    if (emailVar == "" || senhaVar == "") {
        alert("Preencha todos os campos!");
        return false;
    }

    fetch("/usuarios/autenticar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            emailServer: emailVar,
            senhaServer: senhaVar
        })
    }).then(function (resposta) {

        if (resposta.status == 200) {
            resposta.json().then(json => {
                sessionStorage.EMAIL_USUARIO = json.email;
                sessionStorage.NOME_USUARIO = json.nome;
                sessionStorage.ID_USUARIO = json.id;

                var idUsuario = sessionStorage.ID_USUARIO;

                fetch(`/formulario/verificarQuestionario/${idUsuario}`, { cache: 'no-store' })
                    .then(function (response) {
                        if (response.status == 200) {
                            alert("Redirecionando para área de performance...")
                            setTimeout(() => {
                                window.location.href = "../dashboard/dashboard.html"
                            }, 1000);
                        }
                        else if (response.status == 204) {
                            alert("Você será redirecionado para uma avaliação para entender seu nível na corrida!")
                            setTimeout(() => {
                                window.location.href = "../formulario/formulario.html"
                            }, 1000);
                        }
                    }).catch(function (error) {
                        console.error(`Erro na verificação: ${error.message}`);
                    });


            });

        } else {
            alert("E-mail ou senha inválidos!");
        }

    }).catch(function (erro) {
        console.log(erro);
        alert("Erro ao conectar com o servidor.");
    });


    return false;

}

function cadastrar() {

    var nomeVar = ipt_nome.value;
    var emailVar = ipt_email.value;
    var senhaVar = ipt_senha.value;
    var confirmacaoSenhaVar = ipt_confirmar_senha.value;

    if (
        nomeVar == "" ||
        emailVar == "" ||
        senhaVar == "" ||
        confirmacaoSenhaVar == ""
    ) {
        //cardErro.style.display = "block";
        alert("Preencha todos os campos!");
        return false;

    } else {
        setInterval(sumirMensagem, 5000);
    }

    if (senhaVar != confirmacaoSenhaVar) {
        alert("As senhas não coincidem!");
        return false;
    }

    if (!emailVar.includes('@')) {
        alert("O e-mail precisa de '@'.")
        return false;
    }

    if (senhaVar.length < 6) {
        alert("A senha precisa ter mais de 6 dígitos!")
        return false;
    }



    fetch("/usuarios/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            nomeServer: nomeVar,
            emailServer: emailVar,
            senhaServer: senhaVar
        }),

    }).then(function (resposta) {

        console.log("resposta: ", resposta);

        if (resposta.ok) {
            //cardErro.style.display = "block";

            alert("Seja bem-vindo! Seu cadastro foi realizado com sucesso!");

            sessionStorage.clear();

            setTimeout(() => {
                window.location.href = "../logCad/login.html";
            }, 2000);
            //limparFormulario();

        } else {

            resposta.text().then((texto) => {
                console.log(texto);

                if (
                    texto.includes("Duplicate")
                ) {
                    alert("Este email já está cadastrado")
                }


            })

        }

    }).catch(function (erro) {

        console.log(`#ERRO: ${erro}`);
        alert("Erro ao cadastrar.");

    });

    return false;
}

function sumirMensagem() {

}
