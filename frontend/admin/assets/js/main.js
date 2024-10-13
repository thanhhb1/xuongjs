let user = localStorage.getItem('user')
const body = document.querySelector('body')
// Chuyen user tu string sang dang json
if (user) {
  user = JSON.parse(user)
  console.log(user.user);
  if (user.user.role!=='admin') {
    body.innerHTML = "Ban kh co quyen truy cap"
  }
} else {
  body.innerHTML = "Ban kh co quyen truy cap"
}
