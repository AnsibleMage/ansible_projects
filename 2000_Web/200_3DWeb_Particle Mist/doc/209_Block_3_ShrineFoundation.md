# Block 3: ShrineFoundation (Infra & DevOps)

<!-- AI_CONTEXT
Project: Ansible Particle Mist
Level: Block (Layer 1)
Current Focus: Infrastructure, Deployment, Security
Relationship: Child of PRD(205), Parent of Features(Deployment, Optimizers, Security)
-->

**작성일:** 2026-01-31
**작성자:** AI (Antigravity)
**버전:** 1.0
**상태:** 초안
**소속 Product:** [[205_PRD_Ansible_Particle_Mist]]

---

## 📋 Block 정의 (Domain Context)

**한 줄 요약:**
> **"Kamal 기반의 배포 파이프라인과 Rails 8 기본 보안/성능 설정을 담당하는 인프라 기초."**

**담당 Features:**
- Feature 1: **Deployment** (Kamal, Docker)
- Feature 2: **Optimizers** (Compression, Caching)
- Feature 3: **Security** (SSL, CSP, Attack Protection)

**완성 기준:**
- [ ] `kamal deploy` 명령 성공
- [ ] SSL(HTTPS) 적용 완료
- [ ] Security Header 점수 A등급 (securityheaders.com)

---

## Feature 1: Deployment (Kamal)

### Feature 1 정의
**한 줄 요약:**
> "단일 서버에 Docker 컨테이너로 무중단 배포를 수행하는 Kamal 설정."

### Task 1: Dockerfile Optimization
**작업 목표:** Rails 8 최적화된 Dockerfile 작성 (Multi-stage build).

### Task 2: deploy.yml Configuration
**작업 목표:** Kamal 설정 파일 작성For Single Server.

### Task 3: Healthcheck Endpoint
**작업 목표:** `/up` 엔드포인트 커스텀 및 모니터링 연동.

### Task 4: ENV Management
**작업 목표:** `.env.erb`를 통한 비밀 키 관리 전략 수립.

### Task 5: CI Pipeline (GitHub Actions)
**작업 목표:** Push 시 자동 테스트 및 배포 워크플로우.

---

## Feature 2: Optimizers (성능 튜닝)

### Feature 2 정의
**한 줄 요약:**
> "미들웨어 레벨에서의 압축 및 캐싱 정책 적용."

### Task 1: Rack::Deflater (Gzip/Brotli)
**작업 목표:** 응답 압축 미들웨어 활성화.

### Task 2: Cache-Control Strategy
**작업 목표:** 정적 자원(Assets)에 대한 Long-term Caching 헤더 설정.

### Task 3: ETag Implementation
**작업 목표:** 컨텐츠 변경 없으면 304 Not Modified 응답.

### Task 4: Garbage Collection Tuning (Ruby)
**작업 목표:** `MALLOC_ARENA_MAX` 등 메모리 관련 환경변수 튜닝.

### Task 5: Database Optimization (SQLite)
**작업 목표:** WAL 모드 활성화 및 성능 튜닝.

---

## Feature 3: Security Basics

### Feature 3 정의
**한 줄 요약:**
> "기본적인 웹 공격 방어 및 보안 헤더 설정."

### Task 1: Force SSL
**작업 목표:** `config.force_ssl = true` 및 HSTS 설정.

### Task 2: Content Security Policy (CSP)
**작업 목표:** XSS 방지를 위한 엄격한 CSP 룰셋 정의 (Canvas 허용 등).

### Task 3: Rack Attack
**작업 목표:** DDoS 및 Brute Force 방어 (Throttling).

### Task 4: Secure Cookies
**작업 목표:** 쿠키 속성(Secure, HttpOnly, SameSite) 강화.

### Task 5: Dependency Audit
**작업 목표:** `bundler-audit` 연동으로 취약점 자동 점검.

---

## ✅ Block Module TDD (System Spec)

> **위치**: `spec/system/infra_spec.rb`

```ruby
RSpec.describe "Infrastructure", type: :system do
  it "serves assets with compression" do
    # Response Header 검증은 Request Spec에서 수행하는 것이 더 적절하지만 E2E 관점 포함
    visit root_path
    # Check headers logic via rack-test or similar
  end
  
  it "enforces HTTPS" do
    # HSTS 헤더 확인 등
  end
end
```
