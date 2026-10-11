import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

const InputBox = ({ label, id, name, inputType, placeholder, value, onChange }) => {

	const [showPassword, setShowPassword] = useState(true);

	const inputBoxStyle = "w-full px-4 py-3 rounded-lg border border-outline-variant bg-transparent transition-all duration-200 font-body-md";

	const defaultDivStyle = "space-y-1";

	const handleTogglePassword = () => {
		setShowPassword((prev) => !prev);
	};

	const defaultLabel = "font-label-md text-label-md text-on-surface-variant block";

	const loginLabelStyle = "text-label-md font-label-md text-on-surface-variant uppercase tracking-wider";
	const loginInputStyle = 'w-full px-stack-md py-3 rounded-lg border border-outline-variant focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none transition-all font-body-md bg-surface-container-low';

	return (
		<div className={inputType === 'login' ? "flex flex-col gap-2" : defaultDivStyle}>
			<label
				className={inputType === 'login' ? loginLabelStyle : defaultLabel}
				htmlFor={id}
			>
				{label}
			</label>

			<div className={inputType != 'login' ? "relative w-full" : ''}>
				<input
					className={inputType === "login" || inputType === "password"
						? loginInputStyle
						: inputBoxStyle}
					id={id}
					name={name}
					type={inputType === "password" ? (showPassword ? "text" : "password") : inputType}
					placeholder={placeholder}
					value={value}
					onChange={onChange}
				/>

				{inputType === "password" && (
					<button
						type="button"
						onClick={handleTogglePassword}
						className="absolute right-3 top-1/2 -translate-y-1/2 text-black"
					>
						{showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
					</button>
				)}
			</div>
		</div>
	);
};

export default InputBox;