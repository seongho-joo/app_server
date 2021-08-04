# 🚀 시간다리 server

## Tech
- `Typescript`
- `Apollo Server`
- `Prisma`
- `GraphQL`
- `Postgresql`
- `AWS`

<details>
<summary>Todo List</summary>

- 회원가입
  - [x] phone & email 회원 가입
  - [x] username 중복 확인
  - [x] email 형식 확인 ~~fe에서 구현~~
  - [x] password 형식 확인 ~~fe에서 구현~~
- 유저
  - [x] 프로필 변경 (username, 위치, 프로필 사진)
  - [ ] 거래현황 보기
  - [x] 관심 목록 보기
  - [ ] 계정 변경 (휴대폰 번호, email)
  - [ ] 차단 관리 (새로운 테이블이 필요할것 같음)
  - [ ] 회원 탈퇴
- 로그인
  - [x] 사용자 email * pw 조회
  - [x] 사용자 phone 조회
  - [ ] 로그인 API
- 회원정보 찾기
  - [x] 사용자 email 조회
  - [x] password 변경
- 알림
  - [x] Insert Notifications
  - [x] 알림 목록 보기
  - [x] 알림 삭제
  - [x] 알림 읽음
  - [ ] Push 알림 [FCM, kakao api]
  - [ ] 알림 on off
- 게시글
  - [x] 게시글 업로드
  - [x] 게시글 삭제
  - [ ] 게시글 수정
  - [x] 상세 보기
  - [x] 리스트 보기
  - [x] 관심
  - [x] 상품 검색
- 댓글
  - [x] 댓글 작성
  - [x] 댓글 수정
  - [x] 댓글 삭제
- 배너
  - [x] 배너 생성
  - [x] 배너 삭제
  - [x] 배너 보기
- 공지사항 & 이벤트
  - [x] 등록
  - [x] 삭제
  - [x] 보기
  - [ ] 수정
  - [ ] 리스트
- 고객센터
  - [ ] FAQ
  - [ ] 문의하기
</details>
<br>
<details>
<summary>Error 기록</summary>

![스크린샷 2021-07-15 오후 9 26 54](https://user-images.githubusercontent.com/45463495/125788060-a94d64d9-f6ab-4e11-9327-65210677c004.png)
nodejs 메모리 초과 에러가 생겨서
```
$ heroku config:set NODE_OPTIONS="--max_old_space_size=2560"
```
위와 같은 명령어를 쳐서 메모리를 증가 시키고 재배포하니 서버 구동은 되나 
```
2021-07-15T12:35:00.053033+00:00 heroku[web.1]: Process running mem=600M(117.2%)
2021-07-15T12:35:00.065659+00:00 heroku[web.1]: Error R14 (Memory quota exceeded)
```
위와 같은 메모리 할당량을 초괴했다는 로그가 기록되고 있어서 추후에 aws Lightsail로 서버를 변경할 예정

</details>

