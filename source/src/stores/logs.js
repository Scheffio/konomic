import { defineStore } from "pinia";
import {ref, watch} from 'vue'

export const useLogs = defineStore('Logs', () => {
    const logs = ref([])

    const logsOnStorage = localStorage.getItem('logs')

    if(logsOnStorage) {
        logs.value = JSON.parse(logsOnStorage)._value
    }

    watch(() => logs, (state) => {
        localStorage.setItem('logs', JSON.stringify(state))
    }, {deep: true})

    const addToLogs = (object) => {
        logs.value.push({...object})
    }

    return {
        logs, addToLogs
    }

})