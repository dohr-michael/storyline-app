<template>
    <span>Login</span>
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
                this.$router.push({name: 'home'});
            });
        }
    }
</script>

<style lang="scss" scoped>

</style>