import { Breadcrumb } from '@app/components/Breadcrumb.tsx';
import publishers from '@app/data/publishers.json' with { type: 'json' };
import { CryptoUtils } from '@app/domain/crypto.utils.ts';
import { Handlers } from '$fresh/src/server/types.ts';
import { qrcode } from '@libs/qrcode';
import {
    ITerritoryAssignment,
    TerritoryAssignmentService,
} from '@app/domain/services/territory-assignment.service.ts';

export const handler: Handlers<unknown> = {
    async GET(_, ctx) {
        const { id, num } = ctx.params;

        // Assignments
        const assignments: ITerritoryAssignment[] = (await TerritoryAssignmentService.list(id, num) || [])
            .toSorted((one, other) => new Date(one.date).getTime() - new Date(other.date).getTime());

        return ctx.render({
            publishers: await CryptoUtils.decrypt(
                publishers,
                Deno.env.get('KEY_BASE_64')!,
            ),
            id,
            num,
            assignments: assignments || [],
        });
    },
    async POST(req: Request, ctx) {
        const { id, num } = ctx.params;
        const formData = await req.formData();

        // TODO: check dates!

        if (formData.get('closeDate')) {
            await TerritoryAssignmentService.close(
                id,
                num,
                String(formData.get('date')),
                String(formData.get('closeDate')),
            );
        } else {
            await TerritoryAssignmentService.assign(
                id,
                num,
                String(formData.get('publisher')),
                Boolean(formData.get('link')),
                String(formData.get('date')),
            );
        }

        // Redirect when save!
        return new Response('', {
            status: 303,
            headers: { Location: `/admin/maps/${id}/${num}` },
        });
    },
};

interface IAdminMapsDetailsProps {
    data: {
        id: string;
        num: string;
        publishers: { id: string; name: string; lastName: string }[];
        assignments: ITerritoryAssignment[];
    };
}

