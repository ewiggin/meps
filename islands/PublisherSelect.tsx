import { IPublisher } from '@app/domain/model/publisher.ts';
import { IS_BROWSER } from '$fresh/runtime.ts';

export default function PublisherSelect({ name }: { name: string }) {
    if (!IS_BROWSER) {
        return;
    }

    const localPublishers =
        (JSON.parse(localStorage.getItem('pubs') as string) as IPublisher[]) ||
        [];
    return (
        <>
            {localPublishers &&
                (
                    <select
                        className='px-2 py-2 rounded'
                        name={name}
                        required
                    >
                        <option
                            value='null'
                            selected
                        >
                            Selecciona un publicador
                        </option>
                        {localPublishers.map((
                            { id, name, lastName }: IPublisher,
                        ) => (
                            <option value={id}>
                                {name} {lastName}
                            </option>
                        ))}
                    </select>
                )}
        </>
    );
}
