<template>
    <v-dialog :value="true" max-width="400" persistent>
        <v-card>
            <v-toolbar>
                <v-toolbar-title>Create Universe</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
                <v-form v-model="valid">
                    <v-text-field
                            v-model="payload.name"
                            label="Name"
                            type="text"
                            box
                            :rules="nameRules"
                            required
                    ></v-text-field>
                    <v-textarea
                            v-model="payload.description"
                            :rules="descriptionRules"
                            label="Description"
                            box
                            required>
                    </v-textarea>
                    <v-combobox
                            v-model="payload.tags"
                            :items="universeTags"
                            :search-input.sync="search"
                            hide-selected
                            label="Add some tags"
                            multiple
                            persistent-hint
                            small-chips
                    >
                        <template v-slot:no-data>
                            <v-list-tile>
                                <v-list-tile-content>
                                    <v-list-tile-title>
                                        No results matching "<strong>{{ search }}</strong>". Press <kbd>enter</kbd> to
                                        create a new one
                                    </v-list-tile-title>
                                </v-list-tile-content>
                            </v-list-tile>
                        </template>
                    </v-combobox>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn :disabled="!valid" v-on:click="onSave">Save</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
    import Vue                 from 'vue';
    import { Component, Prop } from 'vue-property-decorator';
    import {
        CreateUniverse,
        CreateUniverseVariables,
        UniverseTags
    }                          from '@/app/graphql';

    @Component<CreateUniversePage>({
        name: 'CreateUniversePage',
        apollo: {
            universeTags: {
                query: require('@/app/graphql/universe-tags.gql'),
            }
        }
    })
    export default class CreateUniversePage extends Vue implements UniverseTags {
        @Prop({required: true, type: String})
        listRouteName!: string;
        universeTags: string[] = [];
        payload: Partial<CreateUniverseVariables> = {
            tags: []
        };
        search: string | null = null;
        valid: boolean = false;

        get nameRules(): string[] {
            const rules = [];
            if (!this.payload.name || this.payload.name === '') {
                rules.push('required');
            }
            return rules;
        }

        get descriptionRules(): string[] {
            const rules = [];
            if (!this.payload.description || this.payload.description === '') {
                rules.push('required');
            }
            return rules;
        }


        onSave() {
            this.$apollo.mutate<CreateUniverse>({
                mutation: require('@/app/graphql/create-universe.gql'),
                variables: this.payload,
                update: (proxy, res) => {
                    if (res.data) {
                        console.log(res.data.createUniverse);
                    }
                }
            }).then(_ => this.$router.go(-1)).catch(error => console.log(error));
        }
    }
</script>

<style lang="scss" scoped>

</style>