# 01_Environment_Setup (Mac M-Series + Rails 8 + Kamal)

> **User Prompt Reference:**
> "맥북프로의 레일즈세팅부터 설치 서버구성... 심층분석을 통해 관련문서를 분석하고 재 정의해서 파트별로 나누어서 방법론 문서를 만들어줘"

## 1. 개요
이 문서는 **Apple Silicon (M1/M2/M3)** 환경에서 **Ruby 3.x** 및 **Rails 8.x** 개발 환경을 **Zero-Friction** 원칙에 따라 구축하고, **Kamal**을 이용한 배포 준비까지 완료하는 것을 목표로 합니다.

**핵심 철학:**
*   **Version Manager First**: 시스템 Ruby를 절대 사용하지 않습니다 (`mise` 사용).
*   **Docker Native**: Kamal 배포를 위해 로컬에서도 Docker 환경이 필수입니다.
*   **No Friction**: 한 번 설정하면 프로젝트 시작 시 마찰이 없어야 합니다.

---

## 2. 필수 도구 설치

### 2.1 Xcode Command Line Tools
macOS 개발의 기초입니다. (컴파일러 등 포함)
```zsh
xcode-select --install
```

### 2.2 Homebrew (패키지 관리자)
시스템 패키지 관리를 위한 필수 도구입니다.
```zsh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Path 설정 (Apple Silicon)
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zshrc
source ~/.zshrc
```

### 2.3 시스템 의존성 설치
Ruby 컴파일 및 Rails 실행에 필요한 라이브러리들입니다.
```zsh
brew install openssl@3 libyaml gmp rust
```

### 2.4 Docker (for Kamal & Database)
Rails 8의 기본 데이터베이스(SQLite/Solid Queue)는 별도 설치가 필요 없지만, Kamal 배포를 위해 Docker가 필요합니다.
*   **OrbStack** (권장 - 더 가볍고 빠름) 또는 **Docker Desktop for Mac** 설치.

---

## 3. Ruby & Rails 설치 (`mise` 사용)

우리는 `rbenv`나 `rvm` 대신, 다목적 버전 관리 도구인 **mise**를 사용합니다. (Rails 공식 가이드 권장)

### 3.1 Mise 설치
```zsh
brew install mise

# 쉘 연동
echo 'eval "$(mise activate zsh)"' >> ~/.zshrc
source ~/.zshrc
```

### 3.2 Ruby 설치 (Global)
최신 안정화 버전(3.3.0 이상 권장)을 설치합니다.
```zsh
mise use -g ruby@3.3
ruby -v  # 버전 확인
```

### 3.3 Rails 설치
문서(`ri`, `rdoc`) 생성 없이 설치하여 속도를 높입니다.
```zsh
gem install rails --no-document
rails -v # 버전 확인 (8.0.0 이상)
```

---

## 4. 새 프로젝트 생성 (Agent Workflow)

개발자는 코드를 직접 치지 않고, Agent에게 다음과 같이 명령합니다.

> "Rails 8 프로젝트 `ParticleMist`를 생성해줘. 데이터베이스는 SQLite 기본으로 가고, CSS는 Tailwind를 써."

**Agent가 실행할 실제 명령어:**
```zsh
# Rails 8 Default: SQLite3, Solid Queue, Solid Cache, Propshaft, Turbo, Stimulus
rails new particle_mist --css=tailwind
```

---

## 5. IDE 설정 (VS Code / Cursor)

`Zero-Friction`을 위해 다음 확장프로그램 필수 설치:
1.  **Ruby LSP**: Shopify에서 만든 공식 Ruby Language Server. (속도, 자동완성 최강)
2.  **ERB Formatter/Beautify**: 뷰 파일 포맷팅.
3.  **Tailwind CSS IntelliSense**: 클래스 자동완성.

---

## 6. 검증 (Verification)

설치가 완료되면 다음 명령으로 모든 것이 정상인지 확인합니다.

```zsh
# 1. 서버 실행
bin/dev

# 2. 접속 확인
open http://localhost:3000
```
**성공 기준:** Rails 환영 페이지가 뜨고, 터미널 로그에 에러가 없어야 함.
