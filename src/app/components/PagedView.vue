<template>
    <v-layout column fill-height>
        <v-flex v-if="loading" xs12 align-self-center>
            <v-progress-circular indeterminate color="primary"/>
        </v-flex>
        <template v-else-if="items.length > 0">
            <v-container fluid grid-list-md>
                <v-layout row wrap>
                    <v-flex v-for="(item, idx) in items" :key="idx" xs4>
                        <component :is="renderer" :item="item">item</component>
                    </v-flex>
                </v-layout>
            </v-container>
            <v-flex xs12>
                <v-layout align-center justify-end column fill-height>
                    <v-pagination :length="totalPages"
                                  :value="value"
                                  v-on:input="onPageChange"
                                  total-visible="7"/>
                </v-layout>
            </v-flex>
        </template>
        <v-flex v-else xs12 align-self-center>
            <span>No result :(</span>
        </v-flex>
        <slot></slot>
    </v-layout>
</template>

<script lang="ts">
    import Vue                 from 'vue';
    import { Component, Prop } from 'vue-property-decorator';

    @Component<PagedView>({
        name: 'PagedView',
        model: {
            prop: 'value',
            event: 'input',
        },
        components: {}
    })
    export default class PagedView<T = any> extends Vue {
        @Prop({required: true, type: Boolean})
        loading!: boolean;
        @Prop({required: true, type: Array})
        items!: Array<T>;
        @Prop({required: true, type: Function})
        renderer!: any;
        @Prop({required: true, type: Number})
        totalPages!: number;
        @Prop({required: true, type: Number})
        value!: number;

        onPageChange(next: number) {
            this.$emit('input', next);
        }
    }
</script>

<style lang="scss" scoped>

</style>