document.addEventListener('DOMContentLoaded', () => {
    let currentScene = "start";
    const app = document.getElementById('app');
    const mainImage = document.getElementById('main-image');
    const storyText = document.getElementById('story-text');
    const choicesContainer = document.getElementById('choices-container');
    const coinTypography = document.getElementById('coin-typography');
    const coinContainer = document.getElementById('coin-container');
    const coin = document.getElementById('coin');
    const textContainer = document.getElementById('text-container');

    const story = [
        {
          "id": "start",
          "background":"images/desertsand.gif",
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
        console.log("Game started");
        coinTypography.style.display = 'none';
        coinContainer.style.display = 'block';
        // coin.classList.add('coin-flip'); 이 줄은 제거
        setTimeout(() => {
            app.classList.remove('hide-content');
            app.classList.add('show-content');
            updateScene();
        }, 1000); // GIF 애니메이션 길이에 맞게 조정 가능
    }
    async function updateScene() {
        console.log("Updating scene:", currentScene);
        const scene = story.find(s => s.id === currentScene);
        if (!scene) {
            console.error("Scene not found:", currentScene);
            return;
        }
        
        if (mainImage) mainImage.src = scene.background;
        
        if (storyText) storyText.innerHTML = '';
        if (choicesContainer) choicesContainer.innerHTML = '';
        
        if (scene.storySegments.length > 0) {
            textContainer.classList.add('show');
            for (let segment of scene.storySegments) {
                await typeWriter(segment, storyText);
                await waitForClick();
                if (storyText) storyText.innerHTML += '<br><br>';
            }
        } else {
            textContainer.classList.remove('show');
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

    function waitForClick() {
        return new Promise(resolve => {
            const clickHandler = () => {
                document.removeEventListener('click', clickHandler);
                resolve();
            };
            document.addEventListener('click', clickHandler);
        });
    }

    coinTypography.addEventListener('click', startGame);

    app.classList.add('hide-content');
    console.log("Game script loaded successfully");
});