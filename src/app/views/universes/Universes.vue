<template>
    <PagedView
            :loading="loading !== 0"
            :items="universes ? universes.items : []"
            :renderer="renderer"
            :new-route-name="newRouteName"
            :total-pages="totalPages"
            :value="currentPage"
            v-on:input="onPageChange">
        <v-btn v-if="!!newRouteName" absolute dark fab bottom right color="principal" v-on:click="openCreation">
            <v-icon>add</v-icon>
        </v-btn>
        <router-view></router-view>
    </PagedView>
</template>

<script lang="ts">
    import Vue                 from 'vue';
    import { Component, Prop } from 'vue-property-decorator';
    import { UniversesPaged }  from '@/app/domain/universe';
    import PagedView           from '@/app/components/PagedView.vue';
    import UniverseCard        from '@/app/components/universes/UniverseCard.vue';

    const Step = 6;

    const toSearchQuery = (query: string): string => {
        const regex = `".*${query.split('"').join('\\"')}.*"`;
        return `name ==~ ${regex} OR description ==~ ${regex} OR tags ==~ ${regex}`;
    };

    @Component<Universes>({
        name: 'Universes',
        components: {
            PagedView,
            UniverseCard
        },
        apollo: {
            universes: {
                query: require('@/app/graphql/universes.gql'),
                variables() {
                    return {
                        query: this.queryString === '' ? null : toSearchQuery(this.queryString),
                        offset: (this.currentPage - 1) * Step,
                        limit: Step
                    };
                },
                loadingKey: 'loading',
            },
        }
    })
    export default class Universes extends Vue {
        @Prop({required: true, type: String})
        queryString!: string;
        @Prop({required: true, type: Number})
        currentPage!: number;
        @Prop({required: true, type: Function})
        changePage!: (nextPage: number) => void;
        @Prop({type: String})
        newRouteName?: string;
        @Prop({type: String})
        detailsRouteName?: string;

        loading: number = 0;
        universes?: UniversesPaged;

        get renderer() { return UniverseCard; }

        get totalPages(): number { return this.universes ? Math.ceil(this.universes.total / Step) : 0; }

        onPageChange(next: number) {
            if (next !== this.currentPage) {
                this.changePage(next);
            }
        }

        openCreation() {
            if (this.newRouteName) {
                this.$router.push({name: this.newRouteName});
            }
        }
    }
</script>
