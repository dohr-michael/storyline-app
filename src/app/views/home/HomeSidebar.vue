<template>
    <v-list>
        <slot/>
    </v-list>
</template>

<script lang="ts">
    import Vue                 from 'vue';
    import { Component, Prop } from 'vue-property-decorator';


    @Component<HomeSidebar>({
        name: 'HomeSidebar',
        components: {},
    })
    export default class HomeSidebar extends Vue {}
</script>

<style lang="scss" scoped>

</style>