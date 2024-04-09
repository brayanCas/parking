
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"


  const Footer = () =>{
    const activeStyle = 'underline underline-offset-4'
    
        return(
          <div className="bg-gradient-to-r from-teal-400 to-blue-500 shadow-md py-4 absolute bottom-0 left-0 w-full z-10">
          <div className="container mx-auto">
            <p>Datos básicos de contacto:</p>
            <p>Correo electrónico: castellanosbrayan518@gmail.com</p>
            <p>Teléfono: +57 3503027566</p>
            <p>Dirección: tv 127 b # 139 -41, Bogotá</p>
          </div>
        </div>         
        )
    }
  
  export default Footer;