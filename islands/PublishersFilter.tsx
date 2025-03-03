import { IPublisher } from '@app/domain/model/publisher.ts';
import { CardItem } from '@app/components/CardItem.tsx';
import { useSignal } from '@preact/signals';
import { StringUtils } from '@app/domain/string.utils.ts';

export default function PublishersFilter() {
    const localPublishers = typeof window === 'undefined' ? [] : (JSON.parse(
        localStorage.getItem('pubs') as string,
    ) as IPublisher[]);

    const publishersSignal = useSignal<IPublisher[]>(localPublishers);
    const searchFn = (event: any): void => {
        if (!event?.target) {
            return;
        }

        const searchValue = event.target.value;
        publishersSignal.value = (localPublishers || [])
            .filter(({ name, lastName }) =>
                StringUtils.includes(name, searchValue) ||
                StringUtils.includes(lastName, searchValue)
            );
    };

    return (
        <>
            <div className='relative  mb-5'>
                <label htmlFor='Search' className='sr-only'>Buscar</label>
                <input
                    type='search'
                    id='Search'
                    onKeyUp={searchFn}
                    autoCorrect='off'
                    autoComplete='off'
                    placeholder='Buscar por nombre'
                    className='w-full border px-2.5 rounded-md border-gray-200 py-2.5 pe-10 shadow-xs sm:text-sm'
                />
                <span className='absolute inset-y-0 end-0 grid w-10 place-content-center'>
                    <button
                        type='button'
                        className='text-gray-600 hover:text-gray-700'
                    >
                        <span className='sr-only'>Buscar nombre</span>

                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth='1.5'
                            stroke='currentColor'
                            className='size-4'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
                            />
                        </svg>
                    </button>
                </span>
            </div>
            {!publishersSignal.value?.length && (
                <div>No se han encontrado datos</div>
            )}

            {publishersSignal.value && (
                <>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                        {publishersSignal.value.map((pub: IPublisher) => (
                            <CardItem
                                link={`/admin/publishers/${pub.id}`}
                                title={`${pub.name} ${pub.lastName}`}
                                icon={
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        width='24'
                                        height='24'
                                        viewBox='0 0 24 24'
                                        fill='currentColor'
                                        className='hidden sm:block size-10 sm:size-12'
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
                </>
            )}
        </>
    );
}
