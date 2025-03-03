import { IPublisher } from '@app/domain/model/publisher.ts';
import { IS_BROWSER } from '$fresh/runtime.ts';

export default function PublisherName({ pubId }: { pubId: string }) {
    if (!IS_BROWSER) {
        return (
            <p>Leaflet must be loaded on the client. No children will render</p>
        );
    }
    const localPublishers = JSON.parse(
        localStorage.getItem('pubs') as string,
    ) as IPublisher[];

    const foundPub = (localPublishers || []).find((item) => item.id === pubId);

    return <>{foundPub ? `${foundPub.name} ${foundPub.lastName}` : pubId}</>;
}
