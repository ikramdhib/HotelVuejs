<template>
    <Login v-if="$route.path === '/login'" />
    <ForgetPassword v-else-if="$route.path === '/forgetpassword'" />
    <UpdatePassword v-else-if="$route.path === '/updatepassword'" />
    <Error v-else-if="$route.path === '/error'" />
    <Done v-else-if="$route.path === '/done'" />
    <Register v-else-if="$route.path === '/register'" />
    <NotFound v-else-if="$route.path === '/notfound'" />
    <Access v-else-if="$route.path === '/access'" />
    <App v-else @change-theme="changeTheme" />
</template>

<script>
import EventBus from './AppEventBus';
import App from './App';
import Login from './pages/Login';
import ForgetPassword from './pages/ForgetPassword';
import UpdatePassword from './pages/UpdatePassword';
import Error from './pages/Error';
import Done from './pages/Done';
import Register from './components/Register'
import NotFound from './pages/NotFound';
import Access from './pages/Access';

export default {
    methods: {
        changeTheme(event) {
            let themeElement = document.getElementById('theme-link');
            themeElement.setAttribute('href', themeElement.getAttribute('href').replace(this.$appState.theme, event.theme));
            this.$appState.theme = event.theme;
            this.$appState.darkTheme = event.dark;
            EventBus.emit('change-theme', event);

            if (event.theme.startsWith('md')) {
                this.$primevue.config.ripple = true;
            }
        }
    },
    components: {
        App,
        Login,
        ForgetPassword,
        UpdatePassword,
        Error,
        Done,
        Register,
        NotFound,
        Access
    }
}
</script>