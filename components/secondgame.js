import { useState, useEffect } from 'react';
import styles from '../styles/SecondGame.module.css'; // CSS dosyasını burada import ettik

const departments = [
  { name: 'Fizik', image: 'https://i.hizliresim.com/1hrrkxx.jpg' },
  { name: 'Fotonik', image: 'https://i.hizliresim.com/j4ms0jg.jpg' },
  { name: 'Kimya', image: 'https://i.hizliresim.com/oildvcg.jpg' },
  { name: 'Matematik', image: 'https://i.hizliresim.com/oildvcg.jpg' },
  { name: 'Moleküler Biyoloji', image: 'https://i.hizliresim.com/t0amitr.jpg' },
  { name: 'Bilgisayar', image: 'https://i.hizliresim.com/j4ms0jg.jpg' },
  { name: 'Biyomühendislik', image: 'https://i.hizliresim.com/b4uq84c.jpg' },
  { name: 'Elektrik Mühendisliği', image: 'https://i.hizliresim.com/fibeh17.jpg' },
  { name: 'Gıda Mühendisliği', image: 'https://i.hizliresim.com/b4uq84c.jpg' },
  { name: 'İnşaat Mühendisliği', image: 'https://i.hizliresim.com/on64iog.jpg' },
  { name: 'Kimya Mühendisliği', image: 'https://i.hizliresim.com/4elz6v6.jpg' },
  { name: 'Makine Mühendisliği', image: 'https://i.hizliresim.com/rw5ud4v.jpg' },
  { name: 'Malzeme Bilimi', image: 'https://i.hizliresim.com/fibeh17.jpg' },
  { name: 'Endüstriyel Tasarım', image: 'https://i.hizliresim.com/ps3gx0h.jpg' },
  { name: 'Mimarlık', image: 'https://i.hizliresim.com/ps3gx0h.jpg' },
];

export default function SecondGame() {
  const [currentDepartment, setCurrentDepartment] = useState(null);
  const [zoom, setZoom] = useState(2); // Başlangıç zoom seviyesi
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(30); // Zamanlayıcı için durum
  const [filteredDepartments, setFilteredDepartments] = useState([]); // Filtrelenen bölümler

  useEffect(() => {
    startNewGame();
  }, []);

  useEffect(() => {
    let timer;
    if (timeRemaining > 0 && !gameOver) {
      timer = setInterval(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      setMessage(`Oyun bitti! Doğru cevap: ${currentDepartment.name}`);
      setGameOver(true);
    }
    return () => clearInterval(timer);
  }, [timeRemaining, gameOver, currentDepartment]);

  const startNewGame = () => {
    const randomDept = departments[Math.floor(Math.random() * departments.length)];
    setCurrentDepartment(randomDept);
    setZoom(2);
    setGuess('');
    setMessage('');
    setGameOver(false);
    setTimeRemaining(30); // Zamanlayıcıyı sıfırla
    setFilteredDepartments([]); // Filtrelenen bölümleri sıfırla
  };

  const handleGuess = () => {
    if (gameOver) return;

    if (guess.trim().toLowerCase() === currentDepartment.name.toLowerCase()) {
      setMessage('Tebrikler! Doğru tahmin.');
      setGameOver(true);
    } else {
      if (zoom > 1) {
        setZoom(zoom - 0.2); // Yanlış tahminlerde zoom seviyesini azalt
        setMessage('Yanlış tahmin, tekrar deneyin.');
      } else {
        setMessage(`Oyun bitti! Doğru cevap: ${currentDepartment.name}`);
        setGameOver(true);
      }
    }
    setGuess('');
    setFilteredDepartments([]);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleGuess();
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setGuess(value);

    // Kullanıcının yazdığı input'a göre filtreleme yapıyoruz
    const filtered = departments.filter((dept) =>
      dept.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredDepartments(filtered);
  };

  if (!currentDepartment) {
    return <div className={styles.container}><p>Yükleniyor...</p></div>;
  }

  return (
    <div className={styles.container}>
      <h1>Görsel Tahmin Oyunu</h1>
      <div 
        className={styles.imageContainer}
        style={{ 
          transform: `scale(${zoom})`,
          transition: 'transform 0.5s',
          overflow: 'hidden',
        }}
      >
        <img 
          src={currentDepartment.image} 
          alt="Tahmin Edilecek Bölüm" 
          className={styles.gameImage}
        />
      </div>
      <div className={styles.inputContainer}>
        <input 
          type="text" 
          value={guess} 
          onChange={handleInputChange} 
          onKeyPress={handleKeyPress}
          placeholder="Tahmininizi girin" 
          disabled={gameOver}
          className={styles.inputBox}
        />
        {filteredDepartments.length > 0 && (
          <ul className={styles.suggestions}>
            {filteredDepartments.map((dept) => (
              <li key={dept.name} onClick={() => setGuess(dept.name)}>
                {dept.name}
              </li>
            ))}
          </ul>
        )}
        <button onClick={handleGuess} disabled={gameOver} className={styles.guessButton}>
          Tahmin Et
        </button>
      </div>
      {message && (
        <p className={styles.message} style={{ color: 'red', textAlign: 'center', marginTop: '20px' }}>
          {message}
        </p>
      )}
      {gameOver && (
        <button onClick={startNewGame} className={styles.restartButton}>
          Yeniden Başlat
        </button>
      )}
      <p>Kalan Süre: {timeRemaining} saniye</p>
    </div>
  );
}
