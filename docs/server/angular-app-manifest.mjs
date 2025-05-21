
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
    'index.csr.html': {size: 7612, hash: '5e4503753be5617fe3008417fa409bfbbab1c4c71b28fdef7502604d82985955', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 7884, hash: 'dfda60e32e4067448720da5a6f3b40fc84bd1d1f4d457b1a2dd2123c472f62d0', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'profile/index.html': {size: 23218, hash: 'fc41820919e5510182423dd0ff37426497bec0e475737fcb8f52b11fa9f608a1', text: () => import('./assets-chunks/profile_index_html.mjs').then(m => m.default)},
    'index.html': {size: 23218, hash: '27e7eb7a26eb33bd2e0de28c3378a978d8e00cbf7fd90ecd4e7d958f071306e5', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'profile/hannahisraelagodin@yahoo.com.ph/index.html': {size: 20681, hash: '0df81c056d6da6495ac5570fcf908aba3d7f665fe753760080eddc25d8c48e99', text: () => import('./assets-chunks/profile_hannahisraelagodin@yahoo_com_ph_index_html.mjs').then(m => m.default)},
    'admin/index.html': {size: 20681, hash: '0df81c056d6da6495ac5570fcf908aba3d7f665fe753760080eddc25d8c48e99', text: () => import('./assets-chunks/admin_index_html.mjs').then(m => m.default)},
    'contact/index.html': {size: 17236, hash: '595b4f3a9e252f246d55e5359ccdd084bcbf4014bfa3c3673d95bd67e5b54d28', text: () => import('./assets-chunks/contact_index_html.mjs').then(m => m.default)},
    'profile/markcleocalbang05@gmail.com/index.html': {size: 20681, hash: '0df81c056d6da6495ac5570fcf908aba3d7f665fe753760080eddc25d8c48e99', text: () => import('./assets-chunks/profile_markcleocalbang05@gmail_com_index_html.mjs').then(m => m.default)},
    'profile/buzz3@gmail.com/index.html': {size: 20681, hash: '0df81c056d6da6495ac5570fcf908aba3d7f665fe753760080eddc25d8c48e99', text: () => import('./assets-chunks/profile_buzz3@gmail_com_index_html.mjs').then(m => m.default)},
    'admin-dashboard/index.html': {size: 20681, hash: '0df81c056d6da6495ac5570fcf908aba3d7f665fe753760080eddc25d8c48e99', text: () => import('./assets-chunks/admin-dashboard_index_html.mjs').then(m => m.default)},
    'admin-dashboard/user-list/index.html': {size: 20681, hash: '0df81c056d6da6495ac5570fcf908aba3d7f665fe753760080eddc25d8c48e99', text: () => import('./assets-chunks/admin-dashboard_user-list_index_html.mjs').then(m => m.default)},
    'styles-EAXBNCMW.css': {size: 2373, hash: 'loNWDoOIpA4', text: () => import('./assets-chunks/styles-EAXBNCMW_css.mjs').then(m => m.default)}
  },
};
