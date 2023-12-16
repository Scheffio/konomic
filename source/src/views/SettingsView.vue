<template>
    <main>
        <article>
            <v-container class="content">
                <h2>Валютная пара</h2>
                <v-select v-model="orderBookStore.pair" :items="['BTCUSDT', 'BNBBTC', 'ETHBTC']" variant="outlined"
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
        ref
    } from 'vue'
    import {
        useLogs
    } from '@/stores/logs';
    
    import {
        useOrderbook
    } from '@/stores/orderbook';

    const logsStore = useLogs()
    const orderBookStore = useOrderbook()

    function handleUpdate(value) {
        orderBookStore.pair = value
    }

</script>

<style scoped lang="scss">
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