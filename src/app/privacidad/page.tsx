import type { Metadata } from "next"
import Link from "next/link"
import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
  title: "Aviso de Privacidad | SSAISA",
  description: "Aviso de privacidad integral de SSAISA — Servicios y Sistemas de Administración Inmobiliaria, S.A. de C.V.",
  robots: { index: false },
}

export default function PrivacidadPage() {
  const lastUpdated = "1 de abril de 2025"

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-navy-800 py-12">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Aviso de Privacidad</h1>
          <p className="text-gray-400 text-sm">Última actualización: {lastUpdated}</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 sm:p-10 space-y-8 text-sm text-gray-700 leading-relaxed">

          {/* Identidad del responsable */}
          <section>
            <h2 className="text-base font-bold text-navy-800 mb-3">I. Identidad y domicilio del Responsable</h2>
            <p>
              <strong>SSAISA — Servicios y Sistemas de Administración Inmobiliaria</strong> (en adelante
              "SSAISA" o el "Responsable"), con domicilio en {siteConfig.address}, es el responsable del
              tratamiento de sus datos personales, de conformidad con lo establecido en la{" "}
              <em>Ley Federal de Protección de Datos Personales en Posesión de los Particulares</em> (LFPDPPP)
              y su Reglamento.
            </p>
            <p className="mt-2">
              Para cualquier consulta relacionada con este aviso puede contactarnos en:{" "}
              <a href={`mailto:${siteConfig.email}`} className="text-gold-600 hover:underline">{siteConfig.email}</a>
              {" "}o al teléfono <a href={`tel:${siteConfig.phone}`} className="text-gold-600 hover:underline">{siteConfig.phone}</a>.
            </p>
          </section>

          <hr className="border-gray-100" />

          {/* Datos personales recabados */}
          <section>
            <h2 className="text-base font-bold text-navy-800 mb-3">II. Datos personales que recabamos</h2>
            <p>Para llevar a cabo las finalidades descritas en el presente aviso, recabamos las siguientes categorías de datos personales:</p>
            <ul className="list-disc pl-5 mt-3 space-y-1">
              <li><strong>Datos de identificación:</strong> nombre completo.</li>
              <li><strong>Datos de contacto:</strong> correo electrónico, número de teléfono o celular.</li>
              <li><strong>Datos sobre sus intereses inmobiliarios:</strong> tipo de operación de interés (compra, renta, inversión, venta), canal de contacto preferido y mensaje o comentarios adicionales.</li>
              <li><strong>Datos de navegación:</strong> dirección IP, tipo de navegador, páginas visitadas y tiempo de navegación dentro del sitio web (recabados mediante cookies y tecnologías similares).</li>
            </ul>
            <p className="mt-3">
              <strong>SSAISA no recaba datos personales sensibles</strong> (datos financieros, biométricos, de salud, origen étnico, creencias religiosas ni filiación política) a través de este sitio web.
            </p>
          </section>

          <hr className="border-gray-100" />

          {/* Finalidades */}
          <section>
            <h2 className="text-base font-bold text-navy-800 mb-3">III. Finalidades del tratamiento</h2>

            <p className="font-semibold text-gray-800 mb-1">Finalidades primarias (necesarias para la relación jurídica):</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Atender y dar seguimiento a su solicitud de información, asesoría inmobiliaria, cotización o contacto.</li>
              <li>Presentarle opciones de propiedades, terrenos o desarrollos inmobiliarios que correspondan a su perfil y necesidades.</li>
              <li>Brindarle asesoría en procesos de compraventa, arrendamiento, preventa e inversión inmobiliaria en el Área Metropolitana de Monterrey.</li>
              <li>Orientarle sobre planes de financiamiento, crédito hipotecario y esquemas de inversión.</li>
              <li>Gestionar la relación contractual derivada de la prestación de nuestros servicios inmobiliarios.</li>
              <li>Dar cumplimiento a obligaciones legales y fiscales aplicables.</li>
            </ul>

            <p className="font-semibold text-gray-800 mt-4 mb-1">Finalidades secundarias (no necesarias para la relación):</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Enviarle información sobre nuevas propiedades, desarrollos y oportunidades de inversión que puedan ser de su interés.</li>
              <li>Remitirle boletines, artículos del blog y contenido informativo sobre el mercado inmobiliario de Nuevo León.</li>
              <li>Realizar encuestas de satisfacción y estudios de mercado internos.</li>
              <li>Elaborar estadísticas y métricas de uso del sitio web.</li>
            </ul>

            <p className="mt-3">
              Si no desea que sus datos sean tratados para las finalidades secundarias, puede manifestarlo enviando un correo a{" "}
              <a href={`mailto:${siteConfig.email}`} className="text-gold-600 hover:underline">{siteConfig.email}</a>{" "}
              con el asunto <em>"Oposición a finalidades secundarias"</em>. Lo anterior no afectará la prestación de los servicios primarios.
            </p>
          </section>

          <hr className="border-gray-100" />

          {/* Transferencias */}
          <section>
            <h2 className="text-base font-bold text-navy-800 mb-3">IV. Transferencias de datos personales</h2>
            <p>
              SSAISA podrá transferir sus datos personales, sin requerir su consentimiento, a las siguientes categorías de terceros cuando sea necesario para el cumplimiento de una obligación legal o para la gestión de los servicios contratados:
            </p>
            <ul className="list-disc pl-5 mt-3 space-y-1">
              <li>Autoridades gubernamentales y judiciales que lo requieran en ejercicio de sus atribuciones.</li>
              <li>Notarios públicos y fedatarios en el marco de operaciones de compraventa o arrendamiento.</li>
              <li>Instituciones financieras o de crédito hipotecario, únicamente cuando usted haya solicitado expresamente orientación para obtener financiamiento.</li>
              <li>Desarrolladoras inmobiliarias aliadas, exclusivamente para presentarle proyectos en preventa o con condiciones especiales, y solo con su consentimiento.</li>
            </ul>
            <p className="mt-3">
              En todos los casos, los terceros receptores asumen las mismas obligaciones de protección de datos que SSAISA.
            </p>
          </section>

          <hr className="border-gray-100" />

          {/* Derechos ARCO */}
          <section>
            <h2 className="text-base font-bold text-navy-800 mb-3">V. Derechos ARCO y cómo ejercerlos</h2>
            <p>
              Usted tiene derecho a <strong>Acceder, Rectificar, Cancelar u Oponerse</strong> (derechos ARCO) al tratamiento de sus datos personales, así como a revocar el consentimiento otorgado y limitar su uso o divulgación.
            </p>
            <p className="mt-3">Para ejercer sus derechos ARCO, envíe una solicitud a:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Correo electrónico:</strong>{" "}<a href={`mailto:${siteConfig.email}`} className="text-gold-600 hover:underline">{siteConfig.email}</a></li>
              <li><strong>Teléfono / WhatsApp:</strong>{" "}<a href={`tel:${siteConfig.phone}`} className="text-gold-600 hover:underline">{siteConfig.phone}</a></li>
            </ul>
            <p className="mt-3">Su solicitud deberá incluir:</p>
            <ol className="list-decimal pl-5 mt-2 space-y-1">
              <li>Nombre completo y correo electrónico o teléfono de contacto.</li>
              <li>Descripción clara del derecho que desea ejercer y los datos a los que se refiere.</li>
              <li>Copia de identificación oficial vigente.</li>
            </ol>
            <p className="mt-3">
              Responderemos su solicitud en un plazo no mayor a <strong>20 días hábiles</strong> contados a partir de su recepción.
            </p>
          </section>

          <hr className="border-gray-100" />

          {/* Cookies */}
          <section>
            <h2 className="text-base font-bold text-navy-800 mb-3">VI. Uso de cookies y tecnologías de rastreo</h2>
            <p>
              Nuestro sitio web utiliza cookies propias y de terceros para mejorar la experiencia de navegación, analizar el tráfico y personalizar el contenido. Las cookies son pequeños archivos de texto que se almacenan en su dispositivo.
            </p>
            <p className="mt-3">Utilizamos los siguientes tipos de cookies:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Cookies técnicas o esenciales:</strong> necesarias para el funcionamiento básico del sitio.</li>
              <li><strong>Cookies analíticas:</strong> nos permiten conocer cómo interactúan los usuarios con el sitio para mejorarlo.</li>
              <li><strong>Cookies de preferencias:</strong> recuerdan sus configuraciones para visitas futuras.</li>
            </ul>
            <p className="mt-3">
              Puede deshabilitar las cookies desde la configuración de su navegador; sin embargo, esto puede limitar algunas funcionalidades del sitio.
            </p>
          </section>

          <hr className="border-gray-100" />

          {/* Cambios al aviso */}
          <section>
            <h2 className="text-base font-bold text-navy-800 mb-3">VII. Cambios al aviso de privacidad</h2>
            <p>
              SSAISA se reserva el derecho de actualizar o modificar el presente aviso de privacidad en cualquier momento para reflejar cambios en nuestras prácticas de información o en la legislación aplicable. Cualquier modificación será publicada en esta página con la fecha de actualización correspondiente. Le recomendamos revisarlo periódicamente.
            </p>
          </section>

          <hr className="border-gray-100" />

          {/* Marco legal */}
          <section>
            <h2 className="text-base font-bold text-navy-800 mb-3">VIII. Marco legal</h2>
            <p>
              El presente aviso se emite de conformidad con la{" "}
              <em>Ley Federal de Protección de Datos Personales en Posesión de los Particulares</em>,
              su Reglamento, y los{" "}
              <em>Lineamientos del Aviso de Privacidad</em> emitidos por el Instituto Nacional de Transparencia, Acceso a la Información y Protección de Datos Personales (INAI).
            </p>
          </section>

          {/* Footer del aviso */}
          <div className="bg-navy-50 rounded-xl p-5 border border-navy-100 text-center">
            <p className="text-xs text-gray-500">
              Al utilizar nuestro sitio web o al proporcionarnos sus datos de contacto, usted manifiesta haber
              leído y aceptado el presente aviso de privacidad.
            </p>
            <p className="text-xs text-gray-400 mt-2">
              © {new Date().getFullYear()} SSAISA — Servicios y Sistemas de Administración Inmobiliaria.
              Monterrey, Nuevo León, México.
            </p>
          </div>
        </div>

        <div className="text-center mt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-navy-700 hover:text-navy-900 font-medium transition-colors"
          >
            ← Regresar al inicio
          </Link>
        </div>
      </div>
    </div>
  )
}
