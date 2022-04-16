import React, { useEffect, useState } from 'react';
import ItemsApi from '../api/ItemsApi';
import ItemOverviewCard from '../components/ItemCard';
import PartialItem from '../models/PartialItem';

function Home() {
    const [randomItems, setRandomItems] = useState<PartialItem[]>([]);

    useEffect(() => {
        async function fetchRandomItems() {
            const items : PartialItem[] = await ItemsApi.GetRandomItems(4);
            setRandomItems(items);
        }

        fetchRandomItems();
    }, []);

    return (
        <div className='p-6'>
            <div className="grid grid-cols-2 gap-4">
                {randomItems.map(item => <ItemOverviewCard key={item.uniqueName} item={item} />)}
            </div>
        </div>
    )
}

export default Home;