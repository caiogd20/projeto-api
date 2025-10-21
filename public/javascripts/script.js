const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const resourcesDisplay = document.getElementById('resources');
const energyDisplay = document.getElementById('energy');

// Estado do jogo
const gameState = {
    resources: 100,
    energy: 50,
    selectedTool: 'hand',
    camera: { x: 0, y: 0, zoom: 1 },
    entities: [],
    resourcesNodes: [
        { x: 300, y: 200, type: 'iron', amount: 100 },
        { x: 500, y: 350, type: 'copper', amount: 100 }
    ]
};

// Ferramentas disponíveis
const tools = {
    hand: { name: 'Mão', cost: 0 },
    miner: { name: 'Minerador', cost: 15 },
    belt: { name: 'Esteira', cost: 5 },
    factory: { name: 'Fábrica', cost: 30 }
};

// Event listeners para ferramentas
document.querySelectorAll('.tool').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelector('.tool.active').classList.remove('active');
        button.classList.add('active');
        gameState.selectedTool = button.dataset.tool;
    });
});

// Controles de câmera
let isDragging = false;
let lastX = 0, lastY = 0;

canvas.addEventListener('mousedown', e => {
    isDragging = true;
    lastX = e.clientX;
    lastY = e.clientY;
    canvas.style.cursor = 'grabbing';
});

canvas.addEventListener('mousemove', e => {
    if (isDragging) {
        gameState.camera.x -= (e.clientX - lastX) / gameState.camera.zoom;
        gameState.camera.y -= (e.clientY - lastY) / gameState.camera.zoom;
        lastX = e.clientX;
        lastY = e.clientY;
    }
});

canvas.addEventListener('mouseup', () => {
    isDragging = false;
    canvas.style.cursor = 'default';
});

canvas.addEventListener('mouseleave', () => {
    isDragging = false;
    canvas.style.cursor = 'default';
});

// Zoom com scroll
canvas.addEventListener('wheel', e => {
    e.preventDefault();
    const zoomIntensity = 0.1;
    const zoom = Math.max(0.5, Math.min(2, gameState.camera.zoom - e.deltaY * zoomIntensity / 100));
    gameState.camera.zoom = zoom;
});

// Construção
canvas.addEventListener('click', e => {
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / gameState.camera.zoom + gameState.camera.x;
    const y = (e.clientY - rect.top) / gameState.camera.zoom + gameState.camera.y;
    
    // Verificar se tem recursos suficientes
    const tool = tools[gameState.selectedTool];
    if (gameState.resources < tool.cost) return;
    
    switch(gameState.selectedTool) {
        case 'miner':
            gameState.entities.push({
                type: 'miner',
                x: Math.floor(x / 32) * 32,
                y: Math.floor(y / 32) * 32,
                progress: 0
            });
            gameState.resources -= tool.cost;
            break;
            
        case 'belt':
            gameState.entities.push({
                type: 'belt',
                x: Math.floor(x / 32) * 32,
                y: Math.floor(y / 32) * 32,
                direction: 'right'
            });
            gameState.resources -= tool.cost;
            break;
            
        case 'factory':
            gameState.entities.push({
                type: 'factory',
                x: Math.floor(x / 32) * 32,
                y: Math.floor(y / 32) * 32,
                recipe: 'circuit',
                progress: 0
            });
            gameState.resources -= tool.cost;
            break;
    }
    
    updateUI();
});

// Teclado
document.addEventListener('keydown', e => {
    if (e.code === 'Space') {
        gameState.resources += 10;
        updateUI();
    }
});

// Atualizar UI
function updateUI() {
    resourcesDisplay.textContent = gameState.resources;
    energyDisplay.textContent = gameState.energy;
}

// Renderização
function render() {
    // Limpar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Aplicar transformações da câmera
    ctx.save();
    ctx.scale(gameState.camera.zoom, gameState.camera.zoom);
    ctx.translate(-gameState.camera.x, -gameState.camera.y);
    
    // Grade de fundo
    drawGrid();
    
    // Recursos naturais
    gameState.resourcesNodes.forEach(node => {
        ctx.fillStyle = node.type === 'iron' ? '#b3b3b3' : '#ff9933';
        ctx.beginPath();
        ctx.arc(node.x, node.y, 15, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#000';
        ctx.font = '12px Arial';
        ctx.fillText(`${node.amount}`, node.x - 10, node.y + 5);
    });
    
    // Entidades
    gameState.entities.forEach(entity => {
        switch(entity.type) {
            case 'miner':
                ctx.fillStyle = '#3498db';
                ctx.fillRect(entity.x, entity.y, 32, 32);
                ctx.fillStyle = '#2c3e50';
                ctx.fillRect(entity.x + 4, entity.y + 4, 24, 24);
                break;
                
            case 'belt':
                ctx.fillStyle = '#e67e22';
                ctx.fillRect(entity.x, entity.y, 32, 10);
                ctx.fillStyle = '#d35400';
                // Setas
                for(let i = 0; i < 3; i++) {
                    ctx.fillRect(entity.x + 5 + i * 10, entity.y + 2, 5, 6);
                }
                break;
                
            case 'factory':
                ctx.fillStyle = '#9b59b6';
                ctx.fillRect(entity.x, entity.y, 64, 64);
                ctx.fillStyle = '#8e44ad';
                ctx.fillRect(entity.x + 5, entity.y + 5, 54, 54);
                break;
        }
    });
    
    ctx.restore();
    
    requestAnimationFrame(render);
}

function drawGrid() {
    ctx.strokeStyle = '#34495e';
    ctx.lineWidth = 1;
    
    const cellSize = 32;
    const startX = Math.floor(gameState.camera.x / cellSize) * cellSize;
    const startY = Math.floor(gameState.camera.y / cellSize) * cellSize;
    
    for(let x = startX; x < startX + canvas.width / gameState.camera.zoom + cellSize; x += cellSize) {
        ctx.beginPath();
        ctx.moveTo(x, startY);
        ctx.lineTo(x, startY + canvas.height / gameState.camera.zoom);
        ctx.stroke();
    }
    
    for(let y = startY; y < startY + canvas.height / gameState.camera.zoom + cellSize; y += cellSize) {
        ctx.beginPath();
        ctx.moveTo(startX, y);
        ctx.lineTo(startX + canvas.width / gameState.camera.zoom, y);
        ctx.stroke();
    }
}

// Iniciar o jogo
updateUI();
render();