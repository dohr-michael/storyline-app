<template>
    <v-layout>
        <v-text-field flat
                      solo-inverted
                      hide-details
                      prepend-inner-icon="search"
                      :clearable="true"
                      :value="queryString"
                      v-on:input="msg => onInputChange(msg)"
                      label="Search">
        </v-text-field>
    </v-layout>
</template>

<script lang="ts">
    import Vue                          from 'vue';
    import { Observable }               from 'rxjs';
    import { map, pluck, debounceTime } from 'rxjs/operators';
    import { Component, Prop }          from 'vue-property-decorator';

    @Component<UniversesToolbar>({
        name: 'UniversesToolbar',
        observableMethods: {
            onInputChange: 'onInputChange$'
        },
    })
    export default class UniversesToolbar extends Vue {
        @Prop({required: true, type: String})
        queryString!: string;
        @Prop({required: true, type: Function})
        changeQuery!: (nextQuery: string) => void;
        onInputChange$!: Observable<string>;
        onInputChange!: (value: string) => void;

        mounted() {
            this.onInputChange$.pipe(
                debounceTime(300)
            ).subscribe(next => {
                this.changeQuery(next);
            });
        }
    }
</script>

<style lang="scss" scoped>

</style>