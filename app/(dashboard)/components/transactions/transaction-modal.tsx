import Button from "@/app/(landing)/components/ui/button";
import Modal from "../ui/modal";
import Image from "next/image";
import priceFormatter from "@/app/utils/priceFormatter";
import { FiCheck, FiX } from "react-icons/fi";
import { Transaction } from "@/app/types";
import { useState } from "react";
import { getImageUrl } from "@/app/lib/api";
import dateFormatter from "@/app/utils/dateFormatter";

type TTransactionModalProps = {
	transaction?: Transaction | null;
	onStatusChange: (id: string, status: "paid" | "rejected") => Promise<void>;
	isOpen: boolean;
	onClose: () => void;
};

const TransactionModal = ({
	transaction,
	onStatusChange,
	isOpen,
	onClose,
}: TTransactionModalProps) => {
	const [isUpdating, setIsUpdating] = useState(false);

	if (!transaction) return;

	const handleStatusUpdate = async (status: "paid" | "rejected") => {
		setIsUpdating(true);
		try {
			await onStatusChange(transaction._id, status);
		} catch (error) {
			console.error(error);
		} finally {
			setIsUpdating(false);
		}
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose} title="Verify Transactions">
			<div className="flex gap-6 overflow-auto max-h-120">
				<div className="min-w-50">
					<h4 className="font-semibold text-sm mb-2">Payment Proof</h4>
					{transaction.paymentProof ? (
						<Image
							src={getImageUrl(transaction.paymentProof)}
							alt="Payment Proof"
							width={200}
							height={401}
						/>
					) : (
						<div className="text-center p-4">
							<p className="text-sm">No payment proof uploaded!</p>
						</div>
					)}
				</div>
				<div className="w-full">
					<h4 className="font-semibold text-sm mb-2">Order Details</h4>
					<div className="bg-gray-100 rounded-md p-4 flex flex-col gap-2.5 text-sm mb-5">
						<div className="flex justify-between font-medium">
							<div className="opacity-50">Date</div>
							<div className="text-right">
								{dateFormatter(transaction.createdAt)}
							</div>
						</div>
						<div className="flex justify-between font-medium">
							<div className="opacity-50">Customer</div>
							<div className="text-right">{transaction.customerName}</div>
						</div>
						<div className="flex justify-between font-medium">
							<div className="opacity-50">Contact</div>
							<div className="text-right">{transaction.customerContact}</div>
						</div>
						<div className="flex justify-between gap-10 font-medium">
							<div className="opacity-50 whitespace-nowrap">
								Shipping Address
							</div>
							<div className="text-right">{transaction.customerAddress}</div>
						</div>
					</div>
					<h4 className="font-semibold text-sm mb-2">Item Purchased</h4>
					<div className="space-y-3">
						{transaction.purchasedItems.map((item, index) => (
							<div
								key={index}
								className="border border-gray-200 rounded-lg p-2 flex gap-2 items-center">
								<div className="bg-gray-100 rounded aspect-square w-8 h-8">
									<Image
										src={getImageUrl(item.productId.imageUrl)}
										alt={item.productId.name}
										width={30}
										height={30}
									/>
								</div>
								<div className="text-sm font-medium">{item.productId.name}</div>
								<div className="text-sm font-medium ml-auto">
									{item.qty} {item.qty === 1 ? "unit" : "units"}
								</div>
							</div>
						))}
					</div>
					<div className="flex justify-between font-semibold text-sm mt-6">
						<h4>Total</h4>
						<div className="text-primary font-semibold">
							{priceFormatter(parseInt(transaction.totalPayment))}
						</div>
					</div>
					<div className="flex justify-end gap-5 mt-20 me-2 pb-2">
						{isUpdating ? (
							<div className="flex items-center gap-2 text-gray-500">
								<svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
									<circle
										className="opacity-25"
										cx="12"
										cy="12"
										r="10"
										stroke="currentColor"
										strokeWidth="4"
										fill="none"
									/>
									<path
										className="opacity-75"
										fill="currentColor"
										d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
									/>
								</svg>
								<span>Updating status...</span>
							</div>
						) : (
							<>
								<Button
									className="text-primary! bg-primary-light! rounded-md"
									size="small"
									onClick={() => handleStatusUpdate("rejected")}
									disabled={isUpdating}>
									<FiX size={20} />
									Reject
								</Button>
								<Button
									className="text-white! bg-[#50C252]! rounded-md"
									size="small"
									onClick={() => handleStatusUpdate("paid")}
									disabled={isUpdating}>
									<FiCheck size={20} />
									Approve
								</Button>
							</>
						)}
					</div>
				</div>
			</div>
		</Modal>
	);
};

export default TransactionModal;
