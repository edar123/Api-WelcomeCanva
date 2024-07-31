const { createCanvas, loadImage, registerFont } = require('canvas');
const path = require('path');

// Registrar la fuente Impact usando la ruta absoluta
const fontImpactPath = path.resolve(__dirname, '..', 'assets', 'fonts', 'Impact-Regular.ttf');

console.log('Registrando fuente desde:', fontImpactPath);
registerFont(fontImpactPath, { family: 'Impact' });

exports.generateWelcomeImage = async (req, res) => {
  // Imprimir todos los parámetros recibidos para depuración
  console.log('Query Parameters:', req.query);

  // Extraer y validar parámetros, asegurándose de que están en mayúsculas
  const username = (req.query.username || 'Usuario').toUpperCase();
  const avatarUrl = req.query.avatarUrl || '';
  const backgroundUrl = req.query.backgroundUrl || path.join(__dirname, '..', 'assets', 'default-bg.png');
  const logoUrl = req.query.logoUrl || path.join(__dirname, '..', 'assets', 'default-logo.png');
  const textColor = req.query.textColor || '#FFFFFF';
  const borderColor = req.query.borderColor || '#FF0000';
  const customText = (req.query.customText || 'Gracias por estar con nosotros').toUpperCase();

  // Imprimir los valores finales de los parámetros para depuración
  console.log('Processed Parameters:', {
    username,
    avatarUrl,
    backgroundUrl,
    logoUrl,
    textColor,
    borderColor,
    customText
  });

  const welcomeText = 'BIENVENIDO'; // Texto fijo de bienvenida

  const width = 1920;
  const height = 1080;
  const canvas = createCanvas(width, height);
  const context = canvas.getContext('2d');

  // Verificar las fuentes registradas
  console.log(context.font); // Debería imprimir "10px sans-serif" por defecto

  // Cargar fondo
  try {
    const background = await loadImage(backgroundUrl);
    context.drawImage(background, 0, 0, width, height);
  } catch (error) {
    console.error('Error al cargar el fondo:', error);
    // Si no se puede cargar el fondo, se dibuja un fondo negro
    context.fillStyle = '#000000';
    context.fillRect(0, 0, width, height);
  }

  // Cargar y dibujar logo en la esquina superior derecha
  try {
    const logo = await loadImage(logoUrl);
    const logoWidth = 200; // Ancho del logo
    const logoHeight = 200; // Altura del logo
    context.drawImage(logo, width - logoWidth - 20, 20, logoWidth, logoHeight);
  } catch (error) {
    console.error('Error al cargar el logo:', error);
  }

  // Cargar y dibujar avatar
  let avatar;
  if (avatarUrl) {
    try {
      avatar = await loadImage(avatarUrl);
    } catch (error) {
      console.error('Error al cargar el avatar, utilizando avatar predeterminado:', error);
      const defaultAvatarPath = path.join(__dirname, '..', 'assets', 'default-avatar.png');
      avatar = await loadImage(defaultAvatarPath);
    }
  } else {
    const defaultAvatarPath = path.join(__dirname, '..', 'assets', 'default-avatar.png');
    avatar = await loadImage(defaultAvatarPath);
  }

  // Dibujar borde del avatar (ajustado para un tamaño más grande)
  const avatarRadius = 260; // Tamaño del radio del avatar
  context.save();
  context.beginPath();
  context.arc(960, 400, avatarRadius + 10, 0, Math.PI * 2, true);
  context.closePath();
  context.clip();
  context.fillStyle = borderColor;
  context.fill();
  context.restore();

  // Dibujar avatar (ajustado para un tamaño más grande)
  context.save();
  context.beginPath();
  context.arc(960, 400, avatarRadius, 0, Math.PI * 2, true);
  context.closePath();
  context.clip();
  context.drawImage(avatar, 960 - avatarRadius, 400 - avatarRadius, avatarRadius * 2, avatarRadius * 2);
  context.restore();

  // Función para centrar texto
  const drawCenteredText = (text, y, fontSize, color, weight = 'normal') => {
    context.fillStyle = color;
    context.font = `${weight} ${fontSize}px Impact`;
    console.log(`Dibujando texto: ${text} con font: ${context.font}`); // Verificar fuente aplicada
    const textWidth = context.measureText(text).width;
    context.fillText(text, (width - textWidth) / 2, y);
  };

  // Texto de bienvenida con fuente más gruesa
  drawCenteredText(welcomeText, 780, 100, textColor, 'bold');

  // Nombre de usuario
  drawCenteredText(username, 870, 70, textColor, 'bold');

  // Texto personalizado
  drawCenteredText(customText, 950, 60, borderColor, 'bold');

  // Convertir canvas a imagen y enviar como respuesta
  const buffer = canvas.toBuffer('image/png');
  res.type('image/png');
  res.send(buffer);
};
