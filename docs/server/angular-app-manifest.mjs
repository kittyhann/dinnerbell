
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/dinnerbell/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/dinnerbell"
  },
  {
    "renderMode": 2,
    "route": "/dinnerbell/profile"
  },
  {
    "renderMode": 2,
    "route": "/dinnerbell/contact"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 7612, hash: 'e7d702c43bf788089ca81d710e24ad172981a5499f8b8f781acd92e30aa1a492', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 7884, hash: 'ed48546cfffae154f3a3498c69058d2bc08168269235ebe35719fde5991a6e3c', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'profile/index.html': {size: 18643, hash: '43869256a83d903c81cd1dba747970ec7852514536cc45baea928736b1af072c', text: () => import('./assets-chunks/profile_index_html.mjs').then(m => m.default)},
    'contact/index.html': {size: 15970, hash: 'b41179fb4736532c1b63e37598a705603b0e0ce657bf8331e8ea283185b9fc8e', text: () => import('./assets-chunks/contact_index_html.mjs').then(m => m.default)},
    'index.html': {size: 20853, hash: 'db56a68a0fa7558a26a9927d7c9c2a383cf2fb03525c32295e9413405fc48519', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-EA35V5WR.css': {size: 2318, hash: 'k04jPFNEvsg', text: () => import('./assets-chunks/styles-EA35V5WR_css.mjs').then(m => m.default)}
  },
};
