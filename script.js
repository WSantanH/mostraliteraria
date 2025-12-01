// Criar estrelas animadas
function createStars() {
    const starsContainer = document.getElementById('stars');
    for (let i = 0; i < 50; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.width = Math.random() * 3 + 1 + 'px';
        star.style.height = star.style.width;
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        starsContainer.appendChild(star);
    }
}
createStars();

// Sistema de Quiz de Matemática
let currentLevel = 1;
let correctAnswers = 0;
let currentQuestion = null;

const mathLevels = {
    1: { name: 'Adição Básica', unlock: 'Cabeças', operation: 'add', max: 10 },
    2: { name: 'Subtração', unlock: 'Corpos', operation: 'subtract', max: 20 },
    3: { name: 'Multiplicação', unlock: 'Braços', operation: 'multiply', max: 10 },
    4: { name: 'Divisão', unlock: 'Pernas', operation: 'divide', max: 50 },
    5: { name: 'Avançado', unlock: 'Armas', operation: 'mixed', max: 20 },
    6: { name: 'Expert', unlock: 'Acessórios', operation: 'complex', max: 30 }
};

function generateQuestion() {
    const level = mathLevels[currentLevel];
    let num1, num2, answer, question;

    switch(level.operation) {
        case 'add':
            num1 = Math.floor(Math.random() * level.max) + 1;
            num2 = Math.floor(Math.random() * level.max) + 1;
            answer = num1 + num2;
            question = `${num1} + ${num2} = ?`;
            break;
        case 'subtract':
            num1 = Math.floor(Math.random() * level.max) + 10;
            num2 = Math.floor(Math.random() * num1);
            answer = num1 - num2;
            question = `${num1} - ${num2} = ?`;
            break;
        case 'multiply':
            num1 = Math.floor(Math.random() * level.max) + 1;
            num2 = Math.floor(Math.random() * level.max) + 1;
            answer = num1 * num2;
            question = `${num1} × ${num2} = ?`;
            break;
        case 'divide':
            num2 = Math.floor(Math.random() * 9) + 2;
            answer = Math.floor(Math.random() * 10) + 1;
            num1 = num2 * answer;
            question = `${num1} ÷ ${num2} = ?`;
            break;
        case 'mixed':
            const ops = ['add', 'subtract', 'multiply'];
            const op = ops[Math.floor(Math.random() * ops.length)];
            if (op === 'add') {
                num1 = Math.floor(Math.random() * level.max) + 1;
                num2 = Math.floor(Math.random() * level.max) + 1;
                answer = num1 + num2;
                question = `${num1} + ${num2} = ?`;
            } else if (op === 'subtract') {
                num1 = Math.floor(Math.random() * level.max) + 10;
                num2 = Math.floor(Math.random() * num1);
                answer = num1 - num2;
                question = `${num1} - ${num2} = ?`;
            } else {
                num1 = Math.floor(Math.random() * 10) + 1;
                num2 = Math.floor(Math.random() * 10) + 1;
                answer = num1 * num2;
                question = `${num1} × ${num2} = ?`;
            }
            break;
        case 'complex':
            num1 = Math.floor(Math.random() * 15) + 5;
            num2 = Math.floor(Math.random() * 15) + 5;
            const num3 = Math.floor(Math.random() * 10) + 1;
            answer = (num1 + num2) * num3;
            question = `(${num1} + ${num2}) × ${num3} = ?`;
            break;
    }

    // Gerar opções de resposta
    const options = [answer];
    while (options.length < 4) {
        const wrongAnswer = answer + Math.floor(Math.random() * 20) - 10;
        if (wrongAnswer > 0 && !options.includes(wrongAnswer)) {
            options.push(wrongAnswer);
        }
    }
    
    // Embaralhar opções
    options.sort(() => Math.random() - 0.5);

    currentQuestion = { question, answer, options };
    displayQuestion();
}

function displayQuestion() {
    document.getElementById('questionText').textContent = currentQuestion.question;
    const optionsContainer = document.getElementById('answerOptions');
    optionsContainer.innerHTML = '';

    currentQuestion.options.forEach(option => {
        const btn = document.createElement('button');
        btn.className = 'answer-btn';
        btn.textContent = option;
        btn.onclick = () => checkAnswer(option, btn);
        optionsContainer.appendChild(btn);
    });
}

function checkAnswer(selectedAnswer, btn) {
    const buttons = document.querySelectorAll('.answer-btn');
    buttons.forEach(b => b.disabled = true);

    if (selectedAnswer === currentQuestion.answer) {
        btn.classList.add('correct');
        correctAnswers++;
        document.getElementById('correctAnswers').textContent = correctAnswers;

        setTimeout(() => {
            if (correctAnswers >= 5) {
                unlockLevel();
            } else {
                generateQuestion();
            }
        }, 1000);
    } else {
        btn.classList.add('incorrect');
        buttons.forEach(b => {
            if (parseInt(b.textContent) === currentQuestion.answer) {
                b.classList.add('correct');
            }
        });

        setTimeout(() => {
            generateQuestion();
        }, 1500);
    }
}

