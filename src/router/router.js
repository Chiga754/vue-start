import Main from '@/pages/Main';
import PostPage from '@/pages/PostPage';
import About from '@/pages/About';
import PostIdPage from '@/pages/PostIdPage';
import PostPageWidthStore from '@/pages/PostPageWidthStore';
import PostPageCompositionApi from '@/pages/PostPageCompositionApi';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        component: Main,
    },
    {
        path: '/posts',
        component: PostPage,
    },
    {
        path: '/posts/:id',
        component: PostIdPage,
    },
    {
        path: '/about',
        component: About,
    },
    {
        path: '/store',
        component: PostPageWidthStore,
    },
    {
        path: '/composition',
        component: PostPageCompositionApi,
    },
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL),
});

export default router;