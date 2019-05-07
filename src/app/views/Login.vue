<template>
    <v-app id="inspire">
        <v-content>
            <v-container fluid fill-height>
                <v-layout align-center justify-center>
                    <v-progress-circular :size="50" indeterminate></v-progress-circular>
                </v-layout>
            </v-container>
        </v-content>
    </v-app>
</template>

<script lang="ts">
    import Vue                 from 'vue';
    import { Component, Prop } from 'vue-property-decorator';

    @Component<Login>({
        name: 'Login',
        components: {}
    })
    export default class Login extends Vue {
        mounted() {
            this.$auth.handleAuthentication().then(() => {
                const route = this.$auth.state || {name: 'home'};
                this.$router.push(route);
            });
        }
    }
</script>

<style lang="scss" scoped>

</style>