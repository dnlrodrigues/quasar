
const routes = [
  {
    path: '/',
    /* mode: abstract */
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/cadastro', component: () => import('pages/CadastroLista.vue') },
      { path: '/cadastro_jogo/:id', component: () => import('pages/CadastroJogo.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
