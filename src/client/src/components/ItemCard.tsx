import React from 'react';
import PartialItem from '../models/PartialItem';

function ItemOverviewCard(props: { item: PartialItem }) {
    return (
        <div className='bg-white shadow overflow-hidden sm:rounded-lg'>
            <div className='px-4 py-5 sm:px-6'>
                <h3 className='text-lg leading-6 font-medium text-gray-900'>{props.item.name}</h3>
            </div>
            <div className="border-t border-gray-200">
                <div className="px-4 py-5">
                    <p>{props.item.uniqueName}</p>
                    <p>{props.item.category}</p>
                    <p>{props.item.imageName}</p>
                </div>
            </div>
        </div>
    );
}

export default ItemOverviewCard;