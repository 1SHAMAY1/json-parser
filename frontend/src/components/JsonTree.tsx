import { useState } from "react"

type Props = {
	data: any
	name?: string
}

export default function JsonTree({
	data,
	name,
}: Props) {

	const [open, setOpen] = useState(true)

	if (
		data === null ||
		typeof data !== "object"
	) {
		return (
			<div
				style={{
					marginLeft: "20px",
					padding: "2px 0",
				}}
			>
				{name && (
					<strong>
						{name}:{" "}
					</strong>
				)}

				{String(data)}
			</div>
		)
	}

	const isArray = Array.isArray(data)

	return (
		<div
			style={{
				marginLeft: "20px",
			}}
		>
			<div
				onClick={() => setOpen(!open)}
				style={{
					cursor: "pointer",
					fontWeight: "bold",
					userSelect: "none",
				}}
			>
				{open ? "▼" : "▶"}{" "}
				{name}
				{" "}
				{isArray
					? `[${data.length}]`
					: "{ }"}
			</div>

			{open && (
				<div>
					{isArray
						? data.map(
								(
									item: any,
									index: number,
								) => (
									<JsonTree
										key={index}
										name={`[${index}]`}
										data={item}
									/>
								),
						  )
						: Object.entries(data).map(
								([key, value]) => (
									<JsonTree
										key={key}
										name={key}
										data={value}
									/>
								),
						  )}
				</div>
			)}
		</div>
	)
}