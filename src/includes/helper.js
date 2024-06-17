export default {
  formatTime(time) {
    // time passed is in seconds
    const minutes = Math.floor(time / 60) || 0 // We used Math.floor because we do not want decimal values
    const seconds = Math.round(time - minutes * 60 || 0)
    return `${minutes}:${seconds < 10 ? 0 : ''}${seconds}`
  }
}
