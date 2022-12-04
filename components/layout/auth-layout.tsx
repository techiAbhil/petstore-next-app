import Image from 'next/image';
import { useRouter } from 'next/router';
import MAIN_LOGO from '../../assets/main-logo.png';
const AuthLayout = ({ children }: { children: any }) => {
    const router = useRouter();
    return (
        <div className="container-fluid">
            <div className="mt-5 row justify-content-center align-items-center bg-white border-light">
                <div className="bg-white col-lg-4 col-md-6 col-sm-10">
                    <Image
                        src={MAIN_LOGO}
                        className="img-fluid rounded cursor-pointer"
                        alt="Responsive image"
                        onClick={() => router.push('/')}
                    />

                    {children}
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
