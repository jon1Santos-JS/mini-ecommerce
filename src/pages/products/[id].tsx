import ProductPage from '@/components/ProductPage';
import { requestMealInfo } from '@/lib/requestMealInfo';
import { DataType, requestMealList } from '@/lib/requestMealList';
import { Meal } from '@/state/product';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';

interface ProductPageProps {
    meal: Meal | null;
    mealInfoList: string[] | null;
    addProductToBagModal: () => void;
}

export default function Page(props: ProductPageProps) {
    return <ProductPage {...props} />;
}

export async function getStaticPaths() {
    const mealList: DataType = await requestMealList();

    if (mealList instanceof Error) return { paths: '', fallback: false };

    const paths = mealList.map((meal) => ({
        params: { id: meal.idMeal },
    }));

    return { paths: paths, fallback: false };
}

export async function getStaticProps({ params }: Params) {
    const mealList: DataType = await requestMealList();

    if (mealList instanceof Error) return { props: { meal: null } };

    const meal = mealList.reduce((meal, array) => {
        if (meal.idMeal === params.id) return meal;
        return array;
    });

    const mealInfoList: string[] = await requestMealInfo(meal.idMeal);

    if (!mealInfoList) return { props: { meal, mealInfoList: null } };

    return { props: { meal, mealInfoList } };
}
