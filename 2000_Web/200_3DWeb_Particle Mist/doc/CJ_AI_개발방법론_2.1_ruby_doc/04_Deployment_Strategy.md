# 04_Deployment_Strategy (Kamal 2 & Zero-Downtime)

> **User Prompt Reference:**
> "설치 서버구성 그리고 배포방법등을 포함해줘 실제로 출시해서 웹에 띄우기 까지의 과정도 말이야."

## 1. 개요
Rails 8은 클라우드 종속성(PaaS)을 제거하고, 개발자가 직접 소유한 서버(VPS)에 **Docker** 컨테이너 기반으로 배포하는 **Kamal**을 기본 탑재하고 있습니다. 이 문서는 `Particle Mist`를 실제 웹에 띄우는 A to Z 전략입니다.

---

## 2. 준비물 (Prerequisites)

### 2.1 서버 (VPS)
*   프로바이더: Hetzner, AWS EC2, DigitalOcean 등 (Ubuntu 22.04 LTS 권장).
*   사양: 최소 1vCPU, 1GB RAM (Rails 8은 가볍지만, 빌드 여유분을 위해 2GB 권장).
*   **필수**: SSH 접속이 가능해야 함 (`root` 또는 `sudo` 권한 유저).

### 2.2 도메인
*   DNS 설정: A 레코드가 서버 IP를 가리키도록 설정.

### 2.3 Docker Registry
*   Docker Hub (무료/유료) 또는 GitHub Container Registry (ghcr.io).
*   이미지를 저장하고 서버가 이를 당겨갈(Pull) 장소입니다.

---

## 3. Kamal 설정 (config/deploy.yml)

`rails new`로 생성된 프로젝트에는 이미 `config/deploy.yml`이 있습니다. 이를 `Particle Mist`에 맞게 수정합니다.

```yaml
# config/deploy.yml
service: particle-mist
image: your-username/particle-mist

servers:
  web:
    - 123.45.67.89 # 서버 IP

proxy:
  ssl: true
  host: particle-mist.com
  app_port: 3000

registry:
  server: ghcr.io
  username: your-github-user
  # password: KAMAL_REGISTRY_PASSWORD (ENV 변수로 주입)

env:
  secret:
    - RAILS_MASTER_KEY
  clear:
    DB_PATH: /rails/storage/production.sqlite3
```

---

## 4. 배포 프로세스 (The Flow)

Kamal 2.0의 배포는 단 하나의 명령어로 이루어집니다.

### 4.1 초기 설정 (최초 1회)
서버에 Docker 설치, Traefik(리버스 프록시) 설정 등을 자동으로 수행합니다.
```zsh
kamal setup
```
**내부 동작:**
1.  서버 접속 (SSH).
2.  Docker, Curl 설치.
3.  ENV 변수 주입.
4.  앱 이미지 빌드 및 푸시.
5.  앱 컨테이너 실행.
6.  Traefik 실행 및 SSL 인증서 발급 (Let's Encrypt 자동).

### 4.2 지속적 배포 (Deploy)
코드가 수정된 후 배포할 때 사용합니다.
```zsh
kamal deploy
```
**Zero-Downtime (무중단) 원리:**
1.  새 버전의 컨테이너를 실행합니다 (Green).
2.  Health Check가 통과하면, Traefik이 트래픽을 새 컨테이너로 전환합니다.
3.  구 버전 컨테이너(Blue)를 종료합니다.

---

## 5. 데이터베이스 전략 (SQLite in Production)

Rails 8의 대담한 변화는 **Production에서도 SQLite를 사용**하는 것입니다.

*   **설정**: `config/database.yml`이 이미 Production용으로 설정되어 있습니다.
*   **영속성**: Docker 볼륨을 사용하여 데이터를 보존합니다.
    *   Kamal 설정에 볼륨 마운트가 필요할 수 있습니다 (기본 설정 확인).
*   **백업**: `LiteFS` 등을 사용하거나, 주기적으로 SQLite 파일을 S3로 백업하는 작업을 스케줄링합니다.

---

## 6. 운영 및 모니터링

### 6.1 로그 확인
서버에 접속하지 않고 로컬에서 로그를 봅니다.
```zsh
kamal app logs -f
```

### 6.2 레일즈 콘솔 (원격)
서버의 컨테이너 내부에서 콘솔을 엽니다.
```zsh
kamal app exec -i 'bin/rails console'
```

---

## 7. 결론

Kamal을 사용하면 복잡한 Kubernetes나 비싼 PaaS 비용 없이, **"단일 서버 + Docker"**라는 가장 단순하고 강력한 조합으로 서비스를 운영할 수 있습니다. 이는 `Particle Mist`의 "Lightweight" 철학에 완벽하게 부합합니다.
