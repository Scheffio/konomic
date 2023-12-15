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
</template>

<script setup>

</script>

<style lang="scss" scoped>
    header {
        width: 100%;
        background-color: #282828;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: space-evenly;

        .logo {
            &__div {
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
</style>