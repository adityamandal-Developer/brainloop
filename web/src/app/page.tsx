import TextPressure from "@/components/textPressure";

export default function HomePage() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-center p-4">
			<TextPressure
				text="BrainLoop"
				flex={true}
				alpha={false}
				stroke={false}
				width={true}
				weight={true}
				italic={true}
				textColor="primary"
				strokeColor=""
				minFontSize={36}
				className="text-primary"
			/>
			<p className="font-semibold text-accent text-xl">
				AI-powered study assistant, comming soon
			</p>
		</main>
	);
}
