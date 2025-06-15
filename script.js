// Переключение экранов
const launchScreen = document.getElementById('launchScreen');
const step1Screen = document.getElementById('step1Screen');
const flashOverlay = document.getElementById('flashOverlay');
const btnStart = document.querySelector('.btn-start');
const step2Screen = document.getElementById('step2Screen');
const step3Screen = document.getElementById('step3Screen');

btnStart.addEventListener('click', () => {
  // Вспышка
  flashOverlay.classList.add('active');

  setTimeout(() => {
    launchScreen.style.display = 'none';
    step1Screen.style.display = 'flex';
    flashOverlay.classList.remove('active');
  }, 200);
});

// Логика для полей ввода
const nameInput = document.getElementById('nameInput');
const birthInput = document.getElementById('birthInput');
const genderSelect = document.getElementById('genderSelect');
const zodiacSign = document.getElementById('zodiacSign');
const pathSelect = document.getElementById('pathSelect');
const pathDescription = document.getElementById('pathDescription');
const mentorSelect = document.getElementById('mentorSelect');
const mentorImage = document.getElementById('mentorImage');

// Описания духовных путей
const pathDescriptions = {
  'tanakh': 'Еврейская Библия — уроки справедливости и милосердия через притчи и законы.',
  'vedas': 'Индийские тексты — мантры и йога для гармонии тела и духа.',
  'shamanism': 'Путёвки природных духов и обряды для связи с энергией Земли.',
  'bible': 'Христианская Библия — собрание Ветхого и Нового Заветов о вере, любви и спасении через притчи и откровения.',
  'quran': 'Коран — священный текст ислама, содержащий откровения Пророка Мухаммеда о единобожии и моральных наставлениях.',
  'buddhism': 'Буддизм — учение о четырех благородных истинах и восьмеричном пути к просветлению и освобождению от страданий.',
  'hinduism': 'Индуизм — сложная система верований и практик, включающая дхарму, карму, йогу и почитание множества божеств.',
  'judaism': 'Иудаизм — религия еврейского народа, основанная на Торе и устной традиции, призывающая к соблюдению заповедей и справедливости.'
}

// Функция определения знака зодиака
function getZodiacSign(dateString) {
  const date = new Date(dateString);
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const signs = [
    { name: 'Козерог ♑', start: [12, 22], end: [1, 19] },
    { name: 'Водолей ♒', start: [1, 20], end: [2, 18] },
    { name: 'Рыбы ♓', start: [2, 19], end: [3, 20] },
    { name: 'Овен ♈', start: [3, 21], end: [4, 19] },
    { name: 'Телец ♉', start: [4, 20], end: [5, 20] },
    { name: 'Близнецы ♊', start: [5, 21], end: [6, 20] },
    { name: 'Рак ♋', start: [6, 21], end: [7, 22] },
    { name: 'Лев ♌', start: [7, 23], end: [8, 22] },
    { name: 'Дева ♍', start: [8, 23], end: [9, 22] },
    { name: 'Весы ♎', start: [9, 23], end: [10, 22] },
    { name: 'Скорпион ♏', start: [10, 23], end: [11, 21] },
    { name: 'Стрелец ♐', start: [11, 22], end: [12, 21] }
  ];

  for (let sign of signs) {
    if (sign.name === 'Козерог ♑') {
      if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
        return sign.name;
      }
    } else {
      if ((month === sign.start[0] && day >= sign.start[1]) ||
        (month === sign.end[0] && day <= sign.end[1])) {
        return sign.name;
      }
    }
  }
  return '-';
}

// Автоматическое определение знака зодиака при изменении даты
birthInput.addEventListener('change', () => {
  const sign = getZodiacSign(birthInput.value);
  zodiacSign.textContent = `⚝ Ваш знак зодиaкa: ${sign}`;
  zodiacSign.classList.add('show');
});

// Инициализация знака зодиака при загрузке
const initialSign = getZodiacSign(birthInput.value);
zodiacSign.textContent = `⚝ Ваш знак зодиака: ${initialSign}`;
zodiacSign.classList.add('show');

// Автоматическое определение духовного пути при изменении выбора
pathSelect.addEventListener('change', () => {
  const path = pathDescriptions[pathSelect.value] || '-';
  pathDescription.innerHTML = `🔮 Выбранный вами духовный путь:<br>${path}`;
  pathDescription.classList.add('show');
});

