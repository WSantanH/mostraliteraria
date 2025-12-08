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

// Criar detalhes humanoides do corpo do robô
function createRobotBodyDetails() {
    const bodyPart = document.querySelector('.robot-body');
    if (!bodyPart) return;
    
    // Limpar detalhes existentes
    bodyPart.querySelectorAll('[class*="robot-body-"]').forEach(el => el.remove());
    bodyPart.querySelectorAll('.robot-hand-left, .robot-hand-right').forEach(el => el.remove());
    
    // Painéis laterais
    const detailLeft = document.createElement('div');
    detailLeft.className = 'robot-body-detail-left';
    bodyPart.appendChild(detailLeft);
    
    const detailRight = document.createElement('div');
    detailRight.className = 'robot-body-detail-right';
    bodyPart.appendChild(detailRight);
    
    // Ombros
    const shoulderLeft = document.createElement('div');
    shoulderLeft.className = 'robot-body-shoulder-left';
    bodyPart.appendChild(shoulderLeft);
    
    const shoulderRight = document.createElement('div');
    shoulderRight.className = 'robot-body-shoulder-right';
    bodyPart.appendChild(shoulderRight);
    
    // Base/cintura
    const base = document.createElement('div');
    base.className = 'robot-body-base';
    bodyPart.appendChild(base);
    
    // Criar MÃOS
    createRobotHands();
}

// Criar mãos do robô para segurar armas/acessórios
function createRobotHands() {
    const bodyPart = document.querySelector('.robot-body');
    if (!bodyPart) return;
    
    // Remover mãos existentes
    bodyPart.querySelectorAll('.robot-hand-left, .robot-hand-right').forEach(el => el.remove());
    
    // Mão esquerda
    const handLeft = document.createElement('div');
    handLeft.className = 'robot-hand-left';
    bodyPart.appendChild(handLeft);
    
    // Mão direita (onde fica a arma)
    const handRight = document.createElement('div');
    handRight.className = 'robot-hand-right';
    bodyPart.appendChild(handRight);
}

// Sistema de Quiz de Matemática
let currentLevel = 1;
let correctAnswers = 0;
let currentQuestion = null;

