import Image from "next/image";

const OrderConfirmed = () => {
	return (
		<div className="bg-white w-160 p-16 flex flex-col justify-center items-center mx-auto">
			<Image
				src="/images/icons/icon-order-confirmed.svg"
				width={117}
				height={117}
				alt="Order Confirmed"
				className="mb-4"
			/>
			<h2 className="text-2xl font-semibold mb-2">Order Confirmed!!!</h2>
			<p className="text-center mb-8">
				Thank you for your payment! Your order is currently being processed by
				our team. We'll notify you via WhatsApp with shipping updates once your
				items are on the way.
			</p>
		</div>
	);
};

export default OrderConfirmed;