function unlockLevel() {
    const level = mathLevels[currentLevel];
    const message = document.getElementById('unlockMessage');
    message.textContent = `🎉 Nível ${currentLevel} Completo! ${level.unlock} Desbloqueadas!`;
    message.classList.add('show');

    // Desbloquear peças do nível
    document.querySelectorAll(`.part-item[data-level="${currentLevel}"]`).forEach(item => {
        item.classList.remove('locked');
        const lockIcon = item.querySelector('.lock-icon');
        if (lockIcon) lockIcon.remove();
    });

    setTimeout(() => {
        message.classList.remove('show');
        correctAnswers = 0;
        currentLevel++;
        document.getElementById('currentLevel').textContent = currentLevel;
        document.getElementById('correctAnswers').textContent = correctAnswers;

        if (currentLevel <= 6) {
            generateQuestion();
        } else {
            message.textContent = '🏆 Parabéns! Todas as peças desbloqueadas!';
            message.classList.add('show');
            document.getElementById('questionContainer').innerHTML = '<p style="text-align: center; color: #51cf66; font-weight: bold;">✨ Modo Livre Ativado! ✨</p>';
        }
    }, 3000);
}

// Iniciar quiz
generateQuestion();

// Estado do robô
let robotParts = {
    head: '🤖',
    body: '📦',
    'arm-left': '🦾',
    'arm-right': '🦾',
    legs: '🦿',
    weapon: null,
    accessory: null
};

let currentColor = null;
let savedRobots = JSON.parse(localStorage.getItem('savedRobots') || '[]');

// Adicionar peça ao robô
document.querySelectorAll('.part-item').forEach(item => {
    item.addEventListener('click', function() {
        // Verificar se está bloqueado
        if (this.classList.contains('locked')) {
            alert('🔒 Desbloqueie esta peça respondendo perguntas de matemática!');
            return;
        }

        const partType = this.dataset.part;
        const emoji = this.dataset.emoji;
        
        // Efeito visual
        this.style.transform = 'scale(1.2) rotate(360deg)';
        setTimeout(() => {
            this.style.transform = '';
        }, 300);
        
        robotParts[partType] = emoji;
        updateRobot();
        updateStats();
    });
});

// Atualizar robô visual
function updateRobot() {
    Object.keys(robotParts).forEach(partType => {
        const part = document.querySelector(`.robot-${partType}`);
        if (part && robotParts[partType]) {
            part.textContent = robotParts[partType];
            if (currentColor) {
                part.style.filter = `drop-shadow(0 0 10px ${currentColor})`;
            }
        } else if (part && !robotParts[partType]) {
            part.textContent = '';
        }
    });

    // Adicionar ou remover peças especiais
    let weaponEl = document.querySelector('.robot-weapon');
    if (robotParts.weapon && !weaponEl) {
        weaponEl = document.createElement('div');
        weaponEl.className = 'robot-part robot-weapon';
        weaponEl.dataset.part = 'weapon';
        document.getElementById('robotCanvas').appendChild(weaponEl);
    }
    if (weaponEl) weaponEl.textContent = robotParts.weapon || '';

    let accessoryEl = document.querySelector('.robot-accessory');
    if (robotParts.accessory && !accessoryEl) {
        accessoryEl = document.createElement('div');
        accessoryEl.className = 'robot-part robot-accessory';
        accessoryEl.dataset.part = 'accessory';
        document.getElementById('robotCanvas').appendChild(accessoryEl);
    }
    if (accessoryEl) accessoryEl.textContent = robotParts.accessory || '';
}

// Sistema de cores
document.querySelectorAll('.color-option').forEach(option => {
    option.addEventListener('click', function() {
        document.querySelectorAll('.color-option').forEach(o => o.classList.remove('selected'));
        this.classList.add('selected');
        currentColor = this.dataset.color;
        
        document.querySelectorAll('.robot-part').forEach(part => {
            part.style.filter = `drop-shadow(0 0 15px ${currentColor})`;
        });
    });
});

// Atualizar estatísticas
function updateStats() {
    let power = 30;
    let defense = 30;
    let speed = 30;

    // Calcular baseado nas peças
    if (robotParts.weapon) power += 40;
    if (robotParts.body) defense += 30;
    if (robotParts.legs) speed += 40;
    if (robotParts.accessory) {
        power += 10;
        defense += 10;
        speed += 10;
    }

    power = Math.min(power, 100);
    defense = Math.min(defense, 100);
    speed = Math.min(speed, 100);

    document.getElementById('powerValue').textContent = power;
    document.getElementById('powerBar').style.width = power + '%';
    
    document.getElementById('defenseValue').textContent = defense;
    document.getElementById('defenseBar').style.width = defense + '%';
    
    document.getElementById('speedValue').textContent = speed;
    document.getElementById('speedBar').style.width = speed + '%';
}

