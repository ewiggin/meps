import { Breadcrumb } from "@app/components/Breadcrumb.tsx";
import publishers from "@app/data/publishers.json" with { type: 'json' };
import { Handlers } from 'https://deno.land/x/fresh@1.7.2/src/server/types.ts';
import { CryptoUtils } from '@app/domain/crypto.utils.ts';
import PublishersFilter from '@app/islands/PublishersFilter.tsx';

export const handler: Handlers<unknown> = {
    async GET(_, ctx) {
        const id = ctx.params.id;
        return ctx.render({
            publishers: await CryptoUtils.decrypt(
                publishers,
                Deno.env.get('KEY_BASE_64')!,
            ),
            id,
        });
    },
};

export default function AdminPublishersPage(props: any) {
    const { publishers } = props.data;
    return (
        <>
            <Breadcrumb title={`Publicadores`} backLink={'/admin'}></Breadcrumb>
            <div className='container mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8'>
                <PublishersFilter publishers={publishers} />
            </div>
        </>
    );
}
