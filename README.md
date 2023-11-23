Tango Software App
Esta es una aplicación web simple construida con React para gestionar datos relacionados con el software Tango. La aplicación incluye funcionalidades para mostrar una tabla de datos, ver detalles de un pago y descargar archivos de texto (.txt) individualmente o en un archivo ZIP.

Características
Tabla de Datos: Muestra una tabla con información relevante, como la fecha, el número de factura, el cliente, el nombre, el teléfono y el pago total.

Detalles del Pago: Permite ver detalles específicos de un pago haciendo clic en el botón "Ver" en la tabla.

Descarga de Archivos de Texto: Permite descargar archivos de texto (.txt) individuales haciendo clic en el enlace "Descargar TXT" en la tabla.

Descarga de Archivo ZIP: Permite descargar un archivo ZIP que contiene todos los archivos de texto (.txt) de la tabla haciendo clic en el botón "Descargar ZIP".

Estructura del Proyecto
src/components: Contiene los componentes de la aplicación.

home: Contiene el componente Home para la página de inicio.

navbar: Contiene el componente Navbar para la barra de navegación.

TangoSoftware: Contiene los componentes específicos del software Tango.

data: Contiene el componente DataTango para mostrar datos relacionados con Tango.

proofOfPayment: Contiene el componente ProofOfPaymentTango para mostrar detalles del pago.

table: Contiene los componentes relacionados con la tabla.

tableHeader: Contiene el componente TableHeader para el encabezado de la tabla.

tableContent: Contiene el componente TableContent para el contenido de la tabla.

tableTango: Contiene el componente TableTango como la tabla principal.

src/actions: Contiene los archivos de acciones para la gestión del estado.

src/file: Contiene el archivo File.js para la lógica de descarga de archivos.

src/reducers: Contiene el archivo reducer.js para la gestión del estado mediante Redux.

src/App.js: El archivo principal que define las rutas y la estructura general de la aplicación.

src/App.css: Estilo principal de la aplicación.

Instalación y Ejecución
Clona el repositorio:

bash
Copy code
git clone https://github.com/tu-usuario/tango-software-app.git
Navega al directorio del proyecto:

bash
Copy code
cd tango-software-app
Instala las dependencias:

bash
Copy code
npm install
Inicia la aplicación:

bash
Copy code
npm start
La aplicación estará disponible en http://localhost:3000.

¡Disfruta usando la aplicación Tango Software!