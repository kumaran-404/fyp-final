
import { Link } from 'react-router-dom'

function Login() {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
        <h2 className='pt-4 text-3xl text-violet-600 font-extrabold '>Construct.Ai</h2>
        <span>Login to continue</span>
        <div className='flex flex-col p-5 gap-6 w-2/6'>
            <input type="text" className='p-2 outline outline-indigo-200 outline-1 rounded-md' placeholder='Email'></input>
            <input type="password" className='p-2 outline outline-indigo-200 outline-1 rounded-md' placeholder='Password' ></input>
            <button className="bg-violet-600 shadow-md p-2 rounded-md text-white">Login</button>
        </div>
        <span>Create new Account <Link className='text-blue-600 underline' to="signup">Signup</Link></span>
    </div>
  )
}

export default Login