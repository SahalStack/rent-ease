const Error = ({ error }) => {
	return (
		<p className="text-caption font-caption text-error mt-1 flex items-center gap-1">
			<span className="material-symbols-outlined text-[14px]">error</span>
			{error}
		</p>
	)
}

export default Error
