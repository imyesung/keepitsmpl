document.addEventListener('DOMContentLoaded', () => {
    let currentScene = "start";
    const app = document.getElementById('app');
    const mainImage = document.getElementById('main-image');
    const emphasisOverlay = document.getElementById('emphasis-overlay');
    const storyText = document.getElementById('story-text');
    const choicesContainer = document.getElementById('choices-container');
    const startBtn = document.getElementById('start-btn');
    const coinTypography = document.getElementById('coin-typography');

    const story = [
        {
          "id": "start",
          "background": "/api/placeholder/414/736",
          "emphasizedText": "운명의 동전",
          "storySegments": [
            "단순하게 살아야돼.",
            "남자가 얼굴을 찡그린다.",
            "언덕 너머, 폐허가 된 주유소.",
            "햇빛에 달궈진 아스팔트 위로 아지랑이가 피어오른다.",
            "25센트짜리 쿼터.",
            "그는 중얼거린다. \"단순하게 살아야 편해.\""
          ],
          "choices": [
            { "text": "계속", "nextScene": "confrontation" }
          ]
        },
        // 여기에 다른 장면들을 추가하세요.
    ];

    function startGame() {
        console.log("Game started"); // 디버깅을 위한 로그
        if (startBtn) startBtn.style.display = 'none';
        if (coinTypography) coinTypography.style.display = 'none';
        if (app) app.classList.add('show-content');
        updateScene();
    }

    function typeWriter(text, element, speed = 50) {
        let i = 0;
        element.innerHTML = '';
        return new Promise((resolve) => {
            function type() {
                if (i < text.length) {
                    element.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                } else {
                    resolve();
                }
            }
            type();
        });
    }

    async function updateScene() {
        console.log("Updating scene:", currentScene); // 디버깅을 위한 로그
        const scene = story.find(s => s.id === currentScene);
        if (!scene) {
            console.error("Scene not found:", currentScene);
            return;
        }
        
        if (app) app.classList.remove('show-content');
        
        await new Promise(resolve => setTimeout(resolve, 500));
        
        if (mainImage) mainImage.src = scene.background;
        if (emphasisOverlay) emphasisOverlay.textContent = scene.emphasizedText;
        
        if (storyText) storyText.innerHTML = '';
        if (choicesContainer) choicesContainer.innerHTML = '';
        
        if (app) app.classList.add('show-content');
        
        for (let segment of scene.storySegments) {
            await typeWriter(segment, storyText);
            await waitForClick();
            if (storyText) storyText.innerHTML += '<br><br>';
        }
        
        scene.choices.forEach(choice => {
            const button = document.createElement('button');
            button.textContent = choice.text;
            button.className = 'choice-btn';
            button.onclick = () => {
                currentScene = choice.nextScene;
                updateScene();
            };
            if (choicesContainer) choicesContainer.appendChild(button);
        });
    }

    function waitForClick() {
        return new Promise(resolve => {
            const clickHandler = () => {
                document.removeEventListener('click', clickHandler);
                resolve();
            };
            document.addEventListener('click', clickHandler);
        });
    }

    if (startBtn) {
        startBtn.addEventListener('click', startGame);
        console.log("Toss button event listener added"); // 디버깅을 위한 로그
    } else {
        console.error("Start button not found");
    }

    const style = document.createElement('style');
    style.textContent = `
        #app {
            opacity: 0;
            transition: opacity 0.5s ease-in-out;
        }
        #app.show-content {
            opacity: 1;
        }
    `;
    document.head.appendChild(style);

    console.log("Game script loaded successfully");
});