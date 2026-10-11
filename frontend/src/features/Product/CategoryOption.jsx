
const CategoryOption = ({ value, slug, category, setCategory }) => {

	return (
		<label className="flex items-center gap-3 cursor-pointer group">
			<input
				name='category'
				value={slug}
				checked={category === slug}
				onChange={() => setCategory(slug)}
				className="accent-primary border-outline-variant"
				type="radio" />
			<span
				className="text-body-md font-body-md text-on-surface-variant group-hover:text-primary transition-colors">{value}</span>
		</label>
	)
}

export default CategoryOption
