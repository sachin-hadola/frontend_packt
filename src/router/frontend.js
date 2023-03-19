import BookIndex from '@/components/frontend/books/IndexComponent.vue'
import BookView from '@/components/frontend/books/ViewComponent.vue'
import MainLayout from '@/components/frontend/layouts/MainLayoutComponent.vue'

export default [
    {
        path: '/',
        component: MainLayout,
        children: [
            {
                path: '',
                name: 'books',
                component: BookIndex
            },
            {
                path: ':id/view',
                name: 'books.view',
                component: BookView
            }
        ]
    },
]