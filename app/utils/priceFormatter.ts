const priceFormatter = (price: number) => {
	const newFormat = Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	}).format(price);

	return newFormat;
};

export default priceFormatter;
