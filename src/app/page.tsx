"use client";

import { api } from "@/trpc/react";

export default function Home() {
	const { data: orderQueue } = api.queue.getLatest.useQuery(undefined, {
		refetchInterval: 10000, // Refetch every 10 seconds
	});

	const currentOrder = orderQueue
		? orderQueue.reduce((lowest, current) =>
			current.order_id < lowest.order_id ? current : lowest,
		)
		: null;

	return (
		<main className="flex min-h-screen flex-col items-center justify-center bg-[#1f1f21] text-white">
			<div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
				<h1 className="font-extrabold text-5xl text-[#fedb10] tracking-tight sm:text-[5rem]">
					PacksOnPacks Kö
				</h1>

				{currentOrder ? (
					<div className="text-center">
						<h2 className="mb-4 text-2xl text-[#fedb10]">Öppnas nu:</h2>
						<div className="m-3 rounded-lg border-2 border-[#fedb10] bg-[#2a2a2c] p-6 shadow-lg">
							<p className="text-xl">
								Order ID:{" "}
								<strong className="text-[#fedb10]">
									{currentOrder.order_id}
								</strong>
							</p>
							<p className="text-xl">
								Skapad:{" "}
								<strong>
									{new Date(currentOrder.date_created).toLocaleString()}
								</strong>
							</p>
						</div>
					</div>
				) : (
					<p className="text-xl">Inga ordrar i kön för tillfället.</p>
				)}

				{/* Display the full queue */}
				<div className="mt-8 w-full max-w-md text-center">
					<h2 className="mb-4 text-center text-2xl text-[#fedb10]">Full Kö:</h2>
					<ul className="space-y-4">
						{orderQueue && orderQueue.length > 0 ? (
							orderQueue.map((order) => (
								<li
									className="rounded-lg border border-[#fedb10]/30 bg-[#2a2a2c] p-4 shadow-md transition-all hover:border-[#fedb10]"
									key={order.order_id}
								>
									<p>
										Order ID:{" "}
										<strong className="text-[#fedb10]">{order.order_id}</strong>
									</p>
									<p>
										Skapad:{" "}
										<strong>
											{new Date(order.date_created).toLocaleString()}
										</strong>
									</p>
								</li>
							))
						) : (
							<p className="text-center text-xl">Kön är tom.</p>
						)}
					</ul>
				</div>
			</div>
		</main>
	);
}
