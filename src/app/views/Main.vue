<template>
    <v-app>
        <v-navigation-drawer app fixed clipped v-model="drawer.model">
            <router-view name="Sidebar"></router-view>
        </v-navigation-drawer>
        <v-toolbar app fixed clipped-left>
            <v-toolbar-title class="ml-0 pl-3" style="width: 300px">
                <v-toolbar-side-icon @click.stop="drawer.model = !drawer.model"></v-toolbar-side-icon>
                <span class="hidden-sm-and-down">Storyline&nbsp;</span>
            </v-toolbar-title>
            <router-view name="Toolbar"/>
            <v-spacer/>
            <user-profile/>
        </v-toolbar>
        <v-content app>
            <v-container fluid fill-height>
                <router-view name="Main"/>
            </v-container>
        </v-content>
        <v-footer app>
            <span>&copy; {{ new Date().getFullYear() }}</span>
        </v-footer>
        <v-dialog persistent v-model="$route.meta.modal" max-width="600px">
            <router-view name="Modal"/>
        </v-dialog>
    </v-app>
</template>

<script lang="ts">
    import Vue                 from 'vue';
    import { Component, Prop } from 'vue-property-decorator';
    import UserProfile         from '@/app/components/UserProfile.vue';

    @Component<Main>({
        name: 'Main',
        components: {
            UserProfile
        }
    })
    export default class Main extends Vue {
        drawer = {
            model: null
        };
    }
</script>

<style lang="scss" scoped>

</style>