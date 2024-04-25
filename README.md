# Lingüíst

Lingüíst es un proyecto de chat desarrollado con React, Express, Node.js y PostgreSQL. Este proyecto está diseñado para fomentar el aprendizaje de idiomas al permitir a los usuarios comunicarse con personas de otros países que hablan el idioma que desean aprender.

Además de la funcionalidad básica de chat, Lingüíst también integra una inteligencia artificial para traducción de texto en tiempo real. Esto permite a los usuarios traducir los mensajes del chat instantáneamente en caso de encontrar palabras o frases que no entiendan, o los "slangs" de cada país.

## Características principales

- **Chat en tiempo real:** Permite a los usuarios comunicarse de forma instantánea con personas de otros países que hablan el idioma que desean aprender.
  
- **Traducción integrada:** La integración de una inteligencia artificial permite traducir los mensajes del chat en tiempo real, facilitando la comprensión de los usuarios.

- **Aprendizaje interactivo:** Los usuarios pueden practicar y mejorar sus habilidades lingüísticas a través de conversaciones reales con hablantes nativos del idioma objetivo.

- **Aprendizaje avanzado:** Los usuarios mejoran su gramática y estructura del lenguaje con el chat de IA especializado.

  
## Instalación

Para ejecutar localmente el proyecto, sigue estos pasos:

1. Clona este repositorio en tu máquina local:
     ```bash
    git clone https://github.com/Spiegelin/Linguist.git
    ```
2. Instala las dependencias del cliente y del servidor utilizando npm o yarn:
    ```bash
    cd client
    npm install
    cd ../server
    npm install
    ```
3. Configura la base de datos PostgreSQL y actualiza las credenciales de conexión en el archivo `server/config/db.js`.

4. Ejecuta el servidor y el cliente en terminales separadas:
    ```bash
    # En el directorio 'server'
    npm start

    # En el directorio 'client'
    npm start
    ```
5. Abre tu navegador web y navega a `http://localhost:3000` para ver la aplicación en funcionamiento.

## Contribuir

¡Contribuciones son bienvenidas! Si deseas contribuir a Lingüíst, sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-caracteristica`).
3. Realiza tus cambios y haz commit de ellos (`git commit -am 'Agrega una nueva característica'`).
4. Haz push a la rama (`git push origin feature/nueva-caracteristica`).
5. Abre un pull request.

## Créditos

Lingüíst es creado y mantenido por 
- [Diego Espejo](https://github.com/Spiegelin)
- [Pablo Heredia](https://github.com/Pablo389)
- [Santos Arellano](https://github.com/Santos-Arellano)
- [Marcela De La Rosa](https://github.com/MARCHELUKI)

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para obtener más detalles.