const mathLevels = {
    1: { name: 'Básico', unlock: 'Cabeças', operation: 'add', max: 10 },
    2: { name: 'Intermediário', unlock: 'Armas', operation: 'multiply', max: 10 },
    3: { name: 'Avançado', unlock: 'Acessórios', operation: 'mixed', max: 20 }
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

        if (currentLevel <= 3) {
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

// Estado do robô - suporta múltiplas peças do mesmo tipo
let robotParts = {
    heads: [], // Múltiplas cabeças
    body: null,
    arms: [], // Múltiplos braços
    legs: null,
    weapons: [], // Múltiplas armas
    accessory: null
};

let currentColor = null;
let savedRobots = JSON.parse(localStorage.getItem('savedRobots') || '[]');

// Adicionar peça ao robô - criar elemento no canvas
document.querySelectorAll('.part-item').forEach(item => {
    item.addEventListener('click', function() {
        // Verificar se está bloqueado
        if (this.classList.contains('locked')) {
            alert('🔒 Desbloqueie esta peça respondendo perguntas de matemática!');
            return;
        }

        const partType = this.dataset.part;
        const emoji = this.dataset.emoji;
        const bodyStyle = this.dataset.bodyStyle;
        
        // Efeito visual
        this.style.transform = 'scale(1.2) rotate(360deg)';
        setTimeout(() => {
            this.style.transform = '';
        }, 300);
        
        // Tipos que permitem múltiplas peças
        const multipleTypes = ['head', 'arm-left', 'arm-right', 'weapon'];
        
        if (partType === 'body') {
            // Corpo - apenas um, mas pode trocar estilo
            let existingBody = document.querySelector('.robot-body');
            if (existingBody) {
                if (bodyStyle) changeBodyStyle(bodyStyle);
            } else {
                robotParts.body = { emoji: '', bodyStyle: bodyStyle };
                addPartToCanvas(partType, emoji, bodyStyle);
            }
        } else if (multipleTypes.includes(partType)) {
            // Criar nova peça (permite múltiplas)
            addPartToCanvas(partType, emoji, bodyStyle);
            
            // Armazenar no array apropriado
            if (partType === 'head') {
                robotParts.heads.push({ emoji, bodyStyle });
            } else if (partType === 'arm-left' || partType === 'arm-right') {
                robotParts.arms.push({ emoji, type: partType });
            } else if (partType === 'weapon') {
                robotParts.weapons.push(emoji);
            }
        } else {
            // Peças únicas (pernas, acessórios)
            let existingPart = document.querySelector(`.robot-${partType}`);
            if (existingPart) {
                if (partType !== 'body') {
                    existingPart.textContent = emoji;
                }
                robotParts[partType] = emoji;
            } else {
                robotParts[partType] = emoji;
                addPartToCanvas(partType, emoji, bodyStyle);
            }
        }
        
        updateStats();
    });
});

// Adicionar peça ao canvas
function addPartToCanvas(partType, emoji, bodyStyle) {
    const canvas = document.getElementById('robotCanvas');
    
    // Remover mensagem de início se existir
    const initialMessage = canvas.querySelector('div:not(.robot-part)');
    if (initialMessage && initialMessage.innerHTML.includes('Desbloqueie')) {
        initialMessage.remove();
    }
    
    const part = document.createElement('div');
    part.className = `robot-part robot-${partType}`;
    part.dataset.part = partType;
    
    // Verificar quantas peças do mesmo tipo já existem
    const existingCount = canvas.querySelectorAll(`.robot-${partType}`).length;
    
    // Posições iniciais sugeridas
    const basePositions = {
        head: { top: '10%', left: '50%' },
        body: { top: '30%', left: '50%' },
        'arm-left': { top: '35%', left: '30%' },
        'arm-right': { top: '35%', left: '70%' },
        legs: { top: '60%', left: '50%' },
        weapon: { top: '40%', left: '75%' },
        accessory: { top: '5%', left: '50%' }
    };
    
    // Se já existem peças do mesmo tipo, posicionar de forma distribuída
    if (existingCount > 0) {
        const offset = existingCount * 15; // Offset de 15% para cada nova peça
        const randomTop = Math.random() * 60 + 10; // Entre 10% e 70%
        const randomLeft = Math.random() * 60 + 20; // Entre 20% e 80%
        part.style.top = randomTop + '%';
        part.style.left = randomLeft + '%';
    } else if (basePositions[partType]) {
        part.style.top = basePositions[partType].top;
        part.style.left = basePositions[partType].left;
    }
    
    // Adicionar conteúdo (texto emoji)
    if (partType !== 'body') {
        part.textContent = emoji;
    }
    
    // Adicionar ao canvas PRIMEIRO
    canvas.appendChild(part);
    
    // Corpo é especial - criar detalhes DEPOIS de adicionar ao DOM
    if (partType === 'body') {
        createRobotBodyDetails();
    }
    
    // Animação de entrada
    part.style.animation = 'fadeInScale 0.5s ease';
}

// Mudar estilo do corpo baseado na cabeça
function changeBodyStyle(style) {
    const bodyPart = document.querySelector('.robot-body');
    if (!bodyPart) return;
    
    // Remover todas as classes de estilo
    bodyPart.classList.remove('alien-body', 'skeleton-body', 'eagle-body');
    
    // Adicionar nova classe se não for clássico
    if (style !== 'classic') {
        bodyPart.classList.add(style + '-body');
    }
}

// Atualizar robô visual - apenas atualiza peças existentes
function updateRobot() {
    Object.keys(robotParts).forEach(partType => {
        const part = document.querySelector(`.robot-${partType}`);
        
        if (part && robotParts[partType]) {
            // Atualizar apenas peças que não são corpo
            if (partType !== 'body') {
                part.textContent = robotParts[partType];
            }
            if (currentColor) {
                part.style.filter = `drop-shadow(0 0 10px ${currentColor})`;
            }
        }
    });
    
    // Recriar detalhes do corpo se existir
    if (document.querySelector('.robot-body')) {
        createRobotBodyDetails();
    }
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
    power += robotParts.weapons.length * 15; // Cada arma adiciona 15 de poder
    power += robotParts.heads.length * 10; // Cada cabeça adiciona 10 de poder
    
    if (robotParts.body) {
        defense += 30;
        // Corpo de dragão dá bônus extra
        if (robotParts.body.bodyStyle === 'dragon') {
            defense += 20;
            power += 20;
        }
    }
    
    if (robotParts.legs) speed += 40;
    
    speed += robotParts.arms.length * 8; // Cada braço adiciona velocidade
    
    if (robotParts.accessory) {
        power += 10;
        defense += 10;
        speed += 10;
    }

    power = Math.min(power, 150); // Aumentar limite por causa de múltiplas peças
    defense = Math.min(defense, 150);
    speed = Math.min(speed, 150);

    document.getElementById('powerValue').textContent = power;
    document.getElementById('powerBar').style.width = (power / 150 * 100) + '%';
    
    document.getElementById('defenseValue').textContent = defense;
    document.getElementById('defenseBar').style.width = (defense / 150 * 100) + '%';
    
    document.getElementById('speedValue').textContent = speed;
    document.getElementById('speedBar').style.width = (speed / 150 * 100) + '%';
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

// Robô aleatório - apenas com peças desbloqueadas
function randomRobot() {
    // Limpar robô atual
    document.getElementById('robotCanvas').innerHTML = '';
    
    // Resetar arrays
    robotParts.heads = [];
    robotParts.arms = [];
    robotParts.weapons = [];
    
    // Pegar apenas peças desbloqueadas
    
    // Corpo
    const bodies = Array.from(document.querySelectorAll('.part-item[data-part="body"]:not(.locked)'));
    if (bodies.length > 0) {
        const randomBody = bodies[Math.floor(Math.random() * bodies.length)];
        robotParts.body = { emoji: '', bodyStyle: randomBody.dataset.bodyStyle || 'classic' };
        addPartToCanvas('body', '', robotParts.body.bodyStyle);
    }
    
    // Cabeças (1-3 aleatórias)
    const heads = Array.from(document.querySelectorAll('.part-item[data-part="head"]:not(.locked)'));
    if (heads.length > 0) {
        const numHeads = Math.min(Math.floor(Math.random() * 3) + 1, heads.length);
        for (let i = 0; i < numHeads; i++) {
            const randomHead = heads[Math.floor(Math.random() * heads.length)];
            const headData = { emoji: randomHead.dataset.emoji, bodyStyle: randomHead.dataset.bodyStyle };
            robotParts.heads.push(headData);
            addPartToCanvas('head', headData.emoji, headData.bodyStyle);
        }
    }
    
    // Braços (2-4 aleatórios)
    const armsLeft = Array.from(document.querySelectorAll('.part-item[data-part="arm-left"]:not(.locked)'));
    const armsRight = Array.from(document.querySelectorAll('.part-item[data-part="arm-right"]:not(.locked)'));
    if (armsLeft.length > 0) {
        const numArms = Math.min(Math.floor(Math.random() * 3) + 2, 4);
        for (let i = 0; i < numArms; i++) {
            const isLeft = i % 2 === 0;
            const armType = isLeft ? 'arm-left' : 'arm-right';
            const armList = isLeft ? armsLeft : armsRight;
            const randomArm = armList[Math.floor(Math.random() * armList.length)];
            const armData = { emoji: randomArm.dataset.emoji, type: armType };
            robotParts.arms.push(armData);
            addPartToCanvas(armType, armData.emoji, null);
        }
    }
    
    // Pernas
    const legs = Array.from(document.querySelectorAll('.part-item[data-part="legs"]:not(.locked)'));
    if (legs.length > 0) {
        const randomLeg = legs[Math.floor(Math.random() * legs.length)];
        robotParts.legs = randomLeg.dataset.emoji;
        addPartToCanvas('legs', robotParts.legs, null);
    }
    
    // Armas (1-3 aleatórias)
    const weapons = Array.from(document.querySelectorAll('.part-item[data-part="weapon"]:not(.locked)'));
    if (weapons.length > 0) {
        const numWeapons = Math.min(Math.floor(Math.random() * 3) + 1, weapons.length);
        for (let i = 0; i < numWeapons; i++) {
            const randomWeapon = weapons[Math.floor(Math.random() * weapons.length)];
            robotParts.weapons.push(randomWeapon.dataset.emoji);
            addPartToCanvas('weapon', randomWeapon.dataset.emoji, null);
        }
    }
    
    // Acessório
    const accessories = Array.from(document.querySelectorAll('.part-item[data-part="accessory"]:not(.locked)'));
    if (accessories.length > 0) {
        const randomAccessory = accessories[Math.floor(Math.random() * accessories.length)];
        robotParts.accessory = randomAccessory.dataset.emoji;
        addPartToCanvas('accessory', robotParts.accessory, null);
    }

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
    if (confirm('Tem certeza que deseja desmontar o robô?')) {
        robotParts = {
            heads: [],
            body: null,
            arms: [],
            legs: null,
            weapons: [],
            accessory: null
        };
        currentColor = null;
        
        // Remover todas as peças do canvas
        const canvas = document.getElementById('robotCanvas');
        canvas.innerHTML = '';
        
        // Adicionar mensagem inicial de volta
        const message = document.createElement('div');
        message.style.cssText = 'position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center; color: #999; font-size: 1.2em;';
        message.innerHTML = '🔧<br>Desbloqueie e arraste<br>as peças para montar<br>seu robô!';
        canvas.appendChild(message);
        
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
        const displayHead = robot.parts.heads && robot.parts.heads.length > 0 ? robot.parts.heads[0].emoji : '🤖';
        item.innerHTML = `
            <div class="gallery-robot">${displayHead}</div>
            <div class="gallery-name">${robot.name}</div>
        `;
        item.addEventListener('click', () => loadRobot(index));
        gallery.appendChild(item);
    });
}

// Carregar robô da galeria
function loadRobot(index) {
    const robot = savedRobots[index];
    
    // Limpar canvas
    const canvas = document.getElementById('robotCanvas');
    canvas.innerHTML = '';
    
    // Restaurar estado do robô
    robotParts = JSON.parse(JSON.stringify(robot.parts));
    
    // Recriar corpo se existir
    if (robotParts.body) {
        addPartToCanvas('body', '', robotParts.body.bodyStyle);
    }
    
    // Recriar cabeças
    if (robotParts.heads) {
        robotParts.heads.forEach(head => {
            addPartToCanvas('head', head.emoji, head.bodyStyle);
        });
    }
    
    // Recriar braços
    if (robotParts.arms) {
        robotParts.arms.forEach(arm => {
            addPartToCanvas(arm.type, arm.emoji, null);
        });
    }
    
    // Recriar pernas
    if (robotParts.legs) {
        addPartToCanvas('legs', robotParts.legs, null);
    }
    
    // Recriar armas
    if (robotParts.weapons) {
        robotParts.weapons.forEach(weapon => {
            addPartToCanvas('weapon', weapon, null);
        });
    }
    
    // Recriar acessório
    if (robotParts.accessory) {
        addPartToCanvas('accessory', robotParts.accessory, null);
    }
    
    currentColor = robot.color;
    updateStats();
    
    if (currentColor) {
        document.querySelectorAll('.color-option').forEach(option => {
            option.classList.toggle('selected', option.dataset.color === currentColor);
        });
        document.querySelectorAll('.robot-part').forEach(part => {
            part.style.filter = `drop-shadow(0 0 15px ${currentColor})`;
        });
    }
    
    animateRobot('jump');
}

// Inicializar
updateStats();
updateGallery();

// Mostrar mensagem de início
const canvas = document.getElementById('robotCanvas');
if (canvas.children.length === 0) {
    const message = document.createElement('div');
    message.style.cssText = 'position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center; color: #999; font-size: 1.2em;';
    message.innerHTML = '🔧<br>Desbloqueie e arraste<br>as peças para montar<br>seu robô!';
    canvas.appendChild(message);
}

// Arrastar peças do robô
let draggedElement = null;
let offsetX, offsetY;
let isDragging = false;

document.addEventListener('mousedown', (e) => {
    if (e.target.classList.contains('robot-part')) {
        e.preventDefault();
        isDragging = false;
        draggedElement = e.target;
        const rect = draggedElement.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
        draggedElement.style.cursor = 'grabbing';
    }
});

document.addEventListener('mousemove', (e) => {
    if (draggedElement) {
        isDragging = true;
        e.preventDefault();
        const canvas = document.getElementById('robotCanvas');
        const canvasRect = canvas.getBoundingClientRect();
        
        let x = e.clientX - canvasRect.left - offsetX;
        let y = e.clientY - canvasRect.top - offsetY;
        
        // Limitar movimento dentro do canvas
        x = Math.max(0, Math.min(x, canvasRect.width - 50));
        y = Math.max(0, Math.min(y, canvasRect.height - 50));
        
        draggedElement.style.left = x + 'px';
        draggedElement.style.top = y + 'px';
        draggedElement.style.transform = 'none';
    }
});

document.addEventListener('mouseup', () => {
    if (draggedElement) {
        draggedElement.style.cursor = 'move';
        draggedElement = null;
    }
    isDragging = false;
});

// Suporte para toque (mobile)
document.addEventListener('touchstart', (e) => {
    if (e.target.classList.contains('robot-part')) {
        e.preventDefault();
        isDragging = false;
        draggedElement = e.target;
        const touch = e.touches[0];
        const rect = draggedElement.getBoundingClientRect();
        offsetX = touch.clientX - rect.left;
        offsetY = touch.clientY - rect.top;
    }
}, { passive: false });

document.addEventListener('touchmove', (e) => {
    if (draggedElement) {
        isDragging = true;
        e.preventDefault();
        const touch = e.touches[0];
        const canvas = document.getElementById('robotCanvas');
        const canvasRect = canvas.getBoundingClientRect();
        
        let x = touch.clientX - canvasRect.left - offsetX;
        let y = touch.clientY - canvasRect.top - offsetY;
        
        x = Math.max(0, Math.min(x, canvasRect.width - 50));
        y = Math.max(0, Math.min(y, canvasRect.height - 50));
        
        draggedElement.style.left = x + 'px';
        draggedElement.style.top = y + 'px';
        draggedElement.style.transform = 'none';
    }
}, { passive: false });

document.addEventListener('touchend', () => {
    if (draggedElement) {
        draggedElement.style.cursor = 'move';
        draggedElement = null;
    }
    isDragging = false;
});

// Mensagem de boas-vindas (apenas uma vez)
let welcomeShown = sessionStorage.getItem('welcomeShown');
if (!welcomeShown) {
    setTimeout(() => {
        alert('🤖 Bem-vindo à Mostra Literária! 🤖\n\n📚 Responda perguntas de matemática para desbloquear peças!\n🎯 5 respostas corretas = 1 nível completo\n\nNível 1: Cabeças Básicas + Corpo + Braços + Pernas\nNível 2: 🐲 CORPO DE DRAGÃO + Cabeças Épicas + Braços Extra + Armas\nNível 3: Acessórios\n\n🔥 NOVIDADE: Equipe MÚLTIPLAS cabeças, braços e armas!\n🐉 Corpo de Dragão Robótico é ÉPICO!\n🔧 Monte seu robô arrastando as peças!\n🎨 Personalize com cores e animações!\n\nBoa sorte! 🚀');
        sessionStorage.setItem('welcomeShown', 'true');
    }, 500);
}
