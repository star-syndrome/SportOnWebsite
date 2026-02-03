import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "sporton-api.up.railway.app",
				pathname: "/uploads/**",
			},
		],
	},
};

export default nextConfig;
