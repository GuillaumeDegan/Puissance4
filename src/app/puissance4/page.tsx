"use client";
import dynamic from "next/dynamic";

const DynamicComponentWithNoSSR = dynamic(
	() => import("../components/puissance4"),
	{
		ssr: false,
	},
);

function Page() {
	return <DynamicComponentWithNoSSR />;
}

export default Page;
