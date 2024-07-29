const story = [
    {
        id: "start",
        background: "/api/placeholder/414/736",
        emphasizedText: "개노답인생",
        storyText: "모래바람이 휘몰아치는 황폐한 거리. 한 남자의 실루엣이 천천히 다가옵니다.",
        choices: [
            { text: "남자에게 다가간다", nextScene: "approach_man" },
            { text: "숨어서 지켜본다", nextScene: "hide_and_watch" }
        ]
    },
    {
        id: "approach_man",
        background: "/api/placeholder/414/736",
        emphasizedText: "낯선 대면",
        storyText: "당신이 다가가자 남자가 멈춰 섭니다. 그의 얼굴은 모래바람에 가려 보이지 않습니다.",
        choices: [
            { text: "말을 걸어본다", nextScene: "talk_to_man" },
            { text: "경계하며 물러선다", nextScene: "step_back" }
        ]
    },
    // 여기에 더 많은 스토리 장면들을 추가할 수 있습니다.
];