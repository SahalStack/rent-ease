import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';

import registerImg from '../../images/register.png';
import Button from '../ui/Button';
import InputBox from '../ui/InputBox';
import { inputFields, passwordFields } from '../../data';
import usePageTitle from '../hooks/usePageTitle';
import { validateRegisterForm } from '../utils/validators';
import { register } from '../features/auth/authThunk';

const Register = () => {
	const [formError, setFormError] = useState("");
	const { error, isLoading } = useSelector((state) => state.auth);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	usePageTitle('Create Account');

	const [formData, setFormData] = useState({
		full_name: '',
		email: '',
		phone: '',
		password: '',
		confirm_password: ''
	});

	useEffect(() => {
		if (error) {
			toast.error(error);
		}
	}, [error]);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.id]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const validationError = validateRegisterForm(formData);

		if (validationError) {
			setFormError(validationError);
			toast.error(validationError);
			return;
		}
		try {
			const resultAction = await dispatch(register(formData));

			if (register.fulfilled.match(resultAction)) {
				toast.success(
					"Account created successfully!\nPlease log in."
				);
				setFormData({
					full_name: '',
					email: '',
					phone: '',
					password: '',
					confirm_password: '',
				});
				navigate("/login");
			}
		} catch (error) {
			console.log(error);
			toast.error(error.message);
		}
	};

	useEffect(() => {
		if (formError) {
			const timer = setTimeout(() => {
				setFormError("");
			}, 7000);

			return () => clearTimeout(timer);
		}
	}, [formError]);

	return (
		<main className="flex flex-col md:flex-row min-h-screen w-full animate-fadeUp">
			<section
				className="relative md:w-[40%] min-h-[40vh] md:min-h-screen overflow-hidden flex flex-col justify-end p-margin-desktop bg-surface-container-low">
				<div className="absolute inset-0 z-0">
					<img alt="Modern bedroom" className="w-full h-full object-cover grayscale-10 brightness-95"
						src={registerImg} />
					<div className="absolute inset-0 bg-linear-to-t from-primary/60 via-transparent to-transparent"></div>
				</div>
				<div className="relative z-10 max-w-md animate-fade-in-up">
					<div className="mb-stack-sm">
						<span
							className="inline-block bg-primary-container text-on-primary-container font-label-md text-caption px-4 py-1 rounded-full uppercase tracking-widest">
							Welcome Home
						</span>
					</div>
					<h1 className="font-display-lg text-display-lg text-white mb-stack-sm">
						Create Your RentEase Account
					</h1>
					<p className="font-body-lg text-body-lg text-white/90">
						Start renting premium furniture and appliances in minutes. Join our community of home lovers.
					</p>
				</div>
			</section>
			<section className="md:w-[60%] flex items-center justify-center p-margin-mobile md:p-margin-desktop bg-background">
				<div
					className="w-full max-w-xl bg-surface-container-lowest rounded-xl luxury-shadow p-8 md:p-12 border border-outline-variant/30">
					<header className="mb-stack-lg text-center md:text-left">
						<h2 className="font-headline-md text-headline-md text-primary mb-2">Create Account</h2>
						<p className="font-body-md text-on-surface-variant">Join RentEase and start renting today.</p>
					</header>
					<form className="space-y-gutter" onSubmit={handleSubmit}>
						{
							inputFields.map((field) => (
								<InputBox
									key={field.id}
									label={field.label}
									id={field.id}
									name={field.name}
									inputType={field.type}
									placeholder={field.placeholder}
									value={formData[field.name]}
									onChange={handleChange}
								/>
							))
						}

						<div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
							{passwordFields.map((field) => (
								<InputBox
									key={field.id}
									label={field.label}
									id={field.id}
									name={field.name}
									inputType={field.type}
									placeholder={field.placeholder}
									value={formData[field.name]}
									onChange={handleChange}
								/>
							))}
						</div>

						{formError && (
							<p className="text-caption font-caption text-error flex items-center gap-1">
								<span className="material-symbols-outlined text-[14px]">error</span>
								{formError}
							</p>
						)}
						<div className="flex items-start gap-3">
							<input className="mt-1 rounded border-outline-variant text-primary focus:ring-primary h-4 w-4"
								id="terms" type="checkbox" />
							<label className="font-body-md text-on-surface-variant text-sm" htmlFor="terms">
								I agree to the <a className="text-primary hover:underline font-semibold transition-all"
									href="#">Terms and Conditions</a> and the <a
										className="text-primary hover:underline font-semibold transition-all" href="#">Privacy
									Policy</a>.
							</label>
						</div>

						<div className="pt-2">
							<Button label={isLoading ? 'Creating Account...' : 'Create Account'}
								disabled={isLoading} />
						</div>

						<div className="relative flex items-center py-2">
							<div className="grow border-t border-outline-variant"></div>
							<span
								className="shrink mx-4 font-label-md text-caption text-outline uppercase tracking-widest">OR</span>
							<div className="grow border-t border-outline-variant"></div>
						</div>
					</form>
					<footer className="mt-stack-sm text-center">
						<p className="font-body-md text-on-surface-variant">
							Already have an account?
							<Link className="text-primary font-bold hover:underline ml-1" to='/login'>Sign In</Link>
						</p>
					</footer>
				</div>
			</section>
		</main>
	)
}

export default Register
