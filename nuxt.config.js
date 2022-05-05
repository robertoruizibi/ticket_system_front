const routes = require('./config/routes')

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'ticket_system_front',
    htmlAttrs: {
      lang: 'es'
    },
    bodyAttrs: {
      class: 'bg-gradient-background',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: "stylesheet",
        href:"https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
      },
      {
        rel: "stylesheet",
        href:"https://cdn.datatables.net/1.11.5/css/jquery.dataTables.min.css"
      }
    ],
    script: [
      {
        src: "https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js",
        type: "text/javascript"
      },
      {
        src: "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js",
        type: "text/javascript"
      },
      {
        src: "https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js",
        type: "text/javascript"
      },
      {
        src: "https://cdn.datatables.net/1.11.5/js/jquery.dataTables.min.js",
        type: "text/javascript"
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/styles/default.scss',
    '@/assets/styles/sb-admin-2.css',
    '@fortawesome/fontawesome-svg-core/styles.css'
  ],

  server: {
    port: 8000 // default: 3000
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/axios' },
    { src: '~/plugins/fontawesome.js' },
    { src: '~/plugins/sb-admin-2.min.js' },
    { src: '~/plugins/mixins.js'},
    
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
    '@nuxtjs/dotenv',
    '@nuxtjs/proxy'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
  },
  
  proxy: {
    '/api': { 
      target: 'https://de3e-176-56-74-208.ngrok.io', 
      pathRewrite: {'^/api': '/api'}
    }
  },

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
      },
      {
        name: 'privacityPolicity',
        path: routes.privacityPolicity,
        component: 'pages/privacityPolicity/index.vue'
      }
    ]
  }
}
