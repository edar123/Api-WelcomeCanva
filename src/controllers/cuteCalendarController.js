const { createCanvas, loadImage, registerFont } = require('canvas');
const path = require('path');

registerFont(path.join(__dirname, '..', 'assets', 'fonts', 'Poppins-Bold.ttf'), {
  family: 'Poppins',
});

exports.generateCuteCalendarImage = async (req, res) => {
  const lang = req.query.lang || 'es';
  const country = (req.query.country || 'MX').toUpperCase();
  const monthParam = parseInt(req.query.month); // 1-12
  const yearParam = parseInt(req.query.year);

  const today = new Date();
  const year = !isNaN(yearParam) ? yearParam : today.getFullYear();
  const month = !isNaN(monthParam) ? monthParam - 1 : today.getMonth(); // 0-11
  const currentDay = today.getDate();
  const isCurrentMonth = year === today.getFullYear() && month === today.getMonth();

  const canvasWidth = 1920;
  const canvasHeight = 1080;
  const canvas = createCanvas(canvasWidth, canvasHeight);
  const ctx = canvas.getContext('2d');

  // Fondo pastel
  ctx.fillStyle = '#F3D1D1';
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  // Título del mes
  const refDate = new Date(year, month, 1);
  const monthName = new Intl.DateTimeFormat(lang, { month: 'long' }).format(refDate).toUpperCase();
  ctx.fillStyle = '#4B3B3B';
  ctx.font = 'bold 64px Poppins';
  ctx.textAlign = 'center';
  ctx.fillText(`${monthName} ${year}`, canvasWidth / 2, 100);

  // Semana inicia en lunes? resulta que hay paises que inician en domingo todos nacos
  const weekStartsOnMonday = !['US', 'CA', 'PH'].includes(country);

  // Obtener nombres completos de los días
  const dayNames = [];
  for (let i = 0; i < 7; i++) {
    const baseDate = new Date(2023, 0, weekStartsOnMonday ? i + 1 : i);
    const fullName = new Intl.DateTimeFormat(lang, { weekday: 'long' }).format(baseDate);
    dayNames.push(fullName.charAt(0).toUpperCase() + fullName.slice(1)); // Capitalizado
  }

  const marginX = 150;
  const marginY = 160;
  const cellWidth = (canvasWidth - 2 * marginX) / 7;
  const cellHeight = 110;

  // se ve bonito lo de días
  ctx.font = 'bold 32px Poppins';
  ctx.fillStyle = '#333';
  ctx.textAlign = 'center';
  dayNames.forEach((name, i) => {
    const x = marginX + i * cellWidth + cellWidth / 2;
    ctx.fillText(name, x, marginY);
  });

  //  días del mes
  const firstDay = new Date(year, month, 1);
  let startDay = firstDay.getDay();
  if (weekStartsOnMonday) startDay = (startDay + 6) % 7;

  const totalDays = new Date(year, month + 1, 0).getDate();

  ctx.font = '28px Poppins';
  ctx.fillStyle = '#000';
  ctx.textAlign = 'left';

  let col = startDay;
  let row = 1;

  for (let d = 1; d <= totalDays; d++) {
    const x = marginX + col * cellWidth;
    const y = marginY + row * cellHeight + 20;

    ctx.strokeStyle = '#CCC';
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, cellWidth, cellHeight);

    // Día actual
    if (isCurrentMonth && d === currentDay) {
      ctx.fillStyle = '#FFF5';
      ctx.fillRect(x, y, cellWidth, cellHeight);
      ctx.fillStyle = '#000';
    }

    // ✏️ Escribir número del día
    ctx.fillText(d.toString(), x + 10, y + 30);

    col++;
    if (col === 7) {
      col = 0;
      row++;
    }
  }

  // Imagen decorativa
  try {
    const bunny = await loadImage(path.join(__dirname, '..', 'assets', 'conejo-calendar.png'));
    const imgSize = 180;
    ctx.drawImage(bunny, 40, canvasHeight - imgSize - 40, imgSize, imgSize);
  } catch (err) {
    console.error('Error cargando imagen decorativa:', err);
  }

  // Enviar imagen
  const buffer = canvas.toBuffer('image/png');
  res.type('image/png').send(buffer);
};
