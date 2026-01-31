# GEMINI.md - Particle Mist Project Configuration

## 글로벌 설정 참조 (Global Configuration)
이 프로젝트는 다음 글로벌 설정을 기본으로 상속받습니다:
- **글로벌 설정 파일**: `/Users/changjaeyou/.gemini/GEMINI.md`
- **상속 규칙**: 글로벌 설정을 기본으로 로드하되, 아래 **프로젝트 규칙**이 중복되거나 상충할 경우 **프로젝트 규칙이 우선(Override)**합니다.

> [!IMPORTANT]
> **프로젝트 전용 우선 규칙 (Project Specific Overrides)**
> 이 파일에 정의된 규칙은 이 프로젝트(`200_3DWeb_Particle Mist`) 내에서 글로벌 설정보다 **우선적으로 적용(Override)**됩니다.

## 프로젝트 규칙 (Project Rules)

이 파일은 **Particle Mist** 프로젝트의 안티그래비티(Antigravity) 작동 규칙을 정의합니다.

1. **문서 저장 위치 (Document Location)**
   - 안티그래비티가 생성하는 모든 문서는 **반드시** 프로젝트 루트 내 `doc` 폴더에 저장해야 합니다.

2. **파일 명명 규칙 (Naming Convention)**
   - 모든 문서의 파일명은 `201_`부터 시작하는 3자리 숫자 접두사를 가집니다.
   - 예: `201_제미나이.md`, `202_기획안.md`, `203_아키텍처.md` ...
   - 번호는 순차적으로 증가시킵니다.

3. **프롬프트 아카이빙 (Prompt Archiving)**
   - 모든 생성된 문서의 최상단에는 해당 작업을 지시한 **사용자의 프롬프트 원문**을 인용구(`>`) 형태로 포함시켜야 합니다.

4. **언어 규칙 (Language Rule)**
   - 모든 문서는 **한글(Korean)**로 작성해야 합니다.
