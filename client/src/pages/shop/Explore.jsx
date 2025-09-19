import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllProducts } from '@/store/slices/productSlice';
import { DiscountBanner, ShopProductScrollBar } from '@/components/allFiles';
import { Skeleton } from '@/components/ui/skeleton';

const Explore = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products, isLoading } = useSelector((state) => state.product);



  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  const [searchParams] = useSearchParams();
  const explore = searchParams.get('explore');


  const forMen = products.filter((product) => product.category === explore && product.gender === 'men');
  const forWomen = products.filter((product) => product.category === explore && product.gender === 'women');
  const forKids = products.filter((product) => product.category === explore && product.gender === 'kids');



  if (isLoading) {
    return <div><Skeleton /></div>;
  }

  if (!explore) {
    return <h1>products not found</h1>;
  }

  return (
    <div>
      <div className="h-[50vh]">
        <img
          className="w-full h-full object-cover"
          src="https://res.cloudinary.com/ckndr/image/upload/v1743599459/explore_awmhbb.jpg"
          alt="explore"
        />
      </div>

      <div className="headline-section h-[40%] flex flex-col justify-center items-center text-3xl font-bold gap-5 m-5">
        <h1>Step into the Extraordinary</h1>
        <h1>Explore our unique collection of sneakers</h1>
        <h1>Curated sneakers blending fashion and function</h1>
      </div>

      <div className="m-10">
        <h1 className="mb-4 text-2xl font-medium">{explore.toUpperCase()} SHOES IN MEN</h1>
        <div>
          {forMen.length > 0 ? (
            <ShopProductScrollBar product={forMen} />
          ) : (
            <div>No products available.</div>
          )}
        </div>
      </div>

      <div className="m-10">
        <h1 className="mb-4 text-2xl font-medium">{explore.toUpperCase()} SHOES IN WOMEN</h1>
        <div>
          {forWomen.length > 0 ? (
            <ShopProductScrollBar product={forWomen} />
          ) : (
            <div>No products available.</div>
          )}
        </div>
      </div>

      <div className="m-10">
        <h1 className="mb-4 text-2xl font-medium">{explore.toUpperCase()} SHOES IN KIDS</h1>
        <div>
          {forKids.length > 0 ? (
            <ShopProductScrollBar product={forKids} />
          ) : (
            <div>No products available.</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Explore