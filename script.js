function fechar(e) {
    e.classList.remove("ativado")
    e.classList.add("desativado");
  }
  
  function abrir(e) {
    e.classList.remove("desativado")
    e.classList.add("ativado")
  }
  
  function sla() {
    alert("foi")
  }
  
  const checkbox = document.querySelector('.checkContainer input[type="checkbox"]');
  const crnInput = document.getElementById('crn');
  
  // Função para atualizar o estado do campo CRN
  function atualizarCrnInput() {
    crnInput.disabled = !checkbox.checked;
  }
  
  // Adiciona o evento ao checkbox para ativar/desativar o campo CRN ao ser clicado
  checkbox.addEventListener('change', atualizarCrnInput);
  
  // Chama a função uma vez para garantir o estado correto ao carregar a página
  atualizarCrnInput();
  
  function entrar() {
    alert("Tentativa de Login!")
  }
  
  async function registrar() {
    // Obtendo os valores dos campos
    const name = document.querySelector('input[placeholder="Nome"]').value;
    const email = document.querySelector('input[placeholder="email"]').value;
    const password = document.querySelector('input[placeholder="SenhaR"]').value;
    const crn = document.getElementById('crn').value;
    
    // Verificando qual o papel (Paciente ou Nutricionista)
    const role = document.querySelector('.checkContainer input[type="checkbox"]').checked ? 'Nutricionista' : 'Paciente';
  
    // Exibindo os dados no console para depuração
    console.log(JSON.stringify({ name, email, password, role, crn }));
  
    // Validação de campos para garantir que todos sejam preenchidos corretamente
    if (!name || !email || !password || (role === 'Nutricionista' && !crn)) {
      alert('Por favor, preencha todos os campos obrigatórios!');
      return;
    }
  
    // Enviando a requisição POST para o back-end
    try {
      const response = await fetch('http://localhost:8080/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, role, crn }),
      });
  
      // Obtendo a resposta como texto
      const responseText = await response.text(); // Mudança para text() em vez de json()
      console.log('Resposta do servidor:', responseText); // Verificando o que o servidor está retornando
  
      if (response.ok) {
        // Exibe a resposta como texto
        alert(responseText || 'Registrado com sucesso');
        // Fechar o modal após o registro
        fechar(document.getElementById('modalRegistro'));
      } else {
        // Em caso de erro, exibe a resposta do servidor
        alert(responseText || 'Erro ao registrar');
      }
    } catch (error) {
      console.error(error);
      alert('Erro na conexão com o servidor.');
    }
  }
  

  async function login() {
    // Obtendo os valores dos campos
    const email = document.getElementById("emailLogin").value;
    const password = document.getElementById("senhaLogin").value;
  
     // Exibindo os dados no console para depuração
  console.log(JSON.stringify({ email, password }));

  // Validação de campos para garantir que ambos sejam preenchidos
  if (!email || !password) {
    alert('Por favor, preencha todos os campos!');
    return;
  }

  // Enviando a requisição POST para o back-end
  try {
    const response = await fetch('http://localhost:8080/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    // Obtendo a resposta como JSON
    const responseData = await response.json();  // Resposta como JSON
    console.log('Resposta do servidor:', responseData); // Verificando a resposta completa

    if (response.ok) {
      // Supondo que o nome do usuário seja retornado na resposta
      const userName = responseData.name; // Agora pegamos o nome do usuário diretamente

      // Armazenando o nome do usuário no sessionStorage (ou localStorage, se preferir)
      sessionStorage.setItem('userName', userName);

      // Atualizando a navbar
      atualizarNavbar(userName);

      // Fechar o modal de login após o sucesso
      fechar(document.getElementById('modalEntra'));
    } else {
      // Exibe a resposta do servidor
      alert(responseData.message || 'Erro ao fazer login');
    }
  } catch (error) {
    console.error(error);
    alert('Erro na conexão com o servidor.');
  }
}

function atualizarNavbar(userName) {
  // Encontrando o botão de Login e o container da navbar
  const loginButton = document.querySelector('.btncontainer input[type="button"]');
  const navbarContainer = document.querySelector('.navbar .btncontainer');

  // Removendo o botão de Login
  loginButton.style.display = 'none';

  // Criando um novo elemento para exibir o nome do usuário
  const userNameElement = document.createElement('span');
  userNameElement.textContent = `Olá, ${userName}`;

  // Adicionando o nome do usuário na navbar
  navbarContainer.appendChild(userNameElement);
}

// Função para abrir o modal
function abrir(modal) {
  modal.classList.remove('desativado');
}

// Função para fechar o modal
function fechar(modal) {
  modal.classList.add('desativado');
}
  
  
   
  
  