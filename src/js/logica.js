// Selecionar elementos do DOM
const passwordOutput = document.getElementById('password-output');
const copyBtn = document.getElementById('copy-btn');
const generateBtn = document.getElementById('generate-btn');
const lengthInput = document.getElementById('length');
const options = {
    lowercase: document.getElementById('lowercase'),
    uppercase: document.getElementById('uppercase'),
    numbers: document.getElementById('numbers'),
    symbols: document.getElementById('symbols'),
    excludeDuplicate: document.getElementById('exclude-duplicate'),
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

// Função para gerar senha
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

    // Excluir duplicados, se necessário
    if (options.excludeDuplicate.checked) {
        charset = [...new Set(charset)].join('');
    }

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
}

// Copiar senha
copyBtn.addEventListener('click', () => {
    if (passwordOutput.value) {
        navigator.clipboard.writeText(passwordOutput.value)
            .then(() => alert('Password copied to clipboard!'))
            .catch(err => console.error('Copy failed', err));
    } else {
        alert('No password to copy!');
    }
});

// Evento para o botão de geração
generateBtn.addEventListener('click', generatePassword);
