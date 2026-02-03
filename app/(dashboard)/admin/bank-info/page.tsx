"use client";

import Button from "@/app/(landing)/components/ui/button";
import { FiPlus } from "react-icons/fi";
import { useEffect, useState } from "react";
import BankInfoList from "../../components/bank-info/bank-info-list";
import BankInfoModal from "../../components/bank-info/bank-info-modal";
import { Bank } from "@/app/types";
import { deleteBank, getAllBanks } from "@/app/services/bank.service";
import { toast } from "react-toastify";
import DeleteModal from "../../components/ui/delete-modal";

const BankManagement = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [banks, setBanks] = useState<Bank[]>([]);
	const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [bankToDeleteId, setBankToDeleteId] = useState("");

	const handleCloseModal = () => {
		setIsModalOpen(false);
		setSelectedBank(null);
	};

	const handleEdit = (bank: Bank) => {
		setSelectedBank(bank);
		setIsModalOpen(true);
	};

	const handleDelete = (id: string) => {
		setBankToDeleteId(id);
		setIsDeleteModalOpen(true);
	};

	const handleDeleteConfirm = async () => {
		if (!bankToDeleteId) return;

		try {
			await deleteBank(bankToDeleteId);

			fetchBanks();

			toast.success("Bank information deleted successfully.");

			setIsDeleteModalOpen(false);
			setBankToDeleteId("");
		} catch (error) {
			console.error("Failed to delete bank information:", error);
			toast.error("Failed to delete bank information.");
		}
	};

	const fetchBanks = async () => {
		try {
			const data = await getAllBanks();
			setBanks(data);
		} catch (error) {
			console.error("Failed to fetch banks:", error);
		}
	};

	useEffect(() => {
		fetchBanks();
	}, []);

	return (
		<div>
			<div className="flex justify-between items-center mb-9">
				<div>
					<h1 className="font-bold text-2xl">Bank Information</h1>
					<p className="opacity-50">
						Manage destination accounts for customer transfers.
					</p>
				</div>
				<Button className="rounded-lg" onClick={() => setIsModalOpen(true)}>
					<FiPlus size={24} />
					Add Bank Account
				</Button>
			</div>
			<BankInfoList banks={banks} onEdit={handleEdit} onDelete={handleDelete} />
			<BankInfoModal
				isOpen={isModalOpen}
				onClose={handleCloseModal}
				bank={selectedBank}
				onSuccess={fetchBanks}
			/>
			<DeleteModal
				isOpen={isDeleteModalOpen}
				onClose={() => setIsDeleteModalOpen(false)}
				onConfirm={handleDeleteConfirm}></DeleteModal>
		</div>
	);
};

export default BankManagement;
