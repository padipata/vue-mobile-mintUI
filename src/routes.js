import App from './App.vue'
import home from './vuepage/components/home/Home.vue'

const routes = [
    {
        path: '/', component: App,
        children: [
            {
                path: '',
                redirect: '/home'
            },
            {
                path: '/home',
                component: home
            }
        ]
    }
];

export default routes;
