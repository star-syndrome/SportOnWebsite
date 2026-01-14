import priceFormatter from "@/app/utils/priceFormatter";
import Image from "next/image";
import ProductActions from "../../components/product-detail/product-actions";

const ProductDetail = () => {
	return (
		<main className="container mx-auto py-20 flex gap-12 mb-10">
			<div className="bg-primary-light aspect-square min-w-120 flex justify-center items-center">
				<Image
					src="/images/products/product-4.png"
					width={350}
					height={350}
					alt="Product 4 Image"
					className="aspect-square object-contain"
				/>
			</div>
			<div className="w-full py-7">
				<h1 className="font-bold text-5xl mb-6">SportsOn HyperSoccer v2</h1>
				<div className="bg-primary-light rounded-full text-primary py-2 px-6 w-fit mb-5">
					Football
				</div>
				<p className="leading-loose mb-8 text-justify">
					The SportsOn HyperSoccer v2 is engineered for the player who demands
					precision, power, and unrivaled speed on the pitch. Featuring a
					striking, two-toned black and white design with deep crimson accents,
					these cleats don't just perform—they make a statement. Experience the
					future of football footwear with v2's enhanced fit and cutting-edge
					traction.
				</p>
				<div className="text-primary text-[32px] font-semibold mb-12">
					{priceFormatter(458000)}
				</div>
				<ProductActions />
			</div>
		</main>
	);
};

export default ProductDetail;
