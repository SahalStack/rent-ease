import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

const Login = () => {
	const { login } = useAuth();
	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!email || !password) return toast.error("Enter email and password");

		try {
			setLoading(true);
			const { data } = await api.post("/auth/login", { email, password });

			if (data.user.role !== "admin") {
				return toast.error("Admin access only");
			}

			login(data.user, data.accessToken);
			toast.success("Welcome back!");
			navigate("/admin/dashboard", { replace: true });
		} catch (err) {
			toast.error(err.response?.data?.message || "Login failed");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
			<div className="w-full max-w-md rounded-2xl border bg-white p-8 shadow-md">
				<div className="mb-6 text-center">
					<h1 className="text-2xl font-semibold text-gray-900">Admin Login</h1>
					<p className="mt-1 text-sm text-gray-500">
						Sign in to manage RentEase
					</p>
				</div>

				<form onSubmit={handleSubmit} className="flex flex-col gap-5">
					{/* Email */}
					<div className="flex flex-col gap-2">
						<label htmlFor="email" className="text-sm font-medium text-gray-700">
							Email
						</label>
						<div className="flex h-12 items-center gap-2 rounded-lg border px-3 focus-within:ring-2 focus-within:ring-blue-500">
							<Mail className="h-5 w-5 text-gray-400" />
							<input
								id="email"
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder="Enter your email"
								autoComplete="email"
								className="w-full bg-transparent text-sm outline-none"
							/>
						</div>
					</div>

					{/* Password */}
					<div className="flex flex-col gap-2">
						<label htmlFor="password" className="text-sm font-medium text-gray-700">
							Password
						</label>
						<div className="flex h-12 items-center gap-2 rounded-lg border px-3 focus-within:ring-2 focus-within:ring-blue-500">
							<Lock className="h-5 w-5 text-gray-400" />
							<input
								id="password"
								type={showPassword ? "text" : "password"}
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								placeholder="Enter your password"
								autoComplete="current-password"
								className="w-full bg-transparent text-sm outline-none"
							/>
							<button
								type="button"
								onClick={() => setShowPassword((s) => !s)}
								className="text-gray-400 hover:text-gray-600"
								aria-label="Toggle password visibility"
							>
								{showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
							</button>
						</div>
					</div>

					{/* Submit */}
					<button
						type="submit"
						disabled={loading}
						className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-blue-600 text-base font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
					>
						{loading && <Loader2 className="h-5 w-5 animate-spin" />}
						{loading ? "Signing in..." : "Sign In"}
					</button>
				</form>
			</div>
		</div>
	);
};

export default Login;