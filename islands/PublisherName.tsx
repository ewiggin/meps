import { IPublisher } from '@app/domain/model/publisher.ts';

export default function PublisherName({ pubId }: { pubId: string }) {
    if (typeof window === 'undefined') {
        console.log('Currently on Server Side');
        return;
    }
    const localPublishers = JSON.parse(
        localStorage.getItem('pubs') as string,
    ) as IPublisher[];

    const foundPub = (localPublishers || []).find((item) => item.id === pubId);

    return <>{foundPub ? `${foundPub.name} ${foundPub.lastName}` : pubId}</>;
}
