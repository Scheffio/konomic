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
                <h2>Книга ордеров</h2>
                <article v-if="isOrdersExists" class="orders">
                    <v-row class="d-flex ma-2">
                        <v-col>
                            <h4>Аски</h4>
                            <v-table ref="firstTable" fixed-header :height="tableHeight">
                                <thead>
                                    <tr>
                                        <th class="text-center">
                                            Price
                                        </th>
                                        <th class="text-center" v-if="!isMobile">
                                            Quantity
                                        </th>
                                        <th class="text-center">
                                            Total
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(ask, askIndex) in orderBookStore.orders.asks.slice(0, tableLimit)"
                                        :key="askIndex">
                                        <td class="text-center">{{ ask[0] }}</td>
                                        <td class="text-center" v-if="!isMobile">{{ ask[1] }}</td>
                                        <td class="text-center">{{ Number(ask[0]) * Number(ask[1]) }}</td>
                                    </tr>
                                </tbody>
                            </v-table>
                        </v-col>
                        <v-col>
                            <h4>Биды</h4>
                            <v-table fixed-header :height="tableHeight">
                                <thead>
                                    <tr>
                                        <th class="text-center">
                                            Price
                                        </th>
                                        <th class="text-center" v-if="!isMobile">
                                            Quantity
                                        </th>
                                        <th class="text-center">
                                            Total
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(bid, bidsIndex) in orderBookStore.orders.bids.slice(0, tableLimit)"
                                        :key="bidsIndex">
                                        <td class="text-center">{{ bid[0] }}</td>
                                        <td class="text-center" v-if="!isMobile">{{ bid[1] }}</td>
                                        <td class="text-center">{{ Number(bid[0]) * Number(bid[1]) }}</td>
                                    </tr>
                                </tbody>
                            </v-table>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-select label="Количество элементов в таблице" v-model="tableLimit" :items="[100, 500, 1000]"
                            variant="outlined"></v-select>
                    </v-row>
                </article>
                <p v-else>Ордеров не найдено</p>
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
        watchEffect,
        onBeforeMount,
        watch,
    } from 'vue'
    import {
        useOrderbook
    } from '@/stores/orderbook';

    const orderBookStore = useOrderbook()

    const tableLimit = ref(100)

    const tableHeight = ref()

    const isMobile = ref()

    const width = ref(window.innerWidth)
    const height = ref()

    window.addEventListener('resize', () => {
        width.value = window.innerWidth;
        height.value = window.screen.height
    })

    onBeforeMount(() => {
        height.value = window.screen.height
        width.value = window.innerWidth
    })

    watch(() => height.value, (val) => {
        tableHeight.value = (height.value - 250) / 2
    })

    watch(() => width.value, (val) => {
        isMobile.value = width.value < 600
    })

    const isOrdersExists = ref()

    localStorage.getItem('orders') ? isOrdersExists.value = true : isOrdersExists.value = false

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
    }
</style>