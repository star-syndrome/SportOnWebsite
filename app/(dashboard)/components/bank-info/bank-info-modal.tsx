import Button from "@/app/(landing)/components/ui/button";
import Modal from "../ui/modal";
import { Bank } from "@/app/types";
import { useEffect, useState } from "react";
import { createBank, updateBank } from "@/app/services/bank.service";
import { toast } from "react-toastify";

type TBankInfoModalProps = {
	bank: Bank | null;
	onSuccess: () => void;
	isOpen: boolean;
	onClose: () => void;
};

const BankInfoModal = ({
	bank,
	onSuccess,
	isOpen,
	onClose,
}: TBankInfoModalProps) => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const isEditMode = !!bank;

	const [formData, setFormData] = useState<Partial<Bank>>({
		accountName: "",
		accountNumber: "",
		bankName: "",
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { id, value } = e.target;
		setFormData((prev) => ({ ...prev, [id]: value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		try {
			if (
				!formData.accountName ||
				!formData.accountNumber ||
				!formData.bankName
			) {
				toast.error("Please make sure all fields are filled.");
				return;
			}

			if (bank) {
				await updateBank(bank._id, formData);
			} else {
				await createBank(formData);
			}

			// Reset Form Data
			setFormData({
				accountName: "",
				accountNumber: "",
				bankName: "",
			});

			toast.success(
				isEditMode
					? "Bank information updated successfully."
					: "Bank information added successfully.",
			);

			onSuccess?.();
			onClose();
		} catch (error) {
			console.error(
				bank
					? "Failed to update bank information:"
					: "Failed to create bank information:",
				error,
			);
			toast.error(
				bank
					? "Failed to update bank information."
					: "Failed to create bank information.",
			);
		} finally {
			setIsSubmitting(false);
		}
	};

	useEffect(() => {
		if (isEditMode && isOpen) {
			setFormData({
				accountName: bank.accountName,
				accountNumber: bank.accountNumber,
				bankName: bank.bankName,
			});
		} else if (isOpen) {
			setFormData({
				accountName: "",
				accountNumber: "",
				bankName: "",
			});
		}
	}, [isOpen, bank]);

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			title={isEditMode ? "Edit Bank Account" : "Add Bank Account"}>
			<form onSubmit={handleSubmit} className="flex flex-col gap-6">
				<div className="flex flex-col gap-4 w-full text-xs font-medium">
					<div className="input-group-admin">
						<label htmlFor="bankName">Bank Name</label>
						<input
							type="text"
							id="bankName"
							name="bankName"
							placeholder="e. g. Mandiri, BCA, BRI"
							value={formData.bankName}
							onChange={handleChange}
						/>
					</div>
					<div className="input-group-admin">
						<label htmlFor="accountNumber">Account Number</label>
						<input
							type="text"
							id="accountNumber"
							name="accountNumber"
							placeholder="1234567890"
							value={formData.accountNumber}
							onChange={handleChange}
						/>
					</div>
					<div className="input-group-admin">
						<label htmlFor="accountName">Account Holder</label>
						<input
							type="text"
							id="accountName"
							name="accountName"
							placeholder="Account holder name as registered on the account"
							value={formData.accountName}
							onChange={handleChange}
						/>
					</div>
				</div>
				<Button
					type="submit"
					className="ml-auto mt-3 rounded-lg"
					onClick={handleSubmit}
					disabled={isSubmitting}>
					{isEditMode ? "Update Bank Account" : "Add Bank Account"}
				</Button>
			</form>
		</Modal>
	);
};

export default BankInfoModal;
