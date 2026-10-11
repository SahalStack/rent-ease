const ErrorMessage = ({ message = "Something went wrong" }) => {
	return (
		<div className="flex justify-center items-center h-full w-full">
			<p className="text-red-600 text-sm font-medium">{message}</p>
		</div>
	);
};
	
export default ErrorMessage;