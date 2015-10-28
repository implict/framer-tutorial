# framer-tutorial
Interactive prototyping with framer.js, not using Framer Studio.

## How to setup
- [Download and Install Node.js](https://nodejs.org/download/)

- atom 에디터에 `terminal-plus`, `git-plus` 패키지 설치

- 터미널에서 아래와 같이 입력하여 태스크 자동 실행 도구인 gulp 전역 설치
```sh
npm install --global gulp
```

- 튜토리얼 파일을 다운로드하거나 터미널 명령어로 깃허브 저장소 복제
```sh
git clone https://github.com/implict/framer-tutorial.git
```

## How to build

- 터미널에서 `gulp` 입력

## Framer.js snippet

- 마우스 클릭 이벤트
  ```sh
  layer.on(Events.Click, function(event, layer) {
    setReaderVisible(false);
  });
  ```

## Having problems or suggestions?

[Send your Feedback!](https://github.com/implict/framer-tutorial/issues/new)
