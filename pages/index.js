import Header from "@/components/header";
import HeroSection from "@/components/hero";
import Product from "@/models/product";
import Connect from "@/lib/mongoose";
import NewProducts from "@/components/newProducts";
import FeaturedCategories from "@/components/featuredCategories";
import Category from "@/models/category";
import BestSelling from "@/components/bestProducts";
import Testimonials from "@/components/testimonials";
import Footer from "@/components/footer";

export default function Home({featuredProduct,newProducts,categories}) {
  return (
    <div>
      <Header/>
      <HeroSection product={featuredProduct}/>
      <NewProducts products={newProducts}/>
      <FeaturedCategories categories={categories}/>
      <BestSelling products={newProducts}/>
      <Testimonials/>
      <Footer/>
    </div>
  );
}



export async function getServerSideProps () {
  const proId = '6800c08ea5c880b30f89b99e'
  await Connect()
  const featuredProduct = await Product.findById(proId)
  const newProducts = await Product.find().limit(4)
  const categories = await Category.find().limit(4)
    return {
      props: {
        featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
        newProducts: JSON.parse(JSON.stringify(newProducts)),
        categories: JSON.parse(JSON.stringify(categories)),
      }
    }
}