import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllProducts } from '@/store/slices/productSlice';
import { DiscountBanner, ShopProductScrollBar } from '@/components/allFiles';
import { Skeleton } from '@/components/ui/skeleton';


const ProductCategory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products, isLoading } = useSelector((state) => state.product);


  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');


  const trendingItems = products.filter((product) => product.type === 'trending'&& product.gender === category);
  const freshItems = products.filter((product) => product.type === 'fresh'&& product.gender === category);
  const featuredItems = products.filter((product) => product.type === 'featured'&& product.gender === category);

  const categories = {
    men: {
      video: "https://res.cloudinary.com/ckndr/video/upload/v1743523252/videoMen_jekwq6.mp4",
      trendingItems,
      freshItems,
      banner: "https://res.cloudinary.com/ckndr/image/upload/v1743523220/bannerMen_cxfnha.png",
      featuredItems,
    },
    women: {
      video: "https://res.cloudinary.com/ckndr/video/upload/v1743523251/videoWomen_kizmxs.mp4",
      trendingItems,
      freshItems,
      banner: "https://res.cloudinary.com/ckndr/image/upload/v1743523221/bannerWomen_sealnu.jpg",
      featuredItems,
    },
    kids: {
      video: "https://res.cloudinary.com/ckndr/video/upload/v1743523249/videoKid_vn8qzn.mp4",
      trendingItems,
      freshItems,
      banner: "https://res.cloudinary.com/ckndr/image/upload/v1743523221/bannerKid_n9en85.jpg",
      featuredItems,
    },
  };



  const data = categories[category] || null;

  if (isLoading) {
    return <div><Skeleton /></div>;
  }

  if (!data) {
    return <h1>Category not found</h1>;
  }

  return (
    <div>
      <div className="h-[70vh]">
        <video
          autoPlay
          loop
          muted
          src={data.video}
          className="w-full h-full object-cover"
        ></video>
      </div>

      <div className="text-section h-[40vh] flex justify-center items-center flex-col">
        <h1 className="font-serif text-3xl font-bold mb-1">
          THE SNKRS {category?.toUpperCase()} COLLECTION
        </h1>
        <p className="font-fantasy text-xl font-normal">Step into imagination</p>
        <button
          onClick={() => navigate('/explore')}
          className="text-xl font-bold px-5 py-2 border-none bg-cyan-200/75 cursor-pointer transition-all duration-300 rounded-lg hover:scale-110 m-5"
        >
          Explore Now
        </button>
      </div>

      <div className="m-10">
        <h1 className="mb-4 text-2xl font-medium">TRENDING IN {category?.toUpperCase()}</h1>
        <div>
          {data.trendingItems.length > 0 ? (
            <ShopProductScrollBar product={data.trendingItems} />
          ) : (
            <div>No products available.</div>
          )}
        </div>
      </div>

      <div className="m-10">
        <h1 className="mb-4 text-2xl font-medium">FRESH IN {category?.toUpperCase()}</h1>
        <div>
          {data.freshItems.length > 0 ? (
            <ShopProductScrollBar product={data.freshItems} />
          ) : (
            <div>No  products available.</div>
          )}
        </div>
      </div>

      <div className=" h-[20%]">
        <img
          src={data.banner}
          alt="banner"
          className="w-full h-[80vh] object-cover"
        />
      </div>

      <div className="m-10">
        <h1 className="mb-4 text-2xl font-medium">FEATURED IN {category?.toUpperCase()}</h1>
        <div>
          {data.featuredItems.length > 0 ? (
            <ShopProductScrollBar product={data.featuredItems} />
          ) : (
            <div>No  products available.</div>
          )}
        </div>
      </div>

      <div>
        <DiscountBanner />
      </div>

    </div>
  );
};

export default ProductCategory;