import { ShopProductScrollBar, HomeHeroSection, HomeHeroSectionSecond, DiscountBanner } from '@/components/allFiles';
import { Skeleton } from '@/components/ui/skeleton';
import { fetchAllProducts } from '@/store/slices/productSlice';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Home = () => {
  const dispatch = useDispatch();
  const { products, isLoading } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  if (isLoading) {
    return <div><Skeleton/></div>;
  }

  const featuredProducts = products.filter(
    (product) => product.type === 'featured'
  );

  const freshProducts = products.filter(
    (product) => product.type === 'fresh'
  );

  return (
    <div>
      {/* Hero Section */}
      <div>
        <HomeHeroSection />
      </div>
      <div className="m-10">
        <h1 className="mb-4 text-2xl font-medium">FEATURED</h1>
        <div>
          {featuredProducts.length > 0 ? (
            <ShopProductScrollBar product={featuredProducts} />
          ) : (
            <div>No featured products available.</div>
          )}
        </div>
      </div>
      {/* hero section 2 */}
      <div>
        <HomeHeroSectionSecond />
      </div>
      {/* Fresh Section */}
      <div className="m-10">
        <h1 className="mb-4 text-2xl font-medium">FRESH</h1>
        <div>
          {freshProducts.length > 0 ? (
            <ShopProductScrollBar product={freshProducts} />
          ) : (
            <div>No fresh products available.</div>
          )}
        </div>
      </div>
      {/* discount banner */}
      <div>
        <DiscountBanner />
      </div>
    </div>
  );
};

export default Home;