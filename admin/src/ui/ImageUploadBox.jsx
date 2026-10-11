function ImageUploadBox({ image, onChange, onRemove, id }) {
	return (
		<div className="relative w-24 h-24">
			<label
				htmlFor={id}
				className="w-24 h-24 flex items-center justify-center border border-dashed rounded-lg cursor-pointer hover:bg-gray-50 overflow-hidden"
			>
				{image ? (
					<img
						src={URL.createObjectURL(image)}
						alt="preview"
						className="w-full h-full object-cover"
					/>
				) : (
					<span className="text-3xl text-gray-400">+</span>
				)}
			</label>

			<input
				id={id}
				type="file"
				accept="image/*"
				onChange={(e) => onChange(e.target.files[0])}
				className="hidden"
			/>

			{image && (
				<button
					type="button"
					onClick={onRemove}
					className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600"
				>
					✕
				</button>
			)}
		</div>
	);
}

export default ImageUploadBox;