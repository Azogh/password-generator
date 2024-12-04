// Selecionar elementos do DOM
const passwordOutput = document.getElementById('password-output');
const copyBtn = document.getElementById('copy-btn');
const generateBtn = document.getElementById('generate-btn');
const lengthInput = document.getElementById('length');
const lengthDisplay = document.getElementById('length-display');
const strengthBar = document.getElementById('strength-bar');
const strengthMessage = document.getElementById('strength-message'); // Adicionando a referência para a mensagem de força
const options = {
    lowercase: document.getElementById('lowercase'),
    uppercase: document.getElementById('uppercase'),
    numbers: document.getElementById('numbers'),
    symbols: document.getElementById('symbols'),
    spaces: document.getElementById('spaces'),
};

// Mapear os caracteres possíveis
const charTypes = {
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    numbers: '0123456789',
    symbols: '!@#$%^&*()-_=+[]{}<>?/|',
    spaces: ' ',
};

// Função de geração de senha
function generatePassword() {
    const length = parseInt(lengthInput.value); // Comprimento da senha
    let charset = ''; // Todos os caracteres possíveis
    let password = ''; // A senha gerada

    // Adiciona os tipos de caracteres ao conjunto
    if (options.lowercase.checked) charset += charTypes.lowercase;
    if (options.uppercase.checked) charset += charTypes.uppercase;
    if (options.numbers.checked) charset += charTypes.numbers;
    if (options.symbols.checked) charset += charTypes.symbols;
    if (options.spaces.checked) charset += charTypes.spaces;

    // Valida se há caracteres disponíveis
    if (!charset) {
        alert('Select at least one character type!');
        return;
    }

    // Gera a senha com base nos caracteres disponíveis
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }

    // Exibe a senha no campo de saída
    passwordOutput.value = password;

    // Atualiza a força da senha
    updateStrength(password);
}

// Função de copiar para a área de transferência
copyBtn.addEventListener('click', () => {
    if (passwordOutput.value) {
        navigator.clipboard.writeText(passwordOutput.value)
            .then(() => alert('Password copied to clipboard!'))
            .catch(err => console.error('Copy failed', err));
    } else {
        alert('No password to copy!');
    }
});

// Atualiza o valor do comprimento da senha
lengthInput.addEventListener('input', () => {
    lengthDisplay.textContent = lengthInput.value;
    generateBtn.disabled = !isAnyOptionChecked(); // Desabilitar botão se nenhuma opção estiver marcada
});

// Verifica se qualquer opção foi marcada
function isAnyOptionChecked() {
    return options.lowercase.checked || options.uppercase.checked || options.numbers.checked || options.symbols.checked || options.spaces.checked;
}

// Atualiza a barra de força e a mensagem de força
function updateStrength(password) {
    let strength = 0;
    if (password.length >= 8) strength++; // Condição para aumentar a força
    if (/[A-Z]/.test(password)) strength++; // Contém letras maiúsculas
    if (/\d/.test(password)) strength++; // Contém números
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++; // Contém símbolos

    // Ajuste a classe da barra de força
    if (strength === 0) {
        strengthBar.className = 'strength-bar weak';
        strengthMessage.className = 'strength-message weak';
        strengthMessage.textContent = 'Nossa, essa senha tá fraquinha!';
    } else if (strength === 1) {
        strengthBar.className = 'strength-bar moderate';
        strengthMessage.className = 'strength-message moderate';
        strengthMessage.textContent = 'É uma boa senha!';
    } else {
        strengthBar.className = 'strength-bar strong';
        strengthMessage.className = 'strength-message strong';
        strengthMessage.textContent = 'Que senha excelente!';
    }

    // Exibe a mensagem de força da senha
    strengthMessage.style.display = 'block';
}

// Gerar a senha ao clicar no botão
generateBtn.addEventListener('click', generatePassword);

// Habilitar/Desabilitar o botão de gerar senha
generateBtn.disabled = !isAnyOptionChecked();
