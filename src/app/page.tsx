"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
	const router = useRouter();

	useEffect(() => {
		const keyDownHandler = (e: KeyboardEvent) => {
			if (e.key == " " || e.code == "Space" || e.keyCode == 32) {
				router.push("/puissance4");
			}
		};

		document.addEventListener("keydown", keyDownHandler);
	}, [router]);

	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<h1>Press space to start</h1>
		</main>
	);
}
