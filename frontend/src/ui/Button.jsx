const Button = ({ label, disabled }) => {

	const btnStyle = 'w-full h-12 bg-primary-container text-on-primary font-bold rounded-xl shadow-sm hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2'

	return (
		<button
			type="submit"
			className={btnStyle}
			disabled={disabled}
		>
			{label}
		</button >
	)
}

export default Button
