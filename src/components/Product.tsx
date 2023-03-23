import { Meal } from '@/pages';
import Image, { ImageLoaderProps } from 'next/image';
import { Dispatch, SetStateAction } from 'react';

interface ProductProps {
    meal: Meal;
    mealToModal: (meal: Meal) => void;
    onOpenModal: Dispatch<SetStateAction<boolean>>;
}

export default function Product({
    meal,
    mealToModal,
    onOpenModal,
}: ProductProps) {
    return (
        <div
            className="o-product"
            onClick={() => {
                mealToModal(meal);
                onOpenModal(false);
            }}
        >
            <div className="content">
                <div className="product-image">
                    <Image
                        loader={imageLoader}
                        src={meal.strMealThumb}
                        style={{ objectFit: 'cover' }}
                        fill={true}
                        alt={meal.strMeal}
                        sizes="(max-width: 768px) 100vw,
                        (max-width: 1200px) 50vw,
                        33vw"
                    ></Image>
                </div>
                <h2>{meal.strMeal}</h2>
            </div>
        </div>
    );

    function imageLoader({ src, width }: ImageLoaderProps) {
        return `${src}?w=${width}`;
    }
}
