import { Breadcrumb } from '@app/components/Breadcrumb.tsx';
import PublishersFilter from '@app/islands/PublishersFilter.tsx';
import DatabaseUpdater from '@app/islands/DatabaseUpdater.tsx';

export default function AdminPublishersPage() {
    return (
        <>
            <Breadcrumb title={`Publicadores`} backLink='/admin'>
                <DatabaseUpdater />
            </Breadcrumb>
            <div className='container mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8'>
                <PublishersFilter />
            </div>
        </>
    );
}
