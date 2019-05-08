<template>
    <v-card>
        <v-card-title primary-title>
            <span class="subheading ellipsis">{{item.name}}</span>
        </v-card-title>
        <v-card-text v-if="item.description" v-html="item.description"></v-card-text>
        <v-card-actions>
            <v-list-tile class="grow">
                <!--v-list-tile-avatar v-if="universe.owner.picture">
                    <v-img :src="universe.owner.picture"></v-img>
                </v-list-tile-avatar-->
                <v-list-tile-content>
                    <span class="caption">By : {{item.owner.name}}</span>
                </v-list-tile-content>
            </v-list-tile>
        </v-card-actions>
    </v-card>
</template>

<script lang="ts">
    import Vue                 from 'vue';
    import { Component, Prop } from 'vue-property-decorator';
    import { universe }        from '@/app/graphql';

    @Component<UniverseCard>({
        name: 'UniverseCard',
        props: {
            item: Object,
        },
        components: {}
    })
    export default class UniverseCard extends Vue {
        item!: universe;
    }
</script>

<style lang="scss" scoped>

</style>