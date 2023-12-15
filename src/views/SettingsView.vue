<template>
    <header>
        <div class="logo">
            <div class="logo__div"></div>
        </div>
        <div class="menu">
            <router-link class="menu__element" to="/">Настройки</router-link>
            <router-link class="menu__element" to="/order_book">Книга ордеров</router-link>
        </div>
    </header>
    <main>
        <article>
            <v-container class="content">
                <h2>Валютная пара</h2>
                <v-select v-model="pair" :items="['BTCUSDT', 'BNBBTC', 'ETHBTC']" variant="outlined"
                    @update:model-value="handleUpdate" class="content__select">
                </v-select>
                <h2>Лог изменений</h2>
                <article v-if="logsStore.logs.length > 0" class="logs">
                    <v-table fixed-header height="600px">
                        <thead>
                            <tr>
                                <th class="text-center">
                                    Старая пара
                                </th>
                                <th class="text-center">
                                    Новая пара
                                </th>
                                <th class="text-center">
                                    Время изменения
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="log in logsStore.logs" :key="log.name">
                                <td class="text-center">{{ log.from }}</td>
                                <td class="text-center">{{ log.to }}</td>
                                <td class="text-center">{{ log.time }}</td>
                            </tr>
                        </tbody>
                    </v-table>
                </article>
                <p v-else>У вас ещё не было изменений</p>
            </v-container>
        </article>
    </main>
</template>

<script setup>
    import {
        RouterLink
    } from 'vue-router'
    import {
        ref,
        computed
    } from 'vue'
    import {
        useLogs
    } from '@/stores/logs';
    import {
        useOrderbook
    } from '@/stores/orderbook'

    const logsStore = useLogs()
    const orderBookStore = useOrderbook()

    const pair = ref('BTCUSDT')
    let previousValue = ref(null)

    const formattedDate = computed(() => {
        const options = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        }

        return new Date().toLocaleDateString('ru-RU', options)
    })

    function handleUpdate(newValue) {
        const url = `https://api.binance.com/api/v3/depth?symbol=${pair.value}&limit=1000`

        if (previousValue.value == null) {
            previousValue.value = 'BTCUSDT'
        }

        logsStore.addToLogs({
            from: previousValue.value,
            to: newValue,
            time: formattedDate.value
        })

        previousValue.value = pair.value;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Ошибка HTTP! Статус: ${response.status}`)
                }
                return response.json()
            }).then(data => {
                orderBookStore.addToOrderBook(data)
            }).catch(error => {
                console.error('Ошибка: ', error.message, error.stack);
            })
    }
</script>

<style scoped lang="scss">
    header {
        width: 100%;
        background-color: #282828;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: space-evenly;

        .logo {
            .logo__div {
                background-color: #41B883;
                width: 40px;
                height: 40px;
                border-radius: 100%;
            }
        }

        .menu {
            display: flex;
            gap: 20px;

            .menu__element {
                transition: .3s;
                cursor: pointer;

                &:hover {
                    opacity: .5;
                }
            }
        }
    }

    .content {
        display: flex;
        gap: 10px;
        flex-direction: column;

        .content__select {
            color: #E0F2F1;
        }

        h2 {
            color: #E0F2F1;
        }

        .logs {
            border: 1px solid rgba(224, 242, 241, 0.4);
            width: 100%;
            height: fit-content;
            border-radius: 4px;

            p {
                color: #E0F2F1;
            }
        }
    }
</style>