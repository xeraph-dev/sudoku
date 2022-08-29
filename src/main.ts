import App from './App.svelte'

if (import.meta.env.MODE === 'production') {
  document.addEventListener(
    'contextmenu',
    e => {
      e.preventDefault()
      return false
    },
    { capture: true },
  )

  document.addEventListener(
    'selectstart',
    e => {
      e.preventDefault()
      return false
    },
    { capture: true },
  )
}

const app = new App({
  target: document.getElementById('app'),
})

export default app
