"use client";

import React from "react";
import CardWithHeader from "../ui/card-with-header";
import { CustomerInfo } from "@/app/hooks/use-cart-store";

type TOrderInformation = {
	formData: CustomerInfo;
	setFormData: React.Dispatch<React.SetStateAction<CustomerInfo>>;
};

const OrderInformation = ({ formData, setFormData }: TOrderInformation) => {
	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	return (
		<CardWithHeader title="Order Information">
			<div className="p-5">
				<div className="input-group">
					<label htmlFor="customerName">Full Name</label>
					<input
						type="text"
						placeholder="Type your full name"
						id="customerName"
						name="customerName"
						onChange={handleInputChange}
						value={formData.customerName}
					/>
				</div>
				<div className="input-group">
					<label htmlFor="customerContact">WhatsApp Number</label>
					<input
						type="number"
						placeholder="+62xxxx"
						id="customerContact"
						name="customerContact"
						onChange={handleInputChange}
						value={formData.customerContact ?? ""}
					/>
				</div>
				<div className="input-group">
					<label htmlFor="customerAddress">Shipping Address</label>
					<textarea
						placeholder="Example Street, 18, West Jakarta, Indonesia, 66521"
						id="customerAddress"
						name="customerAddress"
						rows={7}
						onChange={handleInputChange}
						value={formData.customerAddress}
					/>
				</div>
			</div>
		</CardWithHeader>
	);
};

export default OrderInformation;