export default function AdminMapsDetailFinalPage(
    props: IAdminMapsDetailsProps,
) {
    const { id, num, publishers, assignments } = props.data;

    //
    const finalAssignments = assignments
        .sort((one, other) =>
            new Date(other.date).getTime() - new Date(one.date).getTime()
        );

    // Qr
    const svg = qrcode(`https://meps.deno.dev/maps/${id}/${num}`, {
        output: 'svg',
    });
    // is Open
    const assignable = assignments.every((item) => item.closeAt);

    return (
        <>
            <Breadcrumb
                title={`Territorio: ${id} - ${num}`}
                backLink={`/admin/maps/${id}`}
            >
                <div class='relative border px-10 py-10'>
                    <div class='absolute top-0 right-0 w-20'>
                        <img
                            src={`data:image/svg+xml;charset=utf-8,${svg}`}
                            alt='QR'
                        />
                    </div>
                </div>
            </Breadcrumb>
            <div className='container mx-auto max-w-screen-xl px-4 py-12 sm:px-6 sm:py-12 lg:px-8'>
                <div className='overflow-x-auto pb-8'>
                    <table className='min-w-full divide-y-2 divide-blue-200 bg-white text-sm'>
                        <thead className='text-left'>
                            <tr>
                                <th className='whitespace-nowrap px-4 py-2 font-bold text-gray-900'>
                                    Publicador
                                </th>
                                <th className='whitespace-nowrap px-4 py-2 font-bold text-gray-900'>
                                    Asignado el
                                </th>
                                <th className='text-left whitespace-nowrap px-4 py-2 font-bold text-gray-900'>
                                    Enlace
                                </th>
                                <th className='whitespace-nowrap px-4 py-2 font-bold text-gray-900'>
                                    Completado el
                                </th>
                                <th className='whitespace-nowrap px-4 py-2 font-bold text-gray-900'>
                                </th>
                            </tr>
                        </thead>
                        {assignable && (
                            <form
                                action={`/admin/maps/${id}/${num}`}
                                method='post'
                            >
                                <tbody className='divide-y divide-blue-200 bg-blue-200'>
                                    <tr>
                                        <td className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>
                                            <select
                                                className='px-2 py-2 rounded'
                                                name='publisher'
                                                required={true}
                                            >
                                                <option
                                                    value='null'
                                                    selected={true}
                                                >
                                                    Selecciona un publicador
                                                </option>
                                                {publishers.map((
                                                    { id, name, lastName }: any,
                                                ) => (
                                                    <option value={id}>
                                                        {name} {lastName}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                        <td className='whitespace-nowrap px-4 py-2 text-gray-700'>
                                            <input
                                                className='px-2 py-2 rounded'
                                                type='date'
                                                name='date'
                                                required={true}
                                            />
                                        </td>
                                        <td className='whitespace-nowrap px-4 py-2 text-gray-700'>
                                            <input
                                                className='px-2 py-2 rounded'
                                                type='checkbox'
                                                name='link'
                                            />
                                        </td>
                                        <td className='whitespace-nowrap px-4 py-2 text-gray-700'>
                                        </td>
                                        <td className='whitespace-nowrap px-4 py-2 text-gray-700 text-right'>
                                            <button type='submit'>
                                                Registrar
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </form>
                        )}

                        <tbody className='divide-y divide-gray-200'>
                            {finalAssignments
                                .map((item: ITerritoryAssignment) => (
                                    <tr>
                                        <td className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>
                                            <span>
                                                {publishers.map((pub) => {
                                                    return {
                                                        id: pub.id,
                                                        name:
                                                            `${pub.name} ${pub.lastName}`,
                                                    };
                                                }).find(({ id }) =>
                                                    item.userId === id
                                                )?.name}
                                            </span>
                                        </td>
                                        <td className='whitespace-nowrap px-4 py-2 text-gray-700'>
                                            {new Date(item.date).toLocaleString(
                                                'es-ES',
                                                {
                                                    year: 'numeric',
                                                    month: '2-digit',
                                                    day: '2-digit',
                                                },
                                            )}
                                        </td>
                                        <td className='whitespace-nowrap px-4 py-2 text-gray-700'>
                                          {item.link && <a href={`https://meps.deno.dev/maps/${id}/${num}`}>🔗</a> }
                                        </td>
                                        {item?.closeAt &&
                                            (
                                                <td className='whitespace-nowrap px-4 py-2 text-gray-700'>
                                                    {new Date(item.closeAt)
                                                        .toLocaleString(
                                                            'es-ES',
                                                            {
                                                                year: 'numeric',
                                                                month:
                                                                    '2-digit',
                                                                day: '2-digit',
                                                            },
                                                        )}
                                                </td>
                                            )}
                                        <td className='whitespace-nowrap px-4 py-2 text-gray-700 '>
                                            {!assignable && !item?.closeAt && (
                                                <form
                                                    action={`/admin/maps/${id}/${num}`}
                                                    method='post'
                                                    class='flex gap-4 justify-between'
                                                >
                                                    <input
                                                        type='hidden'
                                                        name='publisher'
                                                        value={item.userId}
                                                    />
                                                    <input
                                                        type='hidden'
                                                        name='date'
                                                        value={String(
                                                            item.date,
                                                        )}
                                                    />
                                                    <input
                                                        className='px-2 py-2 rounded border'
                                                        type='date'
                                                        name='closeDate'
                                                        required={true}
                                                    />
                                                    <button type='submit'>
                                                        Cerrar territorio
                                                    </button>
                                                </form>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='px-8 py-8 sm:w-full sm:py-0 sm:px-0 min-h-64'>
                <div id='map' style='height: 500px;'></div>
                <input
                    type='hidden'
                    name='mapURL'
                    id='mapURL'
                    value={`/maps/${id.toLocaleLowerCase()}/${num}.kml`}
                />
                <script src='/map.js'></script>
            </div>
        </>
    );
}
