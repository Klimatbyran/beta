import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/contexts/ToastContext";

export const AuthCallback = () => {
  const called = useRef(false)
  const { showToast } = useToast();
  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  
  useEffect(() => {
    ;(async () => {
      if (isAuthenticated() === false) {
        try {
          if (called.current) return // prevent rerender caused by StrictMode
          called.current = true
          const code = searchParams.get("code"); 
          const state = searchParams.get("state")
          if(code && state) {
            await login(code, state)
            showToast("Logged In", "Welcome")
            navigate('/')
          }
        } catch (err) {
          console.error(err)
          navigate('/')
        }
      } else {
        navigate('/')
      }
    })()
  }, [isAuthenticated, login, navigate, searchParams, showToast])
  return <></>
}