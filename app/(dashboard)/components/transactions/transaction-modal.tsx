import Button from "@/app/(landing)/components/ui/button";
import Modal from "../ui/modal";
import Image from "next/image";
import priceFormatter from "@/app/utils/priceFormatter";
import { FiCheck, FiX } from "react-icons/fi";

type TTransactionModalProps = {
	isOpen: boolean;
	onClose: () => void;
};

const TransactionModal = ({ isOpen, onClose }: TTransactionModalProps) => {
	return (
		<Modal isOpen={isOpen} onClose={onClose} title="Verify Transactions">
			<div className="flex gap-6">
				<div>
					<h4 className="font-semibold text-sm mb-2">Payment Proof</h4>
					<Image
						src="/images/payment-proof-dummy.png"
						alt="Payment Proof"
						width={200}
						height={401}
					/>
				</div>
				<div>
					<h4 className="font-semibold text-sm mb-2">Order Details</h4>
					<div className="bg-gray-100 rounded-md p-4 flex flex-col gap-2.5 text-sm mb-5">
						<div className="flex justify-between font-medium">
							<div className="opacity-50">Date</div>
							<div className="text-right">23/02/2026 19:32</div>
						</div>
						<div className="flex justify-between font-medium">
							<div className="opacity-50">Customer</div>
							<div className="text-right">John Doe</div>
						</div>
						<div className="flex justify-between font-medium">
							<div className="opacity-50">Contact</div>
							<div className="text-right">08123456789</div>
						</div>
						<div className="flex justify-between gap-10 font-medium">
							<div className="opacity-50 whitespace-nowrap">
								Shipping Address
							</div>
							<div className="text-right">
								Merdeka Street, Jakarta, Indonesia, 332122
							</div>
						</div>
					</div>
					<h4 className="font-semibold text-sm mb-2">Item Purchased</h4>
					<div className="border border-gray-200 rounded-lg p-2 flex gap-2 items-center">
						<div className="bg-gray-100 rounded aspect-square w-8 h-8">
							<Image
								src="/images/products/product-1.png"
								alt="Product 1"
								width={30}
								height={30}
							/>
						</div>
						<div className="text-sm font-medium">SportOn SlowLivin</div>
						<div className="text-sm font-medium ml-auto">3 units</div>
					</div>
					<div className="flex justify-between font-semibold text-sm mt-6">
						<h4>Total</h4>
						<div className="text-primary font-semibold">
							{priceFormatter(1000000)}
						</div>
					</div>
					<div className="flex justify-end gap-5 mt-20">
						<Button
							className="text-primary! bg-primary-light! rounded-md"
							size="small">
							<FiX size={20} />
							Reject
						</Button>
						<Button
							className="text-white! bg-[#50C252]! rounded-md"
							size="small">
							<FiCheck size={20} />
							Approve
						</Button>
					</div>
				</div>
			</div>
		</Modal>
	);
};

export default TransactionModal;
