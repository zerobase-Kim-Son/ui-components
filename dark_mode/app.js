const $toggleButton = document.querySelector('.toggle-button');

const getTheme = () => localStorage.getItem('theme');
const setTheme = theme => localStorage.setItem('theme', theme);

if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.toggle('dark');
} else {
  setTheme('light');
}

$toggleButton.onclick = e => {
  document.body.classList.toggle('dark');
  // 테마가 다크면 라이트로
  // 테마가 라이트면 다크로
  if (getTheme('theme') === 'dark') {
    setTheme('light');
  } else {
    setTheme('dark');
  }
};

/**
 * 1️⃣ 브라우저에서 로컬스토리지에 저장된 테마값을 적용
 *      💡 로컬스토리지에 저장된 테마값 없으면 라이트 모드로 초기화
 * 2️⃣ 토글 시, 테마 변경하고 변경된 테마 로컬스토리지에 업데이트
 * 3️⃣
 */
