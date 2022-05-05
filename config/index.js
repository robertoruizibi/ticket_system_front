const apiURL = 'https://de3e-176-56-74-208.ngrok.io/api'

export default {
  // API Url
  apiURL,


  // API endpoints
  api: {

    // AUTH
    auth: '/auth',
    login: '/auth/login',

    // USERS
    users: '/users',
    password: '/users/change_password',

    // TICKETS
    tickets: '/tickets',
    userTickets: '/tickets/user',

    // DATES
    dates: '/dates',

    // REPORTS
    reports: '/reports',
    reportById: '/reports/report',

    // UPLOADS
    upload: '/upload'
  },

  // Email variables
  template_id: 'template_inx7t08',
  service_id: 'service_tsb34gf',
  account_id: 'g0Ebk8pU2omo9Tnvu'
}