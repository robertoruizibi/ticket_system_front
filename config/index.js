const apiURL = 'http://localhost:3000/api'

export default {
  //API Url
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
  }
}