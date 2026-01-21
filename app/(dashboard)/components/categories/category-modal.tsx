import Button from "@/app/(landing)/components/ui/button";
import Modal from "../ui/modal";
import ImageUploadPreview from "../ui/image-upload-preview";
import { useEffect, useState } from "react";
import { Category } from "@/app/types";
import { getImageUrl } from "@/app/lib/api";
import { toast } from "react-toastify";
import {
	createCategory,
	updateCategory,
} from "@/app/services/category.service";

type TCategoryModalProps = {
	category?: Category | null;
	onSuccess?: () => void;
	isOpen: boolean;
	onClose: () => void;
};

type CategoryFormData = {
	name: string;
	description: string;
};

const CategoryModal = ({
	category,
	onSuccess,
	isOpen,
	onClose,
}: TCategoryModalProps) => {
	const [imageFile, setImageFile] = useState<File | null>(null);
	const [imagePreview, setImagePreview] = useState<string | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const isEditMode = !!category;

	const [formData, setFormData] = useState<CategoryFormData>({
		name: "",
		description: "",
	});

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { id, value } = e.target;
		setFormData((prev) => ({ ...prev, [id]: value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		try {
			const data = new FormData();
			data.append("name", formData.name);
			data.append("description", formData.description);
			if (imageFile) {
				data.append("image", imageFile);
			}

			if (category) {
				await updateCategory(category._id, data);
			} else {
				await createCategory(data);
			}

			// Reset Form Data
			setFormData({
				name: "",
				description: "",
			});
			setImageFile(null);
			setImagePreview(null);

			toast.success(
				isEditMode
					? "Category updated successfully!"
					: "Category added successfully!",
			);

			onSuccess?.();
			onClose();
		} catch (error) {
			console.error(
				category ? "Failed to update category!" : "Failed to create category!",
				error,
			);
			toast.error(
				category ? "Failed to update category!" : "Failed to create category!",
			);
		} finally {
			setIsSubmitting(false);
		}
	};

	useEffect(() => {
		if (isEditMode && isOpen) {
			setFormData({
				name: category.name,
				description: category.description,
			});
			setImagePreview(
				category.imageUrl ? getImageUrl(category.imageUrl) : null,
			);
		} else if (isOpen) {
			setFormData({
				name: "",
				description: "",
			});
			setImageFile(null);
			setImagePreview(null);
		}
	}, [isOpen, category]);

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			title={isEditMode ? "Edit Category" : "Add New Category"}>
			<form onSubmit={handleSubmit} className="flex flex-col gap-6">
				<div className="flex gap-7">
					<div className="min-w-50 cursor-pointer">
						<h4 className="font-medium text-xs mb-2">Category Image</h4>
						<ImageUploadPreview
							label="Category Image"
							value={imagePreview}
							onChange={(file) => {
								setImageFile(file);
								setImagePreview(URL.createObjectURL(file));
							}}
						/>
					</div>
					<div className="flex flex-col gap-4 w-full text-xs font-medium">
						<div className="input-group-admin">
							<label htmlFor="name">Category Name</label>
							<input
								type="text"
								id="name"
								name="name"
								placeholder="e. g. Running"
								value={formData.name}
								onChange={handleChange}
							/>
						</div>
						<div className="input-group-admin">
							<label htmlFor="description">Description</label>
							<textarea
								id="description"
								name="description"
								placeholder="Category Details..."
								rows={5}
								value={formData.description}
								onChange={handleChange}
							/>
						</div>
					</div>
				</div>
				<Button
					type="submit"
					className="ml-auto mt-3 rounded-lg"
					onClick={handleSubmit}
					disabled={isSubmitting}>
					{isEditMode ? "Update Category" : "Create Category"}
				</Button>
			</form>
		</Modal>
	);
};

export default CategoryModal;
