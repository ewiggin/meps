import { CardItem } from '../../../components/CardItem.tsx';
import { Breadcrumb } from '../../../components/Breadcrumb.tsx';
import publishers from '../../../data/publishers.json' with { type: 'json' };

import { Handlers } from 'https://deno.land/x/fresh@1.7.2/src/server/types.ts';
import { CryptoUtils } from '../../../domain/crypto.utils.ts';
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
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                    {publishers.map((
                        item: { id: any; name: string; lastName: string },
                    ) => (
                        <CardItem
                            link={`/admin/publishers/${item.id}`}
                            title={`${item.name} ${item.lastName}`}
                            icon={
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    width='24'
                                    height='24'
                                    viewBox='0 0 24 24'
                                    fill='currentColor'
                                    className='size-10 sm:size-12'
                                >
                                    <path
                                        stroke='none'
                                        d='M0 0h24v24H0z'
                                        fill='none'
                                    />
                                    <path d='M12 2a5 5 0 1 1 -5 5l.005 -.217a5 5 0 0 1 4.995 -4.783z' />
                                    <path d='M14 14a5 5 0 0 1 5 5v1a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-1a5 5 0 0 1 5 -5h4z' />
                                </svg>
                            }
                        />
                    ))}
                </div>
            </div>
        </>
    );
}
