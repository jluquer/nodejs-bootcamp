export function redirect(url = "/", time = 0) {
  if (url == null || time == null) return;
  setTimeout(() => {
    window.location.href = url;
  }, time);
}
