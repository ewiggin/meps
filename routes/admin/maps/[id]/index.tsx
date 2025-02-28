import { CardItem } from '@app/components/CardItem.tsx';
import { Breadcrumb } from '@app/components/Breadcrumb.tsx';
import { FreshContext, Handlers } from '$fresh/server.ts';
import territoriesData from '@app/data/territories.json' with { type: 'json' };
import { ITerritory } from '@app/domain/model/territory.ts';
import { TerritoryAssignmentService } from '@app/domain/services/territory-assignment.service.ts';

enum TerritorySorting {
    NORMAL = '0',
    LESS_WORKED = '1',
}

interface ITerritoryWithAssign extends ITerritory {
    assigned?: boolean;
    toClaim?: boolean;
    date?: Date;
}

interface IAdminMapsDetailArgs {
    data: {
        id: string;
        territories: ITerritoryWithAssign[];
        sortBy: TerritorySorting
    }
}

export const handler: Handlers<unknown> = {
    async GET(_: Request, ctx: FreshContext) {

        const sortBy: TerritorySorting = (ctx.url?.searchParams?.get('sort') as unknown as TerritorySorting) || TerritorySorting.NORMAL;

        const regionId = ctx.params.id;
        // Assignments
        const assignments = await TerritoryAssignmentService.list(regionId);
        const territories = (territoriesData as Record<string, ITerritory[]>)[regionId] as ITerritoryWithAssign[];

        assignments
            .filter((assign) => assign.date && !assign.closeAt)
            .forEach((assign) => {
                const territory2Assign = territories.find((item) => item.num === assign.territoryId);
                if (!territory2Assign) {
                    return;
                }

                territory2Assign.date = new Date(assign.closeAt || assign.date);
                territory2Assign.assigned = true;

                const currentDate = new Date(assign.date);
                const targetDate = new Date();

                // Add 4 months to the current date
                currentDate.setMonth(currentDate.getMonth() + 4);

                // Compare the dates
                territory2Assign.toClaim = targetDate >= currentDate;
        });

        let sortedTerritories: ITerritoryWithAssign[] = [...territories];
        if (sortBy === TerritorySorting.LESS_WORKED) {
            sortedTerritories = territories.toSorted((one, other) => {
                if (!one.date) {
                    return 1;
                }
                if (!other.date) {
                    return -1;
                }

                return one.date.getTime() - other.date.getTime();
            });
        }

        return ctx.render({
            territories: sortedTerritories,
            id: regionId,
            sortBy
        });
    },
};

export default function AdminMapsDetailPage(props: IAdminMapsDetailArgs) {
    const { id, territories, sortBy } = props.data;

    return (
        <>
            <Breadcrumb title={`Territorio: ${id}`} backLink={'/admin/maps'}>
                <div className="inline-flex rounded-lg border border-gray-100 bg-gray-100 p-1">
                    <a
                        href={'?sort=0'}
                        className={`${ !sortBy || sortBy === TerritorySorting.NORMAL ? `bg-white text-blue-500`: 'text-gray-500' } inline-block rounded-md  px-4 py-2 text-sm shadow-xs focus:relative`}
                    >
                        Alfabético
                    </a>

                    <a
                        href={'?sort=1'}
                        className={`${ sortBy === TerritorySorting.LESS_WORKED ? `bg-white text-blue-500`: 'text-gray-500' } inline-block rounded-md  px-4 py-2 text-sm shadow-xs focus:relative`}
                    >
                        Antigüedad
                    </a>
                </div>
            </Breadcrumb>
            <div className='container mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                    {territories && territories.length &&
                        territories.map(( item: ITerritoryWithAssign) => (
                            <CardItem
                                link={`/admin/maps/${id}/${item.num}`}
                                title={item.num}
                                icon={' '}
                                colorClass={item.toClaim ? 'bg-red-200' : item.assigned ? 'bg-slate-200' : ''}
                            />
                        ))}
                </div>
            </div>
        </>
    );
}
