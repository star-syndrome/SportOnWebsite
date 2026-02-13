const dateFormatter = (date: string) => {
	const newFormat = new Date(date).toLocaleDateString("id-ID", {
		day: "numeric",
		month: "short",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	});

	return newFormat;
};

export default dateFormatter;
