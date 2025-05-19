
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
    "route": "/dinnerbell/profile/hannahisraelagodin@yahoo.com.ph"
  },
  {
    "renderMode": 2,
    "route": "/dinnerbell/profile/buzz3@gmail.com"
  },
  {
    "renderMode": 2,
    "route": "/dinnerbell/profile/markcleocalbang05@gmail.com"
  },
  {
    "renderMode": 0,
    "route": "/dinnerbell/profile/*"
  },
  {
    "renderMode": 2,
    "route": "/dinnerbell/contact"
  },
  {
    "renderMode": 2,
    "route": "/dinnerbell/admin"
  },
  {
    "renderMode": 2,
    "route": "/dinnerbell/admin-dashboard"
  },
  {
    "renderMode": 2,
    "route": "/dinnerbell/admin-dashboard/user-list"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 7612, hash: '1fe1d8317e4f80f3a90e7ef1ffbf75bfd291216270b5a4dfd6e7368565b5d755', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 7884, hash: 'afb28f61a7e4c4b8cb50efe21cfe17c8f63e63bfedd0b218a36e91e82a8b4d1e', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 21130, hash: 'a9ec9232968dc480b6acab16051fa455a945e11288065bc384f8b40dd5b64c85', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'profile/index.html': {size: 21130, hash: '35835960e75f9b2a6a25d306919c6f1d65382231d99c4f486a5f7471eda9224d', text: () => import('./assets-chunks/profile_index_html.mjs').then(m => m.default)},
    'contact/index.html': {size: 17236, hash: 'cba74709b0fecb10ff0795df65f35f314d12de1fd34d1ce220b75aebd0e1a703', text: () => import('./assets-chunks/contact_index_html.mjs').then(m => m.default)},
    'profile/markcleocalbang05@gmail.com/index.html': {size: 20506, hash: '6f545f57ad01ac3133b333dfbc1e42c0be252b17f334310d25f8d03f30a744ce', text: () => import('./assets-chunks/profile_markcleocalbang05@gmail_com_index_html.mjs').then(m => m.default)},
    'profile/hannahisraelagodin@yahoo.com.ph/index.html': {size: 20506, hash: '6f545f57ad01ac3133b333dfbc1e42c0be252b17f334310d25f8d03f30a744ce', text: () => import('./assets-chunks/profile_hannahisraelagodin@yahoo_com_ph_index_html.mjs').then(m => m.default)},
    'admin-dashboard/index.html': {size: 20506, hash: '6f545f57ad01ac3133b333dfbc1e42c0be252b17f334310d25f8d03f30a744ce', text: () => import('./assets-chunks/admin-dashboard_index_html.mjs').then(m => m.default)},
    'admin/index.html': {size: 20506, hash: '6f545f57ad01ac3133b333dfbc1e42c0be252b17f334310d25f8d03f30a744ce', text: () => import('./assets-chunks/admin_index_html.mjs').then(m => m.default)},
    'admin-dashboard/user-list/index.html': {size: 20506, hash: '6f545f57ad01ac3133b333dfbc1e42c0be252b17f334310d25f8d03f30a744ce', text: () => import('./assets-chunks/admin-dashboard_user-list_index_html.mjs').then(m => m.default)},
    'profile/buzz3@gmail.com/index.html': {size: 20506, hash: '6f545f57ad01ac3133b333dfbc1e42c0be252b17f334310d25f8d03f30a744ce', text: () => import('./assets-chunks/profile_buzz3@gmail_com_index_html.mjs').then(m => m.default)},
    'styles-EAXBNCMW.css': {size: 2373, hash: 'loNWDoOIpA4', text: () => import('./assets-chunks/styles-EAXBNCMW_css.mjs').then(m => m.default)}
  },
};
