const { createCanvas, loadImage, registerFont } = require('canvas');
const path = require('path');

// Registrar la fuente Poppins-Regular
registerFont(path.join(__dirname, '..', 'assets', 'fonts', 'Poppins-Bold.ttf'), { family: 'Poppins' });

exports.generateCuteWelcomeImage = async (req, res) => {
  // Parámetros
  const welcomeText = 'BIENVENIDO/A'; // Texto de bienvenida
  const username = (req.query.username || 'Nombre de Usuario').toUpperCase();
  const groupName = (req.query.groupName || 'Nombre del Grupo').toUpperCase();
  const avatarUrl = req.query.avatarUrl || '';
  const logoUrl = req.query.logoUrl || ''

  const width = 1000;
  const height = 350;
  const canvas = createCanvas(width, height);
  const context = canvas.getContext('2d');

  // Fondo general
  context.fillStyle = '#202C33'; // Fondo gris oscuro
  context.fillRect(0, 0, width, height);

  // Función para dibujar rectángulos con esquinas redondeadas
  const drawRoundedRect = (x, y, w, h, radius, color) => {
    context.beginPath();
    context.moveTo(x + radius, y); // Esquina superior izquierda
    context.arcTo(x + w, y, x + w, y + h, radius); // Esquina superior derecha
    context.arcTo(x + w, y + h, x, y + h, radius); // Esquina inferior derecha
    context.arcTo(x, y + h, x, y, radius); // Esquina inferior izquierda
    context.arcTo(x, y, x + w, y, radius); // Esquina superior izquierda
    context.closePath();
    context.fillStyle = color;
    context.fill();
  };

  // Definir posición y tamaño del avatar
  const avatarSize = height - 60; // Tamaño cuadrado
  let avatar;
  try {
    avatar = avatarUrl ? await loadImage(avatarUrl) : await loadImage(path.join(__dirname, '..', 'assets', 'default-avatar.png'));
  } catch (error) {
    console.error('Error al cargar el avatar:', error);
    avatar = await loadImage(path.join(__dirname, '..', 'assets', 'default-avatar.png'));
  }

  let logo;
  try {
    logo = logoUrl ? await loadImage(logoUrl) : await loadImage(path.join(__dirname, '..', 'assets', 'default-avatar.png'));
  } catch (error) {
    console.error('Error al cargar el avatar:', error);
    logo = await loadImage(path.join(__dirname, '..', 'assets', 'default-avatar.png'));
  }

  // Definir posición del avatar
  const avatarX = width - avatarSize - 40; // 40px de margen derecho
  const avatarY = 30; // Comenzando a 30px desde arriba

  // Dibujar el borde del avatar (rectángulo con esquinas redondeadas)
  drawRoundedRect(avatarX, avatarY, avatarSize, avatarSize, 20, '#FFFFFF'); // Borde blanco

  // Dibujar el avatar dentro del área definida
  context.save();
  context.beginPath();
  context.moveTo(avatarX + 20, avatarY); // Esquina superior izquierda
  context.lineTo(avatarX + avatarSize - 20, avatarY); // Línea superior
  context.arc(avatarX + avatarSize - 20, avatarY + 20, 20, Math.PI * 1.5, Math.PI * 2); // Esquina superior derecha
  context.lineTo(avatarX + avatarSize, avatarY + avatarSize - 20); // Línea derecha
  context.arc(avatarX + avatarSize - 20, avatarY + avatarSize - 20, 20, 0, Math.PI / 2); // Esquina inferior derecha
  context.lineTo(avatarX + 20, avatarY + avatarSize); // Línea inferior
  context.arc(avatarX + 20, avatarY + avatarSize - 20, 20, Math.PI / 2, Math.PI); // Esquina inferior izquierda
  context.lineTo(avatarX, avatarY + 20); // Línea izquierda
  context.arc(avatarX + 20, avatarY + 20, 20, Math.PI, Math.PI * 1.5); // Esquina superior izquierda
  context.closePath();
  context.clip(); // Aplicar la máscara redondeada

  // Dibujar el avatar
  context.drawImage(avatar, avatarX, avatarY, avatarSize, avatarSize);
  context.restore(); // Restaurar el contexto

  // Bloque superior: Bienvenido/a y Nombre de usuario
  drawRoundedRect(30, 30, 590, 140, 20, 'rgba(0, 0, 0, 0.5)'); // Bloque superior y medio
  context.fillStyle = '#FFFFFF';
  context.font = 'bold 35px Poppins';
  context.fillText(welcomeText, 50, 80); // Texto Bienvenido/a
  context.font = 'bold 40px Poppins';
  context.fillText(username, 50, 150); // Texto del nombre de usuario

  // Espacio entre los bloques
  const spacingY = 20;

  // Bloque inferior: Nombre del grupo
  drawRoundedRect(30, 200 + spacingY, 590, 100, 20, 'rgba(0, 0, 0, 0.5)'); // Bloque inferior
  context.fillStyle = '#FFFFFF';
  context.font = 'bold 35px Poppins';
  context.fillText(groupName, 50, 260 + spacingY); // Texto del nombre del grupo
  // Avatar pequeño 
  const smallAvatarSize = 99.5;
  const smallAvatarX = 525;
  const smallAvatarY = 220;
  const borderRadius = 10;
  
  // Crear un rectángulo con esquinas redondeadas
  context.beginPath();
  context.roundRect(smallAvatarX, smallAvatarY, smallAvatarSize, smallAvatarSize, borderRadius);
  context.clip();
  
  // Dibujar la imagen dentro del rectángulo
  context.drawImage(logo, smallAvatarX, smallAvatarY, smallAvatarSize, smallAvatarSize);

  // Convertir el canvas a imagen y enviar como respuesta
  const buffer = canvas.toBuffer('image/png');
  res.type('image/png');
  res.send(buffer);
};
