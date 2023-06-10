import Router from '@koa/router'

import produitRoutes from '#components/produit/produit-routes.js'
import userRoutes from '#components/user/user-routes.js'
import orderRoutes from '../components/commande/commande-routes.js'
import cartRoutes from '../components/Cart/cart-routes.js'

const API_V1_ROUTER = new Router({ prefix: '/api/v1' })

API_V1_ROUTER.get('/', (ctx) => {ctx.ok ({message: 'Hello World'})})
API_V1_ROUTER.use('/produits', produitRoutes.routes(), produitRoutes.allowedMethods())
API_V1_ROUTER.use('/orders', orderRoutes.routes(), orderRoutes.allowedMethods())
API_V1_ROUTER.use('/users', userRoutes.routes(), userRoutes.allowedMethods())
API_V1_ROUTER.use('/cart', cartRoutes.routes(), cartRoutes.allowedMethods())

export { API_V1_ROUTER }
