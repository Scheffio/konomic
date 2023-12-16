import {
    defineStore
} from "pinia";
import {
    computed,
    ref,
    watch
} from 'vue'

import {
    useLogs
} from "./logs";

export const useOrderbook = defineStore('OrderBook', () => {
    const asks = ref([])
    const bids = ref([])

    let tableLimit = ref(100)

    let queryLimit = computed(() => {
        return tableLimit.value + (tableLimit.value / 2)
    })

    const pair = ref('BTCUSDT')

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

    watch(pair, (newValue, oldValue) => {
        logsStore.addToLogs({
            from: oldValue,
            to: newValue,
            time: new Date().toLocaleDateString('ru-RU', options)
        })
        localStorage.setItem('default-pair', newValue)
    })

    const addToOrderBook = (object) => {
        asks.value = object.asks
        bids.value = object.bids
    }

    const setCurrencyGlassSocket = () => {
        if (socket.value) socket.value.close()

        socket.value = new WebSocket(`wss://stream.binance.com:9443/ws/${pair.value.toLowerCase()}@depth`)

        socket.value.onmessage = function (event) {
            const content = JSON.parse(event.data)

            content.a.forEach((newAsk) => {
                if (asks.value.length > queryLimit.value) asks.value.splice(queryLimit.value)

                let index = asks.value.findIndex(ask => ask[0] == newAsk[0])
                if (index >= 0) {
                    if (newAsk[1] == 0) {
                        asks.value.splice(index, 1)
                    } else {
                        asks.value[index][1] = newAsk[1]
                    }
                } else {
                    if (newAsk[1] != 0) {
                        asks.value.unshift(newAsk)
                    }
                }
            })

            content.b.forEach((newBid) => {
                if (bids.valuelength > queryLimit.value) bids.value.splice(queryLimit.value)

                let index = bids.value.findIndex(bid => bid[0] == newBid[0])
                if (index >= 0) {
                    if (newBid[1] == 0) {
                        bids.value.splice(index, 1)
                    } else {
                        bids.value[index][1] = newBid[1]
                    }
                } else {
                    if (newBid[1] != 0) {
                        asks.value.unshift(newBid)
                    }
                }
            })
        }
    }

    watch(pair, () => {
        setCurrencyGlassSocket()
    }, {immediate: true})

    const getOrderBook = () => {

        const url = `https://api.binance.com/api/v3/depth?symbol=${pair.value}&limit=${queryLimit.value}`

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
        asks,
        bids,
        addToOrderBook,
        tableLimit,
        getOrderBook,
        pair,
        setCurrencyGlassSocket
    }

})