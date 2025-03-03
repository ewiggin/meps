import { IPublisher } from '@app/domain/model/publisher.ts';
import { IS_BROWSER } from '$fresh/runtime.ts';

export default function PublisherSelectOptions() {
    if (!IS_BROWSER) {
        return <></>;
    }

    const localPublishers =
        (JSON.parse(localStorage.getItem('pubs') as string) as IPublisher[]) ||
        [];
    console.log(localPublishers);

    return (
        <>
            {localPublishers.map((
                { id, name, lastName }: IPublisher,
            ) => (
                <option value={id}>
                    {name} {lastName}
                </option>
            ))}
        </>
    );
}
