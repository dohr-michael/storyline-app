<template>
    <v-menu bottom left>
        <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
                <v-icon v-if="!user.initial">person</v-icon>
                <v-avatar v-if="user.picture" size="32">
                    <img :src="user.picture">
                </v-avatar>
            </v-btn>
        </template>
        <v-card>
            <v-card-text>
                <v-layout row>
                    <v-flex justify-content align-center>
                        {{ user.name }}
                    </v-flex>
                </v-layout>
            </v-card-text>
            <v-card-actions>
                <v-spacer/>
                <v-btn icon v-on:click="copyTokenToClipboard()">
                    <v-icon>file_copy</v-icon>
                </v-btn>
                <v-btn icon v-on:click="logout()">
                    <v-icon>power_settings_new</v-icon>
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-menu>
</template>

<script lang="ts">
    import Vue                        from 'vue';
    import { Component, Prop, Watch } from 'vue-property-decorator';

    @Component<UserProfile>({
        name: 'UserProfile',
        components: {}
    })
    export default class UserProfile extends Vue {
        user: {
            token?: string | null;
            picture?: string | null;
            name?: string | null;
            initial?: string | null;
        } = {};

        @Watch('$auth.profile', {deep: true})
        onProfileChange(profile) {
            let initial = '';
            if (profile && profile.name) {
                initial = profile.name.split(' ').slice(0, 2).map(s => s.slice(0, 1)).join('');
            }
            this.user = {
                token: this.$auth.token,
                picture: profile ? profile.picture : null,
                name: profile ? profile.name : null,
                initial,
            };
        }

        mounted() { this.onProfileChange(this.$auth.profile); }

        logout() {
            return this.$auth.logout();
        }

        copyTokenToClipboard() {
            // Create new element
            const el: any = document.createElement('textarea');
            // Set value (string to be copied)
            el.value = this.$auth.token || '';
            // Set non-editable to avoid focus and move outside of view
            el.setAttribute('readonly', '');
            el.style = {position: 'absolute', left: '-9999px'};
            document.body.appendChild(el);
            // Select text inside element
            el.select();
            // Copy text to clipboard
            document.execCommand('copy');
            // Remove temporary element
            document.body.removeChild(el);
        }

    }
</script>

<style lang="scss" scoped>

</style>