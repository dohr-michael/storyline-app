<template>
    <v-layout column fill-height>
    </v-layout>
</template>

<script lang="ts">
    import Vue                 from 'vue';
    import { Component, Prop } from 'vue-property-decorator';

    const Step = 6;

    @Component<Home>({})
    export default class Home extends Vue {}
</script>
