import { Link } from 'react-router-dom'

export default function Menu() {
  return (
    <main className="screen screen--menu">
      <nav className="menu">
        <img className="menu-logo" src={`${import.meta.env.BASE_URL}logo.png`} alt="Logo" />
        <h1>Mini Games</h1>
        <Link className="menu-btn" to="/crucigrama">
          Crucigrama
        </Link>
        <Link className="menu-btn" to="/memorama">
          Memorama
        </Link>
        {[1, 2, 3].map((n) => (
          <button key={n} className="menu-btn menu-btn--soon" disabled>
            Yet to Come!
          </button>
        ))}
      </nav>

      <footer className="menu-footer">
        <p className="credit">
          Juegos en desarrollo hecho con cariño por ARMY{' '}
          <a
            href="https://www.instagram.com/dear_myself_20/"
            target="_blank"
            rel="noopener noreferrer"
          >
            dear_myself_20
          </a>
        </p>

        <p className="form-invite">
          Comentarios, sugerencias...
          <br />
          <a
            href="https://forms.cloud.microsoft/r/0ihHKCmaP2"
            target="_blank"
            rel="noopener noreferrer"
          >
            puedes rellenar el formulario!
          </a>
        </p>

        <p className="disclaimer">
          Este es un proyecto FAN MADE (DE UNA FAN PARA FANS, DE ARMY PARA MIS QUERIDAS
          ARMYs) de carácter no comercial, desarrollado de manera independiente por una
          programadora aficionada como muestra de cariño hacia la comunidad. No he recibido
          pago ni compensación de ningún tipo por su creación, y no tengo afiliación,
          patrocinio ni respaldo de los titulares originales de los derechos de autor.
          <br />
          <br />
          Todos los personajes, nombres, logotipos, imágenes y demás elementos reconocibles
          son propiedad de sus respectivos dueños. Su uso en este sitio es estrictamente
          recreativo y sin ánimo de lucro, con la intención de honrar la obra original y no
          de sustituirla ni lucrar con ella.
          <br />
          <br />
          Si eres titular de algún derecho y consideras que algún contenido debe ser
          retirado, te invito a contactarme para resolverlo a la brevedad.
          <br />
          <br />
          Esta recopilación de juegos es una iniciativa PERSONAL.
        </p>
      </footer>
    </main>
  )
}