import { Breadcrumb } from "@app/components/Breadcrumb.tsx";
import { FreshContext, Handlers } from 'https://deno.land/x/fresh@1.7.2/src/server/types.ts';
import { ITerritoryAssignment, TerritoryAssignmentService } from '@app/domain/services/territory-assignment.service.ts';
import publishers from "@app/data/publishers.json" with { type: 'json' };
import { CryptoUtils } from "@app/domain/crypto.utils.ts";
import { IPublisher } from '@app/domain/model/publisher.ts';

interface PublisherViewArgs {
    data: {
        publisher: IPublisher;
        assignments: ITerritoryAssignment[];
    }
}

export const handler: Handlers<unknown> = {
    async GET(_: Request, ctx: FreshContext) {

        const userId = ctx.params.id;
        const decryptedPublishers: IPublisher[] = await CryptoUtils.decrypt(
            publishers,
            Deno.env.get('KEY_BASE_64')!,
        );

        const publisher = decryptedPublishers.find((item) => item.id === userId);
        if (!publisher) {
            // redirect!
        }

        // Assignments
        const assignments = (await TerritoryAssignmentService.listByUserId(userId) || [])
            .toSorted((one, other) => new Date(other.date).getTime() - new Date(one.date).getTime());

        return ctx.render({ assignments, publisher });
    },
};

export default function PublisherView(args: PublisherViewArgs) {

    const { publisher, assignments } = args.data;

    return (
        <>
            <Breadcrumb
                title={`Publicadores: ${publisher.name} ${publisher.lastName}`}
                backLink={'/admin/publishers'}
            >
            </Breadcrumb>
            <div className='container mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8'>
            <ol class="relative border-s border-gray-200 dark:border-gray-700">
                { assignments.map((assignment) => (
                    <>
                        <li className="mb-10 ms-4">
                            {
                                assignment.closeAt && <>
                                    <div
                                        className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                                    <time
                                        className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                                        {Intl.DateTimeFormat('es-ES', { dateStyle: 'full'}).format(new Date(assignment.closeAt))}

                                    </time>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                       📥 Devuelto: { assignment.region } {assignment.territoryId }
                                    </h3>
                                </>
                            }
                            <div
                                className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                            <time
                                className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                                {assignment.date && Intl.DateTimeFormat('es-ES', { dateStyle: 'full'}).format(new Date(assignment.date))}

                            </time>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                📤 Asignado: { assignment.region } {assignment.territoryId }
                            </h3>
                            <a href={`/admin/maps/${assignment.region}/${assignment.territoryId}`}
                               target="_blank"
                               className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-100 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700">
                                { assignment.region } {assignment.territoryId }
                                <svg className="w-3 h-3 ms-2 rtl:rotate-180" aria-hidden="true"
                                          xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                          stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                </svg></a>
                        </li>
                    </>
                ))}
            </ol>

            </div>

        </>
    );
}
