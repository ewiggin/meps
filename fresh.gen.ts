// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_404 from './routes/_404.tsx';
import * as $_app from './routes/_app.tsx';
import * as $admin_layout from './routes/admin/_layout.tsx';
import * as $admin_middleware from './routes/admin/_middleware.ts';
import * as $admin_index from './routes/admin/index.tsx';
import * as $admin_login from './routes/admin/login.tsx';
import * as $admin_maps_id_num_index from './routes/admin/maps/[id]/[num]/index.tsx';
import * as $admin_maps_id_index from './routes/admin/maps/[id]/index.tsx';
import * as $admin_maps_index from './routes/admin/maps/index.tsx';
import * as $admin_publishers_id_ from './routes/admin/publishers/[id].tsx';
import * as $admin_publishers_index from './routes/admin/publishers/index.tsx';
import * as $index from './routes/index.tsx';
import * as $maps_id_num_index from './routes/maps/[id]/[num]/index.tsx';
import * as $PublishersFilter from './islands/PublishersFilter.tsx';
import type { Manifest } from '$fresh/server.ts';

const manifest = {
    routes: {
        './routes/_404.tsx': $_404,
        './routes/_app.tsx': $_app,
        './routes/admin/_layout.tsx': $admin_layout,
        './routes/admin/_middleware.ts': $admin_middleware,
        './routes/admin/index.tsx': $admin_index,
        './routes/admin/login.tsx': $admin_login,
        './routes/admin/maps/[id]/[num]/index.tsx': $admin_maps_id_num_index,
        './routes/admin/maps/[id]/index.tsx': $admin_maps_id_index,
        './routes/admin/maps/index.tsx': $admin_maps_index,
        './routes/admin/publishers/[id].tsx': $admin_publishers_id_,
        './routes/admin/publishers/index.tsx': $admin_publishers_index,
        './routes/index.tsx': $index,
        './routes/maps/[id]/[num]/index.tsx': $maps_id_num_index,
    },
    islands: {
        './islands/PublishersFilter.tsx': $PublishersFilter,
    },
    baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
