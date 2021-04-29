import axios from "axios"

export default {
  install (Vue, apis) {
    apis.forEach(api => {
      const { name, apiKey } = api
      const axiosInstance = axios.create({
        baseURL: `https://${process.env[`VUE_APP_${name.toUpperCase()}_API`]}`
      })

      if (apiKey) {
        axiosInstance.interceptors.request.use((config) => {
          config.params = config.params || {}
          config.params.api_key = process.env[`VUE_APP_${name.toUpperCase()}_KEY`]
          return config
        })
      }

      Vue.prototype[`$${name}`] = axiosInstance
    })
  }
}
