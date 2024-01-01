import { useForm } from 'react-hook-form';

type RegisterFormData = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string
}

const Register = () => {
    const { register, watch, handleSubmit, formState: { errors } } = useForm<RegisterFormData>();

    const onSubmit = handleSubmit((data) => {
        console.log(data);
    });

    return (
        <form className="flex flex-col gap-5" onSubmit={onSubmit}>
            <h2 className="text-3xl font-bold">Create an Account</h2>
            {/* div for first name and last name field*/}
            <div className='flex flex-col md:flex-row gap-5'>
                <label className='text-gray-700 text-sm font-bold flex-1'>
                    First Name<label className='text-red-500 text-sm'>*</label>
                    <input className="border rounded w-full py-1 px-2 font-normal" {...register("firstName", { 
                            required: "First name is required" 
                        })} type="text" placeholder="Enter your first name here">
                    </input>
                    {errors.firstName && (
                        <span className='text-red-500'>{errors.firstName.message}</span>
                    )}
                </label>
                <label className='text-gray-700 text-sm font-bold flex-1'>
                    Last Name
                    <input className="border rounded w-full py-1 px-2 font-normal" {...register("lastName", { 
                            required: "Last name is required" 
                        })} type="text" placeholder="Enter your last name here">
                    </input>
                    {errors.lastName && (
                        <span className='text-red-500'>{errors.lastName.message}</span>
                    )}
                </label>
            </div>
            {/* label for email field */}
            <label className='text-gray-700 text-sm font-bold flex-1'>
                Email
                <input className="border rounded w-full py-1 px-2 font-normal" {...register("email", { 
                        required: "Email address is required" 
                    })} type="email" placeholder="Enter your email address here">
                </input>
                {errors.email && (
                        <span className='text-red-500'>{errors.email.message}</span>
                    )}
            </label>
            {/* label for password field */}
            <label className='text-gray-700 text-sm font-bold flex-1'>
                Password
                <input className="border rounded w-full py-1 px-2 font-normal" {...register("password", { 
                        required: "Password is required", 
                        minLength: { 
                            value: 8, 
                            message: "Password must be atleast 8 characters" 
                        }
                    })} type="password" placeholder="Enter your password here">
                </input>
                {errors.password && (
                        <span className='text-red-500'>{errors.password.message}</span>
                    )}
            </label>
            {/* label for confirm password field */}
            <label className='text-gray-700 text-sm font-bold flex-1'>
                Confirm Password
                <input className="border rounded w-full py-1 px-2 font-normal" {...register("confirmPassword", { 
                        validate: (val) => {
                            if(!val) {
                                return "Password is required"
                            } else if (watch("password") !== val) {
                                return "The passwords do not match";
                            } 
                        }
                    })} type="password" placeholder="Enter your password here">
                </input>
                {errors.confirmPassword && (
                        <span className='text-red-500'>{errors.confirmPassword.message}</span>
                    )}
            </label>
            <label>
                (*) Fields are mandatory
            </label>
            <span>
                <button type="submit" className='bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl'>
                    Create Account
                </button>
            </span>
        </form>
    );
};

export default Register;