// Инициализация духовного пути при загрузке
const initialPath = pathDescriptions[pathSelect.value] || '-';
pathDescription.innerHTML = `🔮 Выбранный вами духовный путь:<br>${initialPath}`;
pathDescription.classList.add('show');

// Инициализация выбора наставника при загрузке
const initialMentor = mentorSelect.value || '-';

if (initialMentor == '-') {
  mentorImage.style.display = 'none';
} else {
  mentorImage.style.display = 'block';
  mentorImage.style.opacity = '0';
  mentorImage.style.transform = 'scale(0.95)';
  mentorImage.style.filter = 'blur(8px)';
  mentorImage.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.6s cubic-bezier(0.4, 0, 0.2, 1)';

  setTimeout(() => {
    mentorImage.style.backgroundImage = `url(img/${initialMentor}.png)`;
    mentorImage.style.opacity = '1';
    mentorImage.style.transform = 'scale(1)';
    mentorImage.style.filter = 'blur(0)';
    mentorImage.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
  }, 300);
}

mentorSelect.addEventListener('change', () => {
  const mentor = mentorSelect.value || '-';
  if (mentor == '-') {
    mentorImage.style.display = 'none';
  } else {
    mentorImage.style.display = 'block';
    mentorImage.style.opacity = '0';
    mentorImage.style.transform = 'scale(0.95)';
    mentorImage.style.filter = 'blur(8px)';
    mentorImage.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.6s cubic-bezier(0.4, 0, 0.2, 1)';

    setTimeout(() => {
      mentorImage.style.backgroundImage = `url(img/${mentor}.png)`;
      mentorImage.style.opacity = '1';
      mentorImage.style.transform = 'scale(1)';
      mentorImage.style.filter = 'blur(0)';
      mentorImage.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    }, 300);
  }
});

// Обработчик кнопки "Далее"
document.getElementById('nextBtn').addEventListener('click', () => {
  step1Screen.style.opacity = '0';
  step1Screen.style.filter = 'blur(8px)';
  step1Screen.style.transition = 'opacity 0.5s ease, filter 0.5s ease';
  
  setTimeout(() => {
    step1Screen.style.display = 'none';
    step2Screen.style.display = 'flex';
    step2Screen.style.opacity = '0';
    step2Screen.style.filter = 'blur(8px)';
    
    requestAnimationFrame(() => {
      step2Screen.style.opacity = '1';
      step2Screen.style.filter = 'blur(0)';
      step2Screen.style.transition = 'opacity 0.5s ease, filter 0.5s ease';
    });
  }, 500);
});

document.getElementById('nextBtn2').addEventListener('click', () => {
  step2Screen.style.opacity = '0';
  step2Screen.style.filter = 'blur(8px)';
  step2Screen.style.transition = 'opacity 0.5s ease, filter 0.5s ease';
  
  setTimeout(() => {
    step2Screen.style.display = 'none';
    step3Screen.style.display = 'flex';
    step3Screen.style.opacity = '0';
    step3Screen.style.filter = 'blur(8px)';
    
    requestAnimationFrame(() => {
      step3Screen.style.opacity = '1';
      step3Screen.style.filter = 'blur(0)';
      step3Screen.style.transition = 'opacity 0.5s ease, filter 0.5s ease';
    });
  }, 500);
});

// Звуковые эффекты (опционально)
// function playAmbientSound() {
//   try {
//     const audioContext = new (window.AudioContext || window.webkitAudioContext)();

//     // Создаем простой звон колокольчика
//     function createBell() {
//       const oscillator = audioContext.createOscillator();
//       const gainNode = audioContext.createGain();

//       oscillator.connect(gainNode);
//       gainNode.connect(audioContext.destination);

//       oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
//       oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.5);

//       gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
//       gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);

//       oscillator.start(audioContext.currentTime);
//       oscillator.stop(audioContext.currentTime + 1);
//     }

//     btnStart.addEventListener('click', () => {
//       createBell();
//     });

//   } catch (e) {
//     // Звук недоступен
//     console.log('Web Audio API недоступен');
//   }
// }

// Инициализация звука при первом взаимодействии
document.addEventListener('click', playAmbientSound, { once: true });
