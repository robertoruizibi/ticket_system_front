const routes = require('./config/routes')

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'ticket_system_front',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/styles/default.scss'
  ],

  server: {
    port: 8000 // default: 3000
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/axios' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  router: {
    middleware: ['auth'],
    routes: [
      {
        name: 'index',
        path: routes.index,
        component: 'pages/index.vue'
      },
      {
        name: 'users',
        path: routes.users,
        component: 'pages/users/index.vue'
      },
      {
        name: 'new-user',
        path: '/user/newUser',
        component: 'pages/user/newUser.vue'
      },
      {
        name: 'tickets',
        path: routes.tickets,
        component: 'pages/tickets/index.vue'
      },
      {
        name: 'new-ticket',
        path: routes.tickets,
        component: 'pages/tickets/newTicket.vue'
      },
      {
        name: 'new-report',
        path: routes.reports,
        component: 'pages/reports/newReport.vue'
      },
      {
        name: 'contact',
        path: routes.contact,
        component: 'pages/contact/index.vue'
      }
    ]
  }
}
