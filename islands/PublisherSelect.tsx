import { IPublisher } from '@app/domain/model/publisher.ts';

export default function PublisherSelect({ name }: { name: string }) {
const localPublishers = (JSON.parse(localStorage.getItem('pubs') as string) as IPublisher[]) || [];
    return <>
        {localPublishers &&
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
                {localPublishers.map(({ id, name, lastName }: IPublisher) => (
                    <option value={id}>
                        {name} {lastName}
                    </option>
                ))}
            </select>
        }
    </>;
}