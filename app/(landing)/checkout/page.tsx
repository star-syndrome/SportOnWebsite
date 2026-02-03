"use client";

import { useState } from "react";
import CartItem from "../components/checkout/cart-items";
import OrderInformation from "../components/checkout/order-information";
import { CustomerInfo, useCartStore } from "@/app/hooks/use-cart-store";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const Checkout = () => {
	const { push } = useRouter();
	const { customerInfo, setCustomerInfo } = useCartStore();

	const [formData, setFormData] = useState<CustomerInfo>({
		customerName: "",
		customerContact: null,
		customerAddress: "",
	});

	const handleToPayment = () => {
		if (
			!formData.customerName ||
			!formData.customerContact ||
			!formData.customerAddress
		) {
			toast.error("Please make sure all fields are filled.");
			return;
		}

		setCustomerInfo(formData);
		push("/payment");
	};

	return (
		<main className="bg-gray-100 min-h-[80vh] pt-10">
			<div className="max-w-5xl mx-auto py-20">
				<h1 className="text-5xl font-bold text-center mb-11">Checkout Now</h1>
				<div className="grid grid-cols-2 gap-14">
					<OrderInformation formData={formData} setFormData={setFormData} />
					<CartItem handleToPayment={handleToPayment} />
				</div>
			</div>
		</main>
	);
};

export default Checkout;
