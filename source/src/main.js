import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { VSelect } from 'vuetify/components/VSelect'
import { VContainer, VCol, VRow } from 'vuetify/components/VGrid'
import { VTable } from 'vuetify/components/VTable'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components: {
    VSelect,
    VContainer,
    VTable,
    VCol,
    VRow
  },
  directives,
  theme: {
    defaultTheme: 'dark'
  }
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)

app.mount('#app')
