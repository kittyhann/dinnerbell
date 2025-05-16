
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
    'index.csr.html': {size: 7612, hash: '8183e631b76edef8320772afa2b527ea14ecf9fc35a3498b5bab8b5aa65e0d96', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 7884, hash: '12331f216f9c4fa4e9a6320539c03630faf4ca5f303071583094b2db3d970404', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'profile/hannahisraelagodin@yahoo.com.ph/index.html': {size: 16659, hash: '134346594f966394a3619279c5a7df79bd656acbb74767acf38a8bf710f201e1', text: () => import('./assets-chunks/profile_hannahisraelagodin@yahoo_com_ph_index_html.mjs').then(m => m.default)},
    'profile/buzz3@gmail.com/index.html': {size: 16659, hash: '134346594f966394a3619279c5a7df79bd656acbb74767acf38a8bf710f201e1', text: () => import('./assets-chunks/profile_buzz3@gmail_com_index_html.mjs').then(m => m.default)},
    'profile/index.html': {size: 20857, hash: 'afc9f8b29d800f7924ba0534227b355b144cca0f6dab1d8610b99b10678682ab', text: () => import('./assets-chunks/profile_index_html.mjs').then(m => m.default)},
    'index.html': {size: 20857, hash: 'd6e63d82ca6223cc8fbd71da0db86071a00adcbfeb965f2ed102fefa83815fe3', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'profile/markcleocalbang05@gmail.com/index.html': {size: 16659, hash: '134346594f966394a3619279c5a7df79bd656acbb74767acf38a8bf710f201e1', text: () => import('./assets-chunks/profile_markcleocalbang05@gmail_com_index_html.mjs').then(m => m.default)},
    'contact/index.html': {size: 17068, hash: '0733f67d3b29efa402c3d2cf8c36605c849e75938838d513a1c9269c0578c604', text: () => import('./assets-chunks/contact_index_html.mjs').then(m => m.default)},
    'admin-dashboard/index.html': {size: 16659, hash: '134346594f966394a3619279c5a7df79bd656acbb74767acf38a8bf710f201e1', text: () => import('./assets-chunks/admin-dashboard_index_html.mjs').then(m => m.default)},
    'admin/index.html': {size: 16659, hash: '134346594f966394a3619279c5a7df79bd656acbb74767acf38a8bf710f201e1', text: () => import('./assets-chunks/admin_index_html.mjs').then(m => m.default)},
    'admin-dashboard/user-list/index.html': {size: 16659, hash: '134346594f966394a3619279c5a7df79bd656acbb74767acf38a8bf710f201e1', text: () => import('./assets-chunks/admin-dashboard_user-list_index_html.mjs').then(m => m.default)},
    'styles-EAXBNCMW.css': {size: 2373, hash: 'loNWDoOIpA4', text: () => import('./assets-chunks/styles-EAXBNCMW_css.mjs').then(m => m.default)}
  },
};
