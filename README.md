<div align="center">
  <img src="https://i.postimg.cc/dVXK9Kqb/image.png" alt="프로젝트 이미지" />
</div>

---

## 👴 평생 프로젝트 개요 👵

### 서비스 소개
" 평생, 당신과 함께 하니까 "

자녀와 함께하는 시니어 일자리 추천 및 신청 도우미
> **프로젝트 기간**: 2025.06.25 ~ 2025.08.22

---

## 🚀 프론트앤드 팀원 소개

<table align="center">
  <thead>
    <tr>
      <th>보돌/주보경</th>
      <th>라떼/박소이</th>
      <th>밀라/이연수</th>
      <th>정봉이/정보미</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td align="center"><img src="https://avatars.githubusercontent.com/joobogyeong" alt="주보경님 사진" width="200" height="200"></td>
      <td align="center"><img src="https://avatars.githubusercontent.com/soyyyyy" alt="박소이님 사진" width="200" height="200"></td>
      <td align="center"><img src="https://avatars.githubusercontent.com/yeonsu0327" alt="이연수님 사진" width="200" height="200"></td>
      <td align="center"><img src="https://avatars.githubusercontent.com/bomii1" alt="정보미 사진" width="200" height="200"></td>
    </tr>
    <tr>
      <td align="center"><a href="https://github.com/joobogyeong">@joobogyeong</a></td>
      <td align="center"><a href="https://github.com/soyyyyy">@soyyyyy</a></td>
      <td align="center"><a href="https://github.com/yeonsu0327">@yeonsu0327</a></td>
      <td align="center"><a href="https://github.com/bomii1">@bomii1</a></td>
    </tr>
    <tr>
      <td align="center">기업-[홈 화면]<br>기업-[신청서 입력 플로우]<br>기업-[받은 신청서 플로우]<br>개인-[일자리 신청 플로우]<br>CICD 배포 (AWS)</td>
      <td align="center">개인-[로그인/회원가입<br> 플로우] 기업-[로그인/<br>회원가입 플로우] <br>개인-[내 정보 플로우]<br>기업-[내 기업 정보 플로우]<br>토큰, SMS</td>
      <td align="center">개인-[일자리 추천 및 저장<br>플로우]에서 조회 기능<br>개인-[추가 질문 답변]<br>개인-[일자리 추천 및 <br>저장함 신청함 플로우]<br>[채용 공고 검색] 기능</td>
      <td align="center">개인-[일자리 추천 및<br>저장 플로우]<br>일자리 신청 플로우에서<br>AI를 통해 질문 만들기</td>
    </tr>
  </tbody>
</table>

---

## 🛠 기술 스택

| 역할 | 종류 | 선정 이유 |
|------|------|-----------|
| Library | <img src="https://cdn.simpleicons.org/react/61DAFB" height="28"/> **React** | 컴포넌트 기반 구조로 재사용성과 유지보수성이 높아 개발 효율 극대화 |
| Bundler | <img src="https://cdn.simpleicons.org/vite/646CFF" height="28"/> **Vite** | 빠른 서버 시작과 모듈 번들링 성능으로 개발 생산성 향상 |
| Programming Language | <img src="https://cdn.simpleicons.org/typescript/3178C6" height="28"/> **TypeScript** | 정적 타입 제공으로 코드 안정성과 가독성을 높이고, 개발 중 오류를 사전 방지 |
| Styling | <img src="https://cdn.simpleicons.org/tailwindcss/06B6D4" height="28"/> **TailwindCSS** | 유틸리티 클래스 기반 스타일링으로 CSS 반복을 줄이고 일관된 UI 구현 |
| Package Manager | <img src="https://cdn.simpleicons.org/pnpm/F69220" height="28"/> **pnpm** | 고유한 패키지 캐싱 방식으로 설치 속도 향상 및 디스크 공간 절약 |
| Data Fetching | <img src="https://cdn.simpleicons.org/axios/5A29E4" height="28"/> **Axios** | 직관적인 API 사용법과 자동 JSON 변환 기능으로 비동기 통신 간편 |
| Server State 관리 | <img src="https://cdn.simpleicons.org/reactquery/FF4154" height="28"/> **TanStack Query** | 서버 상태 관리와 캐싱을 자동화하여 데이터 fetching/동기화를 효율적으로 처리 |
| Deployment | <img src="https://cdn.simpleicons.org/vercel/000000" height="28"/> **Vercel** | Git 연동 자동 배포 및 최적화된 프론트엔드 배포 환경 제공 |

---

## 📂 폴더 구조

```plaintext
src/
├── layout/
├── pages/
│   ├── home/
│   │   ├── components/
│   │   ├── constants/
│   │   ├── apis/
│   │   ├── types/
│   │   ├── utils/
│   │   └── hooks/
│   └── mypage/
├── shared/
│   ├── apis/
│   ├── assets/
│   ├── components/
│   ├── constants/
│   ├── styles/
│   ├── types/
│   ├── utils/
│   └── hooks/
└── routes/
```

---

## 🔖 브랜치 전략

- `main`: 운영 배포용 브랜치
- `develop`: 기본 개발 브랜치
- `type/설명/#이슈번호`: 기능/버그 작업 브랜치

---

## 📝 커밋 / 브랜치 / PR 컨벤션

| 구분       | 형식                  | 예시                         |
| ---------- | --------------------- | ---------------------------- |
| **Issue**  | `[type] 제목`         | `[feat] 회원가입 기능 추가`  |
| **PR**     | `[type] 제목`         | `[fix] 로그인 오류 수정`     |
| **Commit** | `type: 메시지`        | `refactor: 로그인 로직 정리` |
| **Branch** | `type/설명/#이슈번호` | `feat/login-api/#12`         |

### ✅ 타입 리스트

- `feat`: 새로운 기능 추가
- `fix`: 버그 수정
- `docs`: 문서 작성/수정
- `style`: 코드 포맷팅 (비즈니스 로직 없는 변경)
- `refactor`: 코드 리팩토링
- `test`: 테스트 코드 작성/수정
- `chore`: 설정 변경
- `design`: UI 디자인 수정
- `comment`: 주석 추가/수정
- `rename`: 파일/폴더명 변경
- `remove`: 파일 삭제
- `init`: 프로젝트 초기 세팅 시 1회
- `!hotfix`: 긴급 패치

---

## 🗂️ 이슈 & PR 작성 가이드

- 이슈: 템플릿(`Feature request`) 사용
- PR: 템플릿 자동 적용
- 작업 흐름: 이슈 → 브랜치 → 작업 → PR → 리뷰 후 `develop` 머지

---

## ⚙️ 실행 방법

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm run dev
```
