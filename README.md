# framer-tutorial
Interactive prototyping with framer.js, not using Framer Studio.

## How to setup
- [Download and Install Node.js](https://nodejs.org/download/)

- atom 에디터에 `terminal-plus`, `git-plus` 패키지 설치

- 터미널에서
```sh
npm install --global gulp
```
입력하여 태스크 자동 실행 도구인 gulp 전역 설치

- 터미널에서 `git clone https://github.com/implict/framer-tutorial.git` 입력하여 저장소를 복제하거나 튜토리얼 파일 다운로드

## How to build

- 터미널에서 `gulp` 입력

## Framer.js snippet

- 마우스 클릭 이벤트
  ```js
  layer.on(Events.Click, function(event, layer) {
    setReaderVisible(false);
  });
  ```

## Having problems or suggestions?

[Send your Feedback!](https://github.com/implict/framer-tutorial/issues/new)
