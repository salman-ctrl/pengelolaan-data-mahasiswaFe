import { createRouter, createWebHistory } from "vue-router";
import MahasiswaList from '../components/Mahasiswa/List.vue';
import MahasiswaCreate from '../components/Mahasiswa/Create.vue';
import MahasiswaShow from '../components/Mahasiswa/Show.vue';
import MahasiswaEdit from '../components/Mahasiswa/Edit.vue';

const routes = [
    {
        path: '/mahasiswa',
        name: 'mahasiswa.list',
        component: MahasiswaList,
    },
    {
        path: '/mahasiswa/create',
        name: 'mahasiswa.create',
        component: MahasiswaCreate,
    },
    {
        path: '/mahasiswa/edit/:id',
        name: 'mahasiswa.edit',
        component: MahasiswaEdit,
        props: true,
    },
    {
        path: '/mahasiswa/:id',
        name: 'mahasiswa.show',
        component: MahasiswaShow,
        props: true,
    },
    {
        path: '/',
        redirect: '/mahasiswa', // Redirect root path ke /mahasiswa
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;