// Animações
function animateRobot(type) {
    const canvas = document.getElementById('robotCanvas');
    canvas.classList.remove('dance', 'jump', 'spin');
    setTimeout(() => {
        canvas.classList.add(type);
        setTimeout(() => canvas.classList.remove(type), 3000);
    }, 10);
}

// Robô aleatório
function randomRobot() {
    const heads = ['🤖', '👾', '🦾', '🎮', '👽', '🤡'];
    const bodies = ['📦', '🎮', '📺', '🎰', '🎪'];
    const arms = ['🦾', '✊', '👊', '🤜'];
    const legs = ['🦿', '⚙️', '🛞', '⭕'];
    const weapons = ['🔫', '⚔️', '🔨', '🪓', '🏹', '🔪'];
    const accessories = ['👑', '🎩', '🕶️', '🦴', '🎀', '⭐'];

    robotParts = {
        head: heads[Math.floor(Math.random() * heads.length)],
        body: bodies[Math.floor(Math.random() * bodies.length)],
        'arm-left': arms[Math.floor(Math.random() * arms.length)],
        'arm-right': arms[Math.floor(Math.random() * arms.length)],
        legs: legs[Math.floor(Math.random() * legs.length)],
        weapon: weapons[Math.floor(Math.random() * weapons.length)],
        accessory: accessories[Math.floor(Math.random() * accessories.length)]
    };

    updateRobot();
    updateStats();
    animateRobot('spin');
}

// Salvar robô
function saveRobot() {
    const robotName = prompt('Dê um nome para seu robô:', 'Robô ' + (savedRobots.length + 1));
    if (!robotName) return;

    const robot = {
        name: robotName,
        parts: {...robotParts},
        color: currentColor,
        date: new Date().toLocaleString()
    };

    savedRobots.push(robot);
    localStorage.setItem('savedRobots', JSON.stringify(savedRobots));
    updateGallery();
    
    alert('🎉 Robô salvo com sucesso!');
}

// Limpar robô
function clearRobot() {
    if (confirm('Tem certeza que deseja limpar o robô?')) {
        robotParts = {
            head: '🤖',
            body: '📦',
            'arm-left': '🦾',
            'arm-right': '🦾',
            legs: '🦿',
            weapon: null,
            accessory: null
        };
        currentColor = null;
        updateRobot();
        updateStats();
        document.querySelectorAll('.color-option').forEach(o => o.classList.remove('selected'));
    }
}

// Atualizar galeria
function updateGallery() {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = '';
    
    savedRobots.forEach((robot, index) => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.innerHTML = `
            <div class="gallery-robot">${robot.parts.head || '🤖'}</div>
            <div class="gallery-name">${robot.name}</div>
        `;
        item.addEventListener('click', () => loadRobot(index));
        gallery.appendChild(item);
    });
}

// Carregar robô da galeria
function loadRobot(index) {
    const robot = savedRobots[index];
    robotParts = {...robot.parts};
    currentColor = robot.color;
    updateRobot();
    updateStats();
    
    if (currentColor) {
        document.querySelectorAll('.color-option').forEach(option => {
            option.classList.toggle('selected', option.dataset.color === currentColor);
        });
    }
    
    animateRobot('jump');
}

// Inicializar
updateRobot();
updateStats();
updateGallery();

// Arrastar peças do robô
let draggedElement = null;
let offsetX, offsetY;

document.addEventListener('mousedown', (e) => {
    if (e.target.classList.contains('robot-part')) {
        draggedElement = e.target;
        const rect = draggedElement.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
        draggedElement.style.cursor = 'grabbing';
    }
});

document.addEventListener('mousemove', (e) => {
    if (draggedElement) {
        const canvas = document.getElementById('robotCanvas');
        const canvasRect = canvas.getBoundingClientRect();
        
        let x = e.clientX - canvasRect.left - offsetX;
        let y = e.clientY - canvasRect.top - offsetY;
        
        draggedElement.style.left = x + 'px';
        draggedElement.style.top = y + 'px';
        draggedElement.style.transform = 'none';
    }
});

document.addEventListener('mouseup', () => {
// Mensagem de boas-vindas
setTimeout(() => {
    alert('🤖 Bem-vindo à Fábrica de Robôs! 🤖\n\n📚 Responda perguntas de matemática para desbloquear peças!\n🎯 5 respostas corretas = 1 nível completo\n✨ 6 níveis para desbloquear todas as peças\n🎨 Personalize e divirta-se!\n\nBoa sorte! 🚀');
}, 500);
});

// Mensagem de boas-vindas
setTimeout(() => {
    alert('🤖 Bem-vindo à Fábrica de Robôs! 🤖\n\n✨ Clique nas peças para adicionar ao robô\n🎨 Escolha cores para personalizar\n💾 Salve seus robôs favoritos\n🎬 Faça seu robô dançar!\n\nDivirta-se criando! 🚀');
}, 500);
