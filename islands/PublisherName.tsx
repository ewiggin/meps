import { IPublisher } from '@app/domain/model/publisher.ts';

export default function PublisherName({ pubId }: { pubId: string }) {

    const localPublishers = JSON.parse(localStorage.getItem('pubs') as string) as IPublisher[];

    const foundPub = (localPublishers || []).find((item) => item.id === pubId); 

    return <>{ foundPub ? `${foundPub.name} ${foundPub.lastName}` : pubId }</>
}
