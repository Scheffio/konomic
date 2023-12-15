import {
    defineStore
} from "pinia";
import {
    ref,
    watch
} from 'vue'

import {
    useLogs
} from "./logs";

export const useOrderbook = defineStore('OrderBook', () => {
    const orders = ref([])

    let tableLimit = ref(100)

    const pair = ref('BTCUSDT')

    const orderBookOnStorage = localStorage.getItem('orders')

    const logsStore = useLogs()

    const socket = ref()

    const options = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    }

    if (localStorage.getItem('default-pair')) {
        pair.value = localStorage.getItem('default-pair')
    } else {
        localStorage.setItem('default-pair', 'BTCUSDT')
        pair.value = localStorage.getItem('default-pair')
    }

    if (orderBookOnStorage) {
        orders.value = JSON.parse(orderBookOnStorage)._value
    }

    watch(() => orders, (state) => {
        localStorage.setItem('orders', JSON.stringify(state))
    }, {
        deep: true
    })

    watch(pair, (newValue, oldValue) => {
        logsStore.addToLogs({
            from: oldValue,
            to: newValue,
            time: new Date().toLocaleDateString('ru-RU', options)
        })
        localStorage.setItem('default-pair', newValue)
    })

    const addToOrderBook = (object) => {
        orders.value = object
        console.log(object);
    }

    watch(pair, () => {
        if(socket.value) socket.value.close()

        socket.value = new WebSocket(`wss://stream.binance.com:9443/ws/${pair.value.toLowerCase()}@depth`)
        socket.value.onmessage = function (event) {
            const content = JSON.parse(event.data)
    
            content.a.forEach((elem) => {
                orders.value.asks.unshift(elem)
            })
            content.b.forEach((elem) => {
                orders.value.bids.unshift(elem)
            })
        }
    })

    const getOrderBook = () => {

        const url = `https://api.binance.com/api/v3/depth?symbol=${pair.value}&limit=${tableLimit.value}`

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Ошибка HTTP! Статус: ${response.status}`)
                }
                return response.json()
            }).then(data => {
                addToOrderBook(data)
            }).catch(error => {
                console.error('Ошибка: ', error.message, error.stack);
            })
    }

    watch([tableLimit, pair], () => {
        getOrderBook()
    }, {
        immediate: true
    })

    return {
        orders,
        addToOrderBook,
        tableLimit,
        getOrderBook,
        pair,
    }

})