const Footer = () => {
    const currentYear = new Date().getFullYear();
  
    return (
      <footer className="text-center text-white text-sm mt-8 pb-4">
        © {currentYear} Pixel Pitch | Omid Latifi & Miran Qarachatani
      </footer>
    );
  };
  
  export default Footer;