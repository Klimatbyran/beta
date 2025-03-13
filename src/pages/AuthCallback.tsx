import { useEffect,} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/contexts/ToastContext";

export const AuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { authenticate, token } = useAuth();
  const { showToast } = useToast();
  
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get('code')
    const error = params.get('error');
    
    authenticate(code)

    if (error) {
      console.error('Authentication error:', error);
      navigate('/', { state: { error: 'Authentication failed' } });
    }
  }, [location, navigate]);

  useEffect(() => {
    if (token) {
      showToast("Logged In", "Welcome")
      navigate('/')
    }
  }, [token])
  
  return <div>Processing authentication...</div>;
}