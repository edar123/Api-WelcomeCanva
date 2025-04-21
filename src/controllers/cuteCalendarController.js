const { createCanvas, loadImage, registerFont } = require('canvas');
const path = require('path');

// ✅ Registrar fuente Poppins-Bold
registerFont(path.join(__dirname, '..', 'assets', 'fonts', 'Poppins-Bold.ttf'), {
  family: 'Poppins Bold',
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

  // 🎨 Fondo pastel
  ctx.fillStyle = '#F3D1D1';
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  // 🗓️ Título del mes
  const refDate = new Date(year, month, 1);
  const monthName = new Intl.DateTimeFormat(lang, { month: 'long' }).format(refDate).toUpperCase();
  ctx.fillStyle = '#333';
  ctx.font = '64px "Poppins Bold"';
  ctx.textAlign = 'center';
  ctx.fillText(`${monthName} ${year}`, canvasWidth / 2, 90);

  // 🧠 Semana inicia en lunes (excepto US, CA, PH...)
  const weekStartsOnMonday = !['US', 'CA', 'PH'].includes(country);

  // 🔤 Nombres completos de días de la semana
  const dayNames = [];
  for (let i = 0; i < 7; i++) {
    const base = new Date(2023, 0, weekStartsOnMonday ? i + 1 : i);
    const name = new Intl.DateTimeFormat(lang, { weekday: 'long' }).format(base);
    dayNames.push(name.charAt(0).toUpperCase() + name.slice(1));
  }

  // 📐 Layout
  const marginX = 100;
  const marginY = 180;
  const cellWidth = (canvasWidth - marginX * 2) / 7;
  const cellHeight = 100;

  // 🏷️ Encabezados
  ctx.font = 'bold 30px "Poppins Bold"';
  ctx.fillStyle = '#222';
  ctx.textAlign = 'center';
  dayNames.forEach((name, i) => {
    const x = marginX + i * cellWidth + cellWidth / 2;
    ctx.fillText(name, x, marginY);
  });

  // 📆 Cálculo de días del mes
  const firstDay = new Date(year, month, 1);
  const rawStartDay = firstDay.getDay(); // 0 (domingo) - 6 (sábado)
  const startDay = weekStartsOnMonday
    ? (rawStartDay === 0 ? 6 : rawStartDay - 1)
    : rawStartDay;

  const totalDays = new Date(year, month + 1, 0).getDate();
  const totalCells = totalDays + startDay;
  const totalRows = Math.ceil(totalCells / 7);

  ctx.font = '28px "Poppins Bold"';
  ctx.textAlign = 'left';

  let dayCounter = 1;
  for (let row = 0; row < totalRows; row++) {
    for (let col = 0; col < 7; col++) {
      const cellIndex = row * 7 + col;
      if (cellIndex < startDay || dayCounter > totalDays) continue;

      const x = marginX + col * cellWidth;
      const y = marginY + (row + 1) * cellHeight + 10;

      // 🟨 Día actual
      if (isCurrentMonth && dayCounter === currentDay) {
        ctx.fillStyle = '#FFF7';
        ctx.fillRect(x, y, cellWidth, cellHeight);
      }

      // 🧱 Caja del día
      ctx.strokeStyle = '#CCC';
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, cellWidth, cellHeight);

      // ✏️ Número del día
      ctx.fillStyle = '#000';
      ctx.fillText(dayCounter.toString(), x + 10, y + 30);

      dayCounter++;
    }
  }

  // 🐰 Imagen decorativa (abajo izquierda)
  try {
    const bunny = await loadImage(path.join(__dirname, '..', 'assets', 'conejo-calendar.png'));
    const size = 180;
    ctx.drawImage(bunny, 30, canvasHeight - size - 30, size, size);
  } catch (err) {
    console.error('No se pudo cargar la imagen decorativa:', err);
  }

  // 🖼️ Enviar imagen PNG
  const buffer = canvas.toBuffer('image/png');
  res.type('image/png').send(buffer);
};
