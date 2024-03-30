export default {
  beforeMount(el, binding) {
    let iconClass = `fa fa-${binding.value.icon} text-green-400 text-xl`

    if (binding.value.right) {
      iconClass += ' float-right' // add a space before the class name, so that it does not join
    }

    el.innerHTML += `<i class="${iconClass}"></i>`
  }
}
