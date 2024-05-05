import { CiFacebook } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";

function Footer() {
	return (
		<footer className='bg-gray-950 text-gray-400 text-sm grid justify-between grid-cols-1 md:grid-cols-3 text-center'>
			<div className='container'>
				<div>
					<div>
						<p>Regulated by the Central Bank of Kenya	|   © 2024 GO Bank.</p>
					</div>
					<div><p>All Rights Reserved.</p></div>
				</div>
			</div>
			<div className='my-3 flex gap-3 justify-center'>
				<CiFacebook className="transition-all duration-500 cursor-pointer hover:text-gray-100" size={20} />
				<FaInstagram className="transition-all duration-500 cursor-pointer hover:text-gray-100" size={20} />
				<FaXTwitter className="transition-all duration-500 cursor-pointer hover:text-gray-100" size={20} />
				<FaYoutube className="transition-all duration-500 cursor-pointer hover:text-gray-100" size={20} />
				<FaLinkedinIn className="transition-all duration-500 cursor-pointer hover:text-gray-100" size={20} />
				<FaWhatsapp className="transition-all duration-500 cursor-pointer hover:text-gray-100" size={20} />
			</div>
			<div>Social Media Disclaimer | Terms & Condition | Cookie Policy | Customer Promise | Data Privacy Statement</div>
		</footer>
	)
}

export default Footer;