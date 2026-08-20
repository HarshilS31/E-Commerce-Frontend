import { useContext, useState, type FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import type { userDetails } from "../types/interfaces"
import { authContext } from "../context/AuthProvider"
import { toast } from "react-toastify"
const Login = () => {
  const navigate = useNavigate()
  const auth = useContext(authContext)
  if (!auth) {
    throw new Error("Auth context is undefined")
  }
  const [userData, setUserData] = useState<userDetails>({
    email: "",
    password: "",
  })
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true)
    setError(null)
    try {
      await auth.login(userData)
      toast.success("Logged in successfully")
      navigate("/products")
    } catch (err: any) {
      setError(err?.response?.data?.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="login">
      <form className="login-form" onSubmit={handleSubmit}>
        {error && <p className="error-message" style={{ color: "red" }}>{error}</p>}

        <label htmlFor="email">
          Email
          <input required id="email" type="email" value={userData.email} onChange={(e) =>
              setUserData((prev) => ({ ...prev, email: e.target.value }))
            }
          />
        </label>

        <label htmlFor="password">
          Password
          <input required id="password" type="text" value={userData.password} onChange={(e) =>
              setUserData((prev) => ({ ...prev, password: e.target.value }))
            }
          />
        </label>

        <button className="submit-form" type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Submit"}
        </button>
      </form>
    </div>
  )
}
export default Login