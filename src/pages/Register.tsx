import type { RegisterUserDetails } from "../types/interfaces"
import { registerUser } from "../api/auth"
import { useState,type FormEvent } from "react"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
const Register = () => {
  const navigate = useNavigate()  
  const [userData, setUserData] = useState<RegisterUserDetails>({
    username:"",
    email: "",
    password: "",
    role:"user",
    })
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true)
    setError(null)
    try {
      await registerUser(userData)
      toast.success("Registered successfully,now you can Log in")
      navigate("/login")
    } catch (err: any) {
      setError(err?.response?.data?.message || "Invalid field details,please try again!");
    } finally {
      setLoading(false);
    }
  }
  return (
    
    <div className="login">
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="username">
          Username
          <input required id="username" type="text" value={userData.username} onChange={(e) =>
              setUserData((prev) => ({ ...prev, username: e.target.value }))
            }
          />
        </label>
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
          {loading ? "Registering..." : "Submit"}
        </button>
      </form>
    </div>
  )
}
export default Register