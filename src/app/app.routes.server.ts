import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'profile/:email',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: () => Promise.resolve([
      { email: 'hannahisraelagodin@yahoo.com.ph' },
      { email: 'buzz3@gmail.com' },
      { email: 'markcleocalbang05@gmail.com' },
      // Add more emails as needed
    ])
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
