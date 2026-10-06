export default function JsonLd({ data }: { data: object }) {
	return (
		<script
			type="application/ld+json"
			// Escape "<" so content can't close the script tag early.
			dangerouslySetInnerHTML={{
				__html: JSON.stringify(data).replace(/</g, "\\u003c"),
			}}
		/>
	);
}
