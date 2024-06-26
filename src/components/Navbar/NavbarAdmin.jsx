
import UserPopup from './UserPopup';

const NavbarAdmin = () => {
    return (
        <div className="bg-white top-0 sticky z-10 shadow-lg font-karla">
            <div className="container mx-auto px-4">
                <div className="flex justify-end items-center h-[80px]">
                    <div className="flex gap-4 md:gap-8 items-center justify-end mr-[60px]">
                        <UserPopup />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NavbarAdmin;