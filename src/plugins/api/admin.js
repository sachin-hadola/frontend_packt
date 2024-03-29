import axios from 'axios'

let apiBaseUrl = process.env.VUE_APP_ADMIN_API_URL
let http = axios.create({
  baseURL: apiBaseUrl,
  timeout: 50000,
})

export default function (method, url, data) {
  var admin = JSON.parse(localStorage.getItem('admin'))
  var accessToken = ''
  if (null != admin) {
    accessToken = 'Bearer ' + admin.access_token
  }
  if (method == 'POST') {
    return new Promise((resolve) => {
      http.post(url, data, {
        headers: {
          Authorization: accessToken
        }
      }).then((response) => {
        resolve(response.data);
      })
        .catch((error) => {
          if (error.response.status == 401) {
            localStorage.removeItem('admin')
            this.store.dispatch('alert', {
              messages: error.response.data.message
            })
            let self = this
            setTimeout(function () {
              self.$router.push({ name: 'admin.login' })
            }, 2000);
            resolve(false)
          } else if (error.response.status == 404) {
            this.store.dispatch('alert', {
              messages: error.response.data.message
            })
          } else if (error.response.status == 422) {
            this.store.dispatch('alert', {
              messages: undefined == error.response.data.errors ? error.response.data.error : error.response.data.errors
            })
          } else {
            this.store.dispatch('alert', {
              messages: 'Something went wrong'
            })
          }
          resolve(false)
        });
    });
  } else if (method == 'GET') {
    return new Promise((resolve) => {
      http.get(url, {
        headers: {
          Authorization: accessToken
        }
      }).then((response) => {
        resolve(response.data);
      }).catch((error) => {
        if (error.response.status == 401) {
          localStorage.removeItem('admin')
          this.store.dispatch('alert', {
            messages: error.response.data.message
          })
          this.$router.push({ name: 'admin.login' })
          resolve(false)
        } else if (error.response.status == 404) {
          this.store.dispatch('alert', {
            messages: error.response.data.message
          })
        } else {
          this.store.dispatch('alert', {
            messages: 'Something went wrong'
          })
        }
        resolve(false)
      });
    });
  } else if (method == 'DELETE') {
    return new Promise((resolve) => {
      http.delete(url, {
        headers: {
          Authorization: accessToken
        }
      }).then((response) => {
        resolve(response.data);
      }).catch((error) => {
        if (error.response.status == 401) {
          localStorage.removeItem('admin')
          this.store.dispatch('alert', {
            messages: error.response.data.message
          })
          this.$router.push({ name: 'admin.login' })
          resolve(false)
        } else if (error.response.status == 404) {
          this.store.dispatch('alert', {
            messages: error.response.data.message
          })
        } else {
          this.store.dispatch('alert', {
            messages: 'Something went wrong'
          })
        }
        resolve(false)
      });
    });
  } else {
    this.store.dispatch('alert', {
      messages: 'Something went wrong'
    })
  }
}