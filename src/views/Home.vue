<template>
    <div class="home">
        <button v-on:click="logout()">Logout</button>
        <div>
            {{token}}
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';

    @Component
    export default class Home extends Vue {
        token: string | null = '';

        mounted() {
            this.token = this.$auth.token;
        }

        logout() {
            this.$auth.logout();
        }
    }
</script>
