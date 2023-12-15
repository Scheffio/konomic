import { defineStore } from "pinia";
import {ref, watch} from 'vue'

export const useOrderbook = defineStore('OrderBook', () => {
    const orders = ref([])

    const orderBookOnStorage = localStorage.getItem('orders')

    if(orderBookOnStorage) {
        orders.value = JSON.parse(orderBookOnStorage)._value
    }

    watch(() => orders, (state) => {
        localStorage.setItem('orders', JSON.stringify(state))
    }, {deep: true})

    const addToOrderBook = (object) => {
        orders.value = object
    }

    return {
        orders, addToOrderBook
    }

})