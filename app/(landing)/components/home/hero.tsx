import { FiFastForward } from "react-icons/fi";
import Image from "next/image";
import Button from "../ui/button";

const HeroSection = () => {
	return (
		<section id="hero-section" className="container mx-auto h-screen flex">
			<div className="relative self-center pt-50">
				<Image
					src="/images/img-basketball.png"
					alt="Basketball"
					width={432}
					height={423}
					className="grayscale absolute left-16 top-30"
				/>
				<div className="relative ml-35 w-full">
					<div className="text-primary bg-primary-light italic rounded-full w-35 text-center">
						Friday Sale, 50%
					</div>
					<h1 className="font-extrabold text-[75px] italic bg-linear-to-b leading-tight from-black to-[#979797] bg-clip-text text-transparent">
						WEAR YOUR <br /> TOP-QUALITY <br /> SPORTSWEAR
					</h1>
					<p className="w-120 text-sm mt-5 leading-loose">
						Engineered for endurance and designed for speed. Experience gear
						that moves as fast as you do. Premium fabrics. Unmatched comfort.
						Limitless motion.
					</p>
					<div className="flex gap-5 mt-14">
						<Button>
							Explore More <FiFastForward />
						</Button>
						<Button variant="ghost">
							Watch Video{" "}
							<Image
								src="/images/icon-play-video.svg"
								alt="Icon Play Video"
								width={29}
								height={29}
							/>
						</Button>
					</div>
				</div>
				<Image
					src="/images/img-hero.png"
					alt="Image SportOn Hero"
					width={550}
					height={750}
					className="absolute -right-127 top-102 -translate-y-1/2"
				/>
			</div>
			<Image
				src="/images/img-ornament-hero.svg"
				width={420}
				height={420}
				alt="Image SportOn Ornament Hero"
				className="absolute -right-50 top-86 -translate-y-1/2"
			/>
		</section>
	);
};

export default HeroSection;
