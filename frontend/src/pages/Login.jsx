import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { login } from '../features/auth/authThunk'
import { clearAuthError } from '../features/auth/authSlice'
import Button from '../ui/Button'
import usePageTitle from '../hooks/usePageTitle'
import { validateLoginForm } from '../utils/validators'
import toast from 'react-hot-toast'
import InputBox from '../ui/InputBox'

const Login = () => {
	const { isLoading } = useSelector((state) => state.auth);
	const [formError, setFormError] = useState("");

	usePageTitle('Login');

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	useEffect(() => {
		dispatch(clearAuthError());
		return () => {
			dispatch(clearAuthError());
		};
	}, [dispatch]);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.id]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const validationError = validateLoginForm(formData);
		if (validationError) {
			setFormError(validationError);
			toast.error(validationError);
			return;
		}

		try {
			const resultAction = await dispatch(login(formData));

			if (login.fulfilled.match(resultAction)) {
				toast.success('Login Successful');
				setFormData({
					email: '',
					password: '',
				});
				navigate("/");
			}
			else if (login.rejected.match(resultAction)) {
				toast.error(resultAction.payload || "Login failed");
			}
		} catch (error) {
			toast.error(error.message);
		}
	}

	useEffect(() => {
		if (formError) {
			const timer = setTimeout(() => {
				setFormError("");
			}, 7000);

			return () => clearTimeout(timer);
		}
	}, [formError]);

	return (
		<main className="min-h-screen flex flex-col md:flex-row w-full overflow-hidden animate-fadeUp">
			<section className="relative w-full md:w-[40%] min-h-100 md:min-h-screen">
				<div className="absolute inset-0 z-0">
					<img alt="Premium interior space"
						className="w-full h-full object-cover"
						src="/images/login.png" />
				</div>
				<div
					className="absolute inset-0 bg-primary/20 flex flex-col justify-end p-margin-desktop md:p-section-padding pb-30 md:pb-20 z-10 text-white">
					<div className="max-w-md">
						<h1 className="font-display-lg text-display-lg-mobile md:text-display-lg mb-stack-sm drop-shadow-md">
							Furnish Your Space, The Smart Way
						</h1>
						<p className="font-body-lg text-body-lg text-white/90 drop-shadow-sm">
							Access affordable furniture and appliances with flexible rental plans.
						</p>
					</div>
				</div>
			</section>
			<section
				className="w-full md:w-[60%] flex items-center justify-center p-margin-mobile md:p-margin-desktop bg-surface">
				<div
					className="w-full max-w-120 bg-white p-stack-lg md:p-16 rounded-xl shadow-[0px_4px_20px_rgba(67,118,108,0.08)] border border-surface-container transition-all">
					<div className="text-center mb-stack-lg">
						<h2 className="font-headline-md text-headline-md text-primary mb-2">Welcome Back</h2>
						<p className="font-body-md text-on-surface-variant">Sign in to manage your rentals and explore new
							collections.</p>
					</div>
					<form className="space-y-stack-md" onSubmit={handleSubmit}>
						<InputBox
							label='EMAIL ADDRESS'
							id='email'
							name='email'
							inputType='login'
							placeholder='john@gmail.com'
							value={formData.email}
							onChange={handleChange}
						/>

						<InputBox
							label='PASSWORD'
							id='password'
							name='password'
							inputType='password'
							placeholder='••••••••'
							value={formData.password}
							onChange={handleChange}
						/>


						{formError && (
							<p className="text-caption font-caption text-error flex items-center gap-1">
								<span className="material-symbols-outlined text-[14px]">error</span>
								{formError}
							</p>
						)}

						<div className="flex items-center justify-between">
							<label className="flex items-center gap-2 cursor-pointer group">
								<input
									className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary transition-all"
									type="checkbox" />
								<span
									className="text-label-md font-label-md text-on-surface-variant group-hover:text-primary">Remember
									Me</span>
							</label>
							<a className="text-label-md font-label-md text-primary hover:underline transition-all"
								href="#">Forgot Password?</a>
						</div>

						<Button
							label={isLoading ? "Logging in..." : "Login"}
							disabled={isLoading}
						/>

						<div className="relative flex items-center py-stack-sm">
							<div className="grow border-t border-outline-variant"></div>
							<div className="grow border-t border-outline-variant"></div>
						</div>
					</form>
					<div className="mt-stack-sm text-center">
						<p className="font-body-md text-on-surface-variant">
							Don't have an account?
							<br />
							<Link className="text-primary font-semibold hover:underline" to='/register'>Create Account</Link>
						</p>
					</div>
				</div>
			</section>
		</main>
	)
}

export default Login
