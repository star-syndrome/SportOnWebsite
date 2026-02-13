"use client";

import { useState, useEffect } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import Link from "next/link";
import { getImageUrl } from "@/app/lib/api";
import priceFormatter from "@/app/utils/priceFormatter";
import Image from "next/image";
import { searchProducts } from "@/app/services/product.service";
import { Product } from "@/app/types";

const SearchModal = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [query, setQuery] = useState("");
	const [results, setResults] = useState<Product[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	useEffect(() => {
		if (!query.trim()) {
			setResults([]);
			return;
		}

		const currentQuery = query;

		// Debounce search
		const timer = setTimeout(async () => {
			try {
				setIsLoading(true);
				setError("");

				const results = await searchProducts(query);

				if (!currentQuery.trim()) return;

				setResults(results);
			} catch {
				setError("Failed to search for products.");
			} finally {
				setIsLoading(false);
			}
		}, 300);

		return () => clearTimeout(timer);
	}, [query]);

	const handleClose = () => {
		setIsOpen(false);
		setQuery("");
		setResults([]);
	};

	return (
		<>
			{/* Search Button */}
			<button
				onClick={() => setIsOpen(true)}
				className="cursor-pointer hover:opacity-70 transition pb-2"
				aria-label="Search products">
				<FiSearch size={24} />
			</button>

			{/* Modal Overlay */}
			{isOpen && (
				<div
					className="fixed inset-0 bg-black/30 z-40 backdrop-blur-sm"
					onClick={handleClose}
				/>
			)}

			{/* Search Modal */}
			{isOpen && (
				<div className="fixed top-0 left-0 right-0 z-50 pt-24 px-4">
					<div
						className="bg-white rounded-lg shadow-lg max-w-2xl mx-auto"
						onClick={(e) => e.stopPropagation()}>
						{/* Header */}
						<div className="flex items-center justify-between p-4 border-b">
							<h2 className="text-lg font-semibold">Search Products 🔍</h2>
							<button
								onClick={handleClose}
								className="p-4 rounded-full hover:bg-gray-100 cursor-pointer">
								<FiX size={24} />
							</button>
						</div>

						{/* Search Input */}
						<div className="p-4 border-b">
							<input
								type="text"
								placeholder="Search by product name..."
								value={query}
								onChange={(e) => setQuery(e.target.value)}
								autoFocus
								className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
							/>
						</div>

						{/* Results */}
						<div className="max-h-90 overflow-y-auto p-4">
							{isLoading && (
								<div className="text-center py-8">
									<p className="text-gray-500">Searching...</p>
								</div>
							)}

							{error && (
								<div className="text-center py-8">
									<p className="text-red-500">{error}</p>
								</div>
							)}

							{!isLoading && !error && query && results.length === 0 && (
								<div className="text-center py-8">
									<p className="text-gray-500">Products not found</p>
								</div>
							)}

							{!isLoading && !error && !query && (
								<div className="text-center py-8">
									<p className="text-gray-500">
										Start typing to search products
									</p>
								</div>
							)}

							{/* Product List */}
							{query && results.length > 0 && (
								<div className="space-y-2">
									{results.map((product) => (
										<Link
											key={product._id}
											href={`/product/${product._id}`}
											onClick={handleClose}
											className="flex gap-3 p-3 rounded-lg hover:bg-gray-100 transition cursor-pointer">
											{/* Product Image */}
											<div className="bg-gray-200 rounded shrink-0 overflow-hidden">
												<Image
													src={getImageUrl(product.imageUrl)}
													alt={product.name}
													width={64}
													height={64}
													className="w-full h-full object-cover rounded"
												/>
											</div>

											{/* Product Info */}
											<div className="flex-1 min-w-0">
												<h3 className="font-medium text-sm truncate">
													{product.name}
												</h3>
												<p className="text-xs text-gray-500">
													{product.category.name}
												</p>
												<p className="text-sm font-semibold text-primary mt-1">
													{priceFormatter(product.price)}
												</p>
											</div>
										</Link>
									))}
								</div>
							)}
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default SearchModal;
