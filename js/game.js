document.addEventListener('DOMContentLoaded', () => {
    let currentScene = "start";
    const app = document.getElementById('app');
    const mainImage = document.getElementById('main-image');
    const storyText = document.getElementById('story-text');
    const choicesContainer = document.getElementById('choices-container');
    const coin = document.getElementById('coin');
    const coinTypography = document.getElementById('coin-typography');
    const textContainer = document.getElementById('text-container');

    const story = [
        {
            id: "start",
            background: "images/car.avif",
            storySegments: [
                "폐허 같은 사막에 땅거미가 그림자를 늘어뜨린다.",
                "\"단순하게 생각해.\"",
                "구질한 유니폼을 입은 얼굴 앞으로 동전이 나타났다 사라진다."
            ],
            nextScene: "start-1"
        },
        // 여기에 다른 장면들을 추가하세요.
    ];


    function startGame() {
        coinTypography.style.display = 'none';
        coin.style.opacity = '1';
        coin.classList.add('coin-animate');
        
        coin.addEventListener('animationend', function onAnimationEnd() {
            coin.removeEventListener('animationend', onAnimationEnd);
            coin.style.opacity = '0';
            coin.classList.remove('coin-animate');
            app.classList.remove('hide-content');
            updateScene();
        });
    }
    async function updateScene() {
        const scene = story.find(s => s.id === currentScene);
        if (!scene) return;
        
        mainImage.src = scene.background;
        storyText.innerHTML = '';
        choicesContainer.innerHTML = '';
        
        textContainer.classList.add('show');
        for (let segment of scene.storySegments) {
            await typeWriter(segment, storyText);
            await waitForClick();
            storyText.innerHTML += '<br><br>';
        }
        
        if (scene.nextScene) {
            const button = document.createElement('button');
            button.textContent = "계속";
            button.className = 'choice-btn';
            button.onclick = () => {
                currentScene = scene.nextScene;
                updateScene();
            };
            choicesContainer.appendChild(button);
        }
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