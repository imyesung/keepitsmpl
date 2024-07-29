let currentScene = "start";
const app = document.getElementById('app');
const mainImage = document.getElementById('main-image');
const emphasizedText = document.getElementById('emphasized-text');
const storyText = document.getElementById('story-text');
const choicesContainer = document.getElementById('choices-container');
const mainTitle = document.getElementById('main-title');
const startBtn = document.getElementById('start-btn');

function startGame() {
    mainTitle.style.display = 'none';
    startBtn.style.display = 'none';
    updateScene();
    setTimeout(() => {
        app.classList.add('show-content');
    }, 100);
}

function updateScene() {
    const scene = story.find(s => s.id === currentScene);
    mainImage.src = scene.background;
    emphasizedText.textContent = scene.emphasizedText;
    storyText.textContent = scene.storyText;
    
    choicesContainer.innerHTML = '';
    scene.choices.forEach(choice => {
        const button = document.createElement('button');
        button.textContent = choice.text;
        button.className = 'choice-btn';
        button.onclick = () => {
            currentScene = choice.nextScene;
            app.classList.remove('show-content');
            setTimeout(() => {
                updateScene();
                app.classList.add('show-content');
            }, 500);
        };
        choicesContainer.appendChild(button);
    });
}

startBtn.addEventListener('click', startGame);