import ngucoc from '../../assets/rice.png'
import raucu from '../../assets/vegetables.png'
import traicay from '../../assets/traicay.png'
import tpcn from '../../assets/caycongnghiep.png'
import khac from '../../assets/khac.png'
import { faHourglassHalf, faTruckFast, faCheck, faXmark, faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const MenuProductType = [
    {
        id: 1,
        title: "Ngũ cốc",
        icon: ngucoc,
        color: "border-[#EBA14B]",
    },
    {
        id: 2,
        title: "Rau củ",
        icon: raucu,
        color: "border-[#349638]",
    },
    {
        id: 3,
        title: "Trái cây",
        icon: traicay,
        color: "border-[#EB4B4B]",

    },
    {
        id: 4,
        title: "Thực phẩm công nghiệp",
        icon: tpcn,
        color: "border-[#565D76]",
    },
    {
        id: 5,
        title: "Khác",
        icon: khac,
        color: "border-[#583A76]",
    },
];
const provinces = [
    "Hà Nội",
    "Hồ Chí Minh",
    "Đà Nẵng",
    "Hải Phòng",
    "Cần Thơ",
    "Hải Dương",
    "Bà Rịa-Vũng Tàu",
    "Bắc Giang",
    "Bắc Kạn",
    "Bạc Liêu",
    "Bắc Ninh",
    "Bến Tre",
    "Bình Định",
    "Bình Dương",
    "Bình Phước",
    "Bình Thuận",
    "Cà Mau",
    "Cao Bằng",
    "Đắk Lắk",
    "Đắk Nông",
    "Điện Biên",
    "Đồng Nai",
    "Đồng Tháp",
    "Gia Lai",
    "Hà Giang",
    "Hà Nam",
    "Hà Tĩnh",
    "Hải Dương",
    "Hậu Giang",
    "Hòa Bình",
    "Hưng Yên",
    "Khánh Hòa",
    "Kiên Giang",
    "Kon Tum",
    "Lai Châu",
    "Lâm Đồng",
    "Lạng Sơn",
    "Lào Cai",
    "Long An",
    "Nam Định",
    "Nghệ An",
    "Ninh Bình",
    "Ninh Thuận",
    "Phú Thọ",
    "Quảng Bình",
    "Quảng Nam",
    "Quảng Ngãi",
    "Quảng Ninh",
    "Quảng Trị",
    "Sóc Trăng",
    "Sơn La",
    "Tây Ninh",
    "Thái Bình",
    "Thái Nguyên",
    "Thanh Hóa",
    "Thừa Thiên Huế",
    "Tiền Giang",
    "Trà Vinh",
    "Tuyên Quang",
    "Vĩnh Long",
    "Vĩnh Phúc",
    "Yên Bái",
];

const MenuStatusOrder = [
    {
        id: 1,
        status: 2,
        title: "Đang chuẩn bị",
    },
    {
        id: 2,
        status: 3,
        title: "Đang vận chuyển",
    },
    {
        id: 3,
        status: 4,
        title: "Hoàn thành",
    },
    {
        id: 4,
        status: 5,
        title: "Trả hàng",
    },
    {
        id: 5,
        status: 6,
        title: "Đã hủy",
    },
];

const MenuOrder = [
    {
        id: 1,
        title: "Tháng này",
    },
    {
        id: 2,
        title: "3 tháng qua",
    },
    {
        id: 3,
        title: "6 tháng qua",

    },
    {
        id: 4,
        title: "Năm nay",
    },
];

export {
    MenuProductType,
    provinces,
    MenuOrder,
    MenuStatusOrder
};