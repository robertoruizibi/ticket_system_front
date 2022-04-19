export default async function({ $axios }) {
  $axios.onRequest(config => {
    config.headers['x-auth'] = localStorage.getItem('token')
    return config
  })
}