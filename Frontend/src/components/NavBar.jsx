import React from "react";
import { Link,useNavigate,useSearchParams} from "react-router-dom";
import UserMenu from "./UserMenu";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Navbar = () => {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    
    const authStatus = searchParams.get('auth');
    const userData = searchParams.get('user');

    if (authStatus === 'success' && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        navigate('/', { replace: true });
      } catch (error) {
        console.error('Failed to parse user data:', error);
      }
    }

    checkAuthStatus();
  }, [searchParams, navigate]);


  React.useEffect(() => {
    if (user === null && !loading) {
      navigate('/');
    }
  }, [user, loading, navigate]);

  const checkAuthStatus = async () => {
    try {
      const response = await fetch(BACKEND_URL+'/api/auth/check', {
        credentials: 'include'
      });
      const data = await response.json();
      console.log(data);
      if (data.authenticated) {
        setUser(data.user);
        return data.authenticated;
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      return false;
    } finally {
      setLoading(false);
      return false;
    }
  };

  const login = () => {
    window.location.href = BACKEND_URL+'/api/auth/google';
  };

  const logout = async () => {
    try {
      await fetch(BACKEND_URL+'/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });
      setUser(null);
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };


  return (
    <nav className="bg-[#000000] text-[#f2f2f2] p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/"><h1 className="text-xl font-bold text-[#16A34A]"><span className="text-white">Eco</span><span className="text-[#16A34A]">Saavy</span></h1></Link>
        <div className="space-x-6 flex align-middle">
          <Link to="/testimony" className="hover:text-[#16A34A] transition-colors">Testimony</Link>
          <Link to="/daily-activities" className="hover:text-[#16A34A] transition-colors">Daily Log</Link>
         {/* <Link to="/ai-companion" className="hover:text-[#16A34A] transition-colors">AI Companion</Link>*/}
          <Link to="/leaderboard" className="hover:text-[#16A34A] transition-colors">Leaderboard</Link>
          {user?<UserMenu user={user} logout={logout}/>:<button 
            onClick={() => login()} 
            className="bg-[#0D9488] text-[#f2f2f2] px-4 py-1 rounded-full font-bold hover:bg-[#16A34A] hover:text-[#000000] transition duration-300"
          >
            Login
          </button>}
        </div>
      </div>
    </nav>
  );
};


export default Navbar;
