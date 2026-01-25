> **Original User Prompt**: "너가 직접 레파지토리를 만들어줄수 있어?"

# 110_레포지토리 생성 및 동기화 자동화 가이드

## 1. 개요
안티그래비티가 `ansible_projects` 레포지토리를 직접 생성하고 로컬 파일들을 클라우드에 푸시하기 위해서는, 사용자님의 GitHub 계정 인증이 한 번 필요합니다.

## 2. GitHub CLI (gh) 설치 완료
현재 사용자님의 맥북에 **GitHub CLI(gh)** 설치를 마친 상태입니다. 이제 터미널에서 다음 명령어를 한 번만 실행해 주시면 제가 모든 권한을 이어받아 레포지토리를 생성할 수 있습니다.

### [인증 단계]
1.  터미널을 엽니다.
2.  다음 명령어를 입력합니다:
    ```bash
    gh auth login
    ```
3.  화면의 지시에 따릅니다:
    *   **What account do you want to log into?** -> `GitHub.com` 선택
    *   **What is your preferred protocol for Git operations?** -> `HTTPS` 추천
    *   **Authenticate Git with your GitHub credentials?** -> `Yes`
    *   **How would you like to authenticate GitHub CLI?** -> `Login with a web browser` 선택
4.  브라우저가 열리면 표시된 보안 코드를 입력하고 승인합니다.

## 3. 안티그래비티가 수행할 다음 작업
인증이 완료되면 제가 다음과 같은 작업을 자동으로 진행합니다:
*   `gh repo create ansible_projects --public --description "The Manifestation Sector of the Ansible..."`
*   로컬 프로젝트와 원격 레포지토리 연결
*   첫 번째 푸시(`git push -u origin main`)

## 4. 완료 후 이점
이 과정이 끝나면 제가 작성하는 모든 명세서와 로블록스 코드가 실시간으로 GitHub에 저장되어 안전하게 보호됩니다.

인증을 마치신 후 **"인증 완료했어"**라고 말씀해 주시면 바로 생성을 마무리하겠습니다!
