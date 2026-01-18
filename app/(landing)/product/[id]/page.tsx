import priceFormatter from "@/app/utils/priceFormatter";
import Image from "next/image";
import ProductActions from "../../components/product-detail/product-actions";
import { getImageUrl } from "@/app/lib/api";
import { getProductDetail } from "@/app/services/product.service";

export type TPageProps = {
	params: Promise<{ id: string }>;
};

const ProductDetail = async ({ params }: TPageProps) => {
	const { id } = await params;
	const product = await getProductDetail(id);

	return (
		<main className="container mx-auto py-20 flex gap-12 mb-10">
			<div className="bg-primary-light aspect-square min-w-120 flex justify-center items-center">
				<Image
					src={getImageUrl(product.imageUrl)}
					width={350}
					height={350}
					alt={product.name}
					className="aspect-square object-contain"
				/>
			</div>
			<div className="w-full py-7">
				<h1 className="font-bold text-5xl mb-6">{product.name}</h1>
				<div className="bg-primary-light rounded-full text-primary py-2 px-6 w-fit mb-5">
					{product.category.name}
				</div>
				<p className="leading-loose mb-8 text-justify">{product.description}</p>
				<div className="text-primary text-[32px] font-semibold mb-12">
					{priceFormatter(product.price)}
				</div>
				<ProductActions product={product} stock={product.stock} />
			</div>
		</main>
	);
};

export default ProductDetail;
