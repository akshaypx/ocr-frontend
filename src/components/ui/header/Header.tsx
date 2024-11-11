// import BPlogo from "../../../assets/BP.webp";
import NGLogo from "../../../assets/NagarroGreenLogo.svg";
import GlobeIcon from "../../../assets/global-fill.svg";
import ChatIcon from "../../../assets/question-answer-fill.svg";
import CartIcon from "../../../assets/shopping-cart-fill (1).svg";

const Header = () => {
  return (
    <div className="h-20 flex justify-between items-end px-8 py-4 shadow-lg">
      {/* <img src={BPlogo} alt="" className="h-10 w-24" /> */}
      <img src={NGLogo} alt="" className="h-10 w-24" />
      <div className="w-[10%] justify-around items-end flex">
        <img src={GlobeIcon} alt="" className="h-4 w-4 hidden md:flex" />
        <img src={ChatIcon} alt="" className="h-4 w-4 hidden md:flex" />
        <img src={CartIcon} alt="" className="h-4 w-4 hidden md:flex" />
      </div>
    </div>
  );
};

export default Header;
