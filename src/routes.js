import App from './App.vue'
import index from './vuepage/components/first/First.vue'
import home from './vuepage/components/home/Home.vue'

const routes = [
    {
        path: '/', component: App,
        children: [
            {
                path: '',
                redirect: '/index'
            },
            {
                path: '/index',
                component: index,
                children: [
                    {
                        path: '',
                        redirect: '/home'
                    }
                ]
            }
        ]
    }
]
export default routes;
