const priceFormatter = (price: number) => {
	const newFormat = Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
		maximumSignificantDigits: 4,
	}).format(price);

	return newFormat;
};

export default priceFormatter